/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  flags:{
    ADMIN:1,
    MEDIATOR:2,
    ORG:3,
    INDIVIDUAL: 4,   
    MEDIATOR_ORG:22
    
  },

  attributes: {
    email : {
      type:'string',
      unique: true
    },
    tz:'string',
    name : 'string',
    password : 'string',
    agree:'boolean',
    type:'integer',
    profile : 'json', 
    //added from br
    online : {
      type: 'BOOLEAN',
      default: false
    }
  },
  
  innerObjects:{ // just for writing Its never used
    stripeConnection:{
      
    },
    profile_2: // for mediator
      {
        approved:'boolean',
        proMediatorStatusRequested :'boolean',
        proMediatorStatusApproved :'boolean',
        description:'string',
        experience:'string',
        rate:'integer',
        hasInternationalInsurance:'boolean',
        autoAccept:'boolean',
        specialities:[
          'string'
        ],
      }
  }

};

