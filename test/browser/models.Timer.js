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

                clock.tick(1000);

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
        describe('#millisRemaining()', function() {
            it('should return the number of milliseconds remaining', function() {
                timer.start();
                clock.tick(100);
                timer.millisRemaining().should.equal(900);
            });
            it('should return the correct number of milliseconds remaining even if timer stopped for a while', function() {
                timer.start();
                clock.tick(100);
                timer.stop();
                clock.tick(1000);
                timer.millisRemaining().should.equal(900);
            });
            it('should return the correct number of milliseconds remaining even if timer stopped for a while then started again', function() {
                timer.start();
                clock.tick(100);
                timer.stop();
                clock.tick(1000);
                timer.start();
                clock.tick(100);
                timer.millisRemaining().should.equal(800);
            });
        });
    });
    describe('Events', function() {
        describe('complete', function() {
            var onComplete;
            beforeEach(function() {
                onComplete = sinon.spy();
            });
            it('should be triggered when the timer finishes running', function() {
                timer.on('complete', onComplete);
                timer.start();
                clock.tick(1000);
                onComplete.should.have.been.called;
            });
        });
        describe('tick:second', function() {
            var onTick;
            beforeEach(function() {
                timer = new abootay.models.Timer(10000);
                onTick = sinon.spy();
                timer.on('tick:second', onTick);
            });
            it('should be triggered every second while the timer is running', function() {
                timer.start();
                clock.tick(999);
                onTick.should.not.have.been.called;
                clock.tick(1);
                onTick.should.have.been.called;
                clock.tick(1000);
                onTick.should.have.been.calledTwice;
                clock.tick(7000);
                onTick.callCount.should.equal(9);
            });
            it('should not be triggered when the timer is stopped', function() {
                timer.start();
                clock.tick(999);
                timer.stop();
                clock.tick(10000);
                onTick.should.not.have.been.called;
            });
            it('should be triggered every second after the timer has been started again after being stopped', function() {
                timer.start();
                clock.tick(999);
                timer.stop();
                clock.tick(10000);
                timer.start();
                clock.tick(9000);
                onTick.callCount.should.equal(9);
            });
        });
    });
});