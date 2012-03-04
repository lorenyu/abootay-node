var express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string'),
	controllers = require('./controllers'),
	services = require('./services'),
	path = require('./path');

var app = express.createServer(),
	db = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true }));

app.use(express.bodyParser());
app.use(express.methodOverride());

app.set('view engine', 'jade');
// need this to enable template inheritance in jade - 2012-03-03
app.set('view options', { layout: false });


// helper functions to be used within views
app.helpers({
	path: path
});



app.get('/', function(req, res){
	res.redirect('/decks', 302);
});

app.get('/css/all.css', function(req, res) {
	res.render('css/all.css.jade');
});

app.get('/jade/cards/card.jade', function(req, res) {
	res.sendfile('views/cards/card.jade');
});

app.get('/decks/:deckName', controllers.DeckController.deck);

app.get('/decks', controllers.DeckController.list);
app.param('deckName', controllers.DeckController.paramDeckName);
app.put('/decks/create', controllers.DeckController.create);

app.put('/cards/create', function(req, res){
	var deck_name = req.body.deck_name
		phrase = req.body.phrase,
		notes = _.map(req.body.notes.split('\n'), function (note) {
			return _s.trim(note);
		}),
		card = {
			phrase: phrase,
			notes: notes
		};

	db.open(function(err, db) {
		if (err) { console.error(err); return; }

		db.collection('decks', function(err, decks) {
			decks.update(
				{ name : deck_name },
				{ $push : { cards : card } },
				{ safe: true },
				function(err, numUpdated) {
					if (err) { console.error(err); return; }

					res.redirect(path.to.deck(deck_name));
				}
			);
		});
	});
});

app.get('/games/:deckName', controllers.GameController.start);

app.listen(8805);
console.log("Server listening on 8805");
