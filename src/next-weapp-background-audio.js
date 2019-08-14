(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var nxClassify = nx.classify || require('next-classify');
  var DEFAULT_OPTIONS = { title: '未命名', autoplay: false, onChange: nx.noop };
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

  var PROP_HOOKS = {
    current: 'currentTime'
  };

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
        this._status = NxWeappBackgroundAudio.STATUS.init;
        this.attachEvents();
        nx.forIn(
          this.options,
          function(key, value, target) {
            if (key !== 'src' || target.autoplay) {
              this.prop(key, value);
            }
          },
          this
        );
      },
      destroy: function() {},
      attachEvents: function() {
        var self = this;
        EVENTS.forEach(function(name) {
          var method = 'on' + nxClassify(name);
          self.audio[method](function() {
            self.options.onChange({ type: name });
          });
        });
      },
      prop: function(inKey, inValue) {
        var key = PROP_HOOKS[inKey] || inKey;
        if (typeof inValue === 'undefined') {
          return this.audio[key];
        }
        this.audio[key] = inValue;
      },
      play: function() {
        var src = this.options.src;
        if (this.audio.src && src) {
          this.audio.play();
        } else {
          this.audio.src = src;
        }
      },
      move: function(inValue) {
        this.audio.seek(inValue);
      },
      'pause,stop': function(inName) {
        return function() {
          return this.audio[inName].apply(this.audio, arguments);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappBackgroundAudio;
  }
})();
