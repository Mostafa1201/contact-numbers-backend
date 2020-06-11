import { Constants} from '../Constants'

/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var
  jwt = require('jsonwebtoken'),
  tokenSecret = Constants.jwtSettings.secret;

// Generates a token from supplied payload
module.exports = {
  issue: function (payload:any,expiresIn:any) {
    return jwt.sign(
      payload,
      tokenSecret, // Token Secret that we sign it with
      expiresIn
    );
  },
  decode: function (token:any) {
    return jwt.decode(token, {complete: true});
  }
};

// Verifies token on a request
module.exports.verify = function (token:any, callback:Function) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret,// Same token we used to sign
    // {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    
    //Pass errors or decoded token to callback
     callback() 
  );
};