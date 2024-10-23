<template>
  <div
    class="CalendarTimeslotPopup__wrapper">
    <transition
      appear
      name="appear-from-right">
      <div
        class="CalendarTimeslotPopup__content"
        :style="style"
        :class="position">
        <div class="CalendarTimeslotPopup__section">
          <div class="CalendarTimeslotPopup__section-header">
            <div class="title-uppercase">
              {{ $t('global.details') }}
            </div>
            <div
              v-if="timeslot.status"
              class="CalendarTimeslotPopup__remove"
              @click="remove">
              {{ $t('global.remove') }}
            </div>
          </div>
          <div class="CalendarTimeslotPopup__row">
            <div class="CalendarTimeslotPopup__col CalendarTimeslotPopup__label">
              {{ $t('global.hour') }}
            </div>
            <div class="CalendarTimeslotPopup__col">
              <div class="CalendarTimeslotPopup__time">
                <div
                  class="CalendarTimeslotPopup__start"
                  :class="{ 'active': editTime === 'start' }"
                  @click="setTimeDropdown('start', $event)">
                  {{ timeslot.startTime | moment('hh:mm A') }}
                </div>
                <div class="CalendarTimeslotPopup__divider">&mdash;</div>
                <div
                  class="CalendarTimeslotPopup__end"
                  :class="{ 'active': editTime === 'end' }"
                  @click="setTimeDropdown('end', $event)">
                  {{ timeslotEnd / 1000 | moment('hh:mm A') }}
                </div>
                <transition
                  appear
                  name="appear-from-right">
                  <div
                    class="CalendarTimeslotPopup__time-dropdown custom-scrollbar-container"
                    :class="editTime"
                    :style="timeDropdownPosition"
                    v-if="editTime"
                    :key="editTime">
                    <div
                      class="CalendarTimeslotPopup__options"
                      v-on-click-outside="closeTimeDropdown">
                      <div
                        class="CalendarTimeslotPopup__time-option"
                        v-for="(option, index) in periods.filter((o, i) => periodAllowed(i))"
                        :key="index"
                        @click="setTime(index)">
                        {{ option | moment('hh:mm A') }}
                        <span>
                          {{ getDiff(option) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <div class="CalendarTimeslotPopup__row">
            <div class="CalendarTimeslotPopup__col CalendarTimeslotPopup__label">
              {{ $t('global.date') }}
            </div>
            <div class="CalendarTimeslotPopup__col">
              <datetime-picker
                name="date"
                input-class="CalendarTimeslotPopup__date invalidate"
                format="YYYY/MM/DD"
                position="top"
                :value="startTime"
                @onchange="date => setDate(date)"
                ref="date"
                :allow-clearing="false">
              </datetime-picker>
            </div>
          </div>
        </div>
        <div class="CalendarTimeslotPopup__actions">
          <btn
            @onclick="$emit('cancel')"
            btn-class="blue"
            class="CalendarTimeslotPopup__action"
            :btn-label="$t('global.cancel')">
          </btn>
          <btn
            :class="{'invalidate': timeslot.type === null}"
            @onclick="save"
            btn-class="blue-filled"
            class="CalendarTimeslotPopup__action"
            :btn-label="$t('global.save')">
          </btn>
        </div>
      </div>
    </transition>

    <transition
      appear
      name="fade-in">
      <div
        class="CalendarTimeslotPopup__backdrop"
        @click="$emit('cancel')"></div>
    </transition>
  </div>
</template>

<script>
import { TIMESLOT_DURATION_MINUTES, TIMESLOT_DURATION_SECONDS } from '@/constants';
import DatetimePicker from '@/components/global/datetime_picker/datetime-picker';
import { cloneDeep } from 'lodash';

export default {
  name: 'CalendarTimeslotPopup',

  components: {
    DatetimePicker
  },

  props: {
    timeslot: {
      type: Object,
      required: true
    },
    dayStartOffset: {
      type: Number,
      required: true
    },
    dayEndOffset: {
      type: Number,
      required: true
    },
    periodsAmount: {
      type: Number
    },
    timeslotRef: {
      required: true
    },
    nextTimeslot: {
      type: Object
    },
    prevTimeslot: {
      type: Object
    }
  },

  data() {
    return {
      editTime: false,
      timeDropdownPosition: null,
      position: [],
      style: {},
      initial: {}
    };
  },

  computed: {
    startTime() {
      return this.timeslot.startTime * 1000;
    },

    timeslotEnd() {
      return this.$moment(this.startTime).add(this.timeslot.duration, 'seconds');
    },

    dayStart() {
      return this.$moment(this.startTime)
        .startOf('day')
        .add(this.dayStartOffset, 'minutes');
    },

    startOffset() {
      return this.$moment(this.startTime)
        .diff(this.$moment(this.dayStart), 'minutes');
    },

    initialStartOffset() {
      return this.$moment(this.initial.startTime * 1000)
        .diff(this.$moment(this.dayStart), 'minutes');
    },

    startPeriod() {
      return this.startOffset / TIMESLOT_DURATION_MINUTES;
    },

    dayEndPeriod() {
      return (this.dayEndOffset - this.dayStartOffset) / TIMESLOT_DURATION_MINUTES;
    },

    initialStartPeriod() {
      return this.initialStartOffset / TIMESLOT_DURATION_MINUTES;
    },

    initialEndPeriod() {
      return (this.initialStartOffset / TIMESLOT_DURATION_MINUTES) +
        (this.initial.duration / TIMESLOT_DURATION_SECONDS);
    },

    timeslotElement() {
      return this.timeslotRef ? this.timeslotRef[0].$el : null;
    },

    prevTimeslotPeriod() {
      const prevTimeslotOffset = this.prevTimeslot ?
        this.$moment(this.prevTimeslot.startTime * 1000)
          .add(this.prevTimeslot.duration, 'seconds')
          .diff(this.$moment(this.dayStart), 'minutes') :
        null;
      return this.prevTimeslot ? (prevTimeslotOffset / TIMESLOT_DURATION_MINUTES) : 0;
    },

    nextTimeslotPeriod() {
      const nextTimeslotOffset = this.nextTimeslot ?
        this.$moment(this.nextTimeslot.startTime * 1000)
          .diff(this.$moment(this.dayStart), 'minutes') :
        null;
      return (nextTimeslotOffset / TIMESLOT_DURATION_MINUTES) || this.dayEndPeriod;
    },

    periods() {
      const periods = [];
      for (let i = 0; i <= this.periodsAmount; i++) {
        const period = this.$moment(this.startTime)
          .startOf('day')
          .add(this.dayStartOffset, 'minutes')
          .add(i * TIMESLOT_DURATION_MINUTES, 'minutes')
          .unix();
        periods.push(period);
      }
      return periods;
    }
  },

  watch: {
    startOffset() {
      this.calculatePosition();
    }
  },

  mounted() {
    this.$nextTick(() => this.calculatePosition());
    document.body.classList.add('disable-scrolling');
    window.addEventListener('resize', this.calculatePosition);
    this.initial = cloneDeep(this.timeslot);
  },

  beforeDestroy() {
    document.body.classList.remove('disable-scrolling');
    window.removeEventListener('resize', this.calculatePosition);
  },

  methods: {
    calculatePosition() {
      this.style = {};
      const timeslotRect = this.timeslotElement.getBoundingClientRect();
      const popupWidth = 380;
      const requiredBottomOffset = 154;
      if (window.innerWidth - timeslotRect.right < popupWidth) {
        this.position = ['left'];
        this.style.left = `${timeslotRect.left - popupWidth}px`;
      } else {
        this.position = ['right'];
        this.style.left = `${timeslotRect.left + timeslotRect.width + 12}px`;
      }
      this.style.top = `${timeslotRect.top}px`;
      if (window.innerHeight - timeslotRect.bottom < requiredBottomOffset) {
        this.position.push('top');
      } else {
        this.position.push('bottom');
      }
    },

    setType(val) {
      let type = val;
      if (
        (this.timeslot.type === 1 && val === 2) ||
        (this.timeslot.type === 2 && val === 1)
      ) type = 3;
      if (this.timeslot.type === 3 && val === 1) type = 2;
      if (this.timeslot.type === 3 && val === 2) type = 1;
      this.$emit('update', {
        ...this.timeslot,
        type
      });
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
        this.updateDuration(period);
      } else {
        this.updateStartTime(period - this.startPeriod);
      }
      this.setTimeDropdown(false);
    },

    updateStartTime(diff) {
      let timeslot;
      if (diff > 0) {
        timeslot = {
          ...this.timeslot,
          startTime: this.$moment(this.startTime).add(Math.abs(diff) * TIMESLOT_DURATION_MINUTES, 'minutes').unix(),
          duration: this.timeslot.duration - ((Math.abs(diff) * TIMESLOT_DURATION_MINUTES) * 60)
        };
      } else {
        timeslot = {
          ...this.timeslot,
          startTime: this.$moment(this.startTime).subtract(Math.abs(diff) * TIMESLOT_DURATION_MINUTES, 'minutes').unix(),
          duration: this.timeslot.duration + ((Math.abs(diff) * TIMESLOT_DURATION_MINUTES) * 60)
        };
      }
      this.$emit('update', {
        timeslot,
        startTime: this.timeslot.startTime
      });
    },

    updateDuration(diff) {
      this.$emit('update', {
        timeslot: {
          ...this.timeslot,
          duration: (diff * 15) * 60
        }
      });
    },

    setDate(date) {
      // todo
    },

    save() {
      const timeslots = [];
      const offsetTop = Math.abs(this.timeslot.startTime - this.initial.startTime);
      const offsetBottom = (this.timeslot.duration - this.initial.duration) - offsetTop;
      const extract = (periods, offset = 0) => {
        for (let i = 0; i < periods; i++) {
          const startTime = this.$moment(this.startTime)
            .add(offset, 'seconds')
            .add(i * TIMESLOT_DURATION_MINUTES, 'minutes').unix();
          timeslots.push({
            duration: TIMESLOT_DURATION_SECONDS,
            startTime
          });
        }
      };
      if (this.timeslot.temporary) {
        const periods = this.timeslot.duration / TIMESLOT_DURATION_SECONDS;
        extract(periods);
      } else {
        if (offsetTop) {
          const periods = offsetTop / TIMESLOT_DURATION_SECONDS;
          extract(periods);
        }
        if (offsetBottom) {
          const periods = offsetBottom / TIMESLOT_DURATION_SECONDS;
          const offset = offsetTop + this.initial.duration;
          extract(periods, offset);
        }
      }
      this.$emit('save', timeslots);
      this.$emit('close');
    },

    remove() {
      this.timeslot.temporary ? this.$emit('cancel') : this.$emit('remove', this.timeslot);
    },

    periodAllowed(index) {
      return (
        this.editTime === 'start' &&
        index <= this.initialStartPeriod + 1 &&
        index >= this.prevTimeslotPeriod
      ) || (
        this.editTime === 'end' &&
        index >= this.initialEndPeriod - 1 &&
        index <= this.nextTimeslotPeriod
      );
    },

    getDiff(time) {
      const offset = this.editTime === 'start' ? this.timeslot.duration * 1000 : 0;
      const minutes = Math.abs(this.$moment(time * 1000).diff(this.$moment(this.startTime + offset), 'minutes'));
      const value = minutes >= 60 ? minutes / 60 : minutes;

      const valueMinutes = (minutes >= 0 && minutes < 60) ? minutes : minutes % 60;
      const valueHours = (minutes >= 60) ? parseInt(minutes / 60, 10) : 0;

      const textMinutes = valueMinutes ? `${valueMinutes} mins` : '';

      let textHours = '';
      if (valueHours === 1) {
        textHours = '1 hr ';
      } else if (valueHours > 1) {
        textHours = `${valueHours} hrs `;
      } else {
        textHours = '';
      }
      return `(${textHours}${textMinutes})`;
    }
  }
};
</script>
<style lang="scss">
  @import "calendar-timeslot-popup.scss";
</style>
