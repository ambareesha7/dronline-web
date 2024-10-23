<template>
  <div class="CallRoomHeader__wrapper">
    <div
      class="CallRoomHeader__row secondary"
      :class="{ active: showControls }">
      <div class="CallRoomHeader__col">
        <div class="CallRoomHeader__call-duration-container">
          <i class="icon-duration CallRoomHeader__call-duration-icon"></i>
          <div class="CallRoomHeader__call-duration">{{ duration }}</div>
        </div>
      </div>
      <call-room-header-more-menu>
      </call-room-header-more-menu>
    </div>
    <div
      class="CallRoomHeader__row primary"
      :class="{ active: !showControls }">
      <img
        src="/static/images/logo-white.png"
        class="CallRoomHeader__logo"/>
      <div class="CallRoomHeader__col">
        <div class="CallRoomHeader__stream-name">
          {{ (activeStream || {}).name }}
        </div>
        <div
          v-if="adult"
          class="badge-green CallRoomHeader__child-badge">
          {{ $t('global.child') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';
import api from '@/api';
import { decode } from '@/utils/proto';
import CallRoomHeaderMoreMenu from './call_room_header_more_menu/call-room-header-more-menu';

const { mapMutations } = createNamespacedHelpers('call');
export default {
  name: 'CallRoomHeader',

  components: {
    CallRoomHeaderMoreMenu
  },

  props: {
    startedAt: {
      type: Number
    }
  },

  data() {
    return {
      interval: null,
      duration: null,
      basicInfo: null
    };
  },

  computed: {
    ...mapGetters('call', [
      'activeStream',
      'showControls',
      'recipientPatientId'
    ]),
    ...mapGetters('patient', [
      'adult'
    ]),
    patientName() {
      return this.basicInfo ? `${this.basicInfo.firstName} ${this.basicInfo.lastName}` : '...';
    }
  },

  mounted() {
    this.interval = setInterval(() => this.setDuration(), 1000);
    this.fetchPatientBasicInfo();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    async fetchPatientBasicInfo() {
      const data = await api.fetchPatientBasicInfo(this.recipientPatientId);
      const response = decode('patient_profile.GetBasicInfoResponse', data);
      this.basicInfo = response.basicInfo;
    },
    setDuration() {
      this.duration = '00:00';
      const start = Math.trunc(this.startedAt / 1000);
      const now = Math.trunc(new Date().getTime() / 1000);
      const stringify = n => {
        if (n.toString().length <= 1) {
          n = `0${n.toString()}`;
        }
        return n;
      };
      if (start && start < now) {
        const minutes = stringify(Math.trunc((now - start) / 60) % 60);
        const seconds = stringify((now - start) % 60);
        this.duration = `${minutes}:${seconds}`;
      }
      return this.duration;
    }
  }
};
</script>

<style lang="scss">
@import "call-room-header.scss";
</style>
