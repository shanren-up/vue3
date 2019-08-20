var path = require('path');
var express = require('express');
var config = require('./webpack.config');

var app = new express();
var port = 3001;

app.use(express.static(__dirname + '/'));
app.get('*', function response(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    // res.header('','');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.sendFile(path.join(__dirname, '/'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) console.log(err);
    console.info('===> Listening on port %s. Open up http://0.0.0.0:%s/ in your broswer.', port, port);
});
