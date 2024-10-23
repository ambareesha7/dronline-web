<template>
  <div
    class="CalendarTimeslot__wrapper"
    :class="timeslotClass">
    <div
      v-if="isDayOff"
      class="CalendarTimeslot__content CalendarTimeslot__day-off-content">
      <div class="CalendarTimeslot__day-off-placeholder">
        <i class="icon-day-off CalendarTimeslot__day-off-icon"></i>
        {{ $t('calendar.day_off') }}
      </div>
    </div>
    <div
      v-else-if="timeslot.taken"
      class="CalendarTimeslot__content">
      <div class="CalendarTimeslot__title">
        {{ period.from }}
        <div class="CalendarTimeslot__title-period">
          {{ period.fromPeriod }}
        </div>
        &mdash;
        {{ period.to }}
        <div class="CalendarTimeslot__title-period">
          {{ period.toPeriod }}
        </div>
      </div>
      <div class="CalendarTimeslot__splitted-slots">
        <div
          class="CalendarTimeslot__splitted-slot"
          v-for="(slot, index) in timeslot.taken"
          :key="index"
          @click="showDetails(slot)">
          <i class="icon-angle-right CalendarTimeslot__splitted-slot-icon"></i>
        </div>
      </div>
    </div>
    <div
      v-else
      class="CalendarTimeslot__content"
      :class="{ moving }"
      :data-not-taken-slot="true"
      @mousedown="moveMousedown"
      @mouseenter="mouseEnter"
      @mouseleave="mouseLeave">
      <div class="CalendarTimeslot__title">
        {{ period.from }}
        <div class="CalendarTimeslot__title-period">
          {{ period.fromPeriod }}
        </div>
        &mdash;
        {{ period.to }}
        <div class="CalendarTimeslot__title-period">
          {{ period.toPeriod }}
        </div>
      </div>
      <div class="CalendarTimeslot__schedule-btn"
        v-if="isAdmin && this.timeslot.status === 'free' && isHovered"
        :style="scheduleBtnStyle"
        @mousedown="showScheduleModal"
      >
        <div>Take slot</div>
        {{ this.scheduleFrom }}
        <span class="CalendarTimeslot__title-period">{{ this.scheduleFromAmPm }}</span>
        &mdash;
        {{ this.scheduleTo }}
        <span class="CalendarTimeslot__title-period">{{ this.scheduleToAmPm }}</span>
      </div>
    </div>
    <div
      v-if="resizable"
      class="CalendarTimeslot__resize-area top"
      data-direction="top"
      @mousedown="resizeMousedown">
    </div>
    <div
      v-if="resizable"
      class="CalendarTimeslot__resize-area bottom"
      data-direction="bottom"
      @mousedown="resizeMousedown">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { cloneDeep } from 'lodash';
import { TIMESLOT_DURATION_MINUTES, TIMESLOT_DURATION_SECONDS } from '@/constants';
import VisitDetailsModal from '@/components/visits/visit_details_modal/visit-details-modal';
import ScheduleModal from '@/components/availability/schedule_modal/schedule-modal';


export default {
  name: 'CalendarTimeslot',
  components: {
    ScheduleModal
  },
  props: {
    timeslot: {
      type: Object,
      required: true
    },
    nextTimeslot: {
      type: Object
    },
    prevTimeslot: {
      type: Object
    },
    dayStartOffset: {
      type: Number,
      required: true
    },
    dayEndOffset: {
      type: Number,
      required: true
    }
  },
  watch: {
    timeslot() {
      if (
        !this.resizing &&
        !this.moving
      ) this.setStyle();
    }
  },
  data() {
    return {
      startHeight: 0,
      startDuration: 0,
      startTop: 0,
      startY: 0,
      minHeight: TIMESLOT_DURATION_MINUTES,
      moving: false,
      resizing: false,
      types: [
        'day_off',
        'in_office_app',
        'video_call',
        'in_office_app_and_video-call'
      ],
      visitStates: [
        null,
        'pending'
      ],
      isHovered: false,
      cachedRouteQuery: null,
      scheduleBtnStyle: { top: '0px' },
      scheduleFrom: null,
      scheduleFromAmPm: null,
      scheduleTo: null,
      scheduleToAmPm: null,
      scheduleStartTime: null
    };
  },
  computed: {
    ...mapGetters('team', [
      'isAdmin'
    ]),
    startTime() {
      return this.timeslot.startTime * 1000;
    },
    period() {
      const from = this.$moment(this.timeslot.startTime * 1000);
      const to = this.$moment(this.timeslot.startTime * 1000).add(this.timeslot.duration, 'seconds');
      return {
        from: from.format('hh:mm'),
        fromPeriod: from.format('A'),
        to: to.format('hh:mm'),
        toPeriod: to.format('A')
      };
    },
    visitState() {
      return this.timeslot.taken ? this.timeslot.taken[0].visitState : null;
    },
    timeslotClass() {
      return [
        this.timeslot.status,
        this.visitStates[this.visitState]
      ];
    },
    dayStart() {
      return this.$moment(this.startTime)
        .startOf('day')
        .add(this.dayStartOffset, 'minutes');
    },
    periods() {
      return Math.trunc(this.timeslot.duration / TIMESLOT_DURATION_SECONDS);
    },
    startOffset() {
      return this.$moment(this.startTime).diff(this.dayStart, 'minutes');
    },
    periodsOffset() {
      return Math.trunc(this.startOffset / TIMESLOT_DURATION_MINUTES);
    },
    nextTimeslotStartOffset() {
      return this.nextTimeslot ?
        this.$moment(this.nextTimeslot.startTime * 1000)
          .diff(this.$moment(this.dayStart), 'minutes') :
        null;
    },
    prevTimeslotEndOffset() {
      return this.prevTimeslot ?
        this.$moment(this.prevTimeslot.startTime * 1000)
          .add(this.prevTimeslot.duration, 'seconds')
          .diff(this.$moment(this.dayStart), 'minutes') :
        null;
    },
    topOffsetLimit() {
      const limit = this.prevTimeslotEndOffset ?
        this.prevTimeslotEndOffset :
        0;
      return this.minutesToPixels(limit);
    },
    bottomLimit() {
      const limit = this.nextTimeslotStartOffset ?
        this.nextTimeslotStartOffset :
        this.dayEndOffset - this.dayStartOffset;
      return this.minutesToPixels(limit);
    },
    bottomOffsetLimit() {
      return this.bottomLimit - this.minutesToPixels(this.timeslot.duration / 60);
    },
    maxHeight() {
      return this.bottomLimit - this.minutesToPixels(this.startOffset);
    },
    isDayOff() {
      return this.timeslot.type === 0;
    },
    resizable() {
      return !this.isDayOff && !this.timeslot.taken;
    }
  },
  mounted() {
    this.setStyle();
    this.cachedRouteQuery = cloneDeep(this.$route.query);
  },
  methods: {
    minutesToPixels(minutes) {
      // this method make no sense for now but could be usefull
      // in future in case we'll have different period & height
      return (minutes / 15) * 30; // one period (15 min) have 30px height
    },
    pixelsToMinutes(px) {
      // this method make no sense for now but could be usefull
      // in future in case we'll have different period & height
      return (px / 30) * 15; // 30px will have 15 min
    },
    setHeight() {
      const height = this.minutesToPixels(this.timeslot.duration / 60);
      this.$el.style.height = `${height}px`;
    },
    setOffset() {
      const top = this.minutesToPixels(this.startOffset);
      this.$el.style.top = `${top}px`;
    },
    setStyle() {
      this.setHeight();
      this.setOffset();
    },
    resizeMousedown(e) {
      if (this.timeslot.type === 0) return;
      document.addEventListener('mousemove', this.resizeMousemove);
      document.addEventListener('mouseup', this.resizeMouseup);
      this.resizing = true;
      this.resizeDirection = e.target.dataset.direction || 'bottom';
      this.startTop = this.$el.offsetTop;
      this.startHeight = this.$el.getBoundingClientRect().height;
      this.startDuration = this.timeslot.duration;
      this.startY = e.y;
      e.preventDefault();
      e.stopPropagation();
    },
    resizeMousemove(e) {
      e.preventDefault();
      const resizeDistance = e.y - this.startY;
      if (!resizeDistance) return;
      if (this.resizeDirection === 'bottom') {
        let height = this.startHeight + resizeDistance;
        if (height < this.minHeight) height = this.minHeight;
        if (height > this.maxHeight) height = this.maxHeight;
        this.$el.style.height = `${height}px`;
        const periods = this.calculatePeriods(height);
        if (periods !== this.periods) this.updateDuration(periods);
      } else {
        let top = this.startTop + resizeDistance;
        let height = this.startHeight - resizeDistance;
        if (top < this.topOffsetLimit) {
          top = this.topOffsetLimit;
          height = resizeDistance + this.startHeight;
        } else if (height < this.minHeight) {
          top = (this.startTop + this.startHeight) - this.minHeight;
          height = this.minHeight;
        }
        this.$el.style.top = `${top}px`;
        this.$el.style.height = `${height}px`;
        const startTime = this.calculateStartTime(top);
        const periods = this.calculatePeriods(height);
        if (startTime * 1000 !== this.startTime) this.updateStartTime({ periods, startTime });
      }
    },
    calculatePeriods(height) {
      return Math.round(height / 30);
    },
    calculateStartTime(top) {
      const startOffset = Math.round((this.pixelsToMinutes(top) - 1) / TIMESLOT_DURATION_MINUTES) *
        TIMESLOT_DURATION_MINUTES;
      const startTime = this.$moment(this.dayStart).add(startOffset, 'minutes').unix();
      return startTime;
    },
    calculateOffsetFromTop() {
      return (this.startTop - this.minutesToPixels(this.startOffset)) / 30;
    },
    resizeMouseup(e) {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('mousemove', this.resizeMousemove);
      document.removeEventListener('mouseup', this.resizeMouseup);
      this.resizing = false;
      this.setStyle();
      const toBeAdded = [];
      const toBeRemoved = [];
      let diff = 0;
      let startingPoint;
      if (this.resizeDirection === 'top') {
        diff = this.calculateOffsetFromTop();
        startingPoint = this.$moment(this.startTime).unix();
      } else {
        diff = Math.round(
          (this.timeslot.duration - this.startDuration) / TIMESLOT_DURATION_SECONDS
        );
        startingPoint = this.$moment(this.startTime)
          .add(this.startDuration, 'seconds')
          .unix();
      }
      if (diff >= 0) {
        for (let i = 0; i < diff; i++) {
          toBeAdded.push({
            duration: TIMESLOT_DURATION_SECONDS,
            startTime: this.$moment(startingPoint * 1000)
              .add(i * TIMESLOT_DURATION_MINUTES, 'minutes')
              .unix()
          });
        }
      } else {
        for (let i = 0; i > diff; i--) {
          const startTime = this.$moment(startingPoint * 1000)
            .subtract((Math.abs(i) + 1) * TIMESLOT_DURATION_MINUTES, 'minutes')
            .unix();
          toBeRemoved.push({
            startTime,
            id: `_${startTime}`
          });
        }
      }
      if (toBeAdded.length) this.$emit('save', toBeAdded);
      if (toBeRemoved.length) this.$emit('remove', toBeRemoved);
    },
    moveMousedown(e) {
      document.addEventListener('mousemove', this.moveMousemove);
      document.addEventListener('mouseup', this.moveMouseup);
      this.moving = true;
      this.startTop = this.minutesToPixels(this.startOffset);
      this.startHeight = this.$el.getBoundingClientRect().height;
      this.startY = e.y;
      e.preventDefault();
      e.stopPropagation();
    },
    moveMousemove(e) {
      e.preventDefault();
      const moveDistance = e.y - this.startY;
      if (!moveDistance) return;
      let top = this.startTop + moveDistance;
      if (top > this.bottomOffsetLimit) top = this.bottomOffsetLimit;
      if (top < this.topOffsetLimit) top = this.topOffsetLimit;
      this.$el.style.top = `${top}px`;
      const startTime = this.calculateStartTime(top);
      const periods = Math.round(this.startHeight / 30);
      if (startTime * 1000 !== this.startTime) this.updateStartTime({ periods, startTime });
    },
    moveMouseup(e) {
      e.preventDefault();
      e.stopPropagation();
      document.removeEventListener('mousemove', this.moveMousemove);
      document.removeEventListener('mouseup', this.moveMouseup);
      this.moving = false;
      // check coordinates to make sure that timeslot moved, but not just clicked
      if (Math.abs(this.startY - e.y) <= 3) {
        this.$emit('select', this.timeslot);
      } else {
        this.setOffset();
        const toAdd = [];
        const toRemove = [];
        const diff = this.calculateOffsetFromTop();
        const prevStartTime = diff > 0 ?
          this.$moment(this.startTime).add(diff * TIMESLOT_DURATION_MINUTES, 'minutes').unix() :
          this.$moment(this.startTime).subtract(Math.abs(diff) * TIMESLOT_DURATION_MINUTES, 'minutes').unix();
        for (let i = 0; i < this.periods; i++) {
          toAdd.push(this.$moment(this.startTime).add(i * TIMESLOT_DURATION_MINUTES, 'minutes').unix());
          toRemove.push(this.$moment(prevStartTime * 1000).add(i * TIMESLOT_DURATION_MINUTES, 'minutes').unix());
        }
        const untouchable = toAdd.filter(val => toRemove.includes(val));
        const toBeAdded = toAdd
          .filter(t => !untouchable.includes(t))
          .map(startTime => ({ startTime}));
        const toBeRemoved = toRemove
          .filter(t => !untouchable.includes(t))
          .map(startTime => ({ startTime, id: `_${startTime}` }));
        if (toBeAdded.length) this.$emit('save', toBeAdded);
        if (toBeRemoved.length) this.$emit('remove', toBeRemoved);
      }
    },
    moveStartTime(periods) {
      const start = this.$moment(this.timeslot.start)
        .startOf('day')
        .add(this.dayStartOffset + (TIMESLOT_DURATION_MINUTES * periods), 'minutes')
        .unix() * 1000;
      this.$emit('update', {
        ...this.timeslot,
        start
      });
    },
    updateDuration(periods) {
      this.$emit('update', {
        timeslot: {
          ...this.timeslot,
          duration: periods * TIMESLOT_DURATION_SECONDS
        }
      });
    },
    updateStartTime({ periods, startTime }) {
      this.$emit('update', {
        timeslot: {
          ...this.timeslot,
          duration: periods * TIMESLOT_DURATION_SECONDS,
          startTime
        }
      });
    },
    showDetails({ patientId, recordId, startTime, visitId }) {
      const query = {
        visit_details: `${patientId}_${recordId}_${startTime}_${visitId}`
      };
      if (this.$route.query) query.date = this.$route.query.date;
      this.$router.replace({ query });
      this.$modal.show(
        VisitDetailsModal,
        {
          recordId,
          patientId,
          startTime,
          visitState: this.visitState,
          onClose: this.onDetailsClose,
          visitId
        },
        {
          name: 'visit-details-modal',
          width: '100%',
          height: '100%',
          adaptive: true,
          clickToClose: false,
          transition: 'from-right-to-left'
        }
      );
    },
    // < Scheduling >
    mouseEnter(e) {
      this.isHovered = true;

      document.addEventListener('mousemove', this.hoverMouseMove);
    },
    mouseLeave() {
      this.isHovered = false;
      document.removeEventListener('mousemove', this.hoverMouseMove);
    },
    hoverMouseMove(e) {
      if (e.target.getAttribute('data-not-taken-slot')) {
        const slotStart = this.$moment(this.timeslot.startTime * 1000);

        const slotNumber = Math.floor(e.layerY / 30);
        const from = slotStart.clone().add(slotNumber * TIMESLOT_DURATION_MINUTES, 'minutes');

        this.scheduleStartTime = from;

        this.scheduleBtnStyle = { top: `${slotNumber * 30}px` };

        this.scheduleFrom = from.format('hh:mm');
        this.scheduleFromAmPm = from.format('A');
        this.scheduleTo = from.clone().add(TIMESLOT_DURATION_MINUTES, 'minutes').format('hh:mm');
        this.scheduleToAmPm = from.clone().add(TIMESLOT_DURATION_MINUTES, 'minutes').format('A');
      }
    },
    showScheduleModal(e) {
      e.stopPropagation();
      this.$modal.show(
        ScheduleModal,
        {
          startTime: this.scheduleStartTime,
          onSubmit: () => this.$emit('schedule-success')
        },
        {
          name: 'schedule-modal',
          width: 515,
          height: 'auto',
          pivotY: 0.3,
          adaptive: true,
          clickToClose: true,
          transition: 'from-top-to-bottom'
        }
      );
      // < Scheduling />
    },
    onDetailsClose() {
      this.$router.replace({ query: this.cachedRouteQuery });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "calendar-timeslot.scss";
</style>
