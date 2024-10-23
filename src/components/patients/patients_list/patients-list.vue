<template>
  <div class="PatientsList__wrapper">
    <div class="PatientsList__header">
      <div class="PatientsList__title">
        {{ $t('patients.your_patients') }}
      </div>
      <patients-list-search>
      </patients-list-search>
    </div>

    <div
      v-if="patients.length"
      class="PatientsList__content shaded-outline">
      <table class="table">
        <thead class="table-header">
        <tr>
          <th class="table-head-cell">{{ $t('global.first_name') }}</th>
          <th class="table-head-cell">{{ $t('global.last_name') }}</th>
          <th class="table-head-cell">{{ $t('global.dob') }}</th>
          <th class="table-head-cell">{{ $t('global.id') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <patients-list-patient
            v-for="(patient, index) in patients"
            :key="index"
            :patient="patient">
          </patients-list-patient>
        </transition-group>
      </table>
    </div>

    <div
      v-else-if="initializing"
      class="PatientsList__initializing">
      <spinner></spinner>
    </div>
    <div
      v-else
      class="PatientsList__no-results">
      {{ $t('patients.no_patients') }}
    </div>

    <div
      class="table-load-more-container"
      v-if="nextToken">
      <btn
        @onclick="loadMore"
        btn-class="submit"
        :btn-label="$t('global.load_more')"
        :btn-processing="processing">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PatientsListPatient from '@/components/patients/patients_list_patient/patients-list-patient';
import PatientsListSearch from '@/components/patients/patients_list_search/patients-list-search';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patients');

export default {
  name: 'PatientsList',

  data() {
    return {
      processing: false,
      initializing: false
    };
  },

  components: {
    PatientsListPatient,
    PatientsListSearch
  },

  computed: {
    ...mapGetters(['patients', 'nextToken'])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearPatients();
    this.resetFilter();
  },

  methods: {
    ...mapActions([
      'fetchPatients'
    ]),
    ...mapMutations([
      'clearPatients',
      'resetFilter'
    ]),
    init() {
      this.initializing = true;
      this.fetchPatients().then(() => {
        this.initializing = false;
      });
    },
    loadMore() {
      this.processing = true;
      this.fetchPatients().then(() => {
        this.processing = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patients-list.scss";
</style>
