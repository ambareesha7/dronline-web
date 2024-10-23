<template>
  <div
    class="CallRoom__wrapper"
    v-draggable="isDraggable"
    :class="size">

    <div
      v-if="notSupported"
      class="CallRoom__container">
      <call-room-browser-not-supported>
      </call-room-browser-not-supported>
    </div>

    <div
      v-else-if="callEnded"
      class="CallRoom__container">
      <call-ended>
      </call-ended>
    </div>

    <div
      v-else-if="isGP || isDoctor"
      class="CallRoom__container">
      <call-session :stream-name="streamName" />
    </div>

    <call-room-callback
      v-else-if="isNurse"
      class="CallRoom__container">
      <call-session :stream-name="streamName" />
    </call-room-callback>

    <call-room-dashboard>
    </call-room-dashboard>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getBrowserVersion } from '@/utils';
import draggable from '@/directives/draggable.directive';
import CallSession from '@/components/call/call_session/call-session';
import CallRoomCallback from '@/components/call/call_room_callback/call-room-callback';
import CallRoomDashboard from '@/components/call/call_room_dashboard/call-room-dashboard';
import CallRoomBrowserNotSupported from '@/components/call/call_room_browser_not_supported/call-room-browser-not-supported';
import CallEnded from '@/components/call/call_ended/call-ended';
import { MEDICAL_TITLE } from '@/constants';

export default {
  name: 'CallRoom',

  components: {
    CallSession,
    CallRoomDashboard,
    CallRoomCallback,
    CallRoomBrowserNotSupported,
    CallEnded
  },

  directives: {
    draggable
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isNurse',
      'isDoctor',
      'basicInfo'
    ]),
    ...mapGetters('call', [
      'size',
      'callEnded'
    ]),

    isDraggable() {
      return this.size === 'minimized';
    },

    notSupported() {
      
      const ua = navigator.userAgent.toLowerCase();
      
      const isChrome = ua.includes('chrome') || ua.includes('crios'); 
      //CRIOS //iPhone/ipad Chrome //Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1

      const isFirefox = ua.includes('firefox');
      
      const CriOS = ua.includes('crios');
      
      const isSafari = !ua.includes('crios') && ua.includes('safari') && getBrowserVersion() >= 11;
      
      return !(isChrome || isFirefox || isSafari);

    },

    streamName() {
      const medTitle = this.basicInfo.medicalTitle ?
        this.$t(`medical_title.${MEDICAL_TITLE[this.basicInfo.medicalTitle]}`) :
        null;
      const medTitleString = medTitle ?
        `${medTitle} ` :
        '';
      return this.basicInfo ?
        `${medTitleString}${this.basicInfo.firstName} ${this.basicInfo.lastName}` :
        null;
    }
  },

  beforeDestroy() {
    this.closeCall();
  },

  created() {
    window.addEventListener('beforeunload', () => {
      this.closeCall();
    });
  },

  methods: {
    ...mapMutations('call', [
      'closeCall'
    ])
  }
};
</script>

<style lang="scss">
@import "call-room.scss";
</style>
