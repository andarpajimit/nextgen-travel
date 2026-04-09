const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// protect = only logged-in users can access
const protect = async (req, res, next) => {
  try {
    // Check if token exists in request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Please login first.' });
    }

    // Verify the token is real and not expired
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'User not found.' });
    }

    req.user = result.rows[0]; // attach user to request
    next(); // go to the actual route handler

  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// adminOnly = only admin role can access
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admins only.' });
  }
  next();
};

module.exports = { protect, adminOnly };