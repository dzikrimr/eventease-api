const express = require('express');
const router = express.Router();
const uploadRoutes = require('./uploadRoutes');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');

router.get('/', (req, res) => {
  res.send('✅ EventEase API running');
});

router.use('/users', userRoutes);
router.use('/uploads', uploadRoutes);
router.use('/events', eventRoutes);

module.exports = router;
