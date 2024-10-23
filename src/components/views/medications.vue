<template>
  <div class="Medications__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('sidebar.medications') }}
        </h3>
        <div class="Medications__section" v-if="!status.banner">
          <medications-list></medications-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MedicationsList from '@/components/medications/medications-list';

export default {
  name: 'Medications',

  components: {
    MedicationsList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Medications {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
