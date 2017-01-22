var _      = require('lodash');

// Set default node environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Default configuration, extended by *NODE_ENV*.env.js
var all = {
  seedDB              : false,  // Seed database with sample data

  // Node.js Params
  node: {
    env               : process.env.NODE_ENV,
    port              : process.env.PORT || 9000,
    ip                : process.env.IP || '0.0.0.0',
  },

  // Express.js Params
  express: {
    allowed_origins   : ['http://localhost:4200', 
      'https://angular-nightlife.herokuapp.com']
  },
};


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require(`./${env}.env.js`) || {});
  