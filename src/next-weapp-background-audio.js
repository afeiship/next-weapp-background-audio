(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxClassify = nx.classify || require('next-classify');
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
      paused: {
        get: function() {
          return this.audio.paused;
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
        this.options = inOptions;
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
        console.log('inEvent.type', inEvent, inEvent.type);
      },
      'play,pause,stop': function(inName) {
        var self = this;
        return function() {
          return self.audio[inName]();
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappBackgroundAudio;
  }
})();
