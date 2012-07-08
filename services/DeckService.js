var db = require('../db'),
    Deck = require('../models/Deck'),
    ObjectID = require('mongodb').ObjectID,
    _ = require('underscore');

var DeckService = module.exports = {
    getDeckByName: function(deckName, callback) {
        db.open(function(err, db) {
            if (err) return callback(err);

            db.collection('decks', function(err, decks) {
                decks.findOne({ name: deckName }, function(err, deck) {
                    if (err) return callback(err);

                    callback(null, new Deck(deck));
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

                    if (!deck) return callback('No deck with id ' + deckId);

                    callback(null, new Deck(deck));
                });
            });
        });
    },
    getDecks: function(callback) {
        db.open(function(err, db) {
            if (err) return callback(err);

            db.collection('decks', function(err, decks) {
                decks.find({}, {sort: [['name', 1]]}).toArray(function(err, decks) {
                    decks = _.map(decks, function(deck) {
                        return new Deck(deck);
                    });
                    callback(null, decks);
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

            db.collection('decks', function(err, decks) {
                deck.dateCreated = new Date();
                decks.insert(deck,
                    { safe: true },
                    function(err, result) {
                        if (err) return callback(err);

                        decks.findOne({ _id: deck._id }, function(err, deck) {
                            if (err) return callback(err);

                            callback(null, new Deck(deck));
                        });
                    }
                );
            });
        });
    }
};
