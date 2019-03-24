/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

  sampleSocket: (req, res) => {
    console.log("sampleSocket said something");
    res.send('ok tried')
  },

  sample: (req, res) => {
    console.log("sample said something");
    console.log(req.body);
    res.send('ok tried')
  },

  signUp: function (req, res) {
    console.log("POST /signup");
    console.log(req.body);
    // console.log(req.headers);
    // email, password , name
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('pw') && req.body.hasOwnProperty('name')) {
      var obj = {};
      obj.email = req.body.email;
      obj.password = req.body.pw;
      obj.name = req.body.name;
      obj.type = 'fraud';
      var typeString = req.body.type;
      switch (typeString) {
        case 'Organization':
          {
            obj.type = 3;
            break;
          }
        case 'Brāv One':
          {
            obj.type = 2;
            obj.profile = {
              proMediatorStatusRequested: false,
              approved: false
            }
            break;
          }
        case 'Individual':
          {
            obj.type = 4;
            obj.guest = req.body.guest;
            break;
          }
        case 'Professional Mediator':
          {
            obj.type = 2;
            obj.profile = {
              proMediatorStatusRequested: true,
              proMediatorStatusApproved: false,
              approved: false
            }
            break;
          }
      }
      if (obj.type == 'fraud') {
        res.json({
          ok: false,
          message: 'user type not valid'
        })
        return;
      }

      obj.agree = req.body.agree;
      obj.verified = false;
      userService.adduser(obj, function (anyError, reason) {
        if (!anyError) {
          res.json({
            ok: true,
            message: 'sent otp'
          });
        } else {
          res.json({
            ok: false,
            message: 'Cannot Register this email.',
            reason: reason
          })
        }
      });
    } else {
      res.status(400);
      res.json({
        ok: false,
        message: 'missing params'
      })
    }
  },

  signIn: function (req, res) {
    console.log("POST /signin");

    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('pw')) {
      var obj = {
        email: req.body.email,
        password: req.body.pw
      };
      userService.signIn(obj, function (err, token, type, id) {
        if (!err) {
          req.session.userId = id;
          req.session.loggedin = true;
          res.json({
            ok: true,
            token: token,
            email: obj.email,
            type: type,
            message: 'success'
          });
        } else {
          res.json({
            ok: false,
            message: 'no match for these credentials'
          })
        }
      });
    } else {
      res.status(400);
      res.json({
        ok: false,
        message: 'missing params'
      })
    }
  },

  verifyOTP: function (req, res) {
    console.log("POST /verify");
    //email, otp
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('otp')) {
      var obj = {
        email: req.body.email,
        otp: req.body.otp
      };
      userService.verifyOtp(obj, function (err) {
        if (!err) {
          res.json({
            ok: true,
            message: 'verified OTP'
          });
        } else {
          res.json({
            ok: false,
            message: 'verification failed'
          })
        }
      });
    } else {
      res.status(400);
      res.json({
        ok: false,
        message: 'missing params'
      })
    }
  },

  signOut: function (req, res) {
    console.log("logout request came");
    req.session.userId = '';
    req.session.loggedin = false;
    res.json({
      ok: true,
      message: 'bye bye'
    });
    // Pre Expire the JWT here : need lookup
  },

  forgotPassword: (req, res) => {
    console.log("POST /forgot password");
    console.log(req.body);
    if (req.body.email && req.body.pw) {
      var obj = {};
      obj.email = req.body.email;
      obj.password = req.body.pw;
      obj.verified = false;
      userService.forgotPassword(obj, okObj => {
        res.json(okObj);
      });
    } else {
      res.status(400);
      res.json({
        ok: false,
        message: 'missing params'
      })
    }
  },

  verifyAfterPasswordRecovery: (req, res) => {
    console.log("POST /verify forgot password");
    console.log(req.body);
    if (req.body.email && req.body.otp) {
      userService.verifyAfterPasswordRecovery(req.body.email, req.body.otp, okObj => {
        res.json(okObj);
      });
    } else {
      res.status(400);
      res.json({
        ok: false,
        message: 'missing params'
      })
    }
  }

};
