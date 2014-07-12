var fs = require("fs"),                 //Requires fs module to read key, cert files
    express = require('express'),       // call express
    app = express(), 				    // define our app using express
    http = require("http"),             //Get the http module
    https = require('https');           //Get the https_domo module


var privateKey = fs.readFileSync("key.pem", 'utf8');        //load openssl generated privateKey
var certificate = fs.readFileSync('key-cert.pem', 'utf8');  //load openssl generated certificate
var credentials = {key: privateKey, cert: certificate};     //create credentials object to create ssl
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/
router.get('/', function (req, res) {
    res.end("<div><h1>Hello</h1></div>")

});
app.use('/', router);
//Create http and https_domo server using app settings
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//http server listen all request of 8080 port
httpServer.listen(8080, function () {
    "use strict";
    console.log('Magic happens on port ' + 8080);
});
//http server listen all request of 8080 port
httpsServer.listen(8089, function () {
    "use strict";
    console.log('Magic SSL happens on port ' + 8089);
});