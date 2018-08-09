var express = require('express');
var app = express();
var expressmon = require('../expressmon/index');

app.use(expressmon.monitor({db: 'dbURL'}));

app.get('/home', function(req, res) {
    res.end('Home page');
});

app.listen(4001, function() {
    console.log('Express mon tester running on 4001');
});