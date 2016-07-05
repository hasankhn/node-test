module.exports = function(app, express, _, promise, request, extractor, fs, sync) {

    router = express.Router();
    var template = [];

    function getUri(query, callback) {
        var i = 0;
        var body = '';
        //iterating through query paramater
        while (i < query.length) {
            body = (sync('GET', "http://" + query[i]));
            template.push(body.getBody().toString());
            i++;
        }
        //passing data to callback 
        callback(template);
        template = [];
    }
    router.get('/I/want/title', function(req, res) {
        if (_.isEmpty(req.query)) {
            res.status(404).send('Please specify your query');
        }
        var query = req.query.address;
        if (typeof query === 'string') {
            query = [query]
        }
        //passing query to a callback function
        getUri(query, function(data) {
            var title = [];
            var myData = '';
            // iterating through data coming from callback
            data.forEach(function(item) {
            //extracting title using unfluff library
                myData = extractor(item);
                //pushing title into array
                title.push(myData.title);
            });
            //rendering it on html 
            res.render('index', { name: 'CareMerge Test', query: query, data: title });
            //emptying title array for next call
            title = [];
        });

    });
    app.use('/', router);
}
