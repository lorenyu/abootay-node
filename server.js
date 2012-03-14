var fs = require('fs'),
	express = require('express'),
	mongodb = require('mongodb'),
	_ = require('underscore'),
	_s = require('underscore.string'),
	controllers = require('./controllers'),
	services = require('./services'),
	path = require('./path'),

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

app.get('/decks/:deckName', controllers.DeckController.deck);

app.get('/decks', controllers.DeckController.list);
app.param('deckName', controllers.DeckController.paramDeckName);
app.put('/decks/create', controllers.DeckController.create);
app.get('/json/decks/:deckName/cards', controllers.CardController.cardsJSON);
app.get('/json/decks/names', controllers.DeckController.deckNamesJSON);

app.put('/cards/create', controllers.CardController.addCardToDeck);

app.get('/play', controllers.GameController.play);
app.get('/play/:deckName', controllers.GameController.playDeck);
app.get('/games/:deckName', controllers.GameController.start);

app.listen(8805);
console.log("Server listening on 8805");
