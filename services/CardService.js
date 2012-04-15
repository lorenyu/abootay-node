var fs = require('fs'),
	jade = require('jade'),
	db = require('../db'),
	DeckService = require('../services/DeckService');

var CardService = module.exports = {
	getCardsForDeck: function(deck, callback) {
		var cards = deck.cards;
		if (cards) return callback(null, cards);

		DeckService.getDeckById(deck._id, function(err, deck) {
			callback(null, deck.cards);			
		});
	},
	addCardToDeck: function(card, deck, callback) {
		db.open(function(err, db) {
			if (err) { console.error(err); return; }

			db.collection('decks', function(err, decks) {
				decks.update(
					{ _id : deck._id },
					{ $push : { cards : card } },
					{ safe: true },
					callback
				);
			});
		});
	}
};