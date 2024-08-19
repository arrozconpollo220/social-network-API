// api routes
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// created routes for user and thought
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;