<template>
  <div
    class="DatetimePicker"
    v-on-click-outside="documentClicked">
    <div class="DatetimePicker__wrapper">
      <input
        :class="['DatetimePicker__input', inputClass]"
        type='text'
        :id='id'
        v-model="date"
        :name='name'
        @input="onInput"
        @click='toggleCal'
        autocomplete='off'
        ref="datepicker_input"/>
      <i
        v-if="allowClearing && date"
        class="icon-close DatetimePicker__clear-value"
        @click="clearValue">
      </i>

      <div
        class='DatetimePicker__calendar-container'
        ref="dropdown"
        v-if="!hideCal"
        :class="position">
        <div
          class="DatetimePicker__calendar-picker"
          v-if="view === 'date'"
          :class="{'hidden': hideDate, 'current-period': currentMonth}">
          <div class='DatetimePicker__nav'>
            <i
              class="icon-angle-right DatetimePicker__nav-l"
              @click='leftMonth'></i>
            <div class="DatetimePicker__nav-col">
              <div class='DatetimePicker__nav-month'>
                {{ month }}
              </div>
              <span
                class="DatetimePicker__nav-year"
                :class="{ active: showYearOptions }"
                @click="toggleYearOptions">
                {{ year }}
                <div
                  v-on-click-outside="toggleYearOptions"
                  v-if="showYearOptions"
                  class="DatetimePicker__nav-year-dropdown custom-scrollbar-container">
                  <div
                    v-for="i in 125"
                    :key="i"
                    class="DatetimePicker__nav-year-option"
                    :class="{ active: (current.year - i + 1) === year}"
                    @click="setYear(current.year - i + 1)">
                    {{ current.year - i + 1 }}
                  </div>
                </div>
              </span>
            </div>
            <i
              class="icon-angle-right DatetimePicker__nav-r"
              @click='rightMonth'></i>
          </div>
          <div class='DatetimePicker__headers'>
            <span
              class='DatetimePicker__days'
              v-for="(port, index) in days"
              :key="index">
              {{port}}
            </span>
          </div>
          <div class="DatetimePicker__ports">
            <span
              class="DatetimePicker__port"
              v-for="(port, index) in ports"
              :key="index"
              :class='{
                activePort: index === activePort,
                inScope: port,
                currentDay: port === current.day && indicateCurrentDay}'
              @click='setDay(index, port)'>
              {{port}}
            </span>
          </div>
        </div>
        <div
          class='DatetimePicker__time-picker'
          v-if="view === 'time'"
          :class='{hidden: hideTime}'>
          <div class="DatetimePicker__time-picker-inner">
            <div class='DatetimePicker__hour-selector'>
              <i class="icon-up-dir DatetimePicker__hour-selector-icon increase"
                 @click="increaseHour"></i>
              <div class="DatetimePicker__hour-selector-value">
                {{hour}}
              </div>
              <i class="icon-down-dir DatetimePicker__hour-selector-icon decrease"
                 @click="decreaseHour"></i>
            </div>
            <div class='DatetimePicker__time-separator'>
              <span>:</span>
            </div>
            <div class='DatetimePicker__minute-selector'>
              <i class="icon-up-dir DatetimePicker__hour-selector-icon increase"
                 @click="increaseMinute"></i>
              <div class="DatetimePicker__minute-selector-value">
                {{minute}}
              </div>
              <i class="icon-down-dir DatetimePicker__hour-selector-icon decrease"
                 @click="decreaseMinute"></i>
            </div>
            <div class='DatetimePicker__period-switcher' >
              <div @click='changePeriod'>{{period}}</div>
            </div>
          </div>
          <div class="DatetimePicker__submit"
            @click="setDate">
            {{ $t('global.submit') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FULL_MONTHS, SHORT_WEEK_DAYS } from '@/constants';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: 'DatetimePicker',
  props: {
    format: { type: String },
    name: { type: String },
    value: {},
    inputClass: {},
    position: { type: String },
    initialValue: {},
    allowClearing: { type: Boolean },
    indicateCurrentDay: { type: Boolean, default: true },
    customYear: { type: Number}
  },
  data() {
    return {
      date: this.value,
      hideCal: true,
      activePort: null,
      timeStamp: null,
      monthIndex: 0,
      hourIndex: 0,
      minuteIndex: 0,
      year: new Date().getFullYear(),
      portsHolder: [],
      minute: '00',
      hour: '01',
      day: 1,
      period: 'AM',
      current: {
        year: this.customYear ? this.customYear : new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate()
      },
      view: null,
      timeFormats: ['h:i:s', 'h:i'],
      dateFormats: [
        'YYYY-MM-DD',
        'DD-MM-YYYY',
        'MM-DD-YYYY',
        'YYYY/MM/DD',
        'DD/MM/YYYY',
        'MM/DD/YYYY',
        'MMMM DD, YYYY'
      ],
      combinedFormats: [
        'YYYY-MM-DD h:i:s',
        'DD-MM-YYYY h:i:s',
        'MM-DD-YYYY h:i:s',
        'YYYY/MM/DD h:i:s',
        'DD/MM/YYYY h:i:s',
        'MM/DD/YYYY h:i:s',
        'MMMM DD, YYYY h:i:s',
        'YYYY-MM-DD h:i',
        'DD-MM-YYYY h:i',
        'MM-DD-YYYY h:i',
        'YYYY/MM/DD h:i',
        'DD/MM/YYYY h:i',
        'MM/DD/YYYY h:i',
        'MMMM DD, YYYY h:i'
      ],
      id: `datetime-input-${(Math.random() * (new Date().getTime())).toFixed()}`,
      yearUpdated: false,
      showYearOptions: false
    };
  },
  methods: {
    clear() {
      this.date = null;
    },
    leftMonth() {
      const index = this.months.indexOf(this.month);
      if (index === 0) {
        this.leftYear();
        this.monthIndex = 11;
      } else {
        this.monthIndex = index - 1;
      }
      this.updateCalendar();
    },
    rightMonth() {
      const index = this.months.indexOf(this.month);
      if (index === 11) {
        this.rightYear();
        this.monthIndex = 0;
      } else {
        this.monthIndex = index + 1;
      }
      this.updateCalendar();
    },
    rightYear() {
      this.year++;
      this.updateCalendar();
    },
    leftYear() {
      this.year--;
      this.updateCalendar();
    },
    updateCalendar() {
      const date = new Date(this.year, this.monthIndex, 1, 0, 0, 0);
      const day = date.getDay();
      const daysInMonth = new Date(this.year, this.monthIndex + 1, 0).getDate();
      const ports = [];
      let portsLenght = 35;
      if (day === 6 || (day === 5 && daysInMonth === 31)) {
        portsLenght = 42;
      }
      let activeFound = false;
      for (let i = 0; i < portsLenght; i++) {
        const j = i - day;
        const curr = (j < 0 || j >= daysInMonth) ? '' : j + 1;
        ports.push(curr);
        if (
          curr === this.day
          && this.timeStamp.getMonth() === this.monthIndex
          && this.timeStamp.getFullYear() === this.year
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
    setDay(index, port) {
      if (port !== '') {
        this.activePort = index;
        this.day = port;
        this.timeStamp = new Date(this.year, this.monthIndex, this.day);
        if (this.hideTime) {
          this.setDate();
        } else {
          this.view = 'time';
        }
      }
    },
    setYear(year) {
      this.timeStamp = new Date(year, this.monthIndex, this.day);
      this.yearUpdated = true;
      this.setCalendar(this.timeStamp);
      this.setDate(false);
    },
    setMinute(index) {
      this.minuteIndex = index;
      this.minute = this.minutes[index];
    },
    setHour(index) {
      this.hourIndex = index;
      this.hour = this.hours[index];
    },
    scrollTopMinute() {
      const mHeight = this.$refs.minuteScroller.scrollHeight;
      const wHeight = this.$refs.minuteScrollerWrapper.clientHeight;
      const top = mHeight * ((this.minuteIndex / (this.minutes.length - 1)) - (wHeight / 2));
      this.$refs.minuteScroller.scrollTop = top;
    },
    scrollTopHour() {
      const mHeight = this.$refs.hourScroller.scrollHeight;
      const wHeight = this.$refs.hourScrollerWrapper.clientHeight;
      const top = mHeight * ((this.hourIndex / (this.hours.length - 1)) - (wHeight / 2));
      this.$refs.hourScroller.scrollTop = top;
    },
    changePeriod() {
      this.period = this.period === 'AM' ? 'PM' : 'AM';
    },
    documentClicked(e) {
      if (e.target.id !== this.id && this.hideCal === false) {
        this.setCalendar(this.timeStamp);
        this.setDate();
        this.hideCal = true;
      }
    },
    toggleCal() {
      this.hideCal = false;
      this.view = this.hideDate ? 'time' : 'date';
    },
    onInput(e) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        const date = new Date(this.$moment(e.target.value, this.dateFormat).format());
        if (date instanceof Date && !isNaN(date)) {
          this.timeStamp = date;
          this.setCalendar(date);
        }
      }, 350);
    },
    setDate(hideCall = true) {
      let d = null;
      if (!this.dateFormat) {
        console.error('Invalid date format supplied');
      } else {
        let h = `${this.hour}`;
        if (h === '12') {
          if (this.period === 'AM') {
            h = '00';
          } else {
            h = '12';
          }
        } else if (this.period === 'PM') {
          h = `${parseInt(h, 10) + 12}`;
        }
        d = this.dateFormat;
        this.minute += '';
        d = d.replace('h', h.length < 2 ? `0${h}` : `${h}`);
        d = d.replace('i', this.minute.length < 2 ? `0${this.minute}` : `${this.minute}`);
        d = d.replace('s', '00');
        d = d.replace('YYYY', this.year);
        d = d.replace('MMMM', this.$t(FULL_MONTHS[this.monthIndex]));
        const m = this.monthIndex + 1;
        d = d.replace('MM', m < 10 ? `0${m}` : `${m}`);
        d = d.replace('DD', this.day < 10 ? `0${this.day}` : `${this.day}`);
        this.$emit('input', d);
        this.$emit('onchange', new Date(
          this.year,
          this.monthIndex,
          this.day,
          parseInt(h, 10),
          this.minute,
          0
        ).getTime());
        this.date = d;
        this.hideCal = hideCall;
      }
    },
    zeroPad(val) {
      return `0${val}`.slice(-2);
    },
    increaseHour() {
      if (this.hour < 12) {
        this.hour++;
      } else {
        this.hour = 1;
        this.changePeriod();
      }
      this.hour = this.zeroPad(this.hour);
    },
    decreaseHour() {
      if (this.hour > 1) {
        this.hour--;
      } else {
        this.hour = 12;
        this.changePeriod();
      }
      this.hour = this.zeroPad(this.hour);
    },
    increaseMinute() {
      if (this.minute < 59) {
        this.minute++;
      } else {
        this.minute = 0;
        this.increaseHour();
      }
      this.minute = this.zeroPad(this.minute);
    },
    decreaseMinute() {
      if (this.minute > 0) {
        this.minute--;
      } else {
        this.minute = 59;
        this.decreaseHour();
      }
      this.minute = this.zeroPad(this.minute);
    },
    getHours(data) {
      let hour = data.getHours();
      if (hour > 12) {
        hour -= 12;
      } else if (hour === 0) {
        hour = 12;
      }
      return hour;
    },

    setCalendar(date) {
      this.year = date.getFullYear();
      this.monthIndex = date.getMonth();
      this.day = date.getDate();
      this.hour = this.zeroPad(this.getHours(date));
      this.period = date.getHours() >= 12 ? 'PM' : 'AM';
      this.minute = this.zeroPad(date.getMinutes());
      this.updateCalendar();
    },
    toggleYearOptions() {
      this.showYearOptions = !this.showYearOptions;
    }
  },
  created() {
    if (this.value) {
      try {
        this.timeStamp = new Date(this.value);
      } catch (e) {
        console.warn('Invalid date format supplied');
      }
    } else {
      this.timeStamp = new Date();
    }
    this.setCalendar(this.timeStamp);
    if (
      typeof this.initialValue === 'undefined'
      || this.initialValue
    ) {
      this.setDate();
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal) {
        try {
          this.timeStamp = new Date(this.value);
          this.value = newVal;
        } catch (e) {
          console.warn('Invalid date format supplied');
        }
      }
      if (newVal) {
        this.setCalendar(this.timeStamp);
        this.setDate(!this.yearUpdated);
      }
      if (this.yearUpdated) this.yearUpdated = false;
    }
  },
  computed: {
    months() {
      return FULL_MONTHS.map(month => this.$t(month));
    },
    days() {
      return SHORT_WEEK_DAYS.map(day => this.$t(day));
    },
    ports: {
      get() {
        let p = [];
        if (this.portsHolder.length === 0) {
          for (let i = 0; i < 42; i++) {
            p.push('');
          }
        } else {
          p = this.portsHolder;
        }
        return p;
      },
      set(newValue) {
        this.portsHolder = newValue;
      }
    },
    month() {
      return this.months[this.monthIndex];
    },
    dateTime() {
      return `${this.timeStamp.getFullYear()}-${(this.timeStamp.getMonth() + 1)}-${this.timeStamp.getUTCDay()}`;
    },
    minutes() {
      const arr = [];
      for (let i = 0; i < 60; i++) {
        i < 10 ? arr.push(`0${i}`) : arr.push(`${i}`);
      }
      return arr;
    },
    hours() {
      const arr = [];
      for (let i = 1; i <= 12; i++) {
        i < 10 ? arr.push(`0${i}`) : arr.push(`${i}`);
      }
      return arr;
    },
    dateFormat() {
      let f = 'YYYY-MM-DD h:i:s';
      const allowedFormats = [
        ...this.timeFormats,
        ...this.dateFormats,
        ...this.combinedFormats
      ];
      if (this.format) {
        f = this.format;
      }
      if (allowedFormats.indexOf(f) < 0) {
        console.warn('Invalid date format supplied');
        f = null;
      }
      return f;
    },
    hideTime() {
      const formatsWithTime = [
        ...this.combinedFormats,
        ...this.timeFormats
      ];
      return !formatsWithTime.includes(this.dateFormat);
    },
    hideDate() {
      return this.timeFormats.includes(this.dateFormat);
    },
    currentMonth() {
      return this.current.year === this.year && this.current.month === this.monthIndex;
    }
  }
};
</script>
<style scoped lang="scss">
  @import "datetime-picker.scss";
</style>
