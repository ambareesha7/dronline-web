<template>
  <div class="VisitsList__wrapper">
    <div class="VisitsList__header">
      <div class="title">
        {{ $t('visits.done_visits') }} {{ amount }}
      </div>
    </div>

    <div
      v-if="visits.visits.length"
      class="VisitsList__content">
      <table class="table">
        <thead
          class="table-head"
          v-if="isGP">
        <tr>
          <th class="table-head-cell">
            {{ $t('global.patient') }}
          </th>
          <th class="table-head-cell">
            <div class="flex-container centered">
              {{ $t('global.reason') }}
            </div>
          </th>
          <th class="table-head-cell">
            {{ $t('visits.date_of_schedule') }}
          </th>
          <th class="table-head-cell">
            {{ $t('global.due_date') }}
          </th>
          <th class="table-head-cell">
            {{ $t('global.specialist') }}
          </th>
          <th class="table-head-cell">
            &nbsp;
          </th>
        </tr>
        </thead>
        <thead
          class="table-head"
          v-if="isDoctor">
        <tr>
          <th class="table-head-cell">
            {{ $t('global.patient') }}
          </th>
          <th class="table-head-cell">
            <div class="flex-container centered">
              {{ $t('global.reason') }}
            </div>
          </th>
          <th class="table-head-cell">
            {{ $t('global.hour') }}
          </th>
          <th class="table-head-cell">
            {{ $t('global.date') }}
          </th>
          <th class="table-head-cell">
            &nbsp;
          </th>
        </tr>
        </thead>
        <transition-group
          appear
          name="appear-from-bottom"
          mode="out-in"
          tag="tbody">
          <visits-list-visit
            v-for="(visit, index) in visits.visits"
            :key="index"
            :visit="visit">
          </visits-list-visit>
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
        {{ $t('visits.no_visits') }}
      </div>
    </div>

    <div
      class="table-load-more-container"
      v-if="visits.nextToken">
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
import VisitsListVisit from '@/components/visits/visits_list_visit/visits-list-visit';
import TableSorting from '@/components/table/table_sorting/table-sorting';

export default {
  name: 'VisitsList',

  data() {
    return {
      initializing: true,
      processing: false
    };
  },

  components: {
    VisitsListVisit,
    TableSorting
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isDoctor'
    ]),
    ...mapGetters('visits', [
      'gpVisits',
      'specialistVisits'
    ]),
    amount() {
      return this.visits && this.visits.totalCount ?
        `(${this.visits.totalCount})` :
        null;
    },
    visits() {
      return this.isGP ? this.gpVisits : this.specialistVisits;
    }
  },

  mounted() {
    this.init();
    this.initializing = false;
  },

  beforeDestroy() {
    this.clearVisits({isGP: this.isGP});
  },

  methods: {
    ...mapActions('visits', [
      'fetchScheduledVisits'
    ]),
    ...mapMutations('visits', [
      'clearVisits'
    ]),
    async init() {
      this.initializing = true;
      await this.fetchScheduledVisits({type: 'ended', isGP: this.isGP});
      this.initializing = false;
    },
    async loadMore() {
      this.processing = true;
      await this.fetchScheduledVisits({type: 'ended', isGP: this.isGP});
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "visits-list.scss";
</style>
