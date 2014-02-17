define('vs/editor/contrib/quickOpen/gotoLine', [
  'require',
  'exports',
  'vs/nls!vs/editor/editor.main',
  'vs/base/types',
  'vs/base/ui/widgets/quickopen/quickOpenModel',
  './editorQuickOpen',
  'vs/css!./gotoLine'
], function(e, t, n, i, o, r) {
  var s = function(e) {
    function t(t, n, i) {
      e.call(this), this.line = parseInt(t, 10), this.editor = n, this.decorator = i;
    }
    return __extends(t, e), t.prototype.getLabel = function() {
      var e = this.getMaxLineNumber();
      return this.invalidRange(e) ? e > 0 ? n.localize('vs_editor_contrib_quickOpen_gotoLine', 0, e) : n.localize(
        'vs_editor_contrib_quickOpen_gotoLine', 1) : n.localize('vs_editor_contrib_quickOpen_gotoLine', 2, this.line);
    }, t.prototype.invalidRange = function(e) {
      return 'undefined' == typeof e && (e = this.getMaxLineNumber()), !this.line || !i.isNumber(this.line) || e > 0 &&
        i.isNumber(this.line) && this.line > e;
    }, t.prototype.getMaxLineNumber = function() {
      var e = this.editor.getModel();
      return e && e.modified && e.original && (e = e.modified), e && i.isFunction(e.getLineCount) ? e.getLineCount() : -
        1;
    }, t.prototype.run = function(e) {
      return 1 === e ? this.runOpen() : this.runPreview();
    }, t.prototype.runOpen = function() {
      if (this.invalidRange())
        return !1;
      var e = this.toSelection();
      return this.editor.setSelection(e, !0, !0, !0), this.editor.focus(), !0;
    }, t.prototype.runPreview = function() {
      if (this.invalidRange())
        return this.decorator.clearDecorations(), !1;
      var e = this.toSelection();
      return this.editor.setSelection(e, !0, !0, !0), i.isFunction(this.editor.changeDecorations) && this.decorator.decorateLine(
        e, this.editor), !1;
    }, t.prototype.toSelection = function() {
      return {
        startLineNumber: this.line,
        startColumn: 1,
        endLineNumber: this.line,
        endColumn: 1
      };
    }, t;
  }(o.QuickOpenEntry);
  t.GotoLineEntry = s;
  var a = function(e) {
    function t(t, i) {
      e.call(this, t, i, n.localize('vs_editor_contrib_quickOpen_gotoLine', 3));
    }
    return __extends(t, e), t.prototype._getModel = function(e) {
      var t = new o.QuickOpenModel(),
        n = [new s(e, this.editor, this)];
      return t.addEntries(n), t;
    }, t.prototype._getAutoFocus = function(e) {
      return {
        autoFocusFirstEntry: e.length > 0
      };
    }, t.ID = 'editor.actions.gotoLine', t;
  }(r.BaseEditorQuickOpenAction);
  t.GotoLineAction = a;
})