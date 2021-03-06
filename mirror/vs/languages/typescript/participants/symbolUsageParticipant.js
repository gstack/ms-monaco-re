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

var __extends = this.__extends || function(a, b) {
    function d() {
      this.constructor = a;
    }
    for (var c in b) {
      if (b.hasOwnProperty(c)) {
        a[c] = b[c];
      }
    }
    d.prototype = b.prototype;

    a.prototype = new d;
  };

define("vs/languages/typescript/participants/symbolUsageParticipant", ["require", "exports",
  "vs/nls!vs/languages/typescript/participants/symbolUsageParticipant", "vs/base/time/schedulers",
  "vs/platform/markers/markers", "vs/languages/typescript/lib/typescriptServices"
], function(a, b, c, d, e, f) {
  var g = c;

  var h = d;

  var i = e;

  var j = f;

  var k = function(a) {
    function b(b, c, d) {
      a.call(this);

      this.filename = b;

      this.languageService = c;

      this.markers = d;
    }
    __extends(b, a);

    b.prototype.visitImportDeclaration = function(b) {
      var c = this.position() + b.importKeyword.fullWidth() + b.identifier.fullWidth() - 1;

      var d = this.languageService.getOccurrencesAtPosition(this.filename, c);
      if (d.length > 1) return;
      var e = i.createTextMarker(i.Severity.Warning, 0, g.localize(
          "vs_languages_typescript_participants_symbolUsageParticipant", 0, b.identifier.text()), this.position() + b
        .leadingTriviaWidth(), b.width());
      this.markers.push(e);

      a.prototype.visitImportDeclaration.call(this, b);
    };

    return b;
  }(j.TypeScript.PositionTrackingWalker);

  var l = function() {
    function a() {
      this.scheduler = new h.RunOnceScheduler(function() {}, a.DELAY);
    }
    a.prototype.validate = function(b, c, d) {
      if (!(d instanceof j.Services.LanguageService)) return;
      this.scheduler.cancel();

      this.scheduler.schedule();

      this.scheduler.setRunner(function() {
        var e = d;

        var f = b.getAssociatedResource().toExternal();

        var g = e.getSyntaxTree(f).sourceUnit();

        var h = [];
        g.accept(new k(f, e, h));

        c.changeMarkers(b.getAssociatedResource(), a.ID, function(a) {
          for (var b = 0, c = h.length; b < c; b++) {
            a.addMarker(h[b]);
          }
        });
      });
    };

    a.ID = "vs.languages.typescript.symbolUsageParticipant";

    a.DELAY = 1500;

    return a;
  }();
  b.WorkerParticipant = l;
});