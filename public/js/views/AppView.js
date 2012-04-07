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

			if (Backbone.history.getUrlHandler(href)) {
				abootay.router.navigate(href, {trigger:true});
				event.preventDefault();
			}

		}
	});
	
})(jQuery);
