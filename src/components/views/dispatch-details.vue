<template>
  <div class="DispatchDetails__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <dashboard-dispatch-details>
        </dashboard-dispatch-details>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DashboardDispatchDetails from '@/components/dashboard/dashboard_dispatches/dashboard_dispatch_details/dashboard-dispatch-details';

export default {
  name: 'DispatchDetails',

  components: {
    DashboardDispatchDetails
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.DispatchDetails {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }
}
</style>
