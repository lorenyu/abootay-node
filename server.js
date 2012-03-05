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
app.use(express.static(__dirname + '/public'));

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
app.get('/json/decks/:deckName/cards', controllers.CardController.cardsJSON)

app.put('/cards/create', controllers.CardController.addCardToDeck);

app.get('/games/:deckName', controllers.GameController.start);

app.listen(8805);
console.log("Server listening on 8805");
