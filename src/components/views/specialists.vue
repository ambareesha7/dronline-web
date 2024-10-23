<template>
  <div class="Specialists__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('sidebar.specialists') }}
        </h3>
        <div class="Specialists__section" v-if="!status.banner">
          <specialists-list/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SpecialistsList from '@/components/specialists/specialists_list/specialists-list';

export default {
  name: 'Specialists',

  components: {
    SpecialistsList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Specialists {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    padding-top: 16px;
  }
}
</style>
