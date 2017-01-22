/* -----------------------------------|
 *|  Router  ::  API/Proxy
 *|
 *|  Handles any routes delivered to /api/proxy/...
 */


var express     = require('express');
var request     = require('request');
var debug       = require('debug')('router:api:proxy');
var router      = express.Router();


router.get('/*', function(req, res) {
  var url = 'http://query.yahooapis.com/v1/public/yql?q=' + require('url').parse(req.originalUrl).query;
  req.pipe(request(url)).pipe(res);
});

debug('Routes initialized successfully');
module.exports = router;