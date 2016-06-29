var express = require('express'),
    app = express(),
    _ = require('underscore'),
    port = 3000 || process.env.PORT;

app.use('/', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

require('./routes/routes.js')(app, express, _);

app.listen(port, function() {

    console.log('Application running on port ' + port);

});
