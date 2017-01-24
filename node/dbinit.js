var mongoose = require('mongoose');
var services = require('cfenv').getAppEnv().services;

mongoose.Promise = require('bluebird');


console.log(services);
if (services.mongodb !== undefined) {
	console.log(services.mongodb[0].credentials.url);
	mongoose.connect(services.mongodb[0].credentials.url);
} else {
	console.log('Connecting to localhost mongodb server...');
	mongoose.connect('mongodb://localhost/tasklistdb');
}


// Connection error
mongoose.connection.on('error', function(err) {
    console.error('DB connection error: ' + err);
    process.exit(2);
});

// Connected
mongoose.connection.on('connected', function() {
    console.info('Connected to MongoDB');
});