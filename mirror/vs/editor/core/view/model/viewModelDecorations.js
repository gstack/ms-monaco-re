define(["require", "exports", "vs/editor/core/range", "vs/editor/core/view/viewContext"], function(a, b, c, d) {
  var e = c;

  var f = d;

  var g = function() {
    function a(a, b, c) {
      this.editorId = a;

      this.configuration = b;

      this.converter = c;

      this.decorations = [];
    }
    a.prototype.dispose = function() {
      this.converter = null;

      this.decorations = null;
    };

    a.compareDecorations = function(a, b) {
      return e.RangeUtils.compareRangesUsingStarts(a.range, b.range);
    };

    a.prototype.reset = function(b) {
      var c = b.getAllDecorations(this.editorId, this.configuration.editor.readOnly);

      var d;

      var e;

      var f;

      var g;
      this.decorations = [];
      for (d = 0, e = c.length; d < e; d++) {
        f = c[d];
        g = {
          id: f.id,
          options: f.options,
          ownerId: f.ownerId,
          modelRange: f.range,
          range: this.converter.convertModelRangeToViewRange(f.range)
        };
        this.decorations[d] = g;
      }
      this.decorations.sort(a.compareDecorations);
    };

    a.prototype.onModelDecorationsChanged = function(b, c) {
      var d = !1;

      var e = {};

      var g = {};

      var h;

      var i;

      var j = this.configuration.editor.readOnly;

      var k;
      for (i = 0, k = b.addedOrChangedDecorations.length; i < k; i++) {
        h = b.addedOrChangedDecorations[i];
        if (j && h.isForValidation) continue;
        if (h.ownerId && h.ownerId !== this.editorId) continue;
        g[h.id] = h;
      }
      for (i = 0, k = b.removedDecorations.length; i < k; i++) {
        e[b.removedDecorations[i]] = !0;
      }
      var l = {};

      var m;
      for (i = 0, k = this.decorations.length; i < k; i++) {
        m = this.decorations[i];
        if (g.hasOwnProperty(m.id)) {
          l[m.id] = !0;
          h = g[m.id];
          m.options = h.options;
          m.modelRange = h.range;
          m.range = this.converter.convertModelRangeToViewRange(h.range);
          d = !0;
        }
        if (e.hasOwnProperty(m.id)) {
          this.decorations.splice(i, 1);
          k--;
          i--;
          d = !0;
        }
      }
      var n;
      for (n in g) {
        if (!l.hasOwnProperty(n) && g.hasOwnProperty(n)) {
          h = g[n];
          m = {
            id: h.id,
            options: h.options,
            ownerId: h.ownerId,
            modelRange: h.range,
            range: this.converter.convertModelRangeToViewRange(h.range)
          };
          this.decorations.push(m);
          d = !0;
        }
      }
      if (d) {
        this.decorations.sort(a.compareDecorations);
        var o = null;
        c(f.EventNames.DecorationsChangedEvent, o);
      }
    };

    a.prototype.onLineMappingChanged = function(b) {
      var c = this.decorations;

      var d;

      var g;

      var h;

      var i = !1;

      var j;
      for (g = 0, j = c.length; g < j; g++) {
        d = c[g];
        h = this.converter.convertModelRangeToViewRange(d.modelRange);
        if (!i && !e.RangeUtils.equalsRange(h, d.range)) {
          i = !0;
        }
        d.range = h;
      }
      if (i) {
        this.decorations.sort(a.compareDecorations);
        var k = null;
        b(f.EventNames.DecorationsChangedEvent, k);
      }
    };

    a.prototype.getAllDecorations = function() {
      return this.decorations;
    };

    a.prototype.getInlineDecorations = function(a) {
      return this.getDecorationsInLines(a, a, !0);
    };

    a.prototype.getDecorationsInRange = function(a) {
      return this.getDecorationsInLines(a.startLineNumber, a.endLineNumber, !1);
    };

    a.prototype.getDecorationsInLines = function(a, b, c) {
      var d = [];

      var e = 0;

      var f = this.decorations;

      var g;

      var h;

      var i;

      var j;
      for (i = 0, j = f.length; i < j; i++) {
        g = f[i];

        h = g.range;
        if (h.startLineNumber > b) break;
        if (h.endLineNumber < a) continue;
        if (c && !g.options.inlineClassName) continue;
        d[e++] = g;
      }
      return d;
    };

    return a;
  }();
  b.ViewModelDecorations = g;
});