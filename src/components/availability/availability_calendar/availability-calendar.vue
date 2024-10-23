<template>
  <div class="AvailabilityCalendar__wrapper">
    <calendar-header
      :view="view"
      :date="date"
      @set-date="setDate"
      @set-view="setView">
    </calendar-header>

    <div class="AvailabilityCalendar__content">
      <transition
        appear
        name="appear-from-top"
        mode=out-in>
        <component
          :is="`calendar-${view}`"
          :key="view"
          :date="date"
          :day-start="dayStart"
          :day-end="dayEnd"
          @switch-to-weekly="switchToWeekly">
        </component>
      </transition>
      <div
        v-if="addingTimeslotsInProgress"
        class="AvailabilityCalendar__content__in-progress">
        <spinner></spinner>
      </div>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import CalendarHeader from '@/components/availability/calendar_header/calendar-header';
import CalendarWeekly from '@/components/availability/calendar_weekly/calendar-weekly';
import CalendarMonthly from '@/components/availability/calendar_monthly/calendar-monthly';
import VisitDetailsModal from '@/components/visits/visit_details_modal/visit-details-modal';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('availability');

export default {
  name: 'AvailabilityCalendar',

  components: {
    CalendarHeader,
    CalendarWeekly,
    CalendarMonthly
  },

  props: {
    dayStart: {
      type: String
    },
    dayEnd: {
      type: String
    }
  },

  data() {
    return {
      date: this.$moment(),
      view: 'monthly'
    };
  },

  computed: {
    ...mapGetters(['addingTimeslotsInProgress'])
  },

  mounted() {
    if (this.$route.query && this.$route.query.visit_details) {
      const [patientId, recordId, startTime, visitId] = this.$route.query.visit_details.split('_');
      this.$modal.show(
        VisitDetailsModal,
        { recordId, patientId, startTime: Number(startTime), visitId },
        {
          name: 'visit-details-modal',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
      this.setView('weekly');
    }
  },

  methods: {
    setDate(date) {
      this.date = date;
    },
    setView(view) {
      this.view = view;
    },
    switchToWeekly(date) {
      this.date = date;
      this.setView('weekly');
    }
  }
};
</script>
<style scoped lang="scss">
  @import "availability-calendar.scss";
</style>
