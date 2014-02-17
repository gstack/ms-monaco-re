define('vs/editor/contrib/quickOpen/quickOutline', [
  'require',
  'exports',
  'vs/nls!vs/editor/editor.main',
  'vs/base/lib/winjs.base',
  'vs/base/types',
  'vs/base/errors',
  'vs/base/strings',
  'vs/base/filters',
  'vs/base/ui/widgets/quickopen/quickOpenModel',
  './editorQuickOpen',
  'vs/css!./quickOutline'
], function(e, t, n, i, o, r, s, a, u, l) {
  var c = ':',
    d = function(e) {
      function t(t, n, i, o, r, s, a, u) {
        e.call(this), this.name = t, this.meta = n, this.type = i, this.description = o, this.range = r, this.setHighlights(
          s), this.editor = a, this.decorator = u;
      }
      return __extends(t, e), t.prototype.getLabel = function() {
        return this.name;
      }, t.prototype.getMeta = function() {
        return this.meta;
      }, t.prototype.getIcon = function() {
        return this.type;
      }, t.prototype.getDescription = function() {
        return this.description;
      }, t.prototype.getType = function() {
        return this.type;
      }, t.prototype.getRange = function() {
        return this.range;
      }, t.prototype.run = function(e, t) {
        return 1 === e ? this.runOpen(t) : this.runPreview();
      }, t.prototype.runOpen = function() {
        var e = this.toSelection();
        return this.editor.setSelection(e, !0, !0, !0), this.editor.focus(), !0;
      }, t.prototype.runPreview = function() {
        var e = this.toSelection();
        return this.editor.setSelection(e, !0, !0, !0), o.isFunction(this.editor.changeDecorations) && this.decorator
          .decorateLine(this.range, this.editor), !1;
      }, t.prototype.toSelection = function() {
        return {
          startLineNumber: this.range.startLineNumber,
          startColumn: this.range.startColumn || 1,
          endLineNumber: this.range.startLineNumber,
          endColumn: this.range.startColumn || 1
        };
      }, t;
    }(u.QuickOpenEntryGroup),
    h = function(e) {
      function t(t, i) {
        e.call(this, t, i, n.localize('vs_editor_contrib_quickOpen_quickOutline', 0));
      }
      return __extends(t, e), t.prototype.run = function() {
        var t = this,
          n = this.editor.getModel(),
          s = n.getMode(),
          a = s.outlineSupport;
        if (!a)
          return null;
        var u = a.getOutline(n.getAssociatedResource());
        return u.then(function(n) {
          return o.isArray(n) && n.length > 0 ? (t.cachedResult = n, e.prototype.run.call(t)) : i.Promise.as(!0);
        }, function(e) {
          return r.onUnexpectedError(e), !1;
        });
      }, t.prototype._getModel = function(e) {
        var t = new u.QuickOpenModel(),
          n = this.toQuickOpenEntries(this.cachedResult, e);
        return t.addEntries(n), t;
      }, t.prototype._getAutoFocus = function(e) {
        return 0 === e.indexOf(c) && (e = e.substr(c.length)), {
          autoFocusPrefixMatch: e,
          autoFocusFirstEntry: !! e
        };
      }, t.prototype.toQuickOpenEntries = function(e, t) {
        var i = [],
          o = [];
        e && (this.flatten(e, o), this.filter(o));
        var r = t;
        0 === t.indexOf(c) && (r = r.substr(c.length));
        for (var u = 0; u < o.length; u++) {
          var l = o[u],
            h = s.trim(l.label),
            p = null;
          if ('method' === l.type || 'function' === l.type) {
            var f = h.indexOf('(');
            f > 0 ? (p = h.substr(f), h = h.substr(0, f)) : p = '()';
          }
          var g = a.CombinedMatcher.matches(r, h);
          if (g) {
            var m = null;
            l.parentScope && (m = l.parentScope.join('.')), i.push(new d(h, p, l.type, m, l.range, g, this.editor,
              this));
          }
        }
        if (t && (i = 0 === t.indexOf(c) ? i.sort(this.sortScoped.bind(this, t.toLowerCase())) : i.sort(this.sortNormal
          .bind(this, t.toLowerCase()))), i.length > 0 && 0 === t.indexOf(c)) {
          for (var v = null, y = null, _ = 0, u = 0; u < i.length; u++) {
            var b = i[u];
            v !== b.getType() ? (y && y.setGroupLabel(this.typeToLabel(v, _)), v = b.getType(), y = b, _ = 1, b.setShowBorder(
              u > 0)) : _++;
          }
          y && y.setGroupLabel(this.typeToLabel(v, _));
        } else
          i.length > 0 && i[0].setGroupLabel(n.localize('vs_editor_contrib_quickOpen_quickOutline', 1, i.length));
        return i;
      }, t.prototype.typeToLabel = function(e, t) {
        switch (e) {
          case 'module':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 2, t);
          case 'class':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 3, t);
          case 'interface':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 4, t);
          case 'method':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 5, t);
          case 'function':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 6, t);
          case 'property':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 7, t);
          case 'variable':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 8, t);
          case 'var':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 9, t);
          case 'constructor':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 10, t);
          case 'call':
            return n.localize('vs_editor_contrib_quickOpen_quickOutline', 11, t);
        }
        return e;
      }, t.prototype.flatten = function(e, t, n) {
        for (var i = 0; i < e.length; i++) {
          var o = e[i];
          if (t.push(o), n && (o.parentScope = n), o.children) {
            var r = [];
            n && (r = n.slice(0)), 'module' !== o.type && r.push(o.label), this.flatten(o.children, t, r);
          }
        }
      }, t.prototype.filter = function(e) {
        for (var t = -1, n = 0, i = 0; i < e.length; i++) {
          var o = e[i];
          if ('module' === o.type && (t = i, n++, n > 1))
            break;
        }
        1 === n && e.splice(t, 1);
      }, t.prototype.sortNormal = function(e, t, n) {
        var i = t.getLabel().toLowerCase(),
          o = n.getLabel().toLowerCase(),
          r = s.localeCompare(i, o);
        if (0 !== r)
          return r;
        var a = t.getRange(),
          u = n.getRange();
        return a.startLineNumber - u.startLineNumber;
      }, t.prototype.sortScoped = function(e, t, n) {
        e = e.substr(c.length);
        var i = t.getType(),
          o = n.getType(),
          r = s.localeCompare(i, o);
        if (0 !== r)
          return r;
        if (e) {
          var a = t.getLabel().toLowerCase(),
            u = n.getLabel().toLowerCase(),
            r = s.localeCompare(a, u);
          if (0 !== r)
            return r;
        }
        var l = t.getRange(),
          d = n.getRange();
        return l.startLineNumber - d.startLineNumber;
      }, t.prototype._onClose = function(t) {
        e.prototype._onClose.call(this, t), this.cachedResult = null;
      }, t.prototype.dispose = function() {
        e.prototype.dispose.call(this), this.cachedResult = null;
      }, t.ID = 'editor.actions.quickOutline', t;
    }(l.BaseEditorQuickOpenAction);
  t.QuickOutlineAction = h;
})