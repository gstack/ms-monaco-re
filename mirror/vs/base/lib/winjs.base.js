define('vs/base/lib/winjs.base', [
  './raw.winjs.base',
  'vs/base/errors'
], function(e, t) {
  'use strict';

  function n(e) {
    var n = e.detail,
      i = n.id;
    return n.parent ? (n.handler && o && delete o[i], void 0) : (o[i] = n, 1 === Object.keys(o).length && setTimeout(
      function() {
        var e = o;
        o = {}, Object.keys(e).forEach(function(n) {
          var i = e[n];
          i.exception ? t.onUnexpectedError(i.exception) : i.error && t.onUnexpectedError(i.error), console.log(
            'WARNING: Promise with no error callback:' + i.id), console.log(i), i.exception && console.log(i.exception
            .stack);
        });
      }, 0), void 0);
  }

  function i(e, t, n) {
    var i, o, r, s = new WinJS.Promise(function(e, t, n) {
        i = e, o = t, r = n;
      }, function() {
        e.cancel();
      });
    return e.then(function(e) {
      t && t(e), i(e);
    }, function(e) {
      n && n(e), o(e);
    }, r), s;
  }
  var o = {};
  return WinJS.Promise.addEventListener('error', n), {
    decoratePromise: i,
    Class: WinJS.Class,
    xhr: WinJS.xhr,
    Promise: WinJS.Promise,
    TPromise: WinJS.Promise,
    Utilities: WinJS.Utilities
  };
})