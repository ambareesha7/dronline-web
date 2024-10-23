<template>
  <div class="DashboardDispatchesQueue__wrapper">
    <div class="title">
      {{ $t('dashboard.pending_dispatches') }}
    </div>

    <div class="DashboardDispatchesQueue__content" v-if="!status.banner">
      <div
        v-if="initializing"
        class="table-initializing">
        <spinner></spinner>
      </div>
      <table
        v-else-if="dispatches.length"
        class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.patient') }}</th>
          <th class="table-head-cell">{{ $t('global.ordered_by') }}</th>
          <th class="table-head-cell">{{ $t('global.time') }}</th>
          <th class="table-head-cell">{{ $t('global.address') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <dashboard-dispatches-queue-dispatch
            v-for="(dispatch, index) in dispatches"
            :key="index"
            :dispatch="dispatch"
            :opened-request-id="openedRequestId"
            @toggle-request="toggleRequest">
          </dashboard-dispatches-queue-dispatch>
        </transition-group>
      </table>
      <div
        v-else
        class="table-no-result shaded-outline">
        <div class="table-no-result-title">
          {{ $t('dashboard.no_dispatches') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import DashboardDispatchesQueueDispatch from '../dashboard_dispatches_queue_dispatch/dashboard-dispatches-queue-dispatch';

export default {
  name: 'DashboardDispatchesQueue',

  components: {
    DashboardDispatchesQueueDispatch
  },

  data() {
    return {
      initializing: null,
      openedRequestId: null
    };
  },

  computed: {
    ...mapGetters('profile', ['status']),
    ...mapGetters('dispatches', ['dispatches'])
  },

  async mounted() {
    await this.fetchDispatches();
    this.initializing = false;
  },

  methods: {
    ...mapActions('dispatches', ['fetchDispatches']),
    toggleRequest(id) {
      this.openedRequestId = this.openedRequestId === id ? null : id;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-dispatches-queue.scss";
</style>
