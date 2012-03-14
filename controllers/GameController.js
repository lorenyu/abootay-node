var DeckService = require('../services/DeckService');

var GameController = module.exports = {
	start: function(req, res) {
		res.render('game/card-holder', {
			deck: req.deck
		});
	},
	play: function(req, res) {
		DeckService.getDeckNames(function(err, deckNames) {
			if (err) { console.error(err); res.send(err); }

			res.render('game/play', {
				deckNames: deckNames
			});
		});
	},
	playDeck: function(req, res) {
		res.render('game/play-deck', { deck: req.deck });
	}
};
