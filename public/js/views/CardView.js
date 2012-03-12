(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').CardView = Backbone.View.extend({
		events: {
			'click button': 'showNextCard'
		},
		initialize: function() {
			this.model.on('change:currentCard', _.bind(this.render, this));
		},
		render: function() {
			this.$el.html(abootay.render.game.showCard({card: this.model.get('currentCard')}));
		},
		showNextCard: function() {
			this.model.showNextCard();
		}
	});
	
})(jQuery);
