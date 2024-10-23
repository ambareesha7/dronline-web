<template>
  <div class="CallRoomFooter__wrapper">
    <div
      class="CallRoomFooter__content"
      :class="{'active': showControls}">
      <div
        class="CallRoomFooter__end-call"
        v-on-hover="setHoldControls"
        @click="$emit('end-call')">
        <i class="icon-end-phone-call"></i>
      </div>

      <div
        v-if="!isFamilyMemberCall"
        class="CallRoomFooter__toggle-full-screen"
        @click="setFullScreen(!fullScreen)"
        v-tooltip.top.end="fullScreenIconTooltip">
        <i :class="[fullScreen ? 'icon-full-screen-out' : 'icon-full-screen-in']"></i>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import onHover from '@/directives/on-hover.directive';

const { mapGetters, mapMutations } = createNamespacedHelpers('call');
export default {
  name: 'CallRoomFooter',

  directives: {
    onHover
  },

  props: {
    isFamilyMemberCall: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters(['showControls', 'fullScreen']),
    fullScreenIconTooltip() {
      return {
        content: this.$t(`call_room.click_to_${this.fullScreen ? 'disable' : 'enable'}_fullscreen`),
        class: 'custom-tooltip',
        offset: 12
      };
    }
  },

  methods: {
    ...mapMutations(['setFullScreen', 'setHoldControls'])
  }
};
</script>

<style lang="scss">
@import "call-room-footer.scss";
</style>
