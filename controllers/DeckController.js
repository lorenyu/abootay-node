var DeckService = require('../services/DeckService'),
	path = require('../path');

var DeckController = module.exports = {
	paramDeckName: function(req, res, next, deckName) {
		DeckService.getDeckByName(deckName, function(err, deck) {
			if (err) return next(err);

			req.deck = deck;
			next();
		});
	},
	list: function(req, res) {
		DeckService.getDecks(function(err, decks) {
			if (err) { console.error(err); res.send(err); }

			res.render('decks/index', {
				decks: decks
			});
		});
	},
	deck: function(req, res) {
		res.render('decks/deck', {
			deck: req.deck
		});
	},
	create: function(req, res) {
		var name = req.body.name,
			deck = {
				name: name,
				cards: []
			};
		DeckService.createDeck(deck, function(err, deck) {
			if (err) return res.send(err);

			res.redirect(path.to.deck(deck), 303);
		});
	}
};
