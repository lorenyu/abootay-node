var mongodb = require('mongodb');

var _db = new mongodb.Db('abootay', new mongodb.Server('localhost', 27017, { autoreconnect: true })),
	_conn = null;

module.exports = {
	open: function(callback) {
		if (_conn) {
			return callback(null, _conn);
		}

		_db.open(function(err, conn) {
			if (err) return;
			_conn = conn;
			return callback(null, _conn);
		});
	}
}