<template>
  <div class="PatientDetails__wrapper">
    <div class="PatientDetails__header">
      <div class="PatientDetails__title">
        {{ $t('patients.patient_details') }}
      </div>
    </div>

    <div class="PatientDetails__content">
      <div class="PatientDetails__tabs shaded-outline">
        <div
          class="PatientDetails__tab ripple"
          :class="{ 'active': tabName === 'basic-info' }"
          @click="setTab('basic-info')"
          data-cy="PatientDetails__basic-info-tab">
          <div class="PatientDetails__tab-label">
            {{ $t('global.basic_info') }}
          </div>
        </div>
        <div
          class="PatientDetails__tab ripple"
          :class="{ 'active': tabName === 'health-info' }"
          @click="setTab('health-info')"
          data-cy="PatientDetails__health-info-tab">
          <div class="PatientDetails__tab-label">
            {{ $t('global.health_info') }}
          </div>
        </div>
        <div
          class="PatientDetails__tab ripple"
          :class="{ 'active': tabName === 'records' }"
          @click="setTab('records')"
          data-cy="PatientDetails__patient-records-tab">
          <div class="PatientDetails__tab-label">
            {{ $t('patients.patient_records') }}
          </div>
        </div>
      </div>
      <component
        :is="currentTab"
        :is-adult="isAdult">
      </component>
    </div>
  </div>
</template>

<script>
import PatientBasicInfo from './patient_basic_info/patient-basic-info';
import PatientHealthInfo from './patient_health_info/patient-health-info';
import PatientRecords from './patient_records/patient-records';

export default {
  name: 'PatientDetails',

  components: {
    PatientBasicInfo,
    PatientHealthInfo,
    PatientRecords
  },

  props: {
    isAdult: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      tabName: 'basic-info'
    };
  },

  computed: {
    currentTab() {
      return `patient-${this.tabName}`;
    }
  },

  methods: {
    setTab(tab) {
      this.tabName = tab;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-details.scss";
</style>
