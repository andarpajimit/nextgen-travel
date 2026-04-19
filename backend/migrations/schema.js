const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  const client = await pool.connect();
// Start transaction (all or nothing)
  try {
    await client.query('BEGIN'); 

    // ── TABLE 1: users ────────
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

    // ── TABLE 2: routes (Mumbai → Pune etc.) ───────
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        from_city VARCHAR(100) NOT NULL,
        to_city VARCHAR(100) NOT NULL,
        distance_km INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ── TABLE 3: buses ────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS buses (
        id SERIAL PRIMARY KEY,
        bus_number VARCHAR(20) UNIQUE NOT NULL,
        bus_name VARCHAR(100) NOT NULL,
        bus_type VARCHAR(50) NOT NULL,
        total_seats INTEGER NOT NULL DEFAULT 40,
        amenities TEXT[],
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // ── TABLE 4: schedules (which bus, which route, what time) ──
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

    // ── TABLE 5: bookings ─────
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

    // Default admin account ────
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    await client.query(`
      INSERT INTO users (name, email, password, role,phone)
      VALUES ('Admin', 'admin@nextgentravel.com', $1, 'admin','9579033206')
      ON CONFLICT (email) DO NOTHING;
    `, [adminPassword]);

    // Sample routes ────
    await client.query(`
      INSERT INTO routes (from_city, to_city, distance_km) VALUES
        ('Mumbai', 'Pune', 400),
        ('Mumbai', 'Goa', 900),
        ('Mumbai', 'Ahmedabad', 700),
        ('Pune', 'Goa', 600),
        ('Delhi', 'Jaipur', 1200),
        ('Bangalore', 'Chennai', 550)
      ON CONFLICT DO NOTHING;
    `);

    //Sample buses ─────
    await client.query(`
      INSERT INTO buses (bus_number, bus_name, bus_type, total_seats, amenities)
      VALUES
        ('MH48AA0001','NextGen Express','Volvo AC 9600 Sleeper',40,ARRAY['WiFi','USB Charging','AC','Water Bottle','Bus Tracker','CCTV']),
        ('MH48AA0002','NextGen Sleeper','BHARAT BENZ AC Sleeper',36,ARRAY['WiFi','USB Charging','AC','Pillow','Blanket','Bus Tracker','CCTV']),
        ('MH48AA0003','NextGen Comfort','BHARAT BENZ AC Seater',45,ARRAY['WiFi','USB Charging','AC','Pillow','Blanket','Bus Tracker','CCTV']),
        ('MH48AA0004','NextGen Budget','ASHOK LAYLAND AC Sleeper',50,ARRAY['USB Charging'])
      ON CONFLICT DO NOTHING;
    `);

    //Sample schedules for next 7 days ─────
    /*
        // Loop that will run 7 times (i = 0 to i = 6)
        //Create a new Date object representing the current date and time
        //Add i days to the current date (i will range from 0 to 6)
        //Format the date as 'YYYY-MM-DD' string
        
    */
    for (let i = 0; i < 7; i++) {  
        const d = new Date();        
        d.setDate(d.getDate() + i);   
        const dateStr = d.toISOString().split('T')[0]; 
      
        //INSERT INTO schedules
        await client.query(`
          INSERT INTO schedules
            (route_id, bus_id, departure_time, arrival_time, travel_date, price, available_seats)
          VALUES
            (1, 1, '06:00', '09:30', $1, 450.00, 40),
            (1, 2, '10:00', '13:30', $1, 550.00, 36),
            (1, 3, '22:00', '01:30', $1, 350.00, 45),
            (2, 1, '07:00', '19:00', $1, 1200.00, 40),
            (2, 2, '20:00', '08:00', $1, 1400.00, 36),
            (5, 3, '08:00', '13:00', $1, 600.00, 45)
          ON CONFLICT DO NOTHING;
        `, [dateStr]);             
}
// Pass the formatted date (travel_date) for each day as $1


    await client.query('COMMIT'); 
    console.log('✅ Tables created + sample data inserted!');
    console.log('🔑 Admin: admin@nextgentravel.com | Admin@123');

  } catch (err) {
    await client.query('ROLLBACK'); 
    console.error('❌ Migration error:', err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = createTables;