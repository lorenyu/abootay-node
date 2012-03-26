var CardService = require('../services/CardService'),
	path = require('../path'),
	_ = require('underscore'),
	_s = require('underscore.string');

var CardController = module.exports = {
	cardsJSON: function(req, res) {
		CardService.getCardsForDeck(req.deck, function(err, cards) {
			res.json(cards);
		});
	},
	addCardToDeck: function(req, res) {
		var deckName = req.deck.name;
		phrase = req.param('phrase'),
		card = {
			phrase: phrase
		};

		CardService.addCardToDeck(card, deckName, function(err, numUpdated) {
			res.redirect(path.to.deck(deckName));
		});
	}
};
