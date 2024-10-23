<template>
  <div
    class="CallSessionSubscriber__wrapper"
    :class="{ 'main-view': isMainView, selected: isSelected, mirrored }"
    @click="$emit('select-subscriber-stream', stream)">
    <div
      ref="container"
      class="CallSessionSubscriber__container">
    </div>
    <div
      class="CallSessionSubscriber__audio-indicator"
      :style="audioIndicatorStyle">
    </div>
    <!-- <transition
      appear
      name="slide-top-to-bottom">
      <div
        v-if="connectionProblem"
        class="CallSessionSubscriber__connection-problem">
        {{ $t('call_room.connection_problem') }}
      </div>
    </transition> -->
  </div>
</template>

<script>

export default {
  name: 'CallSessionSubscriber',

  props: {
    stream: {
      type: OT.Stream,
      required: true
    },
    session: {
      type: OT.Session,
      required: true
    },
    isMainView: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    mirrored: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
    }
  },

  watch: {
    height() {
      if (this.isMainView) this.subscriber.element.style.height = `${this.height}px`;
    }
  },

  data() {
    return {
      subscriber: null,
      audioLevel: null,
      connectionProblem: false,
      opts: {
        width: this.isMainView ? '100%' : 118,
        height: this.isMainView ? window.innerHeight : 89,
        fitMode: 'contain',
        showControls: false,
        videoDisabledDisplayMode: 'off',
        style: {
          buttonDisplayMode: 'off',
          audioLevelDisplayMode: 'off'
        }
      }
    };
  },

  computed: {
    audioIndicatorStyle() {
      return { height: `${this.audioLevel * 3}px` };
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  methods: {
    init() {
      this.subscriber = this.session.subscribe(
        this.stream,
        this.$refs.container,
        this.opts,
        err => {
          if (err) {
            this.$emit('error', err);
          } else {
            this.$emit('subscriberConnected', this.subscriber);
          }
        }
      );
      if (this.isMainView) {
        this.subscriber.setAudioVolume(0);
      }
      this.$emit('subscriber-created', this.subscriber);
      if (!this.isMainView) this.watchAudioLevel();
      this.subscriber.on('videoDisableWarning', () => this.handleVideoDisableWarning(true));
      this.subscriber.on('videoDisabled', () => this.handleVideoDisableWarning(true));
      this.subscriber.on('videoDisableWarningLifted', () => this.handleVideoDisableWarning(false));
      this.subscriber.on('videoEnabled', () => this.handleVideoDisableWarning(false));
    },

    handleVideoDisableWarning(status) {
      this.connectionProblem = status;
    },

    unsubscribe() {
      return this.session.unsubscribe(this.subscriber);
    },

    reinit() {
      this.unsubscribe();
      this.init();
    },

    watchAudioLevel() {
      let movingAvg = null;
      let activity = null;
      this.subscriber.on('audioLevelUpdated', event => {
        if (movingAvg === null || movingAvg <= event.audioLevel) {
          movingAvg = event.audioLevel;
        } else {
          movingAvg = (0.7 * movingAvg) + (0.3 * event.audioLevel);
        }

        // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
        const audioLevel = ((Math.log(movingAvg) / Math.LN10) / 1.5) + 1;
        this.audioLevel = Math.round(Math.min(Math.max(audioLevel, 0), 1) * 5);

        const now = Date.now();
        if (event.audioLevel > 0.2) {
          if (!activity) {
            activity = { timestamp: now, talking: false };
          } else if (activity.talking) {
            activity.timestamp = now;
          } else if ((now - activity.timestamp) > 1000) {
            // detected audio activity for more than 1s
            // for the first time.
            activity.talking = true;
            this.$emit('set-active-stream');
          }
        } else if (activity && now - activity.timestamp > 3000) {
          // detected low audio activity for more than 3s
          activity = null;
        }
      });
    },

    select() {
      this.subscriber.subscribeToAudio(false);
    }
  }
};
</script>

<style lang="scss">
@import "call-session-subscriber.scss";
</style>
