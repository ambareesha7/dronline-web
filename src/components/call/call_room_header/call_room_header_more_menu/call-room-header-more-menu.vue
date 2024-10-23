<template>
  <div class="CallRoomHeaderMoreMenu__wrapper">
    <div
      class="CallRoomHeaderMoreMenu__trigger"
      v-on-hover="hover"
      @click="toggleMenu"
      v-tooltip.bottom.end="toggleMenuTooltip"
      :class="{ invalidate: !publisher }">
      <i class="icon-more-vert"></i>
    </div>

    <transition
      name="scale-vertically"
      mode="out-in">
      <div
        v-if="isOpen"
        v-on-click-outside="toggleMenu"
        class="CallRoomHeaderMoreMenu__dropdown">
        <div
          class="CallRoomHeaderMoreMenu__action"
          @click="takeScreenshot">
          {{ $t('call_room.capture_an_image') }}
        </div>
        <div
          class="CallRoomHeaderMoreMenu__action"
          :class="{'invalidate': !videoAccessible}"
          @click="toggleVideo">
          {{ toggleVideoLabel }}
        </div>
        <div
          class="CallRoomHeaderMoreMenu__action"
          @click="toggleAudio">
          {{ toggleAudioLabel }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import onHover from '@/directives/on-hover.directive';
import CallScreenshotModal from '@/components/call/call_screenshot_modal/call-screenshot-modal';
import { playOnce } from '@/utils/sounds';

const { mapGetters, mapMutations } = createNamespacedHelpers('call');
export default {
  name: 'CallRoomHeaderMoreMenu',

  directives: {
    onHover
  },

  data() {
    return {
      isOpen: false,
      audio: true,
      video: true
    };
  },

  computed: {
    ...mapGetters([
      'publisher',
      'videoAccessible',
      'activeSubscriber'
    ]),
    toggleMenuTooltip() {
      return {
        content: this.$t('call_room.click_to_show_options'),
        class: 'custom-tooltip',
        offset: 12
      };
    },
    toggleVideoLabel() {
      return this.$t(`call_room.turn_${this.video ? 'off' : 'on'}_camera`);
    },
    toggleAudioLabel() {
      return this.$t(`call_room.${this.audio ? 'mute' : 'unmute'}`);
    }
  },

  methods: {
    ...mapMutations(['setHoldControls']),
    toggleMenu(e) {
      if (e) e.stopPropagation();
      this.isOpen = !this.isOpen;
      this.setHoldControls(this.isOpen);
    },
    hover(state) {
      if (this.isOpen) return;
      this.setHoldControls(state);
    },
    toggleVideo() {
      this.video = !this.video;
      this.publisher.publishVideo(this.video);
      this.toggleMenu();
    },
    toggleAudio() {
      this.audio = !this.audio;
      this.publisher.publishAudio(this.audio);
      this.toggleMenu();
    },
    takeScreenshot() {
      const imageData = this.activeSubscriber.getImgData();
      const name = this.activeSubscriber.stream.name;
      if (imageData) {
        playOnce('screenshot');
        this.$modal.show(
          CallScreenshotModal,
          { imageData, name },
          {
            name: 'call-screenshot-modal',
            width: 360,
            height: 'auto',
            adaptive: true,
            draggable: true,
            clickToClose: false,
            transition: 'fade',
            pivotX: 0.99,
            pivotY: 0.99
          }
        );
      } else {
        this.$toastr.e(this.$t('call_room.subscriber_has_no_video'));
      }
      this.toggleMenu();
    }
  }
};
</script>

<style lang="scss">
@import "call-room-header-more-menu.scss";
</style>
