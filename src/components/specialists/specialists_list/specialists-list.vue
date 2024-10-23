<template>
  <div class="SpecialistsList__wrapper">
    <div class="SpecialistsList__header">
      <div class="title">
        {{ $t('specialists.all_freelancers') }} {{ amount }}
      </div>
    </div>
    <div class="SpecialistsList__content shaded-outline">
      <table-search
        @changed="setQuery"
        :label="$t('specialists.search_specialists')"
        data-cy="SpecialistsList__search">
      </table-search>
      <table
        class="table fixed-layout">
        <colgroup>
          <col class="SpecialistsList__table-col">
          <col class="SpecialistsList__table-col">
          <col class="SpecialistsList__table-col">
        </colgroup>
        <thead class="table-head">
        <tr>
          <th class="table-head-cell">
            <span class="SpecialistsList__table-head-cell-label">
              {{ $t('global.specialist') }}
            </span>
            <checkbox
              v-model="showOnline"
              data-cy="SpecialistsList__toggle-online">
              <span class="SpecialistsList__toggle-show-online-label">
                {{ $t('global.show_online') }}
              </span>
            </checkbox>
          </th>
          <th class="table-head-cell">
            <table-filter
              :options="package_options"
              field="membership"
              :radio="true"
              @change="changeFilter">
              {{ $t('specialists.membership_level') }}
            </table-filter>
          </th>
          <th class="table-head-cell">
            {{ $t('global.country') }}
          </th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody"
          v-if="specialists.length">
          <specialists-list-specialist
            v-for="(specialist, index) in specialists"
            :key="index"
            :specialist="specialist">
          </specialists-list-specialist>
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
                {{ $t('specialists.no_results_found') }}
              </div>
              {{ $t('specialists.no_results_description') }}
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
import SpecialistsListSpecialist from '@/components/specialists/specialists_list_specialist/specialists-list-specialist';
import TableFilter from '@/components/table/table_filter/table-filter';
import TableSearch from '@/components/table/table_search/table-search';
import Checkbox from '@/components/global/checkbox/checkbox';
import { MEMBERSHIP_PLANS_NAMES } from '@/constants';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('specialists');

export default {
  name: 'SpecialistsList',

  data() {
    return {
      initializing: true,
      processing: false,
      package_options: [
        {
          label: this.$t(MEMBERSHIP_PLANS_NAMES[1]),
          value: 'basic',
          selected: false
        },
        {
          label: this.$t(MEMBERSHIP_PLANS_NAMES[2]),
          value: 'silver',
          selected: false
        },
        {
          label: this.$t(MEMBERSHIP_PLANS_NAMES[3]),
          value: 'gold',
          selected: false
        },
        {
          label: this.$t(MEMBERSHIP_PLANS_NAMES[4]),
          value: 'platinum',
          selected: false
        }
      ]
    };
  },

  components: {
    SpecialistsListSpecialist,
    TableFilter,
    TableSearch,
    Checkbox
  },

  computed: {
    ...mapGetters([
      'specialists',
      'nextToken',
      'totalCount',
      'query',
      'membership',
      'showOnlineOnly'
    ]),
    amount() {
      return this.totalCount !== null ? `(${this.totalCount})` : null;
    },
    showOnline: {
      get() {
        return this.showOnlineOnly;
      },
      set(val) {
        this.setShowOnlineOnly(val);
      }
    }
  },

  mounted() {
    this.init();
    this.initializing = false;
  },

  beforeDestroy() {
    this.clearSpecialists();
    this.clearQuery();
  },

  methods: {
    ...mapActions([
      'fetchSpecialists',
      'setShowOnlineOnly',
      'setMembershipPackage',
      'setQuery'
    ]),
    ...mapMutations([
      'clearSpecialists',
      'clearQuery'
    ]),
    async init() {
      this.initializing = true;
      await this.fetchSpecialists();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchSpecialists();
      this.processing = false;
    },
    changeFilter({ field, options }) {
      this[`${field}_options`] = options;
      const selected = options.filter(o => o.selected);
      const value = selected.length ? selected[0].value : null;
      this.setMembershipPackage(value);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "specialists-list.scss";
</style>
