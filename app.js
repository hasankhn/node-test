var express = require('express'),
    promise = require('bluebird'),
    request = require('request'),
    syncRequest = require('sync-request'),
    _ = require('underscore'),
    fs = require('fs'),
    extractor = require('unfluff'),
    app = express(),
    port = 3000 || process.env.PORT;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

require('./routes/routes.js')(app, express, _, promise,request,extractor,fs,syncRequest);

app.listen(port, function() {

    console.log('Application running on port ' + port);

});
