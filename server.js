var fs = require('fs'),
	express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string'),
	controllers = require('./controllers'),
	services = require('./services'),
	path = require('./path'),
	config = require('./config/config'),
	jade = require('jade');

var app = express.createServer(),
	db = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true }));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/test/browser'));

app.set('view engine', 'jade');
// need this to enable template inheritance in jade - 2012-03-03
app.set('view options', { layout: false });


// helper functions to be used within views
app.helpers({
	path: path
});



app.get('/', function(req, res){
	res.render('index');
});

app.get('/test/browser', function(req, res) {
	res.render('test/browser/index');
});

app.get('/js/renderers/*.js', controllers.RendererController.clientRenderer);
app.get('/js/path.js', function(req,res){
	res.sendfile('path.js');
});

app.get('/decks/:deckId', controllers.DeckController.deck);

app.get('/decks', controllers.DeckController.list);
app.param('deckName', controllers.DeckController.paramDeckName);
app.param('deckId', controllers.DeckController.paramDeckId);
app.param('userId', controllers.UserController.paramUserId);
app.put('/decks/create', controllers.DeckController.create);
app.get('/json/decks/:deckId/cards', controllers.CardController.cardsJSON);
app.get('/json/decks', controllers.DeckController.decksJSON);
app.get('/json/decks/names', controllers.DeckController.deckNamesJSON);
app.post('/api/user', controllers.UserController.create);
app.get('/api/user/:userId', controllers.UserController.user);
app.post('/api/deck', controllers.DeckController.create);
app.get('/api/deck/:deckId', controllers.DeckController.deckByIdJSON);
app.post('/api/deck/:deckId/card', controllers.CardController.addCardToDeck);
app.get('/json/*', controllers.ClientDataController.serveClientData);

app.put('/cards/create', controllers.CardController.addCardToDeck);

app.get('/play', controllers.GameController.play);
app.get('/play/:deckId', controllers.GameController.playDeck);
app.get('/games/:deckId', controllers.GameController.start);

app.listen(8805);
console.log("Server listening on 8805");
