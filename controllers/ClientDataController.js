var ClientDataService = require('../services/ClientDataService'),
	_s = require('underscore.string');

var ClientDataController = module.exports = {
	serverClientData: function(req, res) {
		var parts = req.params[0].split('/'),
			modelName = _s.capitalize(_s.camelize(parts[0])),
			method = _s.camelize(parts[1]),
			params = req.query.params || [];
		ClientDataService.getClientData(modelName, method, params, function(err, data){
			if (err) res.json(err);

			res.json(data);
		});
	}
};
