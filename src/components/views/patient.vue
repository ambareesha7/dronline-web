<template>
  <div class="Patient__wrapper">
    <div class="content">
      <div class="content-inner">
        <div class="Patient__section">
          <patient-details
            :is-adult="isAdult">
          </patient-details>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientDetails from '@/components/patients/patient_details/patient-details';
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patient');

export default {
  name: 'Patient',

  components: {
    PatientDetails
  },

  computed: {
    ...mapGetters([
      'adult'
    ]),
    isAdult() {
      return !!this.$route.query.patientId;
    }
  },

  mounted() {
    this.init(this.$route.params.id);
  },

  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      this.clearRelations();
      this.init(to.params.id);
    }
    next();
  },

  beforeDestroy() {
    this.clearRelations();
  },

  methods: {
    ...mapActions([
      'fetchPatientBasicInfo',
      'fetchPatientAddress',
      'fetchPatientInsurance',
      'fetchPatientRelationships'
    ]),
    ...mapMutations([
      'clearRelations'
    ]),
    async init(id) {
      this.fetchPatientBasicInfo(id);
      this.fetchPatientAddress(id);
      this.fetchPatientInsurance(id);
      await this.fetchPatientRelationships(id);
      if (this.adult && !this.$route.query.parentId) {
        this.$router.replace({
          name: this.$router.name,
          params: this.$router.params,
          query: { parentId: this.adult.id }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.Patient {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
