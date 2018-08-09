var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    url: String
});

module.exports = mongoose.model('LogModel', LogSchema);