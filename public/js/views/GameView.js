(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').GameView = Backbone.View.extend({
		_startGameView: null,
		_cardView: null,
		_turnSummaryView: null,
		events: {
			'click .start-game .start': 'startNextTurn',
			'click .turn-summary button': 'startNextTurn',
			'click .card-container button': 'showNextCard'
		},

		initialize: function() {
			this._startGameView = new abootay.views.StartGameView({ model: this.model });
			this._startGameView.make();
			this._cardView = new abootay.views.CardView({ model: this.model });
			this._cardView.make();
			this._turnSummaryView = new abootay.views.TurnSummaryView({ model: this.model });
			this._turnSummaryView.make();

			this.model.on('turn:start', this.startTurn, this);
			this.model.on('turn:end', this.endTurn, this);

			this.$el.html(this._startGameView.render().el);
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
			return this;
		}
	});
	
})(jQuery);
