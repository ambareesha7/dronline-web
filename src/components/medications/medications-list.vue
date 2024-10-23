<template>
  <div class="MedicationsList__wrapper shaded-outline">
    <div
      v-if="bundles.length"
      class="MedicationsList__content">
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="div">
          <medications-bundle
            v-for="(bundle, index) in bundles"
            :key="index"
            :bundle="bundle">
          </medications-bundle>
        </transition-group>
    </div>
    <div
      v-else-if="initializing"
      class="table-initializing">
      <spinner></spinner>
    </div>
    <div
      v-else
      class="table-no-result">
      <div class="table-no-result-title">
        {{ $t('medications.no_medications') }}
      </div>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import MedicationsBundle from '@/components/medications/medications_bundle/medications-bundle';

export default {
  name: 'MedicationsList',

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  components: {
    MedicationsBundle
  },

  computed: {
    ...mapGetters('medications', [
      'bundles',
      'nextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearMedications();
    this.clearQuery();
  },

  methods: {
    ...mapActions('medications', [
      'fetchMedications'
    ]),
    ...mapMutations('medications', [
      'clearMedications',
      'setSpecialistId'
    ]),
    async init() {
      this.initializing = true;
      this.setSpecialistId(this.$route.query.specialist_id || null);
      await this.fetchMedications();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchMedications();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "medications-list.scss";
</style>
