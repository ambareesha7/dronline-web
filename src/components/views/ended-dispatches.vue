<template>
  <div class="EndedDispatches__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <dashboard-ended-dispatches>
        </dashboard-ended-dispatches>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardEndedDispatches from '@/components/dashboard/dashboard_dispatches/dashboard_ended_dispatches/dashboard-ended-dispatches';

export default {
  name: 'EndedDispatches',

  components: {
    DashboardEndedDispatches
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.EndedDispatches {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
