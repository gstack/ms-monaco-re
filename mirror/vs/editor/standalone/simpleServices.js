define(["require", "exports", "vs/base/lib/winjs.base", "vs/platform/services", "vs/base/errors", "vs/base/types"],
  function(a, b, c, d, e, f) {
    var g = c,
      h = d,
      i = e,
      j = f,
      k = function() {
        function a(a) {
          this.editor = a
        }
        return a.prototype.getId = function() {
          return "editor"
        }, a.prototype.getControl = function() {
          return this.editor
        }, a.prototype.getSelection = function() {
          return this.editor.getSelection()
        }, a.prototype.focus = function() {
          this.editor.focus()
        }, a
      }();
    b.SimpleEditor = k;
    var l = function() {
      function a(a) {
        this.model = a
      }
      return a.prototype.getTextEditorModel = function() {
        return this.model
      }, a
    }();
    b.SimpleModel = l;
    var m = function() {
      function a(a) {
        this.editor = a
      }
      return a.prototype.getActiveEditor = function() {
        return new k(this.editor)
      }, a.prototype.getActiveEditorInput = function() {
        return null
      }, a.prototype.openEditor = function(a) {
        var b = this.editor.getModel();
        if (b.id !== a.path && b.getAssociatedResource().toExternal() !== a.path) return g.Promise.as(!1);
        var c = a.options.selection;
        return c && (!j.isUndefinedOrNull(c.endLineNumber) && !j.isUndefinedOrNull(c.endColumn) ? this.editor.setSelection(
          c, !0, !0, !0) : this.editor.setPosition({
          lineNumber: c.startLineNumber,
          column: c.startColumn
        }, !0, !0, !0)), g.Promise.as(!0)
      }, a.prototype.resolveEditorModel = function(a) {
        var b = this.editor.getModel();
        return b.id !== a.path && b.getAssociatedResource().toExternal() !== a.path ? g.Promise.as(null) : g.Promise.as(
          new l(b))
      }, a
    }();
    b.SimpleEditorService = m;
    var n = function() {}, o = function() {
        function a() {}
        return a.prototype.show = function(a, b) {
          switch (a) {
            case h.Severity.Error:
              console.error(i.toErrorMessage(b, !0));
              break;
            case h.Severity.Warning:
              console.warn(b);
              break;
            default:
              console.log(b)
          }
          return n
        }, a
      }();
    b.SimpleMessageService = o
  })