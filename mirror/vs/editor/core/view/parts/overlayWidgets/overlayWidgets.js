define("vs/editor/core/view/parts/overlayWidgets/overlayWidgets", ["require", "exports",
  "vs/editor/core/view/viewContext", "vs/editor/editor", "vs/editor/core/view/viewPart", "vs/css!./overlayWidgets"
], function(e, t, n, i, o) {
  var r = function(e) {
    function t(t) {
      e.call(this, t);

      this._widgets = {};

      this._verticalScrollbarWidth = 0;

      this.domNode = document.createElement("div");

      this.domNode.className = n.ClassNames.OVERLAY_WIDGETS;
    }
    __extends(t, e);

    t.prototype.dispose = function() {
      e.prototype.dispose.call(this);

      this._widgets = null;
    };

    t.prototype.onLayoutChanged = function(e) {
      var t = this;
      this._verticalScrollbarWidth = e.verticalScrollbarWidth;

      this._requestModificationFrame(function() {
        t.domNode.style.width = e.width + "px";
      });

      return !0;
    };

    t.prototype.addWidget = function(e) {
      this._widgets[e.getId()] = {
        widget: e,
        preference: null
      };
      var t = e.getDomNode();
      t.style.position = "absolute";

      t.setAttribute("widgetId", e.getId());

      this.domNode.appendChild(t);
    };

    t.prototype.setWidgetPosition = function(e, t) {
      var n = this;

      var i = this._widgets[e.getId()];
      i.preference = t;

      this._requestModificationFrame(function() {
        if (n._widgets.hasOwnProperty(e.getId())) {
          n._renderWidget(i);
        }
      });
    };

    t.prototype.removeWidget = function(e) {
      var t = e.getId();
      if (this._widgets.hasOwnProperty(t)) {
        var n = this._widgets[t];

        var i = n.widget.getDomNode();
        delete this._widgets[t];

        i.parentNode.removeChild(i);
      }
    };

    t.prototype._renderWidget = function(e) {
      var t = "data-editor-restoreStyleTop";

      var n = e.widget.getDomNode();
      if (null !== e.preference) {
        if (0 === e.preference) {
          if (!n.hasAttribute(t)) {
            n.setAttribute(t, n.style.top);
          }
          n.style.top = "0px";
          n.style.right = 2 * this._verticalScrollbarWidth + "px";
        } else {
          if (1 === e.preference) {
            if (!n.hasAttribute(t)) {
              n.setAttribute(t, n.style.top);
            }
            n.style.top = "0px";
            n.style.right = "50%";
          }
        }
      } else if (n.hasAttribute(t)) {
        var i = n.getAttribute(t);
        n.removeAttribute(t);

        n.style.top = i;
      }
    };

    t.prototype._render = function(e, t) {
      var n;

      var i = this;
      if (t)
        for (n in this._widgets) {
          if (this._widgets.hasOwnProperty(n)) {
            t.renderedOverlayWidgets++;
          }
        }
      this._requestModificationFrame(function() {
        for (n in i._widgets) {
          if (i._widgets.hasOwnProperty(n)) {
            i._renderWidget(i._widgets[n]);
          }
        }
      });
    };

    t.prototype.onReadAfterForcedLayout = function(e, t) {
      this._render(e, t);

      return null;
    };

    t.prototype.onWriteAfterForcedLayout = function() {
      this._executeModificationRunners();
    };

    return t;
  }(o.ViewPart);
  t.ViewOverlayWidgets = r;
});