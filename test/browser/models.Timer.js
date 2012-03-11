// var should = chai.should();

describe('Timer', function() {
	var clock,
		timer;
	beforeEach(function() {
		clock = sinon.useFakeTimers();
		timer = new abootay.models.Timer(1000);
	});
	afterEach(function() {
		clock.restore();
	});
	describe('Methods', function() {
		describe('#start()', function() {
			it('should start the timer', function() {
				timer.start();
				timer.isRunning().should.be.true;
			});
			it('should finish running after specified number of milliseconds', function() {
				timer.start();
				clock.tick(999);
				timer.isRunning().should.be.true;
				clock.tick(1);
				timer.isRunning().should.be.false;
			});
			it('should do nothing if already started', function() {
				var setTimeout = sinon.spy(window, 'setTimeout');

				timer.start();
				timer.start();
				setTimeout.should.have.been.calledOnce;
				
				window.setTimeout.restore();
			});
			it('should start where the timer left off after calling stop', function() {
				timer.start()
				clock.tick(500); // elapse time by 0.5 seconds
				timer.stop();

				// there should be only 0.5 seconds left on the timer now
				timer.start();
				clock.tick(499);
				timer.isRunning().should.be.true;
				clock.tick(1);
				timer.isRunning().should.be.false;
			});
		});
		describe('#stop()', function() {
			it('should stop the timer', function() {
				var clearTimeout = sinon.spy(window, 'clearTimeout');

				timer.start();
				timer.stop();

				clearTimeout.should.have.been.calledOnce;
				timer.isRunning().should.be.false;
			});
			it('should do nothing if the timer is already stopped', function() {
				var clearTimeout = sinon.spy(window, 'clearTimeout');

				timer.stop();
				clearTimeout.should.not.have.been.called;
			});
		});
		describe('#reset()', function() {
			it('should stop the timer', function() {
				timer.start();
				timer.reset();

				timer.isRunning().should.be.false;
			});
			it('should reset the timer', function() {
				timer.start();
				clock.tick(500);
				timer.reset();

				timer.start();
				clock.tick(500);
				timer.isRunning().should.be.true;
				clock.tick(500);
				timer.isRunning().should.be.false;
			});
		});
		describe('#isRunning()', function() {
			it('should be true when the timer is running', function() {
				timer.start();
				timer.isRunning().should.be.true;
			});
			it('should be false when the timer is not running', function() {
				timer.isRunning().should.be.false;
			});
		});
	});
	describe('Events', function() {
		describe('complete', function() {
			it('should be triggered when the timer finishes running', function() {
				var onComplete = sinon.spy();
				timer.on('complete', onComplete);
				timer.start();
				clock.tick(1000);
				onComplete.should.have.been.called;
			});
		});
	});
});