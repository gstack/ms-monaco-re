define(["require", "exports", "vs/editor/core/range", "vs/editor/core/selection"], function(a, b, c, d) {
  var e = c,
    f = d,
    g = function() {
      function a(a) {
        this._selection = a, this._usedEndToken = null
      }
      return a.prototype._haystackHasNeedleAtOffset = function(a, b, c) {
        if (c < 0) return !1;
        var d = b.length,
          e = a.length;
        if (c + d > e) return !1;
        for (var f = 0; f < d; f++)
          if (a.charCodeAt(c + f) !== b.charCodeAt(f)) return !1;
        return !0
      }, a.prototype._createOperationsForBlockComment = function(a, b, c, d) {
        var f = a.startLineNumber,
          g = a.startColumn,
          h = a.endLineNumber,
          i = a.endColumn,
          j = e.RangeUtils.isEmpty(a),
          k = b.blockCommentStartToken,
          l = k.length,
          m = b.blockCommentEndToken,
          n = m.length,
          o = this._haystackHasNeedleAtOffset(c.getLineContent(f), k, g - 1 - l),
          p = this._haystackHasNeedleAtOffset(c.getLineContent(h), m, i - 1);
        o && p ? j ? d.addEditOperation(new e.Range(f, g - l, h, i + n), null) : (d.addEditOperation(new e.Range(f, g -
          l, f, g), null), d.addEditOperation(new e.Range(h, i, h, i + n), null)) : j ? (d.addEditOperation(new e.Range(
          f, g, h, i), k + m), this._usedEndToken = m) : (d.addEditOperation(new e.Range(f, g, f, g), k), d.addEditOperation(
          new e.Range(h, i, h, i), m))
      }, a.prototype.getEditOperations = function(a, b) {
        var c = this._selection.startLineNumber,
          d = this._selection.startColumn,
          e = this._selection.endLineNumber,
          f = this._selection.endColumn;
        c < e && f === 1 && (e -= 1, f = a.getLineMaxColumn(e));
        var g = a.getModeAtPosition(c, d).commentsSupport;
        if (!g) return;
        var h = g.getCommentsConfiguration();
        if (!h || !h.blockCommentStartToken || !h.blockCommentEndToken) return;
        this._createOperationsForBlockComment({
          startLineNumber: c,
          startColumn: d,
          endLineNumber: e,
          endColumn: f
        }, h, a, b)
      }, a.prototype.computeCursorState = function(a, b) {
        var c = b.getInverseEditOperations();
        if (c.length === 2) {
          var d = c[0],
            e = c[1];
          return new f.Selection(d.range.endLineNumber, d.range.endColumn, e.range.startLineNumber, e.range.startColumn)
        }
        var g = c[0].range,
          h = this._usedEndToken ? -this._usedEndToken.length : 0;
        return new f.Selection(g.endLineNumber, g.endColumn + h, g.endLineNumber, g.endColumn + h)
      }, a
    }();
  b.BlockCommentCommand = g
})