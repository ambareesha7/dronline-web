<template>
  <div class="ProceduresList__wrapper shaded-outline">
    <div
      v-if="bundles.length"
      class="ProceduresList__content">
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="div">
          <procedures-bundle
            v-for="(bundle, index) in bundles"
            :key="index"
            :bundle="bundle">
          </procedures-bundle>
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
        {{ $t('procedures.no_procedures') }}
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
import ProceduresBundle from '@/components/procedures/procedures_bundle/procedures-bundle';

export default {
  name: 'ProceduresList',

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  components: {
    ProceduresBundle
  },

  computed: {
    ...mapGetters('procedures', [
      'bundles',
      'nextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearProcedures();
    this.clearQuery();
  },

  methods: {
    ...mapActions('procedures', [
      'fetchProcedures'
    ]),
    ...mapMutations('procedures', [
      'clearProcedures',
      'setSpecialistId'
    ]),
    async init() {
      this.initializing = true;
      this.setSpecialistId(this.$route.query.specialist_id || null);
      await this.fetchProcedures();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchProcedures();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "procedures-list.scss";
</style>
