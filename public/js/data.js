(function() {
    var abootay = this.abootay;

    var data = abootay.data = {
        _cache: {},

        /**
         * get(modelType, method, *params, callback)
         */
        get: function(modelType, method) {
            var params = _.toArray(arguments).slice(2),
                callback = params.pop(),
                url = '/json/' + escape(modelType) + '/' + escape(method),
                data = { params: params },
                key = url + '?' + $.param(data);

            if (abootay.data._cache[key]) {
                var result = abootay.data._cache[key];
                return callback(null, result);
            }

            $.ajax({
                url: url,
                data: data,
                success: function(result) {
                    abootay.data._cache[key] = result;
                    callback(null, result);
                }
            });
        }
    };
    data.get.deckById = function(deckId, callback){
        data.get('deck', 'get-deck-by-id', deckId, callback);
    };
    data.get.decks = function(callback) {
        data.get('deck', 'get-decks', callback);
    }

})();
