define('vs/platform/markers/markersWorker', [
  'require',
  'exports',
  'vs/base/assert',
  './markers'
], function(e, t, n, i) {
  function o(e, t) {
    return new s(e, t);
  }
  var r = function() {
    function e(e) {
      this.markers = e;
    }
    return e.prototype.getAssociatedResource = function() {
      return this.markers.getAssociatedResource();
    }, e.prototype.getId = function() {
      return this.markers.getId();
    }, e.prototype.forEach = function(e) {
      this.markers.forEach(e);
    }, e.prototype.length = function() {
      return this.markers.length();
    }, e.prototype.at = function(e) {
      return this.markers.markerAt(e);
    }, e;
  }(),
    s = function() {
      function e(e, t) {
        var n = this;
        this.targets = e, this.publisher = t, this.markerUpdates = {}, this.modelInfos = {}, this.models = {}, this.globalChangeCount =
          0, this.markerUpdateChangeCounts = {}, e.forEach(function(e) {
            var t = e.getAssociatedResource().toExternal();
            n.modelInfos[t] = {
              version: e.getVersionId()
            }, n.models[t] = e;
          });
      }
      return e.prototype.readMarkers = function(t, n, o) {
        var s, a;
        'undefined' == typeof o ? (s = e.DEFAULT_GROUP, a = n) : (s = n, a = o);
        var u = this.markerUpdates[i.computeKey(t, s)];
        u ? a(new r(u)) : a(null);
      }, e.prototype.batchChanges = function(e) {
        try {
          this.globalChangeCount++, e(this);
        } finally {
          this.globalChangeCount--, 0 === this.globalChangeCount && this._publishReadyMarkerUpdates();
        }
      }, e.prototype.changeMarkers = function(t, i, o) {
        var r, s;
        'undefined' == typeof o ? (r = e.DEFAULT_GROUP, s = i) : (r = i, s = o), n.ok('*' !== r,
          'Parameter ownerId can\'t be \'*\'');
        var a = this._getMarkerUpdate(t, r),
          u = {
            getAssociatedResource: function() {
              return a.getAssociatedResource();
            },
            getId: function() {
              return a.getId();
            },
            addMarker: function(e) {
              a.addMarker(e);
            }
          };
        try {
          this._increaseMarkerUpdateChangeCount(a), s(u);
        } finally {
          this._decreaseMarkerUpdateChangeCount(a);
        }
      }, e.prototype._getMarkerUpdate = function(e, t) {
        var n = i.computeKey(e, t),
          o = this.markerUpdates[n];
        return o || (o = i.createMarkerUpdate(e, t), this.markerUpdates[n] = o), o;
      }, e.prototype._removeMarkerUpdate = function(e) {
        var t = e.computeKey();
        delete this.markerUpdates[t];
      }, e.prototype._increaseMarkerUpdateChangeCount = function(e) {
        var t = e.computeKey(),
          n = this.markerUpdateChangeCounts[t];
        this.markerUpdateChangeCounts[t] = 'undefined' == typeof n ? 1 : ++n;
      }, e.prototype._decreaseMarkerUpdateChangeCount = function(e) {
        var t = e.computeKey(),
          n = this.markerUpdateChangeCounts[t];
        n > 1 ? this.markerUpdateChangeCounts[t] = --n : (delete this.markerUpdateChangeCounts[t], 0 === this.globalChangeCount &&
          this._publishMarkerUpdate(e));
      }, e.prototype._getMarkerUpdateChangeCount = function(e) {
        return this.markerUpdateChangeCounts[e.computeKey()];
      }, e.prototype._publishMarkerUpdate = function(e) {
        var t = [];
        t.push(this._convertToJson(e)), this.publisher.sendMessage('publishMarkerUpdates', t), this._removeMarkerUpdate(
          e);
      }, e.prototype._publishReadyMarkerUpdates = function() {
        var e = this,
          t = [];
        Object.keys(this.markerUpdates).forEach(function(n) {
          var i = e.markerUpdates[n],
            o = e._getMarkerUpdateChangeCount(i);
          'undefined' == typeof o && t.push(e._convertToJson(i));
        }), this.publisher.sendMessage('publishMarkerUpdates', t);
      }, e.prototype._toRangeTextMarker = function(e, t) {
        var n, o, r, s;
        if (i.isIOffsetLengthTextMarker(t)) {
          var a = t,
            u = a.offset,
            l = Math.max(0, a.length),
            c = e.getRangeFromOffsetAndLength(u, l);
          n = c.startLineNumber, o = c.startColumn, r = c.endLineNumber, s = c.endColumn;
        } else if (i.isILineLengthTextMarker(t)) {
          var d = t;
          n = d.lineNumber, o = d.column, r = d.lineNumber, s = d.column + d.length;
        } else if (i.isILineColumnTextMarker(t)) {
          var h = t;
          n = h.startLineNumber, o = h.startColumn, r = h.endLineNumber, s = h.endColumn;
        } else {
          if (!i.isIRangeTextMarker(t))
            throw new Error('Cannot normalize to IRangeTextMarker unknown marker type');
          var p = t;
          n = p.range.startLineNumber, o = p.range.startColumn, r = p.range.endLineNumber, s = p.range.endColumn;
        }
        return {
          range: {
            startLineNumber: n,
            startColumn: o,
            endLineNumber: r,
            endColumn: s
          },
          severity: t.severity,
          code: t.code,
          text: t.text,
          type: t.type,
          optionalId: t.optionalId
        };
      }, e.prototype._convertToJson = function(e) {
        var t = e.toJson(),
          n = e.getAssociatedResource().toExternal(),
          o = this.modelInfos[n],
          r = this.models[n];
        if (!o || !r)
          throw new Error('Unknown model for ' + n);
        for (var s = [], a = 0, u = t.markers.length; u > a; a++) {
          var l = t.markers[a];
          if (!i.isITextMarker(l))
            throw new Error('Unknown marker type');
          var c = l;
          s.push(this._toRangeTextMarker(r, c));
        }
        return {
          resource: t.resource,
          id: t.id,
          model: {
            versionId: o.version
          },
          markers: s
        };
      }, e.DEFAULT_GROUP = 'defaultGroup', e;
    }();
  t.MarkerPublisher = s, t.createPublisher = o;
})