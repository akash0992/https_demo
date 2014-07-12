https_demo
==========

A simple HTTPS server using node.js:
------------------------------------
Using ExpressJS and openssl, you can easily provide SSL support to your Api. For that you have to follow below given steps.

Steps to create a https server.

    Generate an SSL certificate with that key
    Create a app.js file
    Install express module
    Run to Test your app. :-)

###Generate an SSL certificate with that key:

For development purposes you can create a self-certified certificate.

First, generate a private key on linux-based system. It will store a 1024 bit RSA key in the file key.pem

openssl genrsa 1024 > key.pem
Then, generate an SSL certificate with that key:
openssl req -x509 -new -key key.pem > key-cert.pem

###Create a app.js file
    
``` javascript
var fs = require("fs"),                 //Requires fs module to read key, cert files
    express = require('express'),       // call express
    app = express(),                     // define our app using express
    http = require("http"),             //Get the http module
    https = require('https');           //Get the https module
var privateKey = fs.readFileSync("key.pem", 'utf8');        //load openssl generated privateKey
var certificate = fs.readFileSync('key-cert.pem', 'utf8');  //load openssl generated certificate
var credentials = {key: privateKey, cert: certificate};     //create credentials object to create ssl
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();                 // get an instance of the express Router
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
//Create http and https server using app settings
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
``` 
###Install express module

I have use express module to show this demonstration. You can download express module either using npm install express --save command or you can first define dependencies in package.json and run npm install command to download express module.


Create package.json along with app.js
``` json
{
    "name": "http-demo",
    "main": "app.js",
    "dependencies": {
        "express": "~4.0.0"
    }
}
``` 
    Open terminal and type 
``` bash
$npm install
``` 
###Run to Test your app. :-)

Now run your app.js using command 
``` bash
$node app.js
```
You can see output like on your terminal

/opt/node-v0.10.28-linux-x64/bin/node app.js
Magic happens on port 8080
Magic SSL happens on port 8089

To test app, open your browser and type https://localhost:8089/


