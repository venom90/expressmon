/**
 * @description module to monitor an express.js based application
 * @param {*} options 
 * @private
 */

'use strict';

var mongoose = require('mongoose');
var LogModel = require('./logModel');
var LogController = require('./logController');

module.exports = function (req, res, next, options) {

    // Log Controller
    var Log = new LogController(req, res, options);
    Log.push(req, res, options);

    // Forward request
    next();
}