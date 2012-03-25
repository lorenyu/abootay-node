var db = require('../db'),
	_ = require('underscore');

var DeckService = module.exports = {
	getDeckByName: function(deckName, callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.findOne({ name: deckName }, function(err, deck) {
					if (err) return callback(err);

					if (!deck.cards) {
						deck.cards = [];
					}

					callback(null, deck);
				});
			});
		});
	},
	getDeckById: function(deckId, callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.findOne({ _id: ObjectID.createFromHexString(deckId) }, function(err, deck) {
					if (err) return callback(err);

					if (!deck.cards) {
						deck.cards = [];
					}

					callback(null, deck);
				});
			});
		});
	},
	getDecks: function(callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.find({}, {sort: [['name', 1]]}).toArray(function(err, items) {
					callback(null, items);
				});
			});
		});
	},
	getDeckNames: function(callback) {
		db.open(function(err, db) {
			if (err) return callback(err);

			db.collection('decks', function(err, decks) {
				decks.find({}, {name:1}, {sort: [['name', 1]], limit:100}).toArray(function(err, deckNameObjects) {
					var deckNames = _.pluck(deckNameObjects, 'name');
					callback(null, deckNames);
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
					{ $set: { name: deck.name } },
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
