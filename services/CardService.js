var fs = require('fs'),
	jade = require('jade'),
	db = require('../db'),
	DeckService = require('../services/DeckService');

var CardService = module.exports = {
	getCardsForDeck: function(deck_or_deckName, callback) {
		var cards = deck_or_deckName.cards;
		if (cards) return callback(null, cards);

		DeckService.getDeckByName(deck_or_deckName, function(err, deck) {
			callback(null, deck.cards);			
		});
	},
	addCardToDeck: function(card, deck_or_deckName, callback) {
		var deckName = deck_or_deckName.name || deck_or_deckName;

		db.open(function(err, db) {
			if (err) { console.error(err); return; }

			db.collection('decks', function(err, decks) {
				decks.update(
					{ name : deckName },
					{ $push : { cards : card } },
					{ safe: true },
					callback
				);
			});
		});
	},
	getClientRenderer: function(callback) {
		fs.readFile('views/cards/card.jade', function (err, jadeStr) {
			if (err) return callback(err);

			var render = jade.compile(jadeStr, { client: true});
			render = 'abootay.namespace("render").card = ' + render.toString();
			callback(null, render);
		});
	}
};