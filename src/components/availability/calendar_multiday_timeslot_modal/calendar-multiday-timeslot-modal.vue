<template>
  <div
    class="CalendarMultidayTimeslotModal__wrapper">
    <div class="CalendarMultidayTimeslotModal__header">
      <div :class="{
          'CalendarMultidayTimeslotModal__header__title': true,
          'CalendarMultidayTimeslotModal__header__title--add': this.mode === 'ADD_SLOTS',
          'CalendarMultidayTimeslotModal__header__title--remove': this.mode === 'REMOVE_SLOTS',
        }">
        {{ this.mode === 'ADD_SLOTS' ? $t('global.add') : $t('global.remove') }}
        {{ $t('global.available') }}
        {{ $t('global.hours') }}
      </div>
    </div>
    <div
      class="CalendarMultidayTimeslotModal__content">
        <div class="CalendarMultidayTimeslotModal__sub-header">
            <span v-if="period === 'MONTH'">
              {{ startDateTime | moment('MMMM') }} {{ startDateTime | moment('YYYY') }}
            </span>
            <span v-if="period === 'WEEK'">
              {{ $t('calendar.week_starting_on') }} {{ startDateTime | moment('MMMM D YYYY') }}
            </span>
        </div>

        <div
          class="
            CalendarMultidayTimeslotModal__row
            CalendarMultidayTimeslotModal__row--include-weekends"
          >
          <checkbox v-model="includeWeekends">
            {{ $t('calendar.include_weekends') }}
          </checkbox>
        </div>

        <div class="CalendarMultidayTimeslotModal__row">
          <div class="CalendarMultidayTimeslotModal__col">
            {{ $t('global.hours') }}
          </div>
          <div class="CalendarMultidayTimeslotModal__col">
            <div class="CalendarMultidayTimeslotModal__time">
              <div
                class="CalendarMultidayTimeslotModal__start"
                :class="{ 'active': editTime === 'start' }"
                @click="setTimeDropdown('start', $event)">
                {{ startTime | moment('hh:mm A') }}
              </div>
              <div class="CalendarMultidayTimeslotModal__divider">&mdash;</div>
              <div
                class="CalendarMultidayTimeslotModal__end"
                :class="{ 'active': editTime === 'end' }"
                @click="setTimeDropdown('end', $event)">
                {{ endTime | moment('hh:mm A') }}
              </div>
                <div
                  class="CalendarMultidayTimeslotModal__time-dropdown custom-scrollbar-container"
                  :class="editTime"
                  :style="timeDropdownPosition"
                  v-if="editTime"
                  :key="editTime">
                  <div
                    class="CalendarMultidayTimeslotModal__options"
                    v-on-click-outside="closeTimeDropdown">
                    <div
                      class="CalendarMultidayTimeslotModal__time-option"
                      v-for="(option, index) in periods"
                      :key="index"
                      @click="setTime(index)">
                      {{ option | moment('hh:mm A') }}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      <div class="CalendarMultidayTimeslotModal__actions">
        <btn
          @onclick="close"
          btn-class="blue"
          class="CalendarMultidayTimeslotModal__action"
          :btn-label="$t('global.cancel')">
        </btn>
        <btn
          v-if="mode === 'ADD_SLOTS'"
          @onclick="save"
          btn-class="blue-filled"
          class="CalendarMultidayTimeslotModal__action"
          :btn-label="$t('global.save')">
        </btn>
        <btn
          v-if="mode === 'REMOVE_SLOTS'"
          @onclick="remove"
          btn-class="red"
          class="CalendarMultidayTimeslotModal__action"
          :btn-label="$t('global.remove')">
        </btn>
      </div>
    </div>

    <transition
      appear
      name="fade-in">
      <div
        class="CalendarMultidayTimeslotModal__backdrop"
        @click="$emit('cancel')"></div>
    </transition>
  </div>
</template>

<script>
import { TIMESLOT_DURATION_MINUTES, TIMESLOT_DURATION_SECONDS } from '@/constants';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import Checkbox from '@/components/global/checkbox/checkbox';
import { cloneDeep } from 'lodash';

export default {
  name: 'CalendarMultidayTimeslotModalMultiday',

  components: {
    DatetimePicker,
    Checkbox
  },

  props: {
    startDateTime: {
      type: Object,
      required: true
    },
    endDateTime: {
      type: Object,
      required: true
    },
    period: {
      type: String,
      validator: val => ['WEEK', 'MONTH'].includes(val)
    },
    mode: {
      type: String,
      validator: val => ['ADD_SLOTS', 'REMOVE_SLOTS'].includes(val)
    },
    onAdd: {
      type: Function,
      required: false
    },
    onRemove: {
      type: Function,
      required: false
    }
  },

  data() {
    return {
      startTime: this.initialStartTime(),
      endTime: this.initialEndTime(),
      includeWeekends: false,
      editTime: false,
      timeDropdownPosition: null,
      initial: {}
    };
  },

  computed: {

    periods() {
      const periodsAmount = 48;
      const periods = [];
      for (let i = 0; i <= periodsAmount; i++) {
        const period = this.initialStartTime()
          .add(this.dayStartOffset, 'minutes')
          .add(i * TIMESLOT_DURATION_MINUTES, 'minutes')
          .unix();
        periods.push(period);
      }
      return periods;
    }
  },

  methods: {
    initialStartTime() {
      return this.$moment().startOf('day').add(9, 'hours');
    },
    initialEndTime() {
      return this.$moment().startOf('day').add(9 + 9, 'hours');
    },
    close() {
      this.$modal.hide('calendar-multiday-timeslot-modal');
    },
    setTimeDropdown(type, e) {
      if (e) {
        const rect = e.target.getBoundingClientRect();
        this.timeDropdownPosition = {
          top: `${rect.height}px`,
          left: `${e.target.offsetLeft + (rect.width / 2)}px`
        };
      }
      this.editTime = type;
    },

    closeTimeDropdown() {
      this.setTimeDropdown(false);
    },

    setTime(period) {
      if (this.editTime === 'end') {
        this.updateEndTime(period);
      } else {
        this.updateStartTime(period);
      }
      this.setTimeDropdown(false);
    },

    updateStartTime(period) {
      this.startTime = this.initialStartTime().add(period * TIMESLOT_DURATION_MINUTES, 'minutes');
    },

    updateEndTime(period) {
      this.endTime = this.initialStartTime().add(period * TIMESLOT_DURATION_MINUTES, 'minutes');
    },

    save() {
      this.onAdd(this.prepareSlots());
      this.close();
    },

    remove() {
      this.onRemove(this.prepareSlots());
      this.close();
    },

    prepareSlots() {
      const nowUnix = this.$moment().unix();
      const startTimeUnix = this.startTime.unix();

      const slotsInPeriod = this.endTime.diff(this.startTime, 'minutes') / TIMESLOT_DURATION_MINUTES;
      const startTimeDayStartOffsetSeconds = this.startTime.diff(this.startTime.clone().startOf('day'), 'seconds');
      const slotsDayStartOffsetsSeconds = [...Array(slotsInPeriod).keys()]
        .map(key => startTimeDayStartOffsetSeconds + (key * TIMESLOT_DURATION_SECONDS));

      let day = this.startDateTime;
      const daysStartsUnix = [];
      while (day <= this.endDateTime) {
        if (!this.isExcludedWeekendDay(day)) {
          daysStartsUnix.push(day.unix());
        }
        day = day.clone().add(1, 'day');
      }

      return daysStartsUnix
        .reduce((accSlots, dayStartUnix) => {
          const daySlots = slotsDayStartOffsetsSeconds.map(slotDayStartOffsetSeconds => ({
            duration: TIMESLOT_DURATION_SECONDS,
            startTime: dayStartUnix + slotDayStartOffsetSeconds
          }));
          return accSlots.concat(daySlots);
        }, [])
        .filter(slot => slot.startTime > nowUnix);
    },

    isExcludedWeekendDay(day) {
      const sundayNo = 0;
      const saturdayNo = 6;
      if (this.includeWeekends) {
        return false;
      }
      return [sundayNo, saturdayNo].includes(day.weekday());
    }
  }
};
</script>
<style lang="scss">
  @import "calendar-multiday-timeslot-modal.scss";
</style>
