var db = require('../db'),
    ObjectID = require('mongodb').ObjectID,
    _ = require('underscore');

var DeckService = module.exports = {
    getUserById: function(userId, callback) {
        db.open(function(err, db) {
            if (err) return callback(err);

            db.collection('users', function(err, users) {
                users.findOne({ _id: ObjectID.createFromHexString(userId) }, function(err, user) {
                    if (err) return callback(err);

                    callback(null, user);
                });
            });
        });
    },
    createUser: function(user, callback) {
        db.open(function(err, db) {
            if (err) return callback(err);

            db.collection('users', function(err, collection) {
                user._id = new ObjectID();
                collection.insert(user);
                callback(null, user);
            });
        });
    }
};
