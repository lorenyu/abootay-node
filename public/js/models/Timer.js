(function($) {
    var abootay = window.abootay;

    abootay.models.Timer = Backbone.Model.extend({
        _millis: 0,
        _startTime: null,
        _millisRemaining: 0,
        _setTimeoutId: 0,
        _tickIntervalId: 0,
        options: null,

        initialize: function(millis, options) {
            this.setTimerLength(millis);
            this.reset();

            this.options = options || {};
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
            if (!this.isRunning()) return this._millisRemaining;

            var timeElapsed = this._getTime() - this._startTime;
            return this._millisRemaining - timeElapsed;
        },
        secondsRemaining: function() {
            return this.millisRemaining() / 1000;
        },
        minutesRemaining: function() {
            return this.secondsRemaining() / 60;
        },
        start: function() {
            if (this.isRunning()) return;
            
            this._startTime = this._getTime();
            this._tickIntervalId = setInterval(_.bind(this._onTick, this), 1000);
            this._setTimeoutId = setTimeout(_.bind(this._onTimerComplete, this), this.millisRemaining());
        },
        stop: function() { // pauses the timer. Calling start will start the timer where it left off.
            if (!this.isRunning()) return;

            // stop the setTimeout callback
            clearTimeout(this._setTimeoutId);
            this._setTimeoutId = null;

            // stop the tick callback
            clearInterval(this._tickIntervalId);
            this._tickIntervalId = null;

            // calculate the amount of time remaining
            var timeElapsed = this._getTime() - this._startTime;
            this._millisRemaining -= timeElapsed;
        },
        reset: function() { // Stops and resets the timer.
            this.stop();
            this._millisRemaining = this.millis();
        },
        isRunning: function() {
            return this._setTimeoutId ? true : false;
        },
        setTimerLength: function(millis) { // set length of timer in milliseconds
            this._millis = millis;
        },
        _onTimerComplete: function() {
            this.stop();

            this.trigger('complete');

            this.reset();
        },
        _onTick: function() {
            this.trigger('tick:second');
        },
        _getTime: function() {
            return new Date().getTime();
        }
    });
    
})(jQuery);
