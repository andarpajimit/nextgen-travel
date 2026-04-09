require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createTables = require('./migrations/schema');

const app = express();

// Allow frontend to talk to backend
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Connect all routes
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/buses',     require('./routes/busRoutes'));
app.use('/api/routes',    require('./routes/routeRoutes'));
app.use('/api/schedules', require('./routes/scheduleRoutes'));
app.use('/api/bookings',  require('./routes/bookingRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running!' });
});

const PORT = process.env.PORT || 5000;

// Create DB tables first, then start server
const start = async () => {
  await createTables();
  app.listen(PORT, () => {
    console.log(`🚌 Server running on http://localhost:${PORT}`);
  });
};

start();