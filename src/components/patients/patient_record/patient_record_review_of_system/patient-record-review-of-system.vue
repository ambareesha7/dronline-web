<template>
  <div
    class="PatientRecordReviewOfSystem__wrapper shaded-outline"
    data-cy="PatientRecord__overview">
    <div class="PatientRecordReviewOfSystem__header">
      <div class="title-medium">
        {{ $t('health_info.review_of_systems') }}
      </div>
      <btn
        v-if="reviewOfSystem"
        @onclick="showRosHistory"
        btn-class="blue"
        class="PatientRecordReviewOfSystem__header-action"
          :class="{ invalidate: !reviewOfSystem.form.fields}"
        :btn-label="$t('global.see_history')">
      </btn>
    </div>
    <div
      class="PatientRecordReviewOfSystem__content"
      v-if="reviewOfSystem">
      <review-of-systems-form
        :form-fields="reviewOfSystem.form.fields"
        :grid="false">
      </review-of-systems-form>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ReviewOfSystemsForm from '@/components/form/review_of_systems_form/review-of-systems-form';
import PatientReviewOfSystemsHistory from '@/components/patients/patient_review_of_systems_history/patient-review-of-systems-history';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patient');

export default {
  name: 'PatientRecordReviewOfSystem',

  components: {
    ReviewOfSystemsForm
  },

  computed: {
    ...mapGetters(['reviewOfSystem'])
  },

  mounted() {
    this.fetchPatientReviewOfSystem(this.$route.params.patientId);
  },

  beforeDestroy() {
    this.clearReviewOfSystem();
  },

  methods: {
    ...mapActions(['fetchPatientReviewOfSystem']),
    ...mapMutations(['clearReviewOfSystem']),
    showRosHistory() {
      this.$modal.show(
        PatientReviewOfSystemsHistory,
        {
          patientId: this.$route.params.patientId
        },
        {
          name: 'patient-review-of-system-history',
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
  @import "patient-record-review-of-system.scss";
</style>
