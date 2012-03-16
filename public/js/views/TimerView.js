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
			  .style('width', (this.percentTimeLeft() * 276) + 'px')
			  .style('background-color', this.rgbInterpolate(this.percentTimeLeft()));

			this.model.on('tick:second', _.bind(this.render, this));
		},
		render: function() {
			d3.select(this.el)
			  .select('.time-left')
			  .transition()
			  .style('width', (this.percentTimeLeft() * 276) + 'px')
			  .style('background-color', this.rgbInterpolate(this.percentTimeLeft()));
			return this;
		},
		percentTimeLeft: function() {
			return this.model.millisRemaining() / this.model.millis();
		},
		rgbInterpolate: function(t) {
			return this._rgbInterpolator(t);
		}
	});
	
})(jQuery);
