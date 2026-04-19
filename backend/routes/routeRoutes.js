const express = require('express');
const router = express.Router();
const { getAllRoutes, getCities, createRoute, deleteRoute } = require('../controllers/routeController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/cities', getCities);         // public - for search dropdowns
router.get('/', protect, adminOnly, getAllRoutes);
router.post('/', protect, adminOnly, createRoute);
router.delete('/:id', protect, adminOnly, deleteRoute);

module.exports = router;