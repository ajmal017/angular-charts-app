/* -----------------------------------|
 *|  Router  ::  Root
 */
var express     = require('express')
var path        = require('path');
var env         = require('../config/environment');
var debug       = require('debug')('router:root');
var router      = express.Router()

/**
 * Restrict access to pre-defined origins
 */
router.use(function(req, res, next) {
  var origin = req.headers.origin;
  if (env.express.allowed_origins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * "use" should be before any other route definitions
 */
// Import all other route modules
router.use('/api',      require('./api'));

// Landing page
router.get('/', function(req, res, next) {
  debug('API root accessed. JSON response.');
  res.json({"apiRoot": true});
});

// Landing page
router.get('/as', function(req, res, next) {
  debug('Route /as accessed. Serving Angular site');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

/**
 * Anything else under '/', facilitates Angular HTML 5 routing. Must
 * declare below all other routes to avoid catching their requests
 */
router.get('*', function(req, res, next) {
  debug('Catch-All route accessed. Serving index');
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  //res.render('index');
});

debug('Routes initialized successfully');
module.exports = router;
