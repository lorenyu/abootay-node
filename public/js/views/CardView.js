(function($) {
    var abootay = this.abootay;

    abootay.namespace('views').CardView = Backbone.View.extend({
        className: 'card-container',
        initialize: function() {
            this.model.on('change:currentCard', this.render, this);
        },
        render: function() {
            this.$el.html(abootay.render.game.showCard({card: this.model.get('currentCard')}));

            var timer = this.model.get('timer'),
                timerEl = this.$el.find('.timer'),
                timerView = new abootay.views.TimerView({ el: timerEl, model: timer });
            return this;
        }
    });
    
})(jQuery);
