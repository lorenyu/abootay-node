var db = require('../db');

var DeckService = module.exports = {
	getDeckByName: function(deckName, callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.findOne({ name: deckName }, function(err, deck) {
					if (err) return callback(err);

					callback(null, deck);
				});
			});
		});
	},
	getDecks: function(callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.find().toArray(function(err, items) {
					callback(null, items);
				});
			});
		});
	},
	createDeck: function(deck, callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, collection) {
				collection.update(
					{ name: deck.name },
					deck,
					{ upsert: true, safe: true },
					function(err, result) {
						if (err) return callback(err);

						collection.findOne({ name: deck.name }, function(err, deck) {
							if (err) return callback(err);

							callback(null, deck);
						});
					}
				);
			});
		});
	}
};
