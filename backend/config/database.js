// database.js - production setup

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        // ✅ Supabase / Render — use connection string
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        // ✅ Local development
        host:     process.env.DB_HOST     || 'localhost',
        port:     process.env.DB_PORT     || 5432,
        database: process.env.DB_NAME     || 'nextgen_travel',
        user:     process.env.DB_USER     || 'postgres',
        password: process.env.DB_PASSWORD || '0264',
        ssl:      false,
      }
);

pool.on('connect', () => console.log('✅ Connected to Supabase PostgreSQL!'));
pool.on('error',   (err) => console.error('❌ DB Error:', err.message));

module.exports = pool;