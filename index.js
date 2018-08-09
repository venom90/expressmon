
/**
 * Module Dependencies
 * @private
 */

'use strict';

module.exports = {
    monitor: function (options) {
        /**
        * Options
        * db = Standard mongoDB connection URL
        */

        if (typeof options !== 'object') {
            console.log('\x1b[31m', '[ERROR] from NPM module expressmon => Options missing or invalid type!');
            process.exit(1);
        } else {
            if (!options.hasOwnProperty('db') && typeof options.db !== 'string') {
                console.log('\x1b[31m', '[ERROR] from NPM module expressmon => db url missing or invalid type!');
                process.exit(1);
            }
        }
        return function (req, res, next) {
            return require('./lib/monitor')(req, res, next, options);
        }
    }
}