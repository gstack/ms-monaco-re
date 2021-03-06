define(["require", "exports", "vs/editor/core/selection"], function(a, b, c) {
  var d = c;

  var e = function() {
    function a(a, b) {
      this._ranges = a;

      this._replaceStrings = b;
    }
    a.prototype.getEditOperations = function(a, b) {
      for (var c = 0; c < this._ranges.length; c++) {
        b.addEditOperation(this._ranges[c], this._replaceStrings[c]);
      }
    };

    a.prototype.computeCursorState = function(a, b) {
      var c = b.getInverseEditOperations();

      var e = c[c.length - 1].range;
      return new d.Selection(e.endLineNumber, e.endColumn, e.endLineNumber, e.endColumn);
    };

    return a;
  }();
  b.ReplaceAllCommand = e;
});