var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://' + sails.config.constants.emailId + ':' + sails.config.constants.emailPw + '@smtp.gmail.com');

module.exports = {

  sendAgreementSigningRequest: (mailId, agreementName, invitedBy, callback) => {
    var mailOptions = {
      from: 'info@brav.org', // sender address
      to: mailId, // list of receivers
      subject: 'Brāv Agreements Invitation', // Subject line
      text: 'Greetings, \n\n You have been invited to sign an Agreement Session on Brāv platform (https://one.brav.org) \n' +
        'You will be able to view the agreement and sign it once you log into one.brav.org  (Remember to log in using this email id)' +
        'If you dont have an account on one.brav.org, please do register on https://one.brav.org/#/reg .(Remember to register using This email Id as Individual)' +
        'the Details of the agreement are given below : \n\n' +
        'Agreement :' + agreementName +
        'Invited By: ' + invitedBy +
        '\n\n\n- From :\n One Brāv Organization (http://one.brav.org)', // plaintext body
    };

    if (sails.config.constants.emailEnable) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error in sending email: ', error);
          callback(false);
          return;
        }
        else {
          callback(true);
          console.log('Email sent to ' + mailId);
          console.log('Message sent: ' + info.response);
        }
      });
    } else {
      callback(true);
      console.log('Email senD Disabled but its sent to : ' + mailId);
    }
  },

  sendSessionEmailToUser: function (mailId, sessionDetails, org, callback) {
    var mailOptions = {
      from: 'Brāv.org', // sender address
      to: mailId, // list of receivers
      subject: ' Session Invitation', // Subject line
      text: 'Hello , \n\n You have been invited to have a Mediation Session on Brāv platform (https://one.brav.org) \n' +
        'You will be able to join the session once you log into one.brav.org  (Remember to log in using this email id)' +
        'If you dont have an account on one.brav.org, please do register on https://one.brav.org/#/reg .(Remember to register using This email Id as an INDIVIDUAL )' +
        'the Details of the session are given below : \n\n' +
        'Sessison :' + sessionDetails +
        'Invited By: ' + org +
        '\n\n\n- From :\n One Brāv Organization (http://one.brav.org)', // plaintext body
    };
    if (sails.config.constants.emailEnable) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          callback(false);
          return console.log(error);
        }
        else {
          callback(true);
          console.log('Email sent to ' + mailId);
          console.log('Message sent: ' + info.response);
        }
      });
    } else {
      callback(true);
      console.log('Email senD Disabled but its sent to : ' + mailId);
    }
  },

  sendOtp: (mailid, otp, next) => {
    var mailOptions = {
      from: 'Brāv - Signup', // sender address
      to: mailid, // list of receivers
      subject: 'Brāv OTP', // Subject line
      text: 'Hello there , \n\n your OTP (activation code) for BRAV sign up is ' + otp + ' . \n\n Thanks for choosing Brāv(Beta). please use above OTP to sign in', // plaintext body
    };

    // send mail with defined transport object
    if (sails.config.constants.emailEnable) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          next(false);
          return console.log(error);
        }
        else {
          next(true);
          console.log('OTP sent ' + otp);
          console.log('Message sent: ' + info.response);
        }
      });
    } else {
      next(true);
      console.log('OTP Not sen DIsabled but its ' + otp);
    }
  },

  sendOtpForForgotPassword: (mailid, otp, next) => {
    if (sails.config.constants.emailEnable) {

      var mailOptions = {
        from: 'Brāv OTP', // sender address
        to: mailid, // list of receivers
        subject: 'Brāv OTP', // Subject line
        text: 'Hello, It Seems like you forgot your password, \n\n Your OTP (re-activation code) for BRAV sign up is ' + otp + '\n\n Thanks for choosing brav.org. Please email us at "info@brav.org" for any questions.' // plaintext body
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          next(false);
          return console.log(error);
        }
        else {
          next(true);
          console.log('OTP sent ' + otp);
          console.log('Message sent: ' + info.response);
        }
      });
    } else {
      next(true);
      console.log('OTP DIsabled but its sendOtpForForgotPassword ' + otp);
    }
    return;
  },

  sendWelcomeEmailToUser: function (mailid, userData, next) {
    if (sails.config.constants.emailEnable) {

      /* Define welcome message specific to type of user */
      welcomeMessage = "";
      switch (userData.type) {
        case 2: if (userData.profile.proMediatorStatusRequested) {
          welcomeMessage = "We are very excited to welcome you as a Professional Mediator to the Brāv platform!";
        } else {
          welcomeMessage = "We are very excited to welcome you as a Brāv One to the Brāv platform!";
        }
          break;
        case 3: welcomeMessage = "We are very excited to welcome your Organization to the Brāv platform!"
          break;
        case 4: welcomeMessage = "We are very excited to welcome you to the Brāv platform!"
          break;
        default: /* Do not send any email for super admin user type */
          next(true);
          return;
      }
      /* HTML Message template */
      message = '<!doctype html>' +
        '<html>' +
        '  <head>' +
        '    <meta name="viewport" content="width=device-width">' +
        '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
        '    <title>Welcome To Brāv</title>' +
        '  </head>' +
        '  <body>' +
        '    <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 15px;">' +
        '      <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #598fbe; border-radius: 3px;">' +
        '        <tr>' +
        '          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-left:15px">' +
        '            <h1 style="color:white; text-align: center">Welcome To Brāv!</h1>' +
        '            <p style="color:white">Hi ' + userData.name + ',</p>' +
        '            <p style="color:white">' + welcomeMessage + '</p>' +
        '          </td>' +
        '        </tr>' +
        '      </table>' +
        '    </div>' +
        '  </body>' +
        '</html>';

      var mailOptions = {
        from: 'Welcome To Brāv!', // sender address
        to: mailid, // list of receivers
        subject: 'Brāv OTP', // Subject line
        html: message
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          next(false);
          return console.log(error);
        }
        else {
          next(true);
          console.log('Message sent: ' + info.response);
        }
      });
    } else {
      next(true);
      console.log('Email is disabled but welcoming user ' + userData.name);
    }
    return;
  },

};
