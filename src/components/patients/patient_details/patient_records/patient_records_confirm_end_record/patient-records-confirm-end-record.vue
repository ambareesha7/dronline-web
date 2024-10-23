<template>
  <div class="PatientRecordsConfirmEndRecord__wrapper">
    <div class="PatientRecordsConfirmEndRecord__header">
      <img
        src="/static/images/attention-triangle.svg"
        class="PatientRecordsConfirmEndRecord__header-icon" />
      <i
        class="icon-close PatientRecordsConfirmEndRecord__close-icon"
        @click="close"></i>
    </div>
    <div class="PatientRecordsConfirmEndRecord__content">
      <div class="PatientRecordsConfirmEndRecord__title">
        {{ $t('patients.end_record_title') }}
      </div>
      <div
        class="PatientRecordsConfirmEndRecord__description"
        v-html="$t('patients.end_record_description', [name])">
      </div>

      <div class="PatientRecordsConfirmEndRecord__footer form-actions full">
        <btn
          class="PatientRecordsConfirmEndRecord__confirm"
          @onclick="confirm(); close();"
          btn-class="red"
          :btn-label="$t('global.yes')">
        </btn>
        <btn
          class="PatientRecordsConfirmEndRecord__cancel"
          @onclick="close"
          btn-class="blue"
          :btn-label="$t('global.no_keep')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientRecordsConfirmEndRecord',

  props: {
    name: {
      type: String,
      required: true
    },
    confirm: {
      required: true,
      type: Function
    }
  },

  methods: {
    close() {
      this.$modal.hide('patient-records-confirm-end-record');
    }
  }
};
</script>
<style scoped lang="scss">
@import "patient-records-confirm-end-record.scss";
</style>
