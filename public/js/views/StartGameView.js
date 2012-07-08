(function($) {
    var abootay = this.abootay;

    abootay.namespace('views').StartGameView = Backbone.View.extend({
        className: 'start-game',
        render: function() {
            this.$el.html(abootay.render.game.startGame({ game: this.model }));
            return this;
        }
    });
    
})(jQuery);
