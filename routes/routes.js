module.exports = function(app, express, _) {
    router = express.Router();
    router.get('/I/want/title', function(req, res) {
        console.log(req.query);
        if (_.isEmpty(req.query)) {
            res.status(404).send('Please specify your query');
        }
        var query = req.query.address;
        if (typeof query == 'string') {
            query = [query]
        }
        console.log(query);
        res.render('index', { name: 'CareMerge Test', query: query });
    });
    app.use('/', router);
}
