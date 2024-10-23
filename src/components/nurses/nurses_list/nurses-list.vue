
<template>
  <div class="NursesList__wrapper">
    <div class="NursesList__header">
      <div class="title">
        {{ $t('nurses.all_nurses') }} {{ amount }}
      </div>
    </div>
    <div class="NursesList__content shaded-outline">
      <table-search
        @changed="setQuery"
        :label="$t('nurses.search_nurses')"
        data-cy="NursesList__search">
      </table-search>
      <table
        class="table fixed-layout">
        <colgroup>
          <col class="NursesList__table-col">
          <col class="NursesList__table-col">
          <col class="NursesList__table-col">
          <col class="NursesList__table-col">
        </colgroup>
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">
            {{ $t('user_roles.nurse') }}
          </th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody"
          v-if="nurses.length">
          <nurses-list-nurse
            v-for="(nurse, index) in nurses"
            :key="index"
            :nurse="nurse">
          </nurses-list-nurse>
        </transition-group>
        <tbody v-else-if="initializing">
          <tr>
            <td
              colspan="4"
              class="table-initializing">
              <spinner></spinner>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="4"
              class="table-no-result">
              <div class="table-no-result-title">
                {{ $t('nurses.no_results_found') }}
              </div>
              {{ $t('nurses.no_results_description') }}
            </td>
          </tr>
        </tbody>
      </table>
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
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import NursesListNurse from '@/components/nurses/nurses_list_nurse/nurses-list-nurse';
import TableFilter from '@/components/table/table_filter/table-filter';
import TableSearch from '@/components/table/table_search/table-search';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('nurses');

export default {
  name: 'NursesList',

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  components: {
    NursesListNurse,
    TableFilter,
    TableSearch
  },

  computed: {
    ...mapGetters([
      'nurses',
      'nextToken',
      'totalCount',
      'query'
    ]),
    amount() {
      return this.totalCount !== null ? `(${this.totalCount})` : null;
    }
  },

  mounted() {
    this.init();
    this.initializing = false;
  },

  beforeDestroy() {
    this.clearNurses();
    this.clearQuery();
  },

  methods: {
    ...mapActions([
      'fetchNurses',
      'setQuery'
    ]),
    ...mapMutations([
      'clearNurses',
      'clearQuery'
    ]),
    async init() {
      this.initializing = true;
      await this.fetchNurses();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchNurses();
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "nurses-list.scss";
</style>
