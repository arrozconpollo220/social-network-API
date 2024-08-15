// Initiate connection to MongoDB database
const { connect, connection } = require('mongoose');

// Connect to the socialNetwork database
connect('mongodb://127.0.0.1:27017/socialNetwork'); 

// Export the connection
module.exports = connection;