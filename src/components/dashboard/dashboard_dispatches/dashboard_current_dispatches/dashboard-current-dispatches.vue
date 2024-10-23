<template>
  <div class="DashboardCurrentDispatches__wrapper">
    <div class="title">
      {{ $t('dashboard.dispatches') }} {{ amount }}
    </div>

    <div class="DashboardCurrentDispatches__content">
      <div
        v-if="initializing"
        class="table-initializing">
        <spinner></spinner>
      </div>
      <table
        v-else-if="currentDispatches.length"
        class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th colspan="5">
            <div class="DashboardCurrentDispatches__header">
              <div class="DashboardCurrentDispatches__header-col">
                <div class="DashboardCurrentDispatches__header-title">
                  {{ $t('dashboard.current_status') }}
                </div>
                <div
                  v-if="ongoingAmount"
                  class="badge-blue DashboardCurrentDispatches__header-badge">
                  {{ $t('global.ongoing') }} {{ ongoingAmount }}
                </div>
                <div
                  v-if="openAmount"
                  class="badge-green DashboardCurrentDispatches__header-badge">
                  {{ $t('global.open') }} {{ openAmount }}
                </div>
              </div>
              <div class="DashboardCurrentDispatches__header-col">
                <router-link
                  :to="{ name: 'ended-dispatches' }"
                  class="btn-blue small DashboardCurrentDispatches__ended-link">
                  {{ $t('dashboard.see_ended') }}
                </router-link>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="requestedAt"
              @change="changeSorting">
              {{ $t('dashboard.request_sent') }}
            </table-sorting>
          </th>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="takenAt"
              @change="changeSorting">
              {{ $t('dashboard.request_accepted') }}
            </table-sorting>
          </th>
          <th class="table-head-cell">
            {{ $t('dashboard.accepted_by') }}
          </th>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="status"
              @change="changeSorting">
              {{ $t('global.status') }}
            </table-sorting>
          </th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <dashboard-current-dispatches-dispatch
            v-for="dispatch in dispatches"
            :key="dispatch.dispatch.requestId"
            :dispatch="dispatch">
          </dashboard-current-dispatches-dispatch>
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
import { createNamespacedHelpers } from 'vuex';
import TableSorting from '@/components/table/table_sorting/table-sorting';
import DashboardCurrentDispatchesDispatch from '../dashboard_current_dispatches_dispatch/dashboard-current-dispatches-dispatch';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('dispatches');

export default {
  name: 'DashboardCurrentDispatches',

  components: {
    TableSorting,
    DashboardCurrentDispatchesDispatch
  },

  data() {
    return {
      initializing: true,
      sortBy: null,
      order: null
    };
  },

  computed: {
    ...mapGetters(['currentDispatches']),
    dispatches() {
      return this.currentDispatches
        .map(d => ({
          ...d,
          requestedAt: d.dispatch.requestedAt
        }))
        .slice(0)
        .sort(
          (a, b) => (
            this.order === 'asc'
              ? (a[this.sortBy] - b[this.sortBy])
              : (b[this.sortBy] - a[this.sortBy])
          )
        );
    },
    amount() {
      return this.currentDispatches.length
        ? `(${this.currentDispatches.length})`
        : null;
    },
    ongoingAmount() {
      const amount = this.currentDispatches.filter(d => d.status === 2);
      return amount.length ? `(${amount.length})` : null;
    },
    openAmount() {
      const amount = this.currentDispatches.filter(d => d.status === 1);
      return amount.length ? `(${amount.length})` : null;
    }
  },

  async mounted() {
    await this.fetchCurrentDispatches();
    this.initializing = false;
  },

  beforeDestroy() {
    this.resetCurrentDispatches();
  },

  methods: {
    ...mapActions(['fetchCurrentDispatches']),
    ...mapMutations(['resetCurrentDispatches']),
    changeSorting({ sortBy, order }) {
      this.sortBy = sortBy;
      this.order = order;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-current-dispatches.scss";
</style>
