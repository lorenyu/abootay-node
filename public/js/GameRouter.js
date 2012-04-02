(function($) {
	var abootay = this.abootay;

	Backbone.History.prototype.getUrlHandler = function(fragmentOverride){
		var fragment = this.getFragment(fragmentOverride);
		var handler = _.find(this.handlers, function(handler) {
			if (handler.route.test(fragment)) {
				return true;
			}
		});
		return handler;
	};

	var _start = Backbone.History.prototype.start;
	Backbone.History.prototype.start = function(options) {
		this._curlUrl = null;
		var result = _start.apply(this, arguments);
		if (options && options.silent) {
			this._curUrl = this.fragment;
		}
	};

	var _loadUrl = Backbone.History.prototype.loadUrl;
	Backbone.History.prototype.loadUrl = function() {
		if (this._curUrl !== null) {
			Backbone.history.trigger('leaveurl', this, this._curUrl);
		}
		var result = _loadUrl.apply(this, arguments);
		this._curUrl = this.fragment;
		return result;
	};

	var _navigate = Backbone.History.prototype.navigate;
	Backbone.History.prototype.navigate = function() {
		return _navigate.apply(this, arguments);
	};

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
