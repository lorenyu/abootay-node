(function($) {
	var abootay = this.abootay;

	abootay.namespace('models').App = Backbone.Model.extend({
		defaults: {
			user: null,
			decks: []
		},
		initialize: function() {
			
		}
	});
	
})(jQuery);
