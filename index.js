// Sever for the social network API
const express = require('express');
// Import the connection to the database
const db = require('./config/connection');
// Import the routes
const routes = require('./routes');

// Set the port
const PORT = 3001;
// Create the express app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Connect to the database and start the server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}...`);
    })
});