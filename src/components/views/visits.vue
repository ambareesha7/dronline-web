<template>
  <div class="Visits__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <visits-list></visits-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VisitsList from '@/components/visits/visits_list/visits-list';

export default {
  name: 'Visits',

  components: {
    VisitsList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Visits {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    padding-top: 16px;
  }
}
</style>
