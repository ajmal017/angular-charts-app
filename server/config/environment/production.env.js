/* -----------------------------------|
 *|  Environment variables for use 
 *|  during development. Not commited
 *|  to git repository
 */

module.exports = {
  // Sentry.io Access Keys
  raven: {
    key     : process.env.RAVEN_KEY,
    secret  : process.env.RAVEN_SECRED,
    host    : 'sentry.io',
    app_id  : '130915'
  },
  // Express.js Params
  express: {
    session_secret    : process.env.EXPRESS_SESSION_SECRET,
    // Anything not matching this pattern returns 404
    valid_routes      : process.env.EXPRESS_VALID_ROUTES,
    dev_routes        : false,  // Disable /dev routes
  }
};