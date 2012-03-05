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
		var deck_name = req.body.deck_name
		phrase = req.body.phrase,
		notes = _.map(req.body.notes.split('\n'), function (note) {
			return _s.trim(note);
		}),
		card = {
			phrase: phrase,
			notes: notes
		};

		CardService.addCardToDeck(card, deck_name, function(err, numUpdated) {
			res.redirect(path.to.deck(deck_name));
		});
	}
};
