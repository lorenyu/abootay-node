var express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string');

var app = express.createServer(),
	db = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true }));

app.use(express.bodyParser());
app.use(express.methodOverride());

// need this to enable template inheritance in jade - 2012-03-03
app.set('view options', { layout: false });

app.get('/', function(req, res){
	res.render('index.jade');
});

app.get('/phrases', function(req, res){
	res.render('phrases/index.jade');
});

app.put('/phrases/create', function(req, res){
	console.log(req);
	var phrase = req.body.phrase,
		notes = _.map(req.body.notes.split('\n'), function (note) {
			return _s.trim(note);
		});

	db.open(function(err, db) {
		if (err) {
			console.error(err);
			return;
		}

		db.collection('phrases', function(err, collection) {
			collection.insert({
				phrase: phrase,
				notes: notes
			});
		});
	});

	res.redirect('/phrases', 303);
});

app.listen(8805);
console.log("Server listening on 8805");
