<template>
  <div class="CalendarMonthly__wrapper">
    <div class="CalendarMonthly__content">
      <calendar-monthly-cell
        v-for="(cell, index) in timeslotsPerDay"
        :key="`${cell.day}_${cell.month}`"
        :cell="cell"
        :index="index"
        :mouse-x="mouseX"
        :mouse-y="mouseY"
        @select-date="$emit('switch-to-weekly', cell.date)">
        <div v-if="daysOfWeek[index]">{{ daysOfWeek[index] }}</div>
      </calendar-monthly-cell>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';
import { SHORT_WEEK_DAYS } from '@/constants';
import CalendarMonthlyCell from './calendar_monthly_cell/calendar-monthly-cell';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('availability');

export default {
  name: 'CalendarMonthly',
  components: {
    CalendarMonthlyCell
  },
  props: {
    date: {
      required: true
    }
  },
  data() {
    return {
      today: this.$moment(),
      daysOfWeek: [],
      cells: [],
      periodStart: null,
      periodEnd: null,
      mouseX: 0,
      mouseY: 0
    };
  },
  watch: {
    date() {
      this.setCalendar();
    }
  },
  computed: {
    ...mapGetters(['timeslots']),
    timeslotsPerDay() {
      const grouped = [];
      for (let i = 0; i < this.cells.length; i++) {
        grouped.push({
          ...this.cells[i],
          timeslots: []
        });
        this.timeslots.forEach(timeslot => {
          const date = this.$moment(timeslot.startTime * 1000);
          const day = date.date();
          const month = date.month();
          if (
            (day === this.cells[i].day) &&
            (month === this.cells[i].month)
          ) {
            grouped[i].timeslots.push(timeslot);
          }
        });
        grouped[i].timeslots.sort((a, b) => a.start - b.start);
      }
      return grouped;
    }
  },

  created() {
    this.setCalendar();
    this.setDaysOfWeek();
    document.addEventListener('mousemove', this.handleMouse);
  },

  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleMouse);
  },

  methods: {
    ...mapActions(['fetchTimeslots']),
    ...mapMutations(['clearTimeslots']),
    setCalendar() {
      this.cells = [];
      this.periodStart = this.$moment(this.date).startOf('month').startOf('week');
      this.periodEnd = this.$moment(this.date).endOf('month').endOf('week');
      const cells = this.$moment(this.periodEnd).diff(this.periodStart, 'days');
      for (let i = 0; i <= cells; i++) {
        const date = this.$moment(this.periodStart).add(i, 'days');
        this.cells.push({
          date,
          day: date.date(),
          month: date.month()
        });
      }
      this.updateCalendar();
    },
    setDaysOfWeek() {
      for (let i = 0; i < 7; i++) {
        this.daysOfWeek.push(this.$t(SHORT_WEEK_DAYS[i]));
      }
    },
    updateCalendar() {
      this.clearTimeslots();
      this.fetchTimeslots({
        specialist_id: this.$route.query.specialist_id,
        month: this.$moment(this.date).unix()
      });
    },
    handleMouse(e) {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "calendar-monthly.scss";
</style>
