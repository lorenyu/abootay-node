var DeckService = require('../services/DeckService'),
	Deck = require('../models/Deck'),
	path = require('../path');

var DeckController = module.exports = {
	paramDeckName: function(req, res, next, deckName) {
		DeckService.getDeckByName(deckName, function(err, deck) {
			if (err) return next(err);

			req.deck = deck;
			next();
		});
	},
	paramDeckId: function(req, res, next, deckId) {
		DeckService.getDeckById(deckId, function(err, deck) {
			if (err) return next(err);

			req.deck = deck;
			next();
		});
	},
	decksJSON: function(req, res) {
		DeckService.getDecks(function(err, decks) {
			if (err) { console.error(err); res.send(err); }

			res.json(decks);
		});
	},
	deckNamesJSON: function(req, res) {
		DeckService.getDeckNames(function(err, deckNames) {
			if (err) { console.error(err); res.send(err); }

			res.json(deckNames);
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
	deckByIdJSON: function(req, res) {
		res.json(req.deck);
	},
	deck: function(req, res) {
		res.render('decks/deck', {
			deck: req.deck
		});
	},
	create: function(req, res) {
		var name = req.body.name,
			deck = new Deck({
				name: name
			});
		DeckService.createDeck(deck, function(err, deck) {
			if (err) return res.send(err);

			res.redirect(path.to.deck(deck), 303);
		});
	}
};
