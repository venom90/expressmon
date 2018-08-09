var mongoose = require('mongoose');
var LogModel = require('./logModel');

/**
 * class LogController
 * @private
 */
var LogController = function () {
    this.model = '';
    this.db = '';
}

/**
 * 
 * @param {*} req <OBJECT>
 * @param {*} res <OBJECT>
 * @param {*} options <OBJECT>
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

LogController.prototype.postConnection = function() {
    this.db = mongoose.connection;

    // On connection error
    this.db.on('error', function(error) {
        console.error('[ERROR] : expressmon > LogController => error');
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
LogController.prototype.save = function(req) {

    var log = new LogModel({
        url: 'test'
    });

    log.save().then(doc => {
        console.log(doc);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = LogController;





