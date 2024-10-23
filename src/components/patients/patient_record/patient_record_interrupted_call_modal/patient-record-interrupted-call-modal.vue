<template>
  <div class="PatientRecordInterruptedCallModal__wrapper">
    <div class="PatientRecordInterruptedCallModal__header">
      <div class="title PatientRecordInterruptedCallModal__title">
        {{ $t('call_room.interrupted_call') }}
      </div>
    </div>
    <div class="form-row">
      <div class="PatientRecordInterruptedCallModal__description">
        {{ $t('call_room.interrupted_call_description') }}
      </div>
    </div>
    <div class="form-row form-actions full">
      <!--
      todo later
      <btn
        @onclick="close"
        btn-class="green"
        :btn-label="$t('call_room.rejoin')">
      </btn> -->
      <btn
        @onclick="skip();$emit('close')"
        btn-class="gray"
        :btn-label="$t('global.skip')">
      </btn>
      <btn
        @onclick="provide();$emit('close')"
        btn-class="blue-filled"
        :btn-label="$t('global.med_summary')">
      </btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PatientRecordInterruptedCallModal',

  props: {
    provide: {
      type: Function,
      required: true
    },
    skip: {
      type: Function,
      required: true
    }
  },

  methods: {
    close() {
      this.$toastr.e('Not supported yet');
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-interrupted-call-modal.scss";
</style>
