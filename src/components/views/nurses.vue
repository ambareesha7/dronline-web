
<template>
  <div class="Nurses__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner" v-if="!status.banner">
        <nurses-list/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NursesList from '@/components/nurses/nurses_list/nurses-list';

export default {
  name: 'Nurses',

  components: {
    NursesList
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Nurses {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    padding-top: 16px;
  }
}
</style>
