<template>
  <div class="TimelineEntityCallRecording__wrapper">
    <div class="TimelineEntityCallRecording__header">
      <div class="TimelineEntityCallRecording__header-col">
        <div class="TimelineEntityCallRecording__title">
          {{ $t('call_room.video_call_log') }}
        </div>
        <div class="TimelineEntityCallRecording__time">
          {{ entity.timestamp | moment('YYYY/MM/DD hh:mm A') }}
        </div>
      </div>
    </div>

    <div
      class="TimelineEntityCallRecording__content"
      :class="{ ready }"
      ref="videoPlayerContainer">
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        :events="['fullscreenchange']"
        @ended="onPlayerEnded($event)"
        @statechanged="playerStateChanged($event)"
        @fullscreenchange="fullscreenCahnged($event)"
        @ready="playerIsReady">
      </video-player>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { USER_ROLE } from '@/constants';

export default {
  name: 'TimelineEntityCallRecording',

  props: {
    entity: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      ready: false,
      isFullscreen: false
    };
  },

  computed: {
    playerOptions() {
      return {
        sources: [{
          type: 'video/mp4',
          src: this.entity.callRecording.videoUrl
        }],
        poster: this.entity.callRecording.thumbnailUrl
      };
    }
  },

  methods: {
    toggleFullscreen() {
      if (this.isFullscreen) {
        this.$refs.videoPlayer.player.exitFullscreen();
      } else {
        this.$refs.videoPlayer.player.requestFullscreen();
      }
    },
    togglePlayer() {
      if (this.$refs.videoPlayer.player.paused()) {
        this.$refs.videoPlayer.player.play();
      } else {
        this.$refs.videoPlayer.player.pause();
      }
    },
    playerStateChanged({ canplaythrough }) {
      if (canplaythrough) this.ready = true;
    },
    fullscreenCahnged(e) {
      this.isFullscreen = e.isFullscreen();
    },
    onPlayerEnded(player) {
      if (this.isFullscreen) player.exitFullscreen();
      player.currentTime(0);
    },
    playerIsReady(player) {
      const watermark = document.createElement('div');
      watermark.classList.add('TimelineEntityCallRecording__watermark');
      watermark.addEventListener('click', this.togglePlayer, false);
      watermark.addEventListener('dblclick', this.toggleFullscreen, false);
      player.el_.appendChild(watermark);
      player.el_.querySelector('video').addEventListener('dblclick', this.toggleFullscreen, false);
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-call-recording.scss";
</style>
