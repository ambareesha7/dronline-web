<template>
  <div
    class="CallSessionPublisher__wrapper"
    @click="$emit('select-publisher-stream')"
    :class="{ selected: isSelected }">
    <div
      ref="container"
      class="CallSessionPublisher__container">
    </div>
    <div
      class="CallSessionPublisher__audio-indicator"
      :style="audioIndicatorStyle">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { checkUserMedia } from '@/utils';

export default {
  name: 'CallSessionPublisher',

  props: {
    session: {
      type: OT.Session,
      required: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    streamName: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      audioLevel: null,
      opts: {
        width: 118,
        height: 89,
        fitMode: 'contain',
        publishVideo: true,
        publishAudio: true,
        style: {
          buttonDisplayMode: 'off',
          archiveStatusDisplayMode: 'off'
        }
      }
    };
  },

  computed: {
    ...mapGetters('profile', [
      'basicInfo'
    ]),
    ...mapGetters('call', [
      'publisher',
      'videoAccessible'
    ]),
    audioIndicatorStyle() {
      return { height: `${this.audioLevel * 3}px` };
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapMutations('call', [
      'setPublisher',
      'setVideoAccessible'
    ]),

    async init() {
      const videoAccessible = await checkUserMedia();
      this.setVideoAccessible(videoAccessible);
      this.opts.publishVideo = videoAccessible;

      const publisher = OT.initPublisher(
        this.$refs.container,
        {
          ...this.opts,
          name: this.streamName
        },
        err => {
          if (err) {
            this.$emit('error', err);
          } else {
            this.$emit('publisher-completed');
          }
        }
      );
      this.$emit('publisher-created', publisher);
      const publish = () => {
        this.session.publish(publisher, err => {
          if (err) {
            this.$emit('error', err);
          } else {
            this.setPublisher(publisher);
            this.watchAudioLevel(publisher);
            this.$emit('publisher-connected', publisher);
          }
        });
      };
      if (this.session && this.session.isConnected()) {
        publish();
      }
      if (this.session) {
        this.session.on('sessionConnected', publish);
      }
    },

    watchAudioLevel(publisher) {
      let movingAvg = null;
      publisher.on('audioLevelUpdated', event => {
        if (movingAvg === null || movingAvg <= event.audioLevel) {
          movingAvg = event.audioLevel;
        } else {
          movingAvg = (0.7 * movingAvg) + (0.3 * event.audioLevel);
        }

        // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
        const audioLevel = ((Math.log(movingAvg) / Math.LN10) / 1.5) + 1;
        this.audioLevel = Math.round(Math.min(Math.max(audioLevel, 0), 1) * 5);
      });
    }
  }
};
</script>

<style lang="scss">
@import "call-session-publisher.scss";
</style>
