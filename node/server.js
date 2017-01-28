var express         = require('express');
var path            = require('path');
var mustache        = require('mustache');
var bodyParser      = require('body-parser');
var engine          = require('consolidate');
require('./dbinit');


var app = express();

// Define mustache to use
app.set('views', __dirname + './../app');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.use(bodyParser.json());


// Controllers
app.use(require('./controllers'));



var port = process.env.VCAP_APP_PORT || 8080;
//var host = process.env.VCAP_APP_HOST || 'localhost';
app.listen(port, function(err) {
    if (err)
        console.error(err);
    else
        console.log('Running server at port ' + port);
});