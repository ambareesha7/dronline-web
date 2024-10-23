<template>
  <div
    class="FamilyMemberCallRoom__wrapper">

    <div
      v-if="notSupported"
      class="FamilyMemberCallRoom__container">
      <call-room-browser-not-supported>
      </call-room-browser-not-supported>
    </div>

    <div
      v-else-if="callEnded"
      class="FamilyMemberCallRoom__container">
      <family-member-call-ended>
      </family-member-call-ended>
    </div>

    <div
      v-else
      class="FamilyMemberCallRoom__container">
      <call-session
        :is-family-member-call="true"
        :stream-name="familyMemberName">
      </call-session>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { getBrowserVersion } from '@/utils';
import draggable from '@/directives/draggable.directive';
import CallSession from '@/components/call/call_session/call-session';
import CallRoomBrowserNotSupported from '@/components/call/call_room_browser_not_supported/call-room-browser-not-supported';
import FamilyMemberCallEnded from '@/components/call/family_member_call_room/family_member_call_ended/family-member-call-ended';

export default {
  name: 'FamilyMemberCallRoom',

  components: {
    CallSession,
    CallRoomBrowserNotSupported,
    FamilyMemberCallEnded
  },

  props: {
    familyMemberName: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters('call', [
      'callEnded'
    ]),

    notSupported() {
      const ua = navigator.userAgent.toLowerCase();
      
      const isChrome = ua.includes('chrome') || ua.includes('crios'); 
      //CRIOS //iPhone/ipad Chrome //Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.89 Mobile/15E148 Safari/604.1

      const isFirefox = ua.includes('firefox');
      
      const CriOS = ua.includes('crios');
      
      const isSafari = !ua.includes('crios') && ua.includes('safari') && getBrowserVersion() >= 11;
      
      return !(isChrome || isFirefox || isSafari);
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
@import "family-member-call-room.scss";
</style>
