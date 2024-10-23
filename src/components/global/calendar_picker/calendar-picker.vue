<template>
  <div class="CalendarPicker__wrapper">
    <div class="CalendarPicker__header">
      <div class="CalendarPicker__header-year">
        {{ year }}
      </div>
      <div class="CalendarPicker__header-month">
        {{ month }}
      </div>
      <div class="CalendarPicker__nav">
        <i
          class="icon-arrow CalendarPicker__nav-prev"
          @click="prevMonth"></i>
        <i
          class="icon-arrow CalendarPicker__nav-next"
          @click="nextMonth"></i>
      </div>
    </div>

    <div class="CalendarPicker__days">
      <div
        class="CalendarPicker__day"
        v-for="day in days"
        :key="day">
        {{ day }}
      </div>
    </div>

    <div class="CalendarPicker__ports">
      <div
        class="CalendarPicker__port"
        v-for="(port, index) in ports"
        :key="index"
        :class="{
          'selectable': port,
          'active': index === activePort
        }"
        @click="selectDate(port, index)">
        {{port}}
      </div>
    </div>
  </div>
</template>

<script>

import { FULL_MONTHS, SHORT_WEEK_DAYS } from '@/constants';

export default {
  name: 'CalendarPicker',

  props: {
    value: {}
  },

  data() {
    return {
      currentDate: new Date(),
      year: null,
      monthIndex: null,
      dayOfWeek: null,
      dayOfMonth: null,
      daysInMonth: null,
      ports: [],
      activePort: null
    };
  },

  computed: {
    days() {
      return SHORT_WEEK_DAYS.map(day => this.$t(day));
    },

    date: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },

    month() {
      return this.$t(FULL_MONTHS[this.monthIndex]);
    }
  },

  created() {
    this.setCalendar();
  },

  methods: {
    setCalendar() {
      const date = this.$moment(this.date).isValid() ? this.date : this.currentDate;
      this.year = Number(this.$moment(date).format('YYYY'));
      this.monthIndex = this.$moment(date).get('month');
      this.dayOfWeek = this.$moment(date).get('day');
      this.dayOfMonth = this.$moment(date).date();
      this.daysInMonth = new Date(this.year, this.monthIndex + 1, 0).getDate();
      this.updateCalendar();
    },

    updateCalendar() {
      const date = new Date(this.year, this.monthIndex, 1, 0, 0, 0);
      const day = date.getDay();
      const ports = [];
      let portsLenght = 35;
      if (day === 6 || (day === 5 && this.daysInMonth === 31)) {
        portsLenght = 42;
      }
      let activeFound = false;
      for (let i = 0; i < portsLenght; i++) {
        const j = i - day;
        const curr = (j < 0 || j >= this.daysInMonth) ? '' : j + 1;
        ports.push(curr);
        if (
          this.$moment(this.date).isValid()
          && curr === this.$moment(this.date).date()
          && this.$moment(this.date).get('month') === this.monthIndex
          && Number(this.$moment(this.date).format('YYYY')) === this.year
        ) {
          this.activePort = i;
          activeFound = true;
        }
      }
      if (!activeFound) {
        this.activePort = -1;
      }
      this.ports = ports;
    },

    prevMonth() {
      if (this.monthIndex === 0) {
        this.prevYear();
        this.monthIndex = 11;
      } else {
        this.monthIndex--;
      }
      this.updateCalendar();
    },

    nextMonth() {
      if (this.monthIndex === 11) {
        this.nextYear();
        this.monthIndex = 0;
      } else {
        this.monthIndex++;
      }
      this.updateCalendar();
    },

    prevYear() {
      this.year--;
      this.updateCalendar();
    },

    nextYear() {
      this.year++;
      this.updateCalendar();
    },

    selectDate(port, index) {
      this.activePort = index;
      this.date = new Date(this.year, this.monthIndex, port, 0, 0, 0).getTime();
    }
  }
};
</script>
<style scoped lang="scss">
  @import "calendar-picker.scss";
</style>
