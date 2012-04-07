(function($) {
	var abootay = this.abootay;

	abootay.namespace('views').TimerView = Backbone.View.extend({
		className: 'timer',
		_rgbInterpolator: null,
		initialize: function() {
			this._rgbInterpolator = d3.interpolateRgb('rgb(255,121,95)', 'rgb(33,40,42)');
			d3.select(this.el)
			  .append('div')
			  .classed('time-left', true)
			  .style('width', this.percentTimeLeft() * this.$el.width())
			  .style('background-color', 'rgb(0, 170, 240)');

			this.model.on('tick:second', _.bind(this.render, this));
		},
		render: function() {
			d3.select(this.el)
			  .select('.time-left')
			  .style('background-color', 'rgb(0, 230, 252)')
			  .transition()
			  .style('width', this.percentTimeLeft() * this.$el.width())
			  .duration(500)
			  .style('background-color', 'rgb(0, 170, 240)');
			return this;
		},
		percentTimeLeft: function() {
			return Math.floor(this.model.secondsRemaining()) / this.model.seconds();
		},
		color: function() {
			return this._rgbInterpolator(this.percentTimeLeft());
		}
	});
	
})(jQuery);
