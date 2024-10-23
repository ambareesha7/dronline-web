<template>
  <div class="TestsList__wrapper shaded-outline">
    <div
      v-if="bundles.length"
      class="TestsList__content">
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="div">
          <tests-bundle
            v-for="(bundle, index) in bundles"
            :key="index"
            :bundle="bundle"
          />
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
        {{ $t('tests.no_tests') }}
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
import TestsBundle from '@/components/tests/tests_bundle/tests-bundle';

export default {
  name: 'TestsList',

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  components: {
    TestsBundle
  },

  computed: {
    ...mapGetters('tests', [
      'bundles',
      'nextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearTests();
    this.clearQuery();
  },

  methods: {
    ...mapActions('tests', [
      'fetchTests'
    ]),
    ...mapMutations('tests', [
      'clearTests',
      'setSpecialistId'
    ]),
    async init() {
      this.initializing = true;
      this.setSpecialistId(this.$route.query.specialist_id || null);
      await this.fetchTests();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchTests();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "tests-list.scss";
</style>
