
var jwt = require('jsonwebtoken');
var express = require('express');
module.exports.http = {
  middleware: {
    // myRequestLogger: function (req, res, next) {
    //   console.log("Requested :: ", req.method, req.url);
    //   next();
    // },
    requireHttps: function(req, res, next) {
      console.log("Hello");
      console.log(req.secure);
      if (!req.secure) {
        console.log(req.get('host'),' ',req.url)
        return res.redirect('https://' + req.get('host') + req.url);
      }
      return next();
    },
    forceSSL: function (req, res, next) {
      // console.log(req);
      // console.log('--------------');
      if (req.isSocket) {
          return res.redirect('wss://' + req.headers.host + req.url);
      } else if (req.headers["x-forwarded-proto"] == "http") {
          return res.redirect('https://' + req.headers.host + req.url);
      } else {
          next(); //it's already secure
      }
    },

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      'authJwtParser',
      'handleBodyParserError',
      'compress',
      'methodOverride',
      'poweredBy',
      'forceSSL',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
  }
  // serverOptions :{
  //   ssl:true
  // },
  
};
