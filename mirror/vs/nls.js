/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
! function(e) {
  "use strict";

  function t(e, t) {
    var n = e.replace(/\{(\d+)\}/g, function(e, n) {
      var r = n[0];
      return "undefined" != typeof t[r] ? t[r] : e
    });
    return self && self.document && self.document.URL.match(/[^\?]*\?[^\#]*pseudo=true/) && (n = "［" + n.replace(
      /[aouei]/g, "$&$&") + "］"), n
  }

  function n(e, t) {
    var n = e[t];
    return n ? n : (n = e["*"], n ? n : null)
  }

  function r(e, n) {
    for (var r = [], i = 0; i < arguments.length - 2; i++) r[i] = arguments[i + 2];
    return t(n, r)
  }
  var i = e.Plugin && e.Plugin.Resources ? e.Plugin.Resources : void 0,
    o = "i-default";
  define("vs/nls", {
    load: function(e, s, a, l) {
      if (l = l || {}, !e || 0 === e.length || l.isBuild) a({
        localize: r
      });
      else {
        var c;
        if (i) c = ".nls.keys", s([e + c], function(e) {
          a({
            localize: function(t, n) {
              if (!e[t]) return "NLS error: unkown key " + t;
              var r = e[t].keys;
              if (n >= r.length) return "NLS error unknow index " + n;
              var o = r[n],
                s = [];
              s[0] = t + "_" + o;
              for (var a = 0; a < arguments.length - 2; a++) s[a + 1] = arguments[a + 2];
              return i.getString.apply(i, s)
            }
          })
        });
        else {
          var u = l["vs/nls"] || {}, p = u.availableLanguages ? n(u.availableLanguages, e) : null;
          c = ".nls", null !== p && p !== o && (c = c + "." + p), s([e + c], function(e) {
            a({
              localize: function(n, r) {
                for (var i = [], o = 0; o < arguments.length - 2; o++) i[o] = arguments[o + 2];
                if (!e[n]) return "NLS error: unkown key " + n;
                var s = e[n];
                return r >= s.length ? "NLS error unknow index " + r : t(s[r], i)
              }
            })
          })
        }
      }
    },
    localize: r
  })
}(this);