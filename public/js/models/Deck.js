(function($) {
	var abootay = this.abootay;

	abootay.namespace('models').Deck = Backbone.Model.extend({
		defaults: {
			name: '',
			cards: []
		},
		idAttribute: '_id',
		urlRoot: '/api/deck'
	});
	
})(jQuery);
