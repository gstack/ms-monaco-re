define("vs/editor/core/view/overlays/selections/selections", ["require", "exports",
  "vs/editor/core/view/viewEventHandler", "vs/css!./selections"
], function(e, t, n) {
  var i;
  ! function(e) {
    e[e.EXTERN = 0] = "EXTERN";

    e[e.INTERN = 1] = "INTERN";

    e[e.FLAT = 2] = "FLAT";
  }(i || (i = {}));
  var o = function(e) {
    function t(t) {
      e.call(this);

      this._context = t;

      this._selections = [];

      this._contentLeft = 0;

      this._previousRender = null;

      this._horizontalScrollChanged = !1;

      this._context.addEventHandler(this);
    }
    __extends(t, e);

    t.prototype.dispose = function() {
      this._context.removeEventHandler(this);

      this._context = null;

      this._selections = null;

      this._previousRender = null;
    };

    t.prototype.onModelFlushed = function() {
      return !0;
    };

    t.prototype.onModelDecorationsChanged = function() {
      return !0;
    };

    t.prototype.onModelLinesDeleted = function() {
      return !0;
    };

    t.prototype.onModelLineChanged = function() {
      return !0;
    };

    t.prototype.onModelLinesInserted = function() {
      return !0;
    };

    t.prototype.onCursorPositionChanged = function() {
      return !1;
    };

    t.prototype.onCursorSelectionChanged = function(e) {
      this._selections = [e.selection];

      this._selections = this._selections.concat(e.secondarySelections);

      return !0;
    };

    t.prototype.onCursorRevealRange = function() {
      return !1;
    };

    t.prototype.onConfigurationChanged = function() {
      return !0;
    };

    t.prototype.onLayoutChanged = function(e) {
      this._contentLeft = e.contentLeft;

      return !0;
    };

    t.prototype.onScrollChanged = function(e) {
      e.horizontal && (this._horizontalScrollChanged = !0);

      return e.vertical;
    };

    t.prototype.onZonesChanged = function() {
      return !0;
    };

    t.prototype.onScrollWidthChanged = function() {
      return !1;
    };

    t.prototype.onScrollHeightChanged = function() {
      return !1;
    };

    t.prototype._visibleRangesHaveGaps = function(e) {
      if (e.length <= 1) {
        return !1;
      }
      var t;

      var n;

      var i;

      var o;
      for (t = e[0].top, i = 1, o = e.length; o > i; i++) {
        if (n = e[i].top, n === t) {
          return !0;
        }
        t = n;
      }
      return !1;
    };

    t.prototype._enrichVisibleRangesWithStyle = function(e) {
      var t;

      var n;

      var i;

      var o;

      var r;

      var s;

      var a;

      var u;

      var l;

      var c;

      var d;
      for (c = 0, d = e.length; d > c; c++) {
        t = e[c];
        n = t.left;
        i = t.left + t.width;
        u = {
          top: 0,
          bottom: 0
        };
        l = {
          top: 0,
          bottom: 0
        };
        if (c > 0) {
          o = e[c - 1].left;
          r = e[c - 1].left + e[c - 1].width;
          if (n === o) {
            u.top = 2;
          } else {
            if (n > o) {
              u.top = 1;
            }
          }
          if (i === r) {
            l.top = 2;
          } else {
            if (i > o && r > i) {
              l.top = 1;
            }
          }
        }
        if (d > c + 1) {
          s = e[c + 1].left;
          a = e[c + 1].left + e[c + 1].width;
          if (n === s) {
            u.bottom = 2;
          } else {
            if (n > s && a > n) {
              u.bottom = 1;
            }
          }
          if (i === a) {
            l.bottom = 2;
          } else {
            if (a > i) {
              l.bottom = 1;
            }
          }
        }
        t.startStyle = u;
        t.endStyle = l;
      }
    };

    t.prototype._getVisibleRangesWithStyle = function(e, t) {
      var n = t.visibleRangesForRange(e, !0) || [];

      var i = this._visibleRangesHaveGaps(n);

      var o = navigator.userAgent.indexOf("Trident/7.0") >= 0;
      o || i || !this._context.configuration.editor.roundedSelection || this._enrichVisibleRangesWithStyle(n);

      return n;
    };

    t.prototype._createSelectionPiece = function(e, t, n, i, o, r, s, a, u) {
      s.push('<div class="cslr ');

      s.push(e);

      s.push('" style="top:');

      s.push(t.toString());

      s.push("px;left:");

      a.push(n);

      u.push(s.length);

      s.push((n - r).toString());

      s.push("px;width:");

      s.push(i.toString());

      s.push("px;height:");

      s.push(o);

      s.push('px;"></div>');
    };

    t.prototype._actualRenderOneSelection = function(e, n, i, o, r) {
      var s;

      var a;

      var u;

      var l = e.length > 0 && e[0].startStyle;

      var c = this._context.configuration.editor.lineHeight.toString();

      var d = 0;
      for (a = 0; a < e.length; a++) {
        u = e[a];
        if (l) {
          if (1 === u.startStyle.top || 1 === u.startStyle.bottom) {
            d++;
            this._createSelectionPiece(t.SELECTION_CLASS_NAME, u.top, u.left - t.ROUNDED_PIECE_WIDTH, t.ROUNDED_PIECE_WIDTH,
              c, n, i, o, r);
            s = t.EDITOR_BACKGROUND_CLASS_NAME;
            if (1 === u.startStyle.top) {
              s += " " + t.SELECTION_TOP_RIGHT;
            }
            if (1 === u.startStyle.bottom) {
              s += " " + t.SELECTION_BOTTOM_RIGHT;
            }
            d++;
            this._createSelectionPiece(s, u.top, u.left - t.ROUNDED_PIECE_WIDTH, t.ROUNDED_PIECE_WIDTH, c, n, i, o, r);
          }
          if (1 === u.endStyle.top || 1 === u.endStyle.bottom) {
            d++;
            this._createSelectionPiece(t.SELECTION_CLASS_NAME, u.top, u.left + u.width, t.ROUNDED_PIECE_WIDTH, c, n,
              i, o, r);
            s = t.EDITOR_BACKGROUND_CLASS_NAME;
            if (1 === u.endStyle.top) {
              s += " " + t.SELECTION_TOP_LEFT;
            }
            if (1 === u.endStyle.bottom) {
              s += " " + t.SELECTION_BOTTOM_LEFT;
            }
            d++;
            this._createSelectionPiece(s, u.top, u.left + u.width, t.ROUNDED_PIECE_WIDTH, c, n, i, o, r);
          }
        }
        s = t.SELECTION_CLASS_NAME;
        if (l) {
          if (0 === u.startStyle.top) {
            s += " " + t.SELECTION_TOP_LEFT;
          }
          if (0 === u.startStyle.bottom) {
            s += " " + t.SELECTION_BOTTOM_LEFT;
          }
          if (0 === u.endStyle.top) {
            s += " " + t.SELECTION_TOP_RIGHT;
          }
          if (0 === u.endStyle.bottom) {
            s += " " + t.SELECTION_BOTTOM_RIGHT;
          }
        }
        d++;
        this._createSelectionPiece(s, u.top, u.left, u.width, c, n, i, o, r);
      }
      return d;
    };

    t.prototype._actualRender = function(e) {
      var t;

      var n;

      var i;

      var o = [];

      var r = [];

      var s = [];

      var a = 0;
      for (o.push('<div class="selections-layer" style="left:'), o.push(this._contentLeft.toString()), o.push(
        "px;width:"), o.push(e.scrollWidth.toString()), o.push("px;height:"), o.push(e.scrollHeight.toString()), o.push(
        'px;">'), i = 0; i < this._selections.length; i++) {
        t = this._selections[i];
        if (!t.isEmpty()) {
          n = this._getVisibleRangesWithStyle(t, e);
          a += this._actualRenderOneSelection(n, e.viewportLeft, o, r, s);
        }
      }
      o.push("</div>");

      return {
        html: o,
        lefts: r,
        leftsIndices: s,
        piecesCount: a
      };
    };

    t.prototype.shouldCallRender = function() {
      return this.shouldRender || this._horizontalScrollChanged;
    };

    t.prototype.render = function(e, t) {
      if (this.shouldRender) {
        this._previousRender = this._actualRender(e);
        this.shouldRender = !1;
        this._horizontalScrollChanged = !1;
      } else if (this._horizontalScrollChanged) {
        var n;

        var i;

        var o = this._previousRender.html;

        var r = this._previousRender.lefts;

        var s = this._previousRender.leftsIndices;
        for (n = 0, i = r.length; i > n; n++) {
          o[s[n]] = (r[n] - e.viewportLeft).toString();
        }
        this._horizontalScrollChanged = !1;
      }
      t && (t.renderedSelectionPieces += this._previousRender.piecesCount);

      return this._previousRender.html;
    };

    t.SELECTION_CLASS_NAME = "selected-text";

    t.SELECTION_TOP_LEFT = "top-left-radius";

    t.SELECTION_BOTTOM_LEFT = "bottom-left-radius";

    t.SELECTION_TOP_RIGHT = "top-right-radius";

    t.SELECTION_BOTTOM_RIGHT = "bottom-right-radius";

    t.EDITOR_BACKGROUND_CLASS_NAME = "monaco-editor-background";

    t.ROUNDED_PIECE_WIDTH = 10;

    return t;
  }(n.ViewEventHandler);
  t.SelectionsOverlay = o;
});