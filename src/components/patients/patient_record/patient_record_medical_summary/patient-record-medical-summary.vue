<template>
  <div
    class="PatientRecordMedicalSummary__wrapper shaded-outline"
    data-cy="PatientRecord__medical-summary">
    <div class="PatientRecordMedicalSummary__header">
      <div class="PatientRecordMedicalSummary__title">
        {{ $t('global.medical_summary') }}
      </div>
    </div>

    <div class="PatientRecordMedicalSummary__tabs">
      <div
        class="PatientRecordMedicalSummary__tab ripple"
        :class="{ 'active': tabName === 'gp' }"
        @click="setTab('gp')"
        data-cy="PatientRecord__medical-summary-gp-tab">
        {{ $t('user_roles.gp') }}
      </div>
      <div
        class="PatientRecordMedicalSummary__tab ripple"
        :class="{ 'active': tabName === 'nurse' }"
        @click="setTab('nurse')"
        data-cy="PatientRecord__medical-summary-nurse-tab">
        {{ $t('user_roles.nurse') }}
      </div>
      <div
        class="PatientRecordMedicalSummary__tab ripple"
        :class="{ 'active': tabName === 'external' }"
        @click="setTab('external')"
        data-cy="PatientRecord__medical-summary-doctor-tab">
        {{ $t('global.specialist') }}
      </div>
    </div>

    <div class="PatientRecordMedicalSummary__content">
      <div
        v-for="(medicalSummary, index) in medicalSummariesPerSpecialist"
        :key="index"
        class="PatientRecordMedicalSummary__entity">

        <div
          class="PatientRecordMedicalSummary__entity__outdated-tag"
          v-if="medicalSummary.editedAt"
        >
          {{ $t('patient_records.replaced_by_newer') }}
          {{medicalSummary.editedAt.timestamp | moment('YYYY/MM/DD hh:mm A')}}
        </div>

        <div
          v-if="medicalSummary.specialist"
          class="PatientRecordMedicalSummary__entity-specialist-card">
          <div
            class="PatientRecordMedicalSummary__entity-specialist-card-avatar"
            :style="{'background-image': `url(${medicalSummary.specialist.avatarUrl})`}"></div>
          <div class="PatientRecordMedicalSummary__entity-specialist-card-info">
            <div class="PatientRecordMedicalSummary__entity-specialist-card-name">
              {{ medicalSummary.specialist.firstName }} {{ medicalSummary.specialist.lastName }}
            </div>
            <div class="PatientRecordMedicalSummary__entity-specialist-card-role">
              {{ getUserRole(medicalSummary.specialist.type) }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="PatientRecordMedicalSummary__entity-specialist-card">
          <div class="PatientRecordMedicalSummary__entity-specialist-card-avatar icon">
            <i class="icon-person"></i>
          </div>
          <div class="PatientRecordMedicalSummary__entity-specialist-card-info no-provider">
            {{ $t('global.no_provider') }}
          </div>
        </div>
        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
            {{ $t('patients.interview_summary') }}
          </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col PatientRecordMedicalSummary__value"
              v-html="medicalSummary.interviewSummary">
            </div>
          </div>
        </div>
        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
            {{ $t('patients.diagnosis') }}
          </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div class="form-col PatientRecordMedicalSummary__value">
              <div
                class="PatientRecordMedicalSummary__value__list-item"
                v-for="item in medicalSummary.conditions" :key="item.id">
                  {{item.id}} {{item.name}}
              </div>
            </div>
          </div>
        </div>

        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
              {{ $t('patients.procedures') }}
            </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div class="form-col PatientRecordMedicalSummary__value">
              <div
                class="PatientRecordMedicalSummary__value__list-item"
                v-for="item in medicalSummary.procedures" :key="item.id">
                  {{item.id}} {{item.name}}
              </div>
            </div>
          </div>
        </div>

        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
            {{ $t('patients.plan') }}
          </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col PatientRecordMedicalSummary__value"
              v-html="medicalSummary.plan">
            </div>
          </div>
        </div>

        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
            {{ $t('patients.impression') }}
          </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col PatientRecordMedicalSummary__value"
              v-html="medicalSummary.impression">
            </div>
          </div>
        </div>

        <div class="PatientRecordMedicalSummary__section">
          <div class="PatientRecordMedicalSummary__section-title">
            {{ $t('patients.diagnostic_testing') }}
          </div>
          <div class="form-row--cols PatientRecordMedicalSummary__row">
            <div class="form-col PatientRecordMedicalSummary__label">
              {{ $t('global.description') }}
            </div>
            <div
              class="form-col PatientRecordMedicalSummary__value"
              v-html="medicalSummary.diagnosticTesting">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import PatientRecordInterruptedCallModal from '@/components/patients/patient_record/patient_record_interrupted_call_modal/patient-record-interrupted-call-modal';
import MedicalSummaryForm from '@/components/form/medical_summary_form/medical-summary-form';
import { USER_ROLE } from '@/constants';
import { log } from 'util';
import api from '@/api';

export default {
  name: 'PatientRecordMedicalSummary',

  data() {
    return {
      tabName: 'gp'
    };
  },

  computed: {
    ...mapGetters('patientRecords', ['medicalSummaries', 'record']),
    summaries() {
      const summaries = {};
      this.medicalSummaries.forEach(summary => {
        const type = USER_ROLE[summary.specialist.type];
        if (!summaries[type]) summaries[type] = [];
        summaries[type].push({
          ...summary.medicalSummaryData,
          editedAt: summary.editedAt,
          conditions: summary.conditions,
          procedures: summary.procedures,
          specialist: summary.specialist
        });
      });
      return summaries;
    },
    medicalSummariesPerSpecialist() {
      return this.summaries[this.tabName] || [{}];
    },
    isRecordEnded() {
      return this.record && !!this.record.endDate;
    }
  },

  beforeMount() {
    this.fetch();
  },

  mounted() {
    if (this.$route.query.pending_medical_summary) {
      setTimeout(() => {
        this.showInterruptedCallModal();
        this.$router.replace({query: {}});
      }, 600);
    }
  },

  methods: {
    ...mapMutations('patientRecords', ['clearMedicalSummary']),
    ...mapActions('patientRecords', ['fetchMedicalSummary']),
    setTab(tab) {
      this.tabName = tab;
    },
    async fetch() {
      await this.fetchMedicalSummary({
        patient_id: this.$route.params.patientId,
        record_id: this.$route.params.id
      });
    },
    onClose() {
      this.fetch();
      this.clearMedicalSummary();
    },
    showInterruptedCallModal() {
      this.$modal.show(
        PatientRecordInterruptedCallModal,
        {
          provide: () => this.addMedicalSummary(),
          skip: () => this.skipMedicalSummary()
        },
        {
          name: 'patient-record-interrupted-call-modal',
          width: 520,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          scrollable: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    },
    skipMedicalSummary() {
      api.skipMedicalSummary({
        patient_id: this.$route.params.patientId,
        record_id: this.$route.params.id
      });
    },
    addMedicalSummary() {
      this.$modal.show(
        MedicalSummaryForm,
        {
          patientId: this.$route.params.patientId,
          recordId: this.$route.params.id
        },
        {
          name: 'patient-record-medical-summary-form-modal',
          width: 470,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          scrollable: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        },
        {
          'before-close': this.onClose
        }
      );
    },

    getUserRole(type) {
      return USER_ROLE[type];
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-record-medical-summary.scss";
</style>
