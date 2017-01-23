var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');


mongoose.connect('mongodb://localhost/tasklistdb');


// Connection error
mongoose.connection.on('error', function(err) {
    console.error('DB connection error: ' + err);
    process.exit(2);
});

// Connected
mongoose.connection.on('connected', function() {
    console.info('Connected to MongoDB');
});