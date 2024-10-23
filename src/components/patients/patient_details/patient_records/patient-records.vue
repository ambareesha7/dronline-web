<template>
  <div
    class="PatientRecords__wrapper shaded-outline"
    data-cy="PatientRecords__view">
    <div
      v-if="records.length"
      class="PatientRecords__content">
      <table class="PatientRecords__table">
        <thead class="PatientRecords__table-header">
        <tr>
          <th class="PatientRecords__table-header-cell">
            {{ $t('global.start_date') }}
          </th>
          <th class="PatientRecords__table-header-cell">
            {{ $t('global.end_date') }}
          </th>
          <th class="PatientRecords__table-header-cell">
            {{ $t('global.type') }}
          </th>
          <th class="PatientRecords__table-header-cell">
            {{ $t('global.created_by') }}
          </th>
          <th class="PatientRecords__table-header-cell">
            {{ $t('global.with_whom') }}
            <i
              class="PatientRecords__tooltip-icon"
              @mouseenter="showTooltip = true"
              @mouseleave="showTooltip = false">
              ?
              <transition name="fade">
                <div
                  class="PatientRecords__tooltip"
                  v-if="showTooltip">
                  <div class="badge-red">
                    {{ $t('patients.urgent_care') }}
                  </div>
                  <div
                    class="PatientRecords__tooltip-text"
                    v-html="$t('patients.urgent_care_tip')">
                  </div>
                </div>
              </transition>
            </i>
          </th>
          <th>&nbsp;</th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <patient-records-record
            v-for="(record, index) in records"
            :key="index"
            :record="record">
          </patient-records-record>
        </transition-group>
      </table>
    </div>
    <div
      v-else-if="initializing"
      class="PatientRecords__initializing">
      <spinner></spinner>
    </div>
    <div
      v-else
      class="PatientRecords__no-results">
      {{ $t('patients.no_records') }}
    </div>

    <div
      class="PatientRecords__footer"
      v-if="nextToken">
      <btn
        class="PatientRecords__load-more"
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
import PatientRecordsRecord from './patient_records_record/patient-records-record';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('patientRecords');

export default {
  name: 'PatientRecords',

  components: {
    PatientRecordsRecord
  },

  data() {
    return {
      processing: false,
      initializing: false,
      showTooltip: false
    };
  },
  computed: {
    ...mapGetters(['records', 'nextToken'])
  },

  beforeMount() {
    this.init();
  },

  beforeDestroy() {
    this.clearRecords();
  },

  methods: {
    ...mapActions(['fetchPatientRecords']),
    ...mapMutations(['clearRecords']),
    init() {
      this.initializing = true;
      this.fetchPatientRecords(this.$route.params.id).then(({error}) => {
        this.initializing = false;
        if (error) this.$toastr.e(error.message);
      });
    },
    loadMore() {
      this.processing = true;
      this.fetchPatientRecords(this.$route.params.id).then(() => {
        this.processing = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
  @import "patient-records.scss";
</style>
