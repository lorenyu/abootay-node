(function($) {
	var abootay = this.abootay;

	abootay.namespace('models').Game = Backbone.Model.extend({

		defaults: {
			deck: null,
			currentCard: null, // current card being shown
			timer: null,
			cardsSeenThisTurn: [],
		},

		initialize: function(deck) {
			_.bindAll(this); // bind all methods to this object so we don't need to call bind everywhere

			this.set('deck', deck);
			this.get('deck').cards = _.shuffle(this.get('deck').cards);
			this.set('timer', new abootay.models.Timer(5*1000)); // set timer to 1 minute
			this.get('timer').on('complete', this._onTimerComplete);
		},
		startTurn: function() {
			this.get('timer').start();
			this.showNextCard();
		},
		endTurn: function() {
			this.showTurnSummary();
		},
		showNextCard: function() {
			if (this.get('deck').cards.length <= 0) {
				alert('No cards left');
				return;
			}
			this.set('currentCard', this.get('deck').cards.pop());
		},
		showTurnSummary: function() {
			this._render(abootay.render.game.turnSummary());
		},
		_onTimerComplete: function() {
			this.endTurn();
		},
		_render: function(html) {
			$('.game-container').html(html);
		}
	});
	
})(jQuery);
