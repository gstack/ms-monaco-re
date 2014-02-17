define('vs/base/dom/dom', [
  'require',
  'exports',
  'vs/base/env',
  'vs/base/types',
  'vs/base/eventEmitter',
  'vs/base/dom/mockDom',
  'vs/base/dom/mouseEvent',
  'vs/base/dom/keyboardEvent',
  'vs/base/errors'
], function(e, t, n, i, o, r, s, a, u) {
  function l(e) {
    for (; e.firstChild;)
      e.removeChild(e.firstChild);
  }

  function c(e) {
    for (; e;) {
      if (e === document.body)
        return !0;
      e = e.parentNode;
    }
    return !1;
  }

  function d(e, t, n, o) {
    var r = function(e) {
      e = e || window.event, n(e);
    };
    return i.isFunction(e.addEventListener) ? (e.addEventListener(t, r, o || !1), function() {
      r && (e.removeEventListener(t, r, o || !1), r = null, e = null, n = null);
    }) : (e.attachEvent('on' + t, r), function() {
      e.detachEvent('on' + t, r);
    });
  }

  function h(e, n, i, o) {
    var r = t.addListener(e, n, i, o);
    return {
      dispose: r
    };
  }

  function p(e) {
    return function(t) {
      return e(new s.StandardMouseEvent(t));
    };
  }

  function f(e) {
    return function(t) {
      return e(new a.KeyboardEvent(t));
    };
  }

  function g(e, n) {
    return t.addListener(e, 'mouseout', function(t) {
      for (var i = t.relatedTarget || t.toElement; i && i !== e;)
        i = i.parentNode;
      i !== e && n(t);
    });
  }

  function m(e, n) {
    var i = t.addNonBubblingMouseOutListener(e, n);
    return {
      dispose: i
    };
  }

  function v(e, n, i, o, r) {
    'undefined' == typeof o && (o = B), 'undefined' == typeof r && (r = 0);
    var s = null,
      a = 0,
      u = !1,
      l = !1,
      c = function() {
        a = new Date().getTime(), i(s), s = null;
      }, d = function() {
        if (l = !1, !u) {
          var e = new Date().getTime() - a;
          e >= r ? c() : l || (l = !0, t.scheduleAtNextAnimationFrame(d, Number.MAX_VALUE));
        }
      }, h = t.addListener(e, n, function(e) {
        s = o(s, e), l || (l = !0, t.scheduleAtNextAnimationFrame(d, Number.MAX_VALUE));
      });
    return function() {
      u = !0, h();
    };
  }

  function y(e, n, i, o, r) {
    'undefined' == typeof o && (o = B), 'undefined' == typeof r && (r = U);
    var s = null,
      a = 0,
      u = -1,
      l = function() {
        u = -1, a = new Date().getTime(), i(s), s = null;
      }, c = t.addListener(e, n, function(e) {
        s = o(s, e);
        var t = new Date().getTime() - a;
        t >= r ? (-1 !== u && window.clearTimeout(u), l()) : -1 === u && (u = window.setTimeout(l, r - t));
      });
    return function() {
      -1 !== u && window.clearTimeout(u), c();
    };
  }

  function _(e, t, n, i, o) {
    return F.isNative ? v(e, t, n, i, o) : y(e, t, n, i, o);
  }

  function b(e, n, i, o, r) {
    var s = t.addThrottledListener(e, n, i, o, r);
    return {
      dispose: s
    };
  }

  function C(e) {
    return document.defaultView && i.isFunction(document.defaultView.getComputedStyle) ? document.defaultView.getComputedStyle(
      e, null) : e.currentStyle;
  }

  function w(e, n, i) {
    var o = t.getComputedStyle(e),
      r = '0';
    return r = o.getPropertyValue ? o.getPropertyValue(n) : o.getAttribute(i), q(e, r);
  }

  function E(e) {
    for (var n = e.offsetParent, i = e.offsetTop, o = e.offsetLeft; null !== (e = e.parentNode) && e !== document.body &&
      e !== document.documentElement;) {
      i -= e.scrollTop;
      var r = t.getComputedStyle(e);
      r && (o -= 'rtl' !== r.direction ? e.scrollLeft : -e.scrollLeft), e === n && (o += z.getBorderLeftWidth(e), i +=
        z.getBorderTopWidth(e), i += e.offsetTop, o += e.offsetLeft, n = e.offsetParent);
    }
    return {
      left: o,
      top: i
    };
  }

  function S(e) {
    var n = t.getTopLeftOffset(e);
    return {
      left: n.left,
      top: n.top,
      width: e.clientWidth,
      height: e.clientHeight
    };
  }

  function L(e) {
    var t = z.getBorderLeftWidth(e) + z.getBorderRightWidth(e),
      n = z.getPaddingLeft(e) + z.getPaddingRight(e);
    return e.offsetWidth - t - n;
  }

  function T(e) {
    var t = z.getMarginLeft(e) + z.getMarginRight(e);
    return e.offsetWidth + t;
  }

  function x(e) {
    var t = z.getBorderTopWidth(e) + z.getBorderBottomWidth(e),
      n = z.getPaddingTop(e) + z.getPaddingBottom(e);
    return e.offsetHeight - t - n;
  }

  function N(e) {
    var t = z.getMarginTop(e) + z.getMarginBottom(e);
    return e.offsetHeight + t;
  }

  function M(e, t) {
    if (null === e)
      return 0;
    for (var n = e.offsetLeft, i = e.parentNode; null !== i && (n -= i.offsetLeft, i !== t);)
      i = i.parentNode;
    return n;
  }

  function k(e, t) {
    if (null === e)
      return 0;
    for (var n = e.offsetTop, i = e.parentNode; null !== i && (n -= i.offsetTop, i !== t);)
      i = i.parentNode;
    return n;
  }

  function I(e, t) {
    for (; e;) {
      if (e === t)
        return !0;
      e = e.parentNode;
    }
    return !1;
  }

  function D() {
    j = document.createElement('style'), j.type = 'text/css', j.media = 'screen', document.getElementsByTagName(
      'head')[0].appendChild(j);
  }

  function O() {
    return j && j.sheet && j.sheet.rules ? j.sheet.rules : j && j.sheet && j.sheet.cssRules ? j.sheet.cssRules : [];
  }

  function R(e, t) {
    t && (j || D(), j.sheet.insertRule(e + '{' + t + '}', 0));
  }

  function P(e) {
    if (!j)
      return null;
    for (var t = O(), n = 0; n < t.length; n++) {
      var i = t[n],
        o = i.selectorText.replace(/::/gi, ':');
      if (o === e)
        return i;
    }
    return null;
  }

  function A(e) {
    if (j) {
      for (var t = O(), n = [], i = 0; i < t.length; i++) {
        var o = t[i],
          r = o.selectorText.replace(/::/gi, ':');
        0 === r.indexOf(e) && n.push(i);
      }
      for (var i = n.length - 1; i >= 0; i--)
        j.sheet.deleteRule(n[i]);
    }
  }

  function W(e) {
    return 'object' == typeof HTMLElement ? e instanceof HTMLElement || e instanceof r.MockElement : e && 'object' ==
      typeof e && 1 === e.nodeType && 'string' == typeof e.nodeName;
  }

  function H(e) {
    try {
      e.select(), e.setSelectionRange && e.setSelectionRange(0, 9999);
    } catch (t) {}
  }

  function V(e) {
    var i = !1,
      r = !1,
      s = new o.EventEmitter(),
      a = [],
      u = null;
    u = {
      addFocusListener: function(e) {
        var t = s.addListener('focus', e);
        return a.push(t), t;
      },
      addBlurListener: function(e) {
        var t = s.addListener('blur', e);
        return a.push(t), t;
      },
      dispose: function() {
        for (; a.length > 0;)
          a.pop()();
      }
    };
    var l = function() {
      r = !1, i || (i = !0, s.emit('focus', {}));
    }, c = function() {
        i && (r = !0, n.isTesting() ? r && (r = !1, i = !1, s.emit('blur', {})) : window.setTimeout(function() {
          r && (r = !1, i = !1, s.emit('blur', {}));
        }, 0));
      };
    return a.push(t.addListener(e, t.EventType.FOCUS, l, !0)), a.push(t.addListener(e, t.EventType.BLUR, c, !0)), u;
  }
  t.clearNode = l, t.isInDOM = c, t.hasClass, t.addClass, t.removeClass, t.toggleClass,
  function() {
    function e(e, t) {
      var r = e.className;
      if (!r)
        return n = -1, void 0;
      t = t.trim();
      var s = r.length,
        a = t.length;
      if (0 === a)
        return n = -1, void 0;
      if (a > s)
        return n = -1, void 0;
      if (r === t)
        return n = 0, i = s, void 0;
      for (var u, l = -1;
        (l = r.indexOf(t, l + 1)) >= 0;) {
        if (u = l + a, (0 === l || r.charCodeAt(l - 1) === o) && r.charCodeAt(u) === o)
          return n = l, i = u + 1, void 0;
        if (l > 0 && r.charCodeAt(l - 1) === o && u === s)
          return n = l - 1, i = u, void 0;
        if (0 === l && u === s)
          return n = 0, i = u, void 0;
      }
      n = -1;
    }
    var n, i, o = ' '.charCodeAt(0);
    t.hasClass = function(t, i) {
      return e(t, i), -1 !== n;
    }, t.addClass = function(t, i) {
      t.className ? (e(t, i), -1 === n && (t.className = t.className + ' ' + i)) : t.className = i;
    }, t.removeClass = function(t, o) {
      e(t, o), -1 !== n && (t.className = t.className.substring(0, n) + t.className.substring(i));
    }, t.toggleClass = function(i, o, r) {
      e(i, o), -1 === n || r || t.removeClass(i, o), -1 === n && r && t.addClass(i, o);
    };
  }(), t.addListener = d, t.addDisposableListener = h, t.addStandardDisposableListener = function(e, t, n, i) {
    var o = n;
    return 'click' === t ? o = p(n) : ('keydown' === t || 'keypress' === t || 'keyup' === t) && (o = f(n)), e.addEventListener(
      t, o, i || !1), {
      dispose: function() {
        o && (e.removeEventListener(t, o, i || !1), o = null, e = null, n = null);
      }
    };
  }, t.addNonBubblingMouseOutListener = g, t.addDisposableNonBubblingMouseOutListener = m;
  var F = function() {
    var e = function(e) {
      return e(new Date().getTime()), 0;
    }, t = self.requestAnimationFrame || self.msRequestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame ||
        self.oRequestAnimationFrame,
      n = self.cancelAnimationFrame || self.cancelRequestAnimationFrame || self.msCancelAnimationFrame || self.msCancelRequestAnimationFrame ||
        self.webkitCancelAnimationFrame || self.webkitCancelRequestAnimationFrame || self.mozCancelAnimationFrame ||
        self.mozCancelRequestAnimationFrame || self.oCancelAnimationFrame || self.oCancelRequestAnimationFrame,
      i = !! t,
      o = t || e,
      r = n || n;
    return {
      isNative: i,
      request: function(e) {
        return o(e);
      },
      cancel: function(e) {
        return r(e);
      }
    };
  }();
  t.runAtThisOrScheduleAtNextAnimationFrame, t.scheduleAtNextAnimationFrame, t.cancelAtNextAnimationFrame,
  function() {
    function e() {
      o = !1, i.sort(function(e, t) {
        return t.priority - e.priority;
      });
      var e = i;
      n += i.length, i = [];
      try {
        r = !0;
        for (var t = 0; t < e.length; t++)
          if (!e[t].cancelled)
            try {
              e[t].runner();
            } catch (s) {
              u.onUnexpectedError(s);
            }
      } finally {
        r = !1;
      }
    }
    var n = 0,
      i = [],
      o = !1,
      r = !1;
    t.scheduleAtNextAnimationFrame = function(t, r) {
      'undefined' == typeof r && (r = 0);
      var s = i.length;
      return i.push({
        cancelled: !1,
        runner: t,
        priority: r
      }), o || (o = !0, F.request(e)), s + n;
    }, t.runAtThisOrScheduleAtNextAnimationFrame = function(e, n) {
      return r ? (e(), -1) : t.scheduleAtNextAnimationFrame(e, n);
    }, t.cancelAtNextAnimationFrame = function(e) {
      if ('undefined' != typeof e) {
        var t = e - n;
        0 > t || t >= i.length || (i[t].cancelled = !0);
      }
    };
  }();
  var U = 16,
    B = function(e, t) {
      return t;
    };
  t.addThrottledListener = _, t.addDisposableThrottledListener = b, t.getComputedStyle = C;
  var q = function() {
    var e = /^-?\d+(px)?$/i,
      t = /^-?\d+/i;
    return function(n, i) {
      if (!e.test(i) && t.test(i)) {
        var o = n.style.left;
        n.style.left = i;
        var r = n.style.pixelLeft;
        return n.style.left = o, r;
      }
      return parseInt(i, 10) || 0;
    };
  }(),
    z = {
      getBorderLeftWidth: function(e) {
        return w(e, 'border-left-width', 'borderLeftWidth');
      },
      getBorderTopWidth: function(e) {
        return w(e, 'border-top-width', 'borderTopWidth');
      },
      getBorderRightWidth: function(e) {
        return w(e, 'border-right-width', 'borderRightWidth');
      },
      getBorderBottomWidth: function(e) {
        return w(e, 'border-bottom-width', 'borderBottomWidth');
      },
      getPaddingLeft: function(e) {
        return w(e, 'padding-left', 'paddingLeft');
      },
      getPaddingTop: function(e) {
        return w(e, 'padding-top', 'paddingTop');
      },
      getPaddingRight: function(e) {
        return w(e, 'padding-right', 'paddingRight');
      },
      getPaddingBottom: function(e) {
        return w(e, 'padding-bottom', 'paddingBottom');
      },
      getMarginLeft: function(e) {
        return w(e, 'margin-left', 'marginLeft');
      },
      getMarginTop: function(e) {
        return w(e, 'margin-top', 'marginTop');
      },
      getMarginRight: function(e) {
        return w(e, 'margin-right', 'marginRight');
      },
      getMarginBottom: function(e) {
        return w(e, 'margin-bottom', 'marginBottom');
      },
      __commaSentinel: !1
    };
  t.getTopLeftOffset = E, t.getDomNodePosition = S, t.getContentWidth = L, t.getTotalWidth = T, t.getContentHeight =
    x, t.getTotalHeight = N, t.getRelativeLeft = M, t.getRelativeTop = k, t.isAncestor = I;
  var j = null;
  t.createCSSRule = R, t.getCSSRule = P, t.removeCSSRulesWithPrefix = A, t.isHTMLElement = W, t.EventType = {
    CLICK: 'click',
    DBLCLICK: 'dblclick',
    MOUSE_UP: 'mouseup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_OVER: 'mouseover',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OUT: 'mouseout',
    CONTEXT_MENU: 'contextmenu',
    KEY_DOWN: 'keydown',
    KEY_PRESS: 'keypress',
    KEY_UP: 'keyup',
    LOAD: 'load',
    UNLOAD: 'unload',
    ABORT: 'abort',
    ERROR: 'error',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    SELECT: 'select',
    CHANGE: 'change',
    SUBMIT: 'submit',
    RESET: 'reset',
    FOCUS: 'focus',
    BLUR: 'blur',
    INPUT: 'input',
    STORAGE: 'storage',
    DRAG_START: 'dragstart',
    DRAG: 'drag',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DROP: 'drop',
    DRAG_END: 'dragend',
    ANIMATION_START: n.browser.isWebKit ? 'webkitAnimationStart' : 'animationstart',
    ANIMATION_END: n.browser.isWebKit ? 'webkitAnimationEnd' : 'animationend',
    ANIMATION_ITERATION: n.browser.isWebKit ? 'webkitAnimationIteration' : 'animationiteration'
  }, t.EventHelper = {
    stop: function(e, t) {
      e.preventDefault ? e.preventDefault() : e.returnValue = !1, t && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !
        0);
    }
  }, t.selectTextInInputElement = H, t.trackFocus = V, t.UnitConverter = {
    _emInPx: -1,
    emToPixel: function(e) {
      if (this._emInPx < 0) {
        var n = document.createElement('div');
        n.style.position = 'absolute', n.style.top = '10000px', n.style.left = '10000px', n.style.fontSize = '1em', n
          .innerHTML = 'AbcDef', document.body.appendChild(n);
        var i = t.getTotalHeight(n);
        document.body.removeChild(n), this._emInPx = i;
      }
      var o = e * this._emInPx,
        r = Math.round(o);
      return r;
    }
  };
})