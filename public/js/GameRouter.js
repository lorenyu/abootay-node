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
		playDeck: function() {
			console.log('playDeck');
		}
	});

	abootay.router = new abootay.GameRouter();

	Backbone.history.start({pushState: true, silent: true});
	
})(jQuery);
