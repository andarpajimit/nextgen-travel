const pool = require('../config/database');

// GET all routes
const getAllRoutes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM routes ORDER BY from_city');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET unique cities for dropdown
const getCities = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT from_city AS city FROM routes UNION SELECT DISTINCT to_city FROM routes ORDER BY city'
    );
    res.json({ success: true, data: result.rows.map(r => r.city) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST create route
const createRoute = async (req, res) => {
  const { from_city, to_city, distance_km } = req.body;
  try {
    if (!from_city || !to_city)
      return res.status(400).json({ success: false, message: 'From and To city required.' });

    const result = await pool.query(
      'INSERT INTO routes (from_city,to_city,distance_km) VALUES ($1,$2,$3) RETURNING *',
      [from_city, to_city, distance_km]
    );
    res.status(201).json({ success: true, message: 'Route added!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE route
const deleteRoute = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM routes WHERE id=$1 RETURNING id', [req.params.id]);
    if (!result.rows.length)
      return res.status(404).json({ success: false, message: 'Route not found.' });
    res.json({ success: true, message: 'Route deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getAllRoutes, getCities, createRoute, deleteRoute };