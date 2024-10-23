<template>
  <div
    class="PatientHealthInfo__wrapper"
    data-cy="PatientHealthInfo__view">
    <div class="PatientHealthInfo__block shaded-outline">
      <div class="PatientHealthInfo__block-header">
        <div class="PatientHealthInfo__block-title">
          {{ $t('health_info.the_latest_vitals') }}
        </div>
        <div class="PatientHealthInfo__header-actions">
          <btn
            @onclick="showVitalsHistory"
            btn-class="blue"
            class="PatientHealthInfo__block-header-button"
            :class="{ invalidate: !Object.keys(vitals).length}"
            :btn-label="$t('global.see_history')">
          </btn>
        </div>
      </div>
      <patient-vitals
        :vitals="vitals">
      </patient-vitals>
    </div>

    <div class="PatientHealthInfo__block shaded-outline">
      <div class="PatientHealthInfo__block-header">
        <div class="PatientHealthInfo__block-title">
          {{ $t('health_info.review_of_systems') }}
        </div>
        <div class="PatientHealthInfo__header-actions">
          <btn
            v-if="isGP || isNurse"
            @onclick="updateRos"
            btn-class="blue"
            class="PatientHealthInfo__block-header-button"
            :btn-label="$t('global.update')">
          </btn>
          <btn
            @onclick="showRosHistory"
            btn-class="blue"
            class="PatientHealthInfo__block-header-button"
            :class="{ invalidate: !reviewOfSystem.form.fields}"
            :btn-label="$t('global.see_history')">
          </btn>
        </div>
      </div>

      <div class="PatientHealthInfo__block-content">
        <review-of-systems-form
          :form-fields="reviewOfSystem.form.fields">
        </review-of-systems-form>
      </div>
    </div>

    <div class="PatientHealthInfo__block shaded-outline">
      <div class="PatientHealthInfo__block-header">
        <div class="PatientHealthInfo__block-title">
          {{ $t('health_info.histories') }}
        </div>
      </div>

      <form-section
        v-for="section in historySections"
        :key="section"
        :section-name="section"
        block-name="histories"
        :patient-id="patientId">
          <span
            class="PatientHealthInfo__section-title"
            v-if="titles.histories[section]"
            slot="title">
            {{ $t('health_info.' + titles.histories[section]) }}
          </span>
      </form-section>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapGetters } from 'vuex';
import FormSection from '@/components/form/form_section/form-section';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';
import PatientReviewOfSystemsHistory from '@/components/patients/patient_review_of_systems_history/patient-review-of-systems-history';
import PatientVitalsHistory from '@/components/patients/patient_vitals_history/patient-vitals-history';
import PatientReviewOfSystemsUpdate from '@/components/patients/patient_review_of_systems_update/patient-review-of-systems-update';
import PatientVitals from '@/components/patients/patient_vitals/patient-vitals';

const { mapActions, mapMutations } = createNamespacedHelpers('patient');

export default {
  name: 'PatientHealthInfo',

  components: {
    FormSection,
    ReviewOfSystemsForm,
    PatientVitals
  },

  data() {
    return {
      patientId: this.$route.params.id,
      titles: {
        histories: {
          social: 'social_history',
          medical: 'past_medical_history',
          surgical: 'surgical_history',
          family: 'family_history',
          allergy: 'allergy_history',
          immunization: 'immunization_history'
        }
      }
    };
  },

  computed: {
    ...mapGetters('patient', [
      'histories',
      'reviewOfSystem',
      'vitals'
    ]),
    ...mapGetters('profile', [
      'isGP',
      'isNurse'
    ]),
    historySections() {
      return Object.keys(this.histories);
    }
  },

  beforeMount() {
    this.init();
  },

  destroyed() {
    this.clearEditableSection();
    this.clearReviewOfSystem();
    this.clearVitals();
  },

  methods: {
    ...mapActions([
      'fetchPatientHistory',
      'fetchPatientReviewOfSystem',
      'fetchVitals'
    ]),
    ...mapMutations([
      'clearEditableSection',
      'clearReviewOfSystem',
      'clearVitals'
    ]),
    init() {
      this.fetchPatientReviewOfSystem(this.patientId);
      this.fetchPatientHistory(this.patientId);
      this.fetchVitals(this.patientId);
    },
    showRosHistory() {
      this.$modal.show(
        PatientReviewOfSystemsHistory,
        {
          patientId: this.patientId
        },
        {
          name: 'patient-review-of-systems-history',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    showVitalsHistory() {
      this.$modal.show(
        PatientVitalsHistory,
        {
          patientId: this.patientId
        },
        {
          name: 'patient-vitals-history',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    updateRos() {
      this.$modal.show(
        PatientReviewOfSystemsUpdate,
        {
          patientId: this.patientId
        },
        {
          name: 'patient-review-of-systems-update',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-health-info.scss";
</style>
