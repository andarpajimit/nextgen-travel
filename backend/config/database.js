// connect app to supabase database

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
    //🔴 REQUIRED for Supabase
  ssl: {
    rejectUnauthorized: false,
  },
   //  FORCE IPv4 (FIX)
  family: 4,
});

// ✅ safer test
pool.query('SELECT 1')
  .then(() => console.log('✅ Connected to Supabase PostgreSQL!'))
  .catch(err => console.error('❌ DB Connection Error:', err.message));

module.exports = pool;