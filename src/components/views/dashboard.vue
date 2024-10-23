<template>
  <div class="Dashboard__wrapper">

    <div class="content" :class="{ banner: status && status.banner, pricingnotice: pricingNoticeModal }">

      <div class="content-inner">
        <div v-if="this.isGpOrTeamAdmin()" class="red-title title Dashboard__urgentcare-stats">
           Urgentcare calls count - {{ urgentCareTotal }}
        </div>
        <div
          class="Dashboard__section Dashboard__row"
          v-if="this.isGpOrTeamAdmin()">
          <div class="Dashboard__col">
            <dashboard-queue-patients/>
          </div>
          <div class="Dashboard__col">
            <dashboard-queue-nurses/>
          </div>
        </div>
        <div
          class="Dashboard__section"
          v-if="isGP">
          <dashboard-current-dispatches v-if="!status.banner"/>
        </div>
        <div
          class="Dashboard__section"
          v-if="isDoctor">
          <div class="title">
            {{ $t('dashboard.calls_queue') }}
          </div>
          <div class="Dashboard__row">
            <div class="Dashboard__col">
              <dashboard-scheduled-visits perspective="doctor"/>
            </div>
            <div class="Dashboard__col">
              <dashboard-queue-to-doctor/>
            </div>
          </div>
        </div>
        <div
          class="Dashboard__section"
          v-if="this.isGpOrTeamAdmin()">
          <div class="title">
            {{ $t('sidebar.visits') }}
          </div>
          <dashboard-scheduled-visits perspective="gp"/>
        </div>
        <div
          class="Dashboard__section"
          v-if="isNurse">
          <dashboard-dispatches/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import api from '@/api';
import { decode } from '@/utils/proto';

import DashboardQueuePatients from '@/components/dashboard/dashboard_queue_patients/dashboard-queue-patients';
import DashboardQueueNurses from '@/components/dashboard/dashboard_queue_nurses/dashboard-queue-nurses';
import DashboardQueueToDoctor from '@/components/dashboard/dashboard_queue_to_doctor/dashboard-queue-to-doctor';
import DashboardDispatches from '@/components/dashboard/dashboard_dispatches/dashboard-dispatches';
import DashboardCurrentDispatches from '@/components/dashboard/dashboard_dispatches/dashboard_current_dispatches/dashboard-current-dispatches';
import DashboardScheduledVisits from '@/components/dashboard/dashboard_scheduled_visits/dashboard-scheduled-visits';
import AvailabilityCalendar from '@/components/availability/availability_calendar/availability-calendar';

export default {
  name: 'Dashboard',

  components: {
    DashboardQueuePatients,
    DashboardQueueNurses,
    DashboardQueueToDoctor,
    DashboardDispatches,
    DashboardCurrentDispatches,
    DashboardScheduledVisits,
    AvailabilityCalendar
  },

  data() {
    return {
      urgentCareTotal: 0
    };
  },

  async beforeMount() {
    if (this.isGpOrTeamAdmin()) {
      this.fetchTeamUrgentCareStats();
    }
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isNurse',
      'isDoctor',
      'status',
      'pricingNoticeModal'
    ]),
    ...mapGetters('team', ['isAdmin'])
  },
  methods: {
    isGpOrTeamAdmin() {
      return this.isGP || this.isAdmin;
    },
    fetchTeamUrgentCareStats() {
      api.getTeamUrgentCareStats()
        .then(data => {
          const response = decode('TeamUrgentCareStatsResponse', data);
          this.urgentCareTotal = response.total;
        });
    }
  }
};
</script>

<style lang="scss">

.red-title {
  color: #ad1313;
  margin-top: 20px;
}

.pricingnotice {
  padding-top: 160px;
}

.Dashboard {

  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__row {
    display: flex;
  }

  &__section {
    & + & {
      padding-top: 48px;
    }
  }

  &__col {
    width: calc(50% - 15px);
    &:first-of-type {
      margin-right: 15px;
    }
    &:last-of-type {
      margin-left: 15px;
    }
  }

  &__container {

    &:not(:first-of-type) {
      margin-left: 15px;
    }

    &:not(:last-of-type) {
      margin-right: 15px;
    }

    &-content {
      height: 422px;
    }

    &-title {
      font-size: 24px;
      color: #3B4A58;
      margin-bottom: 24px;
    }
  }

  &__urgentcare-stats {
    margin-bottom: 14px;
  }
}
</style>
