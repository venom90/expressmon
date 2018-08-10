var mongoose = require('mongoose');
var LogModel = require('./logModel');
var _ = {
    get: require('lodash/get')
} ;

/**
 * class LogController
 * @private
 */
var LogController = function () {
    this.model = '';
    this.db = '';
}

/**
 * push method
 * @param {*} req <OBJECT>
 * @param {*} res <OBJECT>
 * @param {*} options <OBJECT>
 * @private
 */
LogController.prototype.push = function(req, res, options) {
    // Connect to database
    this.connect(options.db);

    // Log request
    this.save(req);
}

/**
 * connect method
 * @param {*} db
 * @private
 */
LogController.prototype.connect = function(db) {
    mongoose.connect(db, { useNewUrlParser: true });
    this.postConnection.call(this);
}

/**
 * postConnection method
 * @private
 */
LogController.prototype.postConnection = function() {
    this.db = mongoose.connection;

    // On connection error
    this.db.on('error', function(error) {
        console.error('[ERROR] : expressmon > LogController => DB connection error');
        console.log(error);
        process.exit(1);
    });

    // On connection open
    this.db.once('open', function() {
        console.log('\x1b[34m', '[INFO] : expressmon > LogController => DB connection successfull');
    });
}

/**
 * save method
 * @private
 */
LogController.prototype.save = req => {

    var path = _.get(req, 'path', false);

    // Trim path to remove slashes
    path = path.replace(/^\/+|\/+$/g, '');

    // if not path return
    if (!path) return;

    // Initiate log model
    var log = new LogModel({
        resource: path
    });

    // Save log
    log.save().then(doc => {
        console.log(doc);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = LogController;





