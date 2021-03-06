define("vs/editor/core/view/parts/overviewRuler/decorationsOverviewRuler", ["require", "exports",
  "vs/editor/core/view/parts/overviewRuler/overviewRulerImpl", "vs/editor/editor", "vs/editor/core/view/viewPart"
], function(e, t, n, i, o) {
  var r = function(e) {
    function t(i, o, r) {
      e.call(this, i);

      this._overviewRuler = new n.OverviewRulerImpl(1, "decorationsOverviewRuler", o, this._context.configuration.editor
        .lineHeight, t.DECORATION_HEIGHT, t.DECORATION_HEIGHT, r);

      this._overviewRuler.setLanesCount(this._context.configuration.editor.overviewRulerLanes, !1);

      this._shouldUpdateDecorations = !0;

      this._zonesFromDecorations = [];

      this._shouldUpdateCursorPosition = !0;

      this._hideCursor = this._context.configuration.editor.hideCursorInOverviewRuler;

      this._zonesFromCursors = [];

      this._cursorPositions = [];
    }
    __extends(t, e);

    t.prototype.dispose = function() {
      e.prototype.dispose.call(this);

      this._overviewRuler.dispose();
    };

    t.prototype.onCursorPositionChanged = function(e) {
      this._shouldUpdateCursorPosition = !0;

      this._cursorPositions = [e.position];

      this._cursorPositions = this._cursorPositions.concat(e.secondaryPositions);

      return !0;
    };

    t.prototype.onConfigurationChanged = function(e) {
      var t = this._overviewRuler.getLanesCount();

      var n = this._context.configuration.editor.overviewRulerLanes;

      var i = !1;
      e.lineHeight && (this._overviewRuler.setLineHeight(this._context.configuration.editor.lineHeight, !1), i = !0);

      t !== n && (this._overviewRuler.setLanesCount(n, !1), i = !0);

      e.hideCursorInOverviewRuler && (this._hideCursor = this._context.configuration.editor.hideCursorInOverviewRuler,
        this._shouldUpdateCursorPosition = !0, i = !0);

      return i;
    };

    t.prototype.onLayoutChanged = function(e) {
      var t = this;
      this._requestModificationFrame(function() {
        t._overviewRuler.setLayout(e.overviewRuler, !1);
      });

      return !0;
    };

    t.prototype.onZonesChanged = function() {
      return !0;
    };

    t.prototype.onModelFlushed = function() {
      return !0;
    };

    t.prototype.onModelDecorationsChanged = function() {
      this._shouldUpdateDecorations = !0;

      return !0;
    };

    t.prototype.onScrollHeightChanged = function(e) {
      this._overviewRuler.setScrollHeight(e, !1);

      return !0;
    };

    t.prototype.getDomNode = function() {
      return this._overviewRuler.getDomNode();
    };

    t.prototype._createZonesFromDecorations = function() {
      var e;

      var t;

      var n;

      var i = this._context.model.getAllDecorations();

      var o = [];
      for (e = 0, t = i.length; t > e; e++) {
        n = i[e];
        if (n.options.overviewRuler.color) {
          o.push({
            startLineNumber: n.range.startLineNumber,
            endLineNumber: n.range.endLineNumber,
            color: n.options.overviewRuler.color,
            position: n.options.overviewRuler.position
          });
        }
      }
      return o;
    };

    t.prototype._createZonesFromCursors = function() {
      var e;

      var t;

      var n;

      var o = [];
      for (e = 0, t = this._cursorPositions.length; t > e; e++) {
        n = this._cursorPositions[e];
        o.push({
          forceHeight: 2,
          startLineNumber: n.lineNumber,
          endLineNumber: n.lineNumber,
          color: "rgba(0, 0, 102, 0.8)",
          position: i.OverviewRulerLane.Full
        });
      }
      return o;
    };

    t.prototype._render = function() {
      var e = this;
      if (this._shouldUpdateDecorations || this._shouldUpdateCursorPosition) {
        if (this._shouldUpdateDecorations) {
          this._shouldUpdateDecorations = !1;
          this._zonesFromDecorations = this._createZonesFromDecorations();
        }

        if (this._shouldUpdateCursorPosition) {
          this._shouldUpdateCursorPosition = !1;
          this._zonesFromCursors = this._hideCursor ? [] : this._createZonesFromCursors();
        }
        var t = [];
        t = t.concat(this._zonesFromDecorations);

        t = t.concat(this._zonesFromCursors);

        this._overviewRuler.setZones(t, !1);

        this._requestModificationFrame(function() {
          if (e._overviewRuler.render(), n.hasCanvas && e._overviewRuler.getLanesCount() > 0 && (e._zonesFromDecorations
            .length > 0 || e._zonesFromCursors.length > 0)) {
            var t = e._overviewRuler.getDomNode().getContext("2d");
            t.beginPath();

            t.lineWidth = 1;

            t.strokeStyle = "rgba(197,197,197,0.4)";

            t.rect(0, 0, e._overviewRuler.getWidth(), e._overviewRuler.getHeight());

            t.stroke();
          }
        });
      }
    };

    t.DECORATION_HEIGHT = 6;

    return t;
  }(o.ViewPart);
  t.DecorationsOverviewRuler = r;
});