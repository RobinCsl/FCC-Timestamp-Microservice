 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();


//app.configure(function(){
//});

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/:request?')
    .get(function(req, res) {
      if (req.params.request) {
        var d_from_timestamp = new Date(req.params.request*1000);
        var d_from_string =  Date.parse(req.params.request);
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        if (d_from_string) {
          var data = {
            "unix": Math.floor(d_from_string/1000),
            "natural": new Date(d_from_string).toLocaleDateString('en-GB', options),
          };
        }
        else if (d_from_timestamp != "Invalid Date") {
          var data = {
            "unix": Math.floor(Date.parse(d_from_timestamp)/1000),
            "natural": d_from_timestamp.toLocaleDateString('en-GB', options),     
          };
        }
        else {
          var data = {
            "unix": null,
            "natural": null,          
          };
        }
        res.type('json').send(data);
      }
    else
      res.sendFile(process.cwd() + '/views/index.html');
      
        
    });

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

