/*!
 * name: next-weapp-background-audio
 * url: https://github.com/afeiship/next-weapp-background-audio
 * version: 1.0.0
 * date: 2019-08-14T06:02:54.042Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxClassify = nx.classify || require('next-classify');
  var DEFAULT_OPTIONS = { title: '未命名', onChange: nx.noop };
  var EVENTS = [
    'canplay',
    'waiting',
    'error',
    'play',
    'pause',
    'seeking',
    'seeked',
    'ended',
    'stop',
    'timeUpdate',
    'next',
    'prev'
  ];

  var NxWeappBackgroundAudio = nx.declare('nx.WeappBackgroundAudio', {
    statics: {
      STATUS: {
        error: -1,
        init: 0,
        play: 1,
        pause: 2,
        loaded: 3,
        ended: 4,
        canplay: 5
      }
    },
    properties: {
      times: {
        get: function() {
          return {
            total: this.audio.duration,
            current: this.audio.currentTime
          };
        }
      },
      status: {
        get: function() {
          return this._status;
        }
      }
    },
    methods: {
      init: function(inOptions) {
        this.options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.audio = wx.getBackgroundAudioManager();
        nx.mix(this.audio, this.options);
        this._status = NxWeappBackgroundAudio.STATUS.init;
        this.attachEvents();
      },
      destroy: function() {},
      attachEvents: function() {
        var self = this;
        EVENTS.forEach(function(name) {
          var method = 'on' + nxClassify(name);
          self.audio[method](function(event) {
            self.change(event);
          });
        });
      },
      change: function(inEvent) {
        this.onChange(inEvent);
      },
      play: function() {
        var src = this.options.src;
        if (this.audio.src && src) {
          this.audio.play();
        } else {
          this.audio.src = src;
        }
      },
      'pause,stop,seek': function(inName) {
        var self = this;
        return function() {
          return self.audio[inName].apply(self.audio, arguments);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappBackgroundAudio;
  }
})();

//# sourceMappingURL=next-weapp-background-audio.js.map
