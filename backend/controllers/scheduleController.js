const pool = require('../config/database');

// GET /search?from=Mumbai&to=Pune&date=2024-01-15
const searchSchedules = async (req, res) => {
  const { from, to, date } = req.query;
  try {
    if (!from || !to || !date)
      return res.status(400).json({ success: false, message: 'from, to, date required.' });

    const result = await pool.query(`
      SELECT
        s.id, s.departure_time, s.arrival_time, s.travel_date,
        s.price, s.available_seats, s.status,
        b.bus_number, b.bus_name, b.bus_type, b.amenities, b.total_seats,
        r.from_city, r.to_city, r.distance_km
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      JOIN routes r ON s.route_id = r.id
      WHERE r.from_city ILIKE $1
        AND r.to_city ILIKE $2
        AND s.travel_date = $3
        AND s.status = 'active'
      ORDER BY s.departure_time
    `, [from, to, date]);

    res.json({ success: true, data: result.rows, count: result.rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: GET all schedules
const getAllSchedules = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, b.bus_name, b.bus_number, r.from_city, r.to_city
      FROM schedules s
      JOIN buses b ON s.bus_id = b.id
      JOIN routes r ON s.route_id = r.id
      ORDER BY s.travel_date DESC
    `);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: POST create schedule
const createSchedule = async (req, res) => {
  const { route_id, bus_id, departure_time, arrival_time, travel_date, price } = req.body;
  try {
    if (!route_id || !bus_id || !departure_time || !arrival_time || !travel_date || !price)
      return res.status(400).json({ success: false, message: 'All fields required.' });

    // Get total seats from bus
    const busRes = await pool.query('SELECT total_seats FROM buses WHERE id=$1', [bus_id]);
    if (!busRes.rows.length)
      return res.status(404).json({ success: false, message: 'Bus not found.' });

    const result = await pool.query(
      `INSERT INTO schedules
        (route_id,bus_id,departure_time,arrival_time,travel_date,price,available_seats)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [route_id, bus_id, departure_time, arrival_time, travel_date, price, busRes.rows[0].total_seats]
    );
    res.status(201).json({ success: true, message: 'Schedule created!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: cancel schedule
const deleteSchedule = async (req, res) => {
  try {
    await pool.query("UPDATE schedules SET status='cancelled' WHERE id=$1", [req.params.id]);
    res.json({ success: true, message: 'Schedule cancelled.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { searchSchedules, getAllSchedules, createSchedule, deleteSchedule };