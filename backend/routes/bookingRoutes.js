const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getMyBookings, getAllBookings, getStats } = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.get('/my-bookings', protect, getMyBookings);
router.get('/stats', protect, adminOnly, getStats);
router.get('/', protect, adminOnly, getAllBookings);

module.exports = router;