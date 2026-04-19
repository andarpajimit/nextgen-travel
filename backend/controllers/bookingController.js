const pool = require('../config/database');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Generate random booking reference like NG4F8K2A
const generateBookingRef = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'NG';
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
};

// STEP 1: Create Razorpay order (before payment)
const createOrder = async (req, res) => {
  const { schedule_id, passenger_name, passenger_age, passenger_gender, seat_count } = req.body;
  try {
    if (!schedule_id || !passenger_name || !passenger_age || !passenger_gender)
      return res.status(400).json({ success: false, message: 'All passenger details required.' });

    // Get schedule + price info
    const schedRes = await pool.query(`
      SELECT s.*, r.from_city, r.to_city, b.bus_name
      FROM schedules s
      JOIN routes r ON s.route_id = r.id
      JOIN buses b ON s.bus_id = b.id
      WHERE s.id=$1 AND s.status='active'
    `, [schedule_id]);

    if (!schedRes.rows.length)
      return res.status(404).json({ success: false, message: 'Schedule not found.' });

    const schedule = schedRes.rows[0];
    const seats = seat_count || 1;

    if (schedule.available_seats < seats)
      return res.status(400).json({ success: false, message: 'Not enough seats available.' });

    const totalAmount = schedule.price * seats;
    const amountInPaise = Math.round(totalAmount * 100); // Razorpay works in paise

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    });

    res.json({
      success: true,
      data: {
        order_id: order.id,
        amount: amountInPaise,
        currency: 'INR',
        key: process.env.RAZORPAY_KEY_ID, // sent to frontend
        schedule,
        totalAmount,
        passenger: { name: passenger_name, age: passenger_age, gender: passenger_gender }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create payment order.' });
  }
};

// STEP 2: Verify payment + save booking
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id, razorpay_payment_id, razorpay_signature,
    schedule_id, passenger_name, passenger_age, passenger_gender,
    total_amount, seat_count
  } = req.body;

  try {
    // Verify signature to confirm payment is real
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature)
      return res.status(400).json({ success: false, message: 'Payment verification failed!' });

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const seats = seat_count || 1;

      // Reduce available seats
      await client.query(
        'UPDATE schedules SET available_seats = available_seats - $1 WHERE id=$2',
        [seats, schedule_id]
      );

      // Save booking to DB
      const bookingRef = generateBookingRef();
      const seatNums = Array.from({ length: seats }, (_, i) => `A${i + 1}`);

      const bookingResult = await client.query(`
        INSERT INTO bookings
          (booking_ref,user_id,schedule_id,passenger_name,passenger_age,
           passenger_gender,seat_numbers,total_amount,payment_status,
           razorpay_order_id,razorpay_payment_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'paid',$9,$10)
        RETURNING *
      `, [bookingRef, req.user.id, schedule_id, passenger_name, passenger_age,
          passenger_gender, seatNums, total_amount,
          razorpay_order_id, razorpay_payment_id]);

      await client.query('COMMIT');

      res.json({
        success: true,
        message: '🎉 Booking confirmed! Payment successful.',
        data: bookingResult.rows[0]
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error during booking.' });
  }
};

// Customer: view my bookings
const getMyBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*,
        s.departure_time, s.arrival_time, s.travel_date,
        r.from_city, r.to_city,
        bus.bus_name, bus.bus_type
      FROM bookings b
      JOIN schedules s ON b.schedule_id = s.id
      JOIN routes r ON s.route_id = r.id
      JOIN buses bus ON s.bus_id = bus.id
      WHERE b.user_id=$1
      ORDER BY b.created_at DESC
    `, [req.user.id]);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: view all bookings
const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, u.name as user_name, u.email,
        s.departure_time, s.arrival_time, s.travel_date,
        r.from_city, r.to_city, bus.bus_name
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      JOIN schedules s ON b.schedule_id = s.id
      JOIN routes r ON s.route_id = r.id
      JOIN buses bus ON s.bus_id = bus.id
      ORDER BY b.created_at DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: dashboard stats
const getStats = async (req, res) => {
  try {
    const [bookings, users, routes, revenue] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM bookings WHERE payment_status='paid'"),
      pool.query("SELECT COUNT(*) FROM users WHERE role='customer'"),
      pool.query('SELECT COUNT(*) FROM routes'),
      pool.query("SELECT COALESCE(SUM(total_amount),0) AS total FROM bookings WHERE payment_status='paid'"),
    ]);
    res.json({
      success: true,
      data: {
        totalBookings: parseInt(bookings.rows[0].count),
        totalCustomers: parseInt(users.rows[0].count),
        totalRoutes: parseInt(routes.rows[0].count),
        totalRevenue: parseFloat(revenue.rows[0].total),
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { createOrder, verifyPayment, getMyBookings, getAllBookings, getStats };