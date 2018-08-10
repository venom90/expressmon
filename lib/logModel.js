var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    resource: String
});

module.exports = mongoose.model('LogModel', LogSchema);