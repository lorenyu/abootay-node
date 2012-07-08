var _ = require('underscore'),
    ObjectID = require('mongodb').ObjectID;

var Deck = module.exports = function(deck) {
    // whitelist properties
    deck = _.pick(deck,
        '_id',
        'name',
        'cards');
    // set default properties
    deck = _.defaults(deck, {
        _id: new ObjectID(),
        name: '',
        cards: []
    });
    // assign properties to object instance
    _.extend(this, deck);
};