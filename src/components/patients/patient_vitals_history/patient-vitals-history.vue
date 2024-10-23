
<template>
  <fullscreen-modal-wrapper
    :title="$t('health_info.the_latest_vitals_history')"
    @close="$emit('close')">
    <div
      class="PatientVitalsHistory__section shaded-outline"
      v-for="(section, index) in vitalsHistory"
      :key="index">
      <div class="PatientVitalsHistory__section-header">
        <div class="PatientVitalsHistory__section-title">
          {{ section.insertedAt | moment('YYYY/MM/DD hh:mm A') }}
        </div>
        <i
          class="icon-caret PatientVitalsHistory__section-toggle"
          :class="{ active: selected === index }"
          @click="toggle(index)"></i>
      </div>
      <div
        v-if="selected === index"
        class="PatientVitalsHistory__section-content">
        <patient-vitals
          :vitals="section"
          @close="$emit('close')">
        </patient-vitals>
      </div>
    </div>
    <spinner v-if="initializing"></spinner>
    <div
      class="form-actions center"
      v-if="vitalsHistoryNextToken">
      <btn
        @onclick="loadMore"
        btn-class="submit"
        :btn-label="$t('global.load_more')"
        :btn-processing="processing">
      </btn>
    </div>
  </fullscreen-modal-wrapper>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import FullscreenModalWrapper from '@/components/global/fullscreen_modal_wrapper/fullscreen-modal-wrapper';
import PatientVitals from '@/components/patients/patient_vitals/patient-vitals';
import SpecialistCard from '@/components/global/specialist_card/specialist-card';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientVitalsHistory',

  components: {
    FullscreenModalWrapper,
    PatientVitals,
    SpecialistCard
  },

  props: {
    patientId: {
      required: true
    }
  },
  data() {
    return {
      selected: 0,
      initializing: false,
      processing: false
    };
  },

  computed: {
    ...mapGetters([
      'vitalsHistory',
      'vitalsHistoryNextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearVitalsHistory();
  },

  methods: {
    ...mapActions(['fetchVitalsHistory']),
    ...mapMutations(['clearVitalsHistory']),
    toggle(index) {
      this.selected = this.selected === index ? null : index;
    },
    async init() {
      this.initializing = true;
      await this.fetchVitalsHistory(this.patientId);
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchVitalsHistory(this.patientId);
      this.processing = false;
    },
    openRecord(recordId) {
      this.$emit('close');
      this.$router.push({
        name: 'patient-record',
        params: { patientId: this.$route.params.id, id: recordId }
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-vitals-history.scss";
</style>
