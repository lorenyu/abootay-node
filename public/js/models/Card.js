(function($) {
	var abootay = this.abootay;

	abootay.namespace('models').Card = Backbone.Model.extend({
		defaults: {
			phrase: '',
			notes: []
		},
		idAttribute: '_id',
		urlRoot: '/api/card'
	});
	
})(jQuery);
