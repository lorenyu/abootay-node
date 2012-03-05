var mongodb = require('mongodb');

var db = module.exports = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true }));