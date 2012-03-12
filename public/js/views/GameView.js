(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').GameView = Backbone.View.extend({
		_cardView: null,
		events: {
			'click .turn-summary button': 'startNextTurn',
			'click .card-container button': 'showNextCard'
		},

		initialize: function() {
			this._cardView = new abootay.views.CardView({ model: this.model });
			this._cardView.make();
			this._turnSummaryView = new abootay.views.TurnSummaryView({ model: this.model });
			this._turnSummaryView.make();

			this.model.on('turn:start', this.startTurn, this);
			this.model.on('turn:end', this.endTurn, this);
		},
		startNextTurn: function() {
			this.model.startTurn();
		},
		showNextCard: function() {
			this.model.showNextCard();
		},
		startTurn: function() {
			this.$el.html(this._cardView.el);
		},
		endTurn: function() {
			this.$el.html(this._turnSummaryView.el);
		},
		render: function() {
			this.$el.html(abootay.render.game.showCard({card: this.model.get('currentCard')}));
		}
	});
	
})(jQuery);
