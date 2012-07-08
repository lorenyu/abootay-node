var _ = require('underscore');

var ClientDataService = module.exports = {
    getClientData: function(modelName, method, params, callback) {
        if (!modelName.match(/\w+/)) {
            var err = _.template('Invalid model name <%= modelName %>. Model name can only contain alphanumeric characters, including underscore.')({
                modelName: modelName 
            });
            console.err(err);
            return callback(err);
        }
        try {
            var dataServiceClass = modelName + 'Service',
                dataService = require('./' + dataServiceClass);

            params = _.union(params, [callback]);

            if (params.length !== dataService[method].length) {
                var err = _.template('Incorrect number of arguments for function <%= dataServiceClass %>.<%= method %>. '
                                    + 'Expected <%= expected %> but received <%= actual %>.')({
                    dataServiceClass: dataServiceClass,
                    method: method,
                    expected: dataService[method].length - 1,
                    actual: params.length - 1
                });
                return callback(err);
            }

            dataService[method].apply(dataService, params);
        } catch (err) {
            console.error(err);
            return callback(err);
        }
    }
};