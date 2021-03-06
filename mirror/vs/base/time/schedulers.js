define("vs/base/time/schedulers", ["require", "exports"], function(a, b) {
  var c = function() {
    function a(a, b) {
      this.timeoutToken = -1;

      this.runner = a;

      this.timeout = b;

      this.timeoutHandler = this.onTimeout.bind(this);
    }
    a.prototype.dispose = function() {
      this.cancel();

      this.runner = null;
    };

    a.prototype.cancel = function() {
      if (this.timeoutToken !== -1) {
        clearTimeout(this.timeoutToken);
        this.timeoutToken = -1;
      }
    };

    a.prototype.setRunner = function(a) {
      this.runner = a;
    };

    a.prototype.setTimeout = function(a) {
      this.timeout = a;
    };

    a.prototype.schedule = function() {
      this.cancel();

      this.timeoutToken = setTimeout(this.timeoutHandler, this.timeout);
    };

    a.prototype.onTimeout = function() {
      this.timeoutToken = -1;

      if (this.runner) {
        this.runner();
      }
    };

    return a;
  }();
  b.RunOnceScheduler = c;
});