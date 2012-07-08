(function() {
    var abootay = this.abootay;

    var User = abootay.namespace('models').User = Backbone.Model.extend({
        defaults: {
        },
        idAttribute: '_id',
        urlRoot: abootay.path.to.api.userRoot(),
        save: function(attributes, options) {
            options = options ? _.clone(options) : {};
            var success = options.success;
            options.success = function(model, response) {
                $.jStorage.set('abootay:user', model.toJSON());
                if (success) {
                    success(model, response);
                }
            };
            Backbone.Model.prototype.save.call(this, attributes, options);
        }
    });

    User.loadUser = function() {
        var userData = $.jStorage.get('abootay:user');
        if (!userData) {
            return null;
        }
        return new User(userData);
    };

    User.loadOrCreateUser = function() {
        var user = User.loadUser();
        if (!user) {
            user = new User();
            user.save();
        }
        return user;
    };
    
})();
