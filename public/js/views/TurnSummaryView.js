(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').TurnSummaryView = Backbone.View.extend({
		className: 'turn-summary',
		initialize: function() {
			this.model.on('turn:end', this.render, this);
		},
		render: function() {
			this.$el.html(abootay.render.game.turnSummary({ cardsSeenThisTurn: this.model.get('cardsSeenThisTurn')}));
		}
	});
	
})(jQuery);
