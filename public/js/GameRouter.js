(function($) {
	var abootay = this.abootay;

	abootay.GameRouter = Backbone.Router.extend({
		routes: {
			'': 				'index', 
			'play': 			'play',
			'play/:deckName': 	'playDeck'
		},
		index: function() {
			$('.game-container').html(abootay.render.game.startMenu({ path: abootay.path }));
		},
		play: function() {
			abootay.data.get.deck.names(function(err, deckNames){
				$('.game-container').html(abootay.render.game.chooseDeck({ deckNames: deckNames, path: abootay.path }));
			});
		},
		playDeck: function(deckName) {
			abootay.data.get.deck(deckName, function(err, deck) {
				var cards = deck.cards;

				if (cards.length == 0) {
					alert('No cards in deck');
					window.history.go(-1);
					return;
				}

				cards = _.shuffle(cards);
				abootay.game = new abootay.models.Game({ cards: cards });
				new abootay.views.GameView({
					el: $('.game-container'),
					model: abootay.game
				});
				
				abootay.game.start();
			});
		}
	});

	abootay.router = new abootay.GameRouter();

	Backbone.history.start({pushState: true, silent: true});
	
})(jQuery);
