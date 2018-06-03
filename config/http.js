
var jwt = require('jsonwebtoken');
var express = require('express');
module.exports.http = {
  middleware: {
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
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
  },
  /*  serverOptions :{
      ssl:false
    },
  */
};
