<template>
  <div class="DashboardScheduledVisits__wrapper">
    <div class="DashboardScheduledVisits__content shaded-outline">
      <div class="DashboardScheduledVisits__header">
        <div class="title-medium">
          {{ $t('dashboard.scheduled_visits') }}
        </div>
        <router-link
          v-if="perspective == 'doctor'"
          :to="{ name: 'visits' }"
          class="btn-blue small DashboardScheduledVisits__see-ended">
          {{ $t('dashboard.see_ended') }}
        </router-link>
      </div>
      <table
        v-if="visits.visits.length && !status.banner"
        class="table">
        <thead
          v-if="perspective == 'doctor'"
          class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.name') }}</th>
          <th class="table-head-cell">
            <!-- <div class="flex-container centered">
              {{ $t('global.reason') }}
            </div> -->
          </th>
          <th class="table-head-cell">{{ $t('global.time') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <thead
          v-if="perspective == 'gp'"
          class="table-head">
        <tr>
          <th class="table-head-cell">{{ $t('global.details') }}</th>
          <th class="table-head-cell">{{ $t('global.reason') }}</th>
          <th class="table-head-cell">{{ $t('visits.date_of_schedule') }}</th>
          <th class="table-head-cell">{{ $t('global.due_date') }}</th>
          <th class="table-head-cell">{{ $t('global.specialist') }}</th>
          <th class="table-head-cell">&nbsp;</th>
        </tr>
        </thead>
        <tbody>
        <dashboard-scheduled-visits-visit
          v-for="(visit, index) in visits.visits"
          :key="index"
          :visit="visit"
          :perspective="perspective"
          :now="now">
        </dashboard-scheduled-visits-visit>
        </tbody>
      </table>
      <div
        v-else
        class="table-no-result">
        <div class="table-no-result-title">
          {{ $t('dashboard.no_calls') }}
        </div>
        <i18n
          v-if="perspective == 'doctor'"
          class="DashboardScheduledVisits__no-results-description"
          path="dashboard.no_calls_description"
          tag="div"
          for="dashboard.set_your_availability">
          <router-link
            class="DashboardScheduledVisits__no-results-description-link"
            :to="{ name: 'availability' }">
            {{ $t('dashboard.set_your_availability') }}
          </router-link>
        </i18n>
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DashboardScheduledVisitsVisit from './dashboard_scheduled_visits_visit/dashboard-scheduled-visits-visit';

export default {
  name: 'DashboardScheduledVisits',

  components: {
    DashboardScheduledVisitsVisit
  },

  props: {
    perspective: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      processing: false,
      now: parseInt(new Date().getTime() / 1000, 0),
      interval: null
    };
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isDoctor',
      'status'
    ]),
    ...mapGetters('team', [
      'isAdmin'
    ]),
    ...mapGetters('visits', [
      'gpVisits',
      'specialistVisits'
    ]),
    visits() {
      return this.perspective === 'gp' ? this.gpVisits : this.specialistVisits;
    }
  },

  created() {
    this.interval = setInterval(() => {
      this.now = parseInt(new Date().getTime() / 1000, 0);
    }, 5000);
  },

  mounted() {
    this.fetchScheduledVisits({type: 'pending', isGP: this.perspective === 'gp'});
  },

  beforeDestroy() {
    this.clearVisits({isGP: this.perspective === 'gp'});
    clearInterval(this.interval);
  },

  methods: {
    ...mapActions('visits', [
      'fetchScheduledVisits'
    ]),
    ...mapMutations('visits', [
      'clearVisits'
    ]),
    async loadMore() {
      this.processing = true;
      await this.fetchScheduledVisits({type: 'pending', isGP: this.perspective === 'gp'});
      this.processing = false;
    }
  }
};
</script>

<style scoped lang="scss">
  @import "dashboard-scheduled-visits.scss";
</style>
