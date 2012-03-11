(function($) {
	var abootay = window.abootay;

	abootay.models.Timer = Backbone.Model.extend({
		_millis: 0,
		_startTime: null,
		_millisRemaining: 0,
		_setTimeoutId: 0,

		initialize: function(millis) {
			this._millis = millis;
			this.reset();
		},
		millis: function() { // length in milliseconds
			return this._millis;
		},
		seconds: function() { // length in seconds
			return this.millis() / 1000;
		},
		minutes: function() { // length in minutes
			return this.seconds() / 60;
		},
		millisRemaining: function() {
			return this._millisRemaining;
		},
		secondsRemaining: function() {
			return this.millisRemaining() / 1000;
		},
		minutesRemaining: function() {
			return this.secondsRemaining() / 60;
		},
		start: function() {
			if (this.isRunning()) return;
			
			this._startTime = new Date().getTime();
			this._setTimeoutId = setTimeout(_.bind(this._onTimerCompleted, this), this.millisRemaining());
		},
		stop: function() { // pauses the timer. Calling start will start the timer where it left off.
			if (!this.isRunning()) return;

			// stop the setTimeout callback
			clearTimeout(this._setTimeoutId);
			this._setTimeoutId = null;

			// calculate the amount of time remaining
			var timeElapsed = new Date().getTime() - this._startTime;
			this._millisRemaining -= timeElapsed;
		},
		reset: function() { // Stops and resets the timer.
			this.stop();
			this._millisRemaining = this.millis();
		},
		isRunning: function() {
			return this._setTimeoutId ? true : false;
		},
		_onTimerCompleted: function() {
			this._setTimeoutId = null;

			this.trigger('complete');

			this.reset();
		}
	});
	
})(jQuery);
