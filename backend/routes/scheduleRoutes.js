const express = require('express');
const router = express.Router();
const { searchSchedules, getAllSchedules, createSchedule, deleteSchedule } = require('../controllers/scheduleController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/search', searchSchedules);   // public - for bus search
router.get('/', protect, adminOnly, getAllSchedules);
router.post('/', protect, adminOnly, createSchedule);
router.delete('/:id', protect, adminOnly, deleteSchedule);

module.exports = router;