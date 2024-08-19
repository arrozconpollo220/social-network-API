// Initiate the router and set up the routes
const router = require('express').Router();
const apiRoutes = require('./api');

// prefix all routes defined in the api folder with /api
router.use('/api', apiRoutes);

// if the route is not defined, return an error message
router.use((req, res) => res.send('Wrong route!'));

// export the router
module.exports = router;