<template>
  <div class="EncountersList__wrapper">
    <div class="EncountersList__tabs">
        <div
            v-for="tab in [
              {
                key: 'TAB_ALL',
                queryFilter: null,
                label: $t('global.all')
              }, {
                key: 'TAB_SCHEDULED',
                queryFilter: 'scheduled',
                label: $t('global.scheduled')
              }, {
                key: 'TAB_COMPLETED',
                queryFilter: 'completed',
                label: $t('encounter_state.completed')
              },
              {
                key: 'TAB_CANCELED',
                queryFilter: 'canceled',
                label: $t('encounter_state.canceled')
              }, {
                key: 'TAB_PENDING',
                queryFilter: 'pending',
                label: $t('encounter_state.pending')
              }]"
            :key="tab.key"
            v-bind:class="{
                'EncountersList__tabs__item': true,
                'EncountersList__tabs__item--active': activeTab.key === tab.key
            }"
            @click="setActiveTab(tab)">
            <div class="EncountersList__tabs__item__text">{{ tab.label }}</div>
        </div>
    </div>
    <div
      v-if="encounters.length"
      class="EncountersList__content">
      <table class="table">
        <thead class="table-head">
            <tr>
                <th class="table-head-cell">
                    {{ $t('global.patient') }}
                </th>
                <th class="table-head-cell">
                    {{ $t('global.from') }}
                </th>
                <th class="table-head-cell">
                    {{ $t('global.to') }}
                </th>
                <th class="table-head-cell">
                    {{ $t('global.type') }}
                </th>
                <th class="table-head-cell">
                    {{ $t('global.state') }}
                </th>
            </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <encounters-list-encounter
            v-for="(encounter, index) in encounters"
            :key="index"
            :encounter="encounter">
          </encounters-list-encounter>
        </transition-group>
      </table>
    </div>
    <div
      v-else-if="initializing"
      class="table-initializing">
      <spinner></spinner>
    </div>
    <div
      v-else
      class="table-no-result">
      <div class="table-no-result-title">
        {{ $t('calendar.no_encounters') }}
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
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import EncountersListEncounter from '@/components/availability/encounters_list/encounters_list_encounter/encounters-list-encounter';

export default {
  name: 'EncountersList',

  data() {
    return {
      activeTab: {
        key: 'TAB_ALL'
      },
      initializing: true,
      processing: false
    };
  },

  components: {
    EncountersListEncounter
  },

  computed: {
    ...mapGetters('specialistEncounters', [
      'encounters',
      'nextToken'
    ])
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    this.clearEncounters();
    this.clearQuery();
  },

  methods: {
    ...mapActions('specialistEncounters', [
      'fetchEncounters',
      'setQuery'
    ]),
    ...mapMutations('specialistEncounters', [
      'clearEncounters',
      'clearQuery',
      'setSpecialistId'
    ]),
    async init() {
      this.initializing = true;
      this.setSpecialistId(this.$route.query.specialist_id || null);
      await this.fetchEncounters();
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchEncounters();
      this.processing = false;
    },
    async setActiveTab(tab) {
      this.activeTab = tab;
      this.setQuery(this.queryParams());
      this.initializing = true;
      await this.fetchEncounters();
      this.initializing = false;
    },
    queryParams() {
      return {
        type_filter: this.queryTypeParam(),
        state_filter: this.queryStateParam()
      };
    },
    queryStateParam() {
      return ['completed', 'pending', 'canceled'].includes(this.activeTab.queryFilter) ?
        this.activeTab.queryFilter.toUpperCase() :
        null;
    },
    queryTypeParam() {
      return this.activeTab.queryFilter === 'scheduled' ?
        'VISIT' :
        null;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "encounters-list.scss";
</style>
