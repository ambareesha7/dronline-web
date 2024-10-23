<template>
  <div class="Procedures__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('sidebar.procedures') }}
        </h3>
        <div class="Procedures__section" v-if="!status.banner">
          <procedures-list/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProceduresList from '@/components/procedures/procedures-list';

export default {
  name: 'Procedures',

  components: {
    ProceduresList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Procedures {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
