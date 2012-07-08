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
            '':                 'index', 
            'play':             'play',
            'play/:deckId':     'playDeck'
        },
        index: function() {
            $('.game-container').html(abootay.render.game.startMenu({ path: abootay.path }));
        },
        play: function() {
            abootay.data.get.decks(function(err, decks){
                $('.game-container').html(abootay.render.game.chooseDeck({ decks: decks, path: abootay.path }));
            });
        },
        playDeck: function(deckId) {
            abootay.data.get.deckById(deckId, function(err, deck) {
                if (deck.cards.length == 0) {
                    alert('No cards in deck');
                    window.history.go(-1);
                    return;
                }

                deck.cards = _.shuffle(deck.cards);
                abootay.game = new abootay.models.Game(deck);
                var gameView = new abootay.views.GameView({
                    model: abootay.game
                });

                $('.game-container').html(gameView.el);
                
                abootay.game.start();
            });
        }
    });

    abootay.router = new abootay.GameRouter();

    Backbone.history.start({pushState: true, silent: true});

    Backbone.history.on('route',function(){
        if (abootay.game) {
            abootay.game.get('timer').reset();
        }
    });
    
})(jQuery);
