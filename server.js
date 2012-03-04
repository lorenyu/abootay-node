var express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string');

var app = express.createServer(),
	db = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true }));

// TODO: move to separate file
var Path = {
	toDeck: function(deck_or_deckName) {
		var deckName;
		if (typeof(deck_or_deckName) === 'string') {
			deckName = deck_or_deckName;
		} else {
			deck = deck_or_deckName;
			deckName = deck.name;
		}
		return '/decks/' + escape(deckName);
	}
};

app.use(express.bodyParser());
app.use(express.methodOverride());

// need this to enable template inheritance in jade - 2012-03-03
app.set('view options', { layout: false });

app.get('/', function(req, res){
	res.redirect('/decks', 302);
});

app.get('/phrases', function(req, res){
	res.render('phrases/index.jade');
});

app.get('/decks', function(req, res){
	db.open(function(err, db) {
		if (err) {
			console.error(err);
			return;
		}

		db.collection('decks', function(err, collection) {
			collection.find().toArray(function(err, items) {
				res.render('decks/index.jade', {
					decks: items
				});
			});
		});
	});
});

app.get('/decks/:deckName', function(req, res){
	db.open(function(err, db) {
		if (err) {
			console.error(err);
			return;
		}

		db.collection('decks', function(err, collection) {
			collection.findOne({ name: req.params.deckName }, function(err, deck) {
				if (err) {
					console.error(err);
					return;
				}

				res.render('decks/deck.jade', {
					deck: deck
				})
			});
		});
	});
});

app.put('/decks/create', function(req, res){
	var name = req.body.name;

	db.open(function(err, db) {
		if (err) {
			console.error(err);
			return;
		}

		db.collection('decks', function(err, collection) {
			collection.update(
				{ name: name },
				{ name: name, cards: [] },
				{upsert: true, safe: true},
				function(err, result) {
					if (err) {
						console.err(err);
						return;
					}

					collection.findOne({ name: name }, function(err, deck) {
						if (err) {
							console.err(err);
							return;
						}

						res.redirect('/decks/'+deck.name, 303);
					});
				}
			);
		});
	});
});

app.put('/phrases/create', function(req, res){
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
