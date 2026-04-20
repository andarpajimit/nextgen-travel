// database.js - production setup

const { Pool } = require('pg');

// Ensure env is present (fail fast)
if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL is not defined');
}

// Create pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Supabase
  },
});

// Handle unexpected errors (important in production)
pool.on('error', (err) => {
  console.error('❌ Unexpected DB error:', err.message);
  process.exit(1);
});

module.exports = pool;