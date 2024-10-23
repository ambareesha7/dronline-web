<template>
  <div class="Tests__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('global.tests') }}
        </h3>
        <div class="Tests__section" v-if="!status.banner">
          <tests-list/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TestsList from '@/components/tests/tests-list';

export default {
  name: 'Tests',

  components: {
    TestsList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Tests {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
