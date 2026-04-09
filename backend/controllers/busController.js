const pool = require('../config/database');

// GET all buses
const getAllBuses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM buses ORDER BY id DESC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST create bus
const createBus = async (req, res) => {
  const { bus_number, bus_name, bus_type, total_seats, amenities } = req.body;
  try {
    if (!bus_number || !bus_name || !total_seats)
      return res.status(400).json({ success: false, message: 'Bus number, name, seats required.' });

    const result = await pool.query(
      'INSERT INTO buses (bus_number,bus_name,bus_type,total_seats,amenities) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [bus_number, bus_name, bus_type || 'AC Seater', total_seats, amenities || []]
    );
    res.status(201).json({ success: true, message: 'Bus added!', data: result.rows[0] });

  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ success: false, message: 'Bus number already exists.' });
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// PUT update bus
const updateBus = async (req, res) => {
  const { bus_name, bus_type, total_seats, amenities } = req.body;
  try {
    const result = await pool.query(
      'UPDATE buses SET bus_name=$1,bus_type=$2,total_seats=$3,amenities=$4 WHERE id=$5 RETURNING *',
      [bus_name, bus_type, total_seats, amenities, req.params.id]
    );
    if (!result.rows.length)
      return res.status(404).json({ success: false, message: 'Bus not found.' });

    res.json({ success: true, message: 'Bus updated!', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE bus
const deleteBus = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM buses WHERE id=$1 RETURNING id', [req.params.id]);
    if (!result.rows.length)
      return res.status(404).json({ success: false, message: 'Bus not found.' });
    res.json({ success: true, message: 'Bus deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getAllBuses, createBus, updateBus, deleteBus };