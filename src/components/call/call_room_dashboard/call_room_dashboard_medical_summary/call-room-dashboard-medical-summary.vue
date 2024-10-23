<template>
  <div class="CallRoomDashboardMedicalSummary__wrapper">
    <div class="CallRoomDashboardMedicalSummary__content custom-scrollbar-container">
      <div class="CallRoomDashboardMedicalSummary__block">
        <div class="CallRoomDashboardMedicalSummary__block-header">
          <div class="CallRoomDashboardMedicalSummary__block-title">
            {{ $t('global.medical_summary') }}
          </div>
        </div>

        <medical-summary-form
          :edit="!medicalSummaryProvided"
          class="CallRoomDashboardMedicalSummary__block-content"
          :patient-id="recipientPatientId"
          :record-id="recordId">
        </medical-summary-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import MedicalSummaryForm from '@/components/form/medical_summary_form/medical-summary-form';

export default {
  name: 'CallRoomDashboardMedicalSummary',

  components: {
    MedicalSummaryForm
  },

  computed: {
    ...mapGetters('call', [
      'recipientPatientId',
      'callEnded'
    ]),
    ...mapGetters('patientTimeline', [
      'recordId'
    ]),
    ...mapGetters('patientRecords', [
      'medicalSummary',
      'medicalSummaryProvided'
    ])
  },

  methods: {
    ...mapMutations('call', [
      'closeCall'
    ])
  }
};
</script>

<style lang="scss">
@import "call-room-dashboard-medical-summary.scss";
</style>
