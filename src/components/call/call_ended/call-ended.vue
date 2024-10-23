<template>
  <div class="CallEnded__wrapper custom-scrollbar-container">
    <div class="CallEnded__header">
      <img
        src="/static/images/logo.png"
        class="CallEnded__logo" />
      <div class="CallEnded__icon-container">
        <div class="CallEnded__icon">
          <i class="icon-end-phone-call"></i>
        </div>
      </div>
      <div class="CallEnded__title">
        {{ $t('call_room.video_call_has_ended') }}
      </div>
      <div
        class="CallEnded__description"
        v-html="$t('call_room.provide_medical_summary_description')">
      </div>
    </div>
    <div class="CallEnded__content">
      <medical-summary-form
        :edit="medSummaryEditMode"
        :patient-id="recipientPatientId"
        :record-id="recordId"
        :skip-patient-notification="true"
        :skippable="true"
        @close="setEditMode"
        @skip="skipMedicalSummary">
      </medical-summary-form>

      <div
        v-if="error"
        class="form-row form-help is-danger">
        {{ error }}
      </div>

      <div
        v-if="!medSummaryEditMode"
        class="form-actions full">
        <btn
          @onclick="cancel"
          btn-class="cancel"
          :btn-label="$t('global.edit')">
        </btn>
        <btn
          @onclick="submit"
          btn-class="blue-filled"
          :btn-label="$t('global.confirm')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import MedicalSummaryForm from '@/components/form/medical_summary_form/medical-summary-form';

export default {
  name: 'CallEnded',

  components: {
    MedicalSummaryForm
  },

  data() {
    return {
      medSummaryEditMode: false,
      error: null
    };
  },

  computed: {
    ...mapGetters('call', ['recipientPatientId']),
    ...mapGetters('patientTimeline', ['recordId']),
    ...mapGetters('patientRecords', ['medicalSummaryProvided'])
  },

  mounted() {
    this.setEditMode();
  },

  methods: {
    ...mapMutations('call', ['closeCall']),
    ...mapMutations('patientRecords', ['clearMedicalSummary']),
    ...mapActions('patientRecords', ['addMedicalSummary']),
    setEditMode() {
      this.medSummaryEditMode = !this.medicalSummaryProvided;
    },
    cancel() {
      this.medSummaryEditMode = true;
    },
    skipMedicalSummary() {
      this.closeCall();
      this.clearMedicalSummary();
    },
    submit() {
      this.addMedicalSummary({
        patient_id: this.recipientPatientId,
        record_id: this.recordId
      }).then(({ error }) => {
        if (error) {
          this.error = error.message;
        } else {
          this.closeCall();
          this.clearMedicalSummary();
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "call-ended.scss";
</style>
