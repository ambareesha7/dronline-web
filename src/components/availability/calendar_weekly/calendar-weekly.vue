<template>
  <div class="CalendarWeekly__wrapper">
    <div class="CalendarWeekly__header-days">
      <div class="CalendarWeekly__header-periods-placeholder">
        <div class="CalendarWeekly__header-periods-placeholder-inner"></div>
      </div>
      <div
        class="CalendarWeekly__header-day"
        v-for="(day, index) in daysOfWeek"
        :key="index"
        :class="{ 'current': currentDateIndex === index }">
        <div class="CalendarWeekly__day-name">
          {{ day.day_of_week }}
        </div>
        <div class="CalendarWeekly__day-date">
          {{ day.day_of_month }}
        </div>
      </div>
    </div>
    <div
      class="CalendarWeekly__container custom-scrollbar-container"
      ref="calendarContainer"
      :class="{ 'disable-scrolling': selectedTimeslot }">
      <div class="CalendarWeekly__periods">
        <div
          class="CalendarWeekly__period"
          v-for="period in periods"
          :key="period">
          <span class="CalendarWeekly__period-label">
            {{ period }}
          </span>
        </div>
      </div>

      <div class="CalendarWeekly__content">
        <div class="CalendarWeekly__days">
          <div
            class="CalendarWeekly__day"
            v-for="(day, day_index) in timeslotsPerDay"
            :key="day_index">
            <div class="CalendarWeekly__day-periods">
              <div
                class="CalendarWeekly__day-period"
                v-for="(period, period_index) in periods"
                :key="period_index">
              </div>
            </div>
            <div
              class="CalendarWeekly__presentation"
              @click="handlePresentationClick($event, day_index)"></div>
            <div
              class="CalendarWeekly__timeslots">
              <div
                class="CalendarWeekly__timeslot"
                v-for="(timeslot, timeslot_index) in day"
                :key="timeslot.id">
                <calendar-timeslot
                  :class="{
                    'selected': selectedTimeslot &&
                    timeslot.id === selectedTimeslot.id
                  }"
                  :timeslot="timeslot"
                  :day-start-offset="workDayStartOffset"
                  :day-end-offset="workDayEndOffset"
                  :prev-timeslot="day[timeslot_index - 1]"
                  :next-timeslot="day[timeslot_index + 1]"
                  @update="onTimeslotUpdate"
                  @select="select"
                  @save="save"
                  @remove="removeTimeslots"
                  @cancel="cancelEditing"
                  @schedule-success="updateCalendar"
                  :ref="`day_${day_index}_${timeslot_index}`">
                </calendar-timeslot>

                <calendar-timeslot-popup
                  v-if="selectedTimeslot && timeslot.id === selectedTimeslot.id"
                  :timeslot="selectedTimeslot"
                  :day-start-offset="workDayStartOffset"
                  :day-end-offset="workDayEndOffset"
                  :periods-amount="periods.length"
                  :timeslot-ref="$refs[`day_${day_index}_${timeslot_index}`]"
                  :prev-timeslot="day[timeslot_index - 1]"
                  :next-timeslot="day[timeslot_index + 1]"
                  @update="onTimeslotUpdate"
                  @cancel="cancelEditing"
                  @save="save"
                  @close="unselect"
                  @remove="remove">
                </calendar-timeslot-popup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <calendar-tip
      v-if="tipType">
    </calendar-tip>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { getIndexByParam } from '@/utils';
import { SHORT_WEEK_DAYS, TIMESLOT_DURATION_MINUTES, TIMESLOT_DURATION_SECONDS } from '@/constants';
import CalendarTimeslot from '@/components/availability/calendar_timeslot/calendar-timeslot';
import CalendarTimeslotPopup from '@/components/availability/calendar_timeslot_popup/calendar-timeslot-popup';
import CalendarTip from '@/components/availability/calendar_tip/calendar-tip';
import ConfirmDeletionModal from '@/components/availability/confirm_deletion_modal/confirm-deletion-modal';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('availability');

export default {
  name: 'CalendarWeekly',

  components: {
    CalendarTimeslot,
    CalendarTimeslotPopup,
    CalendarTip
  },

  props: {
    date: {
      required: true
    },
    dayStart: {
      type: String
    },
    dayEnd: {
      type: String
    }
  },

  data() {
    return {
      today: this.$moment(),
      year: null,
      monthIndex: null,
      dayOfWeek: null,
      dayOfMonth: null,
      daysInMonth: null,
      daysOfWeek: [],
      periods: [],
      currentDateIndex: null,
      selectedTimeslot: null
    };
  },

  watch: {
    date() {
      this.setCalendar();
    }
  },

  computed: {
    ...mapGetters(['timeslots', 'tipType']),
    startOfWeek() {
      return this.$moment(this.date).startOf('week');
    },
    workDayStartOffset() {
      return (60 * Number(this.dayStart.split(':')[0])) + Number(this.dayStart.split(':')[1]);
    },
    workDayEndOffset() {
      return (60 * Number(this.dayEnd.split(':')[0])) + Number(this.dayEnd.split(':')[1]);
    },
    workDayStart() {
      return this.workDayStartOffset > 0 ?
        this.$moment().startOf('day').add(this.workDayStartOffset, 'minutes') :
        this.$moment().startOf('day');
    },
    workDayEnd() {
      return this.workDayEndOffset > 0 ?
        this.$moment().startOf('day').add(this.workDayEndOffset, 'minutes') :
        this.$moment().endOf('day');
    },
    periodsNumber() {
      return this.$moment(this.workDayEnd)
        .diff(this.$moment(this.workDayStart), 'minutes') / TIMESLOT_DURATION_MINUTES;
    },
    timeslotsPerDay() {
      const timeslots = [];
      for (let i = 0; i < 7; i++) {
        timeslots.push([]);
        this.timeslots.forEach(timeslot => {
          if (
            this.$moment(timeslot.startTime * 1000).date() ===
            this.$moment(this.startOfWeek).add(i, 'days').date()
          ) {
            timeslots[i].push(timeslot);
          }
        });
        timeslots[i].sort((a, b) => a.start - b.start);
      }
      return timeslots;
    },
    teamMemberId() {
      return this.$route.query.specialist_id;
    }
  },

  created() {
    this.setCalendar();
    this.setPeriods();
  },

  mounted() {
    if (this.$moment(this.date).isSame(this.today, 'date')) {
      this.scrollToCurrentTime();
    }
  },

  methods: {
    ...mapMutations([
      'clearTimeslots',
      'setTimeslot',
      'createTimeslot',
      'clearEditable'
    ]),
    ...mapActions([
      'fetchTimeslots',
      'updateTimeslot',
      'addTimeslots',
      'removeTimeslots'
    ]),

    scrollToCurrentTime() {
      const diff = this.$moment().diff(this.workDayStart, 'minutes');
      this.$refs.calendarContainer.scrollTop = diff * TIMESLOT_DURATION_MINUTES;
    },

    setPeriods() {
      this.periods = [];
      for (let i = 0; i < this.periodsNumber; i++) {
        this.periods.push(this.$moment(this.workDayStart).add(i * TIMESLOT_DURATION_MINUTES, 'minutes').format('HH:mm'));
      }
    },
    setCalendar() {
      this.year = Number(this.$moment(this.date).format('YYYY'));
      this.monthIndex = this.$moment(this.date).get('month');
      this.dayOfWeek = this.$moment(this.date).get('day');
      this.dayOfMonth = this.$moment(this.date).date();
      this.daysInMonth = new Date(this.year, this.monthIndex + 1, 0).getDate();
      this.updateCalendar();
    },

    updateCalendar() {
      this.clearTimeslots();
      const daysOfWeek = [];
      this.currentDateIndex = null;
      for (let i = 0; i < 7; i++) {
        const day = this.$moment(this.startOfWeek).add(i, 'days');
        daysOfWeek.push({
          day_of_week: this.$t(SHORT_WEEK_DAYS[i]),
          day_of_month: day.date(),
          date: day
        });
        if (this.$moment().isSame(day, 'day')) {
          this.currentDateIndex = i;
        }
      }
      this.daysOfWeek = daysOfWeek;
      this.fetchTimeslots({
        specialist_id: this.$route.query.specialist_id,
        month: this.$moment(this.date).unix()
      });
    },

    handlePresentationClick(e, dayOfWeek) {
      const period = Math.trunc(e.layerY / 30);
      const startTime = this.$moment(this.date)
        .startOf('week')
        .add(dayOfWeek, 'day')
        .add(this.workDayStartOffset, 'minutes')
        .add(period * TIMESLOT_DURATION_MINUTES, 'minutes')
        .unix();
      this.createNewTimeslot({
        startTime,
        temporary: true,
        duration: TIMESLOT_DURATION_SECONDS
      });
    },

    createNewTimeslot(timeslot) {
      this.createTimeslot(timeslot);
      this.$nextTick(() => this.select(timeslot));
    },

    onTimeslotUpdate({ timeslot, id = timeslot.id }) {
      this.setTimeslot({ timeslot, id });
      if (this.selectedTimeslot && this.selectedTimeslot.id === id) {
        this.$set(this, 'selectedTimeslot', timeslot);
      }
    },

    cancelEditing() {
      this.selectedTimeslot = null;
      this.clearEditable();
    },

    save(timeslots) {
      this.addTimeslots({
        timeslotParams: timeslots,
        teamMemberId: this.teamMemberId
      }).then(({ error }) => {
        if (error) this.$toastr.e(error);
      });
    },

    select(timeslot) {
      this.selectedTimeslot = timeslot;
    },

    unselect() {
      this.selectedTimeslot = null;
    },

    removeGroup({ startTime, duration }) {
      const params = [];
      for (let d = 0; d < duration; d += TIMESLOT_DURATION_SECONDS) {
        const st = this.$moment(startTime * 1000).add(d, 'seconds').unix();
        params.push({
          startTime: st,
          id: `_${st}`
        });
      }
      this.removeTimeslots({ timeslotParams: params, teamMemberId: this.teamMemberId });
    },

    remove(timeslot) {
      this.selectedTimeslot = null;
      this.$modal.show(
        ConfirmDeletionModal,
        {
          timeslot,
          confirm: () => this.removeGroup(timeslot)
        },
        {
          name: 'confirm-deletion-modal',
          width: 387,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: false,
          transition: 'from-top-to-bottom'
        }
      );
    }
  }
};
</script>
<style scoped lang="scss">
  @import "calendar-weekly.scss";
</style>
