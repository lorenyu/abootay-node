(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').AppView = Backbone.View.extend({

		events: {
			'click a': 'navigate'
		},

		initialize: function() {
		},
		navigate: function(event) {
			var href = $(event.target).attr('href');
			abootay.router.navigate(href);
			if (Backbone.history.loadUrl(href)) {
				event.preventDefault();
			}
		}
	});
	
})(jQuery);
