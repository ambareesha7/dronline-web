<template>
  <div class="PatientRecord__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="PatientRecord__title">
          {{ $t('global.details') }}
        </h3>
        <div class="PatientRecord__content">
          <div class="PatientRecord__col">
            <patient-record-timeline/>
            <div class="PatientRecord__row" v-if="record && record.type != 'usBoard'">
              <patient-attachments/>
            </div>
          </div>
          <div class="PatientRecord__col">
            <div class="PatientRecord__row">
              <patient-record-overview/>
            </div>
            <div class="PatientRecord__row" v-if="record && record.type === 'usBoard'">
              <div class="PatientRecord__row_header">
                <div class="title-medium">U.S Board</div>
              </div>
              <us-board-second-opinion-details class="PatientRecord__usboard" :request="{id: record.usBoard.usBoardRequestId}"/>
            </div>
            <div class="PatientRecord__row" v-if="record && record.type != 'usBoard'">
              <patient-record-review-of-system/>
            </div>
            <div class="PatientRecord__row">
              <patient-record-medical-summary/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PatientRecordTimeline from '@/components/patients/patient_record/patient_record_timeline/patient-record-timeline';
import PatientRecordOverview from '@/components/patients/patient_record/patient_record_overview/patient-record-overview';
import PatientAttachments from '@/components/patients/patient_record/patient_attachments/patient-attachments';
import PatientRecordMedicalSummary from '@/components/patients/patient_record/patient_record_medical_summary/patient-record-medical-summary';
import PatientRecordReviewOfSystem from '@/components/patients/patient_record/patient_record_review_of_system/patient-record-review-of-system';
import UsBoardSecondOpinionDetails from '@/components/us_board/us-board-second-opinion-details';

export default {
  name: 'PatientRecord',

  components: {
    PatientRecordTimeline,
    PatientRecordOverview,
    PatientRecordMedicalSummary,
    PatientRecordReviewOfSystem,
    PatientAttachments,
    UsBoardSecondOpinionDetails
  },
  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('patientRecords', ['record']),
  },
};
</script>

<style lang="scss">
.PatientRecord {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__title {
    font-size: 24px;
    color: #292929;
    padding-bottom: 24px;
  }

  &__content {
    display: flex;
  }

  &__col {
    width: 50%;
    &:first-of-type {
      padding-right: 15px;
    }
    &:last-of-type {
      padding-left: 15px;
    }
  }

  &__row {
    & + & {
      margin-top: 32px;
    }
  }
  &__row_header {
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    background-color: #fff;
  }
}
</style>
