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
			this.set('timer', new abootay.models.Timer(60*1000)); // set timer to 1 minute
			this.get('timer').on('complete', this._onTimerComplete);

			this.on('change:currentCard', this._onNewCard);
		},
		start: function() {
			this.trigger('game:start');
		},
		startTurn: function() {
			this.set('cardsSeenThisTurn', []);
			this.get('timer').start();

			if (this.get('deck').cards.length <= 0) {
				alert('No cards left');
				return;
			}

			this.trigger('turn:start');
			this.showNextCard();
		},
		endTurn: function() {
			this.trigger('turn:end');
		},
		showNextCard: function() {
			if (this.get('deck').cards.length <= 0) {
				alert('No cards left');
				return;
			}
			var card = this.get('deck').cards.pop();
			this.set('currentCard', card);
		},
		_onTimerComplete: function() {
			this.endTurn();
		},
		_onNewCard: function(model, card) {
			this.get('cardsSeenThisTurn').push(card);
		},
		_render: function(html) {
			$('.game-container').html(html);
		}
	});
	
})(jQuery);
