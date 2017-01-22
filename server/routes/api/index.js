/* -----------------------------------|
 *|  Router  ::  API
 *|
 *|  Handles any routes delivered to /auth/...
 */
var express     = require('express')
var debug       = require('debug')('router:api');
var router      = express.Router()

// Import all other route modules
router.use('/proxy', require('./proxy'));

module.exports = router;