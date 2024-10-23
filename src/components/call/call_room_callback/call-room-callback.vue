<template>
  <div class="CallRoomCallback__wrapper">
    <div
      v-if="sessionId"
      class="CallRoomCallback__video-container">
      <slot></slot>
    </div>
    <div
      v-else-if="initializing"
      class="CallRoomCallback__calling-container">
      <div class="CallRoomCallback__calling-icon-container">
        <i class="icon-phone-call CallRoomCallback__calling-icon"></i>
        <div class="CallRoomCallback__calling-icon-circle"></div>
        <div class="CallRoomCallback__calling-icon-circle"></div>
        <div class="CallRoomCallback__calling-icon-circle"></div>
        <div class="CallRoomCallback__calling-icon-circle"></div>
      </div>

      <div class="CallRoomCallback__calling-title">
        {{ $t('call_room.calling_back_gp') }}
      </div>
      <div class="CallRoomCallback__calling-description">
        {{ $t('call_room.please_hold') }}
      </div>

      <btn
        @onclick="close"
        btn-class="cancel"
        class="CallRoomCallback__cancel"
        :btn-label="$t('call_room.end_call')">
      </btn>
    </div>
    <div
      v-else
      class="CallRoomCallback__init-container">
      <div class="CallRoomCallback__init-title">
        {{ $t('call_room.no_call_connection') }}
      </div>
      <div class="CallRoomCallback__init-description">
        {{ $t('call_room.please_callback_to_gp') }}
      </div>
      <div class="form-actions">
        <btn
          @onclick="callback"
          btn-class="blue"
          :btn-label="$t('call_room.callback')">
        </btn>
        <btn
          @onclick="endDispatchAndCloseCall"
          btn-class="red"
          :btn-label="$t('call_room.end_dispatch')">
        </btn>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playLoop, stopPlaying } from '@/utils/sounds';

export default {
  name: 'CallRoomCallback',

  computed: {
    ...mapGetters('call', [
      'sessionId',
      'recipientPatientId',
      'initializing'
    ]),
    ...mapGetters('patientTimeline', [
      'recordId'
    ])
  },

  watch: {
    initializing(val) {
      val ? playLoop('phone-calling') : stopPlaying('phone-calling');
    }
  },

  methods: {
    ...mapMutations('call', ['callInitializing', 'endCall']),
    ...mapActions('queue', ['joinNursesQueue', 'leaveNursesQueue']),
    ...mapActions('dispatches', ['endDispatch']),
    ...mapMutations('dispatches', ['resetDispatch']),
    callback() {
      this.callInitializing();
      this.joinNursesQueue({
        patientId: this.recipientPatientId,
        recordId: this.recordId
      });
    },
    async endDispatchAndCloseCall() {
      await this.endDispatch();
      this.resetDispatch();
      this.endCall();
    },
    close() {
      this.leaveNursesQueue();
      this.callInitializing(false);
      stopPlaying('phone-calling');
    }
  }
};
</script>

<style lang="scss">
@import "call-room-callback.scss";
</style>
