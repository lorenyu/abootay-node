var UserService = require('../services/UserService'),
	path = require('../path');

var UserController = module.exports = {
	paramUserId: function(req, res, next, userId) {
		UserService.getUserById(userId, function(err, user) {
			if (err) return next(err);

			req.user = user;
			next();
		});
	},
	user: function(req, res) {
		console.log(req.user);
		res.json(req.user);
	},
	create: function(req, res) {
		var user = {};
		UserService.createUser(user, function(err, user) {
			if (err) return res.send(err);

			res.json(user);
		});
	}
};
