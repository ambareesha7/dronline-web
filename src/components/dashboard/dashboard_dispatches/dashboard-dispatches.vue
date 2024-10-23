<template>
  <div class="DashboardDispatches__wrapper">
    <transition
      name="fade"
      mode="out-in">
      <dashboard-ongoing-dispatch
        v-if="dispatch"
        key="ongoing">
      </dashboard-ongoing-dispatch>
      <dashboard-dispatches-queue
        v-else
        key="queue">
      </dashboard-dispatches-queue>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import DashboardDispatchesQueue from './dashboard_dispatches_queue/dashboard-dispatches-queue';
import DashboardOngoingDispatch from './dashboard_ongoing_dispatch/dashboard-ongoing-dispatch';

const { mapGetters, mapActions } = createNamespacedHelpers('dispatches');

export default {
  name: 'DashboardDispatches',

  components: {
    DashboardDispatchesQueue,
    DashboardOngoingDispatch
  },

  data() {
    return {
      initializing: true
    };
  },

  computed: {
    ...mapGetters(['dispatch'])
  },

  async mounted() {
    await this.fetchOngoingDispatch();
    this.initializing = false;
  },

  methods: {
    ...mapActions(['fetchOngoingDispatch'])
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-dispatches.scss";
</style>
