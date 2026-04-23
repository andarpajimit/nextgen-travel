const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // USERS
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(10) UNIQUE NOT NULL,
        role VARCHAR(20) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ROUTES
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        from_city VARCHAR(100) NOT NULL,
        to_city VARCHAR(100) NOT NULL,
        distance_km INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // BUSES
    await client.query(`
      CREATE TABLE IF NOT EXISTS buses (
        id SERIAL PRIMARY KEY,
        bus_number VARCHAR(20) UNIQUE NOT NULL,
        bus_name VARCHAR(100) NOT NULL,
        bus_type VARCHAR(50) NOT NULL,
        total_seats INTEGER NOT NULL DEFAULT 40,
        amenities TEXT[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // SCHEDULES
    await client.query(`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        route_id INTEGER REFERENCES routes(id) ON DELETE CASCADE,
        bus_id INTEGER REFERENCES buses(id) ON DELETE CASCADE,
        departure_time TIME NOT NULL,
        arrival_time TIME NOT NULL,
        travel_date DATE NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        available_seats INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // BOOKINGS
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        booking_ref VARCHAR(20) UNIQUE NOT NULL,
        user_id INTEGER REFERENCES users(id),
        schedule_id INTEGER REFERENCES schedules(id),
        passenger_name VARCHAR(100) NOT NULL,
        passenger_age INTEGER NOT NULL,
        passenger_gender VARCHAR(10) NOT NULL,
        seat_numbers TEXT[],
        total_amount DECIMAL(10,2) NOT NULL,
        payment_status VARCHAR(20) DEFAULT 'pending',
        booking_status VARCHAR(20) DEFAULT 'confirmed',
        razorpay_order_id VARCHAR(100),
        razorpay_payment_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ✅ Only Admin (keep this)
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    await client.query(`
      INSERT INTO users (name, email, password, role, phone)
      VALUES ('Admin', 'admin@nextgentravel.com', $1, 'admin', '9579033206')
      ON CONFLICT (email) DO NOTHING;
    `, [adminPassword]);

    await client.query('COMMIT');
    console.log('✅ Tables created (Production Ready)');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration error:', err.message);
  } finally {
    client.release();
  }
};

module.exports = createTables;