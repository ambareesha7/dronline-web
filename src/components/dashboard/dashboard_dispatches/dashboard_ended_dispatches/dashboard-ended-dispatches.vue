<template>
  <div class="DashboardEndedDispatches__wrapper">
    <div class="title">
      {{ $t('dashboard.ended_dispatches') }} {{ amount }}
    </div>

    <div class="DashboardEndedDispatches__content">
      <div
        v-if="initializing"
        class="table-initializing">
        <spinner></spinner>
      </div>
      <table
        v-else-if="endedDispatches.length"
        class="table shaded-outline">
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="requested_at"
              @change="changeSorting">
              {{ $t('dashboard.request_sent') }}
            </table-sorting></th>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="taken_at"
              @change="changeSorting">
              {{ $t('dashboard.request_accepted') }}
            </table-sorting>
          </th>
          <th class="table-head-cell">
            <table-sorting
              :current="sortBy"
              :order="order"
              field="ended_at"
              @change="changeSorting">
              {{ $t('dashboard.dispatch_ended') }}
            </table-sorting>
          </th>
          <th class="table-head-cell">
            {{ $t('dashboard.accepted_by') }}
          </th>
          <th class="table-head-cell">{{ $t('global.status') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <dashboard-ended-dispatches-dispatch
            v-for="dispatch in endedDispatches"
            :key="dispatch.dispatch.requestId"
            :dispatch="dispatch">
          </dashboard-ended-dispatches-dispatch>
        </transition-group>
      </table>
      <div
        v-else
        class="table-no-result shaded-outline">
        <div class="table-no-result-title">
          {{ $t('dashboard.no_dispatches') }}
        </div>
      </div>
      <div
        class="table-load-more-container"
        v-if="nextToken">
        <btn
          @onclick="loadMore"
          btn-class="submit"
          :btn-label="$t('global.load_more')"
          :btn-processing="processing">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import TableSorting from '@/components/table/table_sorting/table-sorting';
import DashboardEndedDispatchesDispatch from '../dashboard_ended_dispatches_dispatch/dashboard-ended-dispatches-dispatch';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('dispatches');

export default {
  name: 'DashboardEndedDispatches',

  components: {
    DashboardEndedDispatchesDispatch,
    TableSorting
  },

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  computed: {
    ...mapGetters([
      'endedDispatches',
      'nextToken',
      'totalCount',
      'sortBy',
      'order'
    ]),
    amount() {
      return this.totalCount !== null ? `(${this.totalCount})` : null;
    }
  },

  async mounted() {
    await this.fetchEndedDispatches();
    this.initializing = false;
  },

  beforeDestroy() {
    this.resetEndedDispatches();
  },

  methods: {
    ...mapActions(['fetchEndedDispatches']),
    ...mapMutations(['resetEndedDispatches', 'setSorting']),
    async changeSorting(data) {
      this.resetEndedDispatches();
      this.setSorting(data);
      this.initializing = true;
      await this.fetchEndedDispatches();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchEndedDispatches();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-ended-dispatches.scss";
</style>
