define(["require", "exports", "vs/editor/core/selection"], function(a, b, c) {
  var d = c,
    e = function() {
      function a(a, b, c) {
        this._editRange = a, this._originalSelection = b, this._text = c
      }
      return a.prototype.getEditOperations = function(a, b) {
        b.addEditOperation(this._editRange, this._text)
      }, a.prototype.computeCursorState = function(a, b) {
        var c = b.getInverseEditOperations(),
          e = c[0].range;
        return this._originalSelection.isEmpty() ? new d.Selection(e.endLineNumber, Math.min(this._originalSelection.positionColumn,
          e.endColumn), e.endLineNumber, Math.min(this._originalSelection.positionColumn, e.endColumn)) : new d.Selection(
          e.endLineNumber, e.endColumn - this._text.length, e.endLineNumber, e.endColumn)
      }, a
    }();
  b.InPlaceReplaceCommand = e
})