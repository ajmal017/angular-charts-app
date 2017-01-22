#!/usr/bin/env node

/* -----------------------------------|
 *|  Initialize Environment
 */
var env         = require('./config/environment');

if (env.node.env === 'development' || env.node.env === 'test') {
  process.env.DEBUG = 'app:*,api:*,passport:*,express:main,router:*';
}

/**
 * Load App Modules
 */
var app         = require('./config/express');
