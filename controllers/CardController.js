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
		var deck = req.deck,
			phrase = req.param('phrase'),
			card = {
				phrase: phrase
			};

		CardService.addCardToDeck(card, deck, function(err, numUpdated) {
			res.redirect(path.to.deck(deck));
		});
	}
};
