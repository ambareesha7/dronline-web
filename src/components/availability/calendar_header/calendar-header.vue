<template>
  <div class="CalendarHeader__wrapper">
    <div class="CalendarHeader__current-period">
      <div class="CalendarHeader__view">
        <div
          @click="toggleViewSelect"
          class="CalendarHeader__view-current">
          {{ $t(`calendar.${view}`) }}
          <i class="icon-caret"></i>
        </div>
        <transition
          name="scale-vertically"
          mode="out-in">
          <div
            v-on-click-outside="toggleViewSelect"
            v-if="viewSelectIsOpen"
            class="CalendarHeader__view-dropdown">
            <div
              @click="setView"
              class="CalendarHeader__view-option">
              {{ $t(`calendar.${oppositeView}`) }}
            </div>
          </div>
        </transition>
      </div>
      <div class="CalendarHeader__date">
        <div class="CalendarHeader__year">
          {{ year }}
        </div>
        &bullet;
        <div class="CalendarHeader__month">
          {{ month }}
        </div>
      </div>
      <div v-show="!isPastView"
        class="CalendarHeader__bulk-action CalendarHeader__bulk-action--add">
        <button
          class="CalendarHeader__bulk-action__button CalendarHeader__bulk-action__button--add"
          @click="showAddModal()"
        >
          {{ $t('global.add') }} {{ $t(`calendar.${nounView}`) }} {{ $t('global.availability') }}
        </button>
      </div>
      <div v-show="!isPastView && hasTimeslotsInView"
        class="CalendarHeader__bulk-action CalendarHeader__bulk-action--remove">
        <button
          class="CalendarHeader__bulk-action__button CalendarHeader__bulk-action__button--remove"
          @click="showRemoveModal()"
        >
          {{ $t('global.remove') }} {{ $t(`calendar.${nounView}`) }} {{ $t('global.availability') }}
        </button>
      </div>
    </div>
    <div class="CalendarHeader__legend">
      <div class="badge-blue CalendarHeader__legend-badge">
        {{ $t('calendar.your_slots') }}
      </div>
      <div class="badge-orange CalendarHeader__legend-badge">
        {{ $t('calendar.scheduled') }}
      </div>
    </div>
    <div class="CalendarHeader__nav">
      <transition
        name="appear-from-top"
        mode="out-in">
        <div
          :key="isCurrentDay"
          @click="toCurrentDay"
          class="CalendarHeader__nav-today"
          v-tooltip.bottom="currentDateTooltip">
          {{ $t(`calendar.${isCurrentDay ? 'today' : 'go_to_today'}`) }}
        </div>
      </transition>
      <i
        class="icon-angle-right CalendarHeader__nav-prev"
        @click="prevPeriod"></i>
      <i
        class="icon-angle-right CalendarHeader__nav-next"
        @click="nextPeriod"></i>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { FULL_MONTHS } from '@/constants';
import CalendarMultidayTimeslotModal from '@/components/availability/calendar_multiday_timeslot_modal/calendar-multiday-timeslot-modal';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('availability');

const multidayTimeslotModalOptions = {
  name: 'calendar-multiday-timeslot-modal',
  width: 515,
  height: 'auto',
  pivotY: 0.3,
  adaptive: true,
  clickToClose: true,
  transition: 'from-top-to-bottom'
};

export default {
  name: 'CalendarHeader',
  props: {
    date: {
      required: true
    },
    view: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      viewSelectIsOpen: false
    };
  },
  computed: {
    ...mapGetters(['timeslots']),
    year() {
      return Number(this.$moment(this.date).format('YYYY'));
    },
    month() {
      const monthIndex = this.$moment(this.date).get('month');
      return this.$t(FULL_MONTHS[monthIndex]);
    },
    isCurrentDay() {
      return !this.$moment(this.date).diff(this.$moment(), 'days');
    },
    currentDateTooltip() {
      return {
        content: this.$moment().format('dddd, D MMMM'),
        class: 'custom-tooltip--white',
        offset: 12
      };
    },
    oppositeView() {
      return this.view === 'monthly' ? 'weekly' : 'monthly';
    },
    nounView() {
      return this.view === 'monthly' ? 'month' : 'week';
    },
    isPastView() {
      return this.$moment()
        .diff(this.$moment(this.date), this.view === 'monthly' ? 'months' : 'weeks') > 0;
    },
    hasTimeslotsInView() {
      const viewStart = this.$moment(this.date)
        .startOf(this.view === 'monthly' ? 'month' : 'week')
        .unix();
      const viewEnd = this.$moment(this.date)
        .endOf(this.view === 'monthly' ? 'month' : 'week')
        .unix();
      return this.timeslots.some(({ startTime }) => startTime > viewStart && startTime < viewEnd);
    },
    teamMemberId() {
      return this.$route.query.specialist_id;
    }
  },

  methods: {
    ...mapActions([
      'addTimeslots',
      'removeTimeslots'
    ]),
    toCurrentDay() {
      if (this.isCurrentDay) return;
      this.$emit('set-date', this.$moment());
    },
    prevPeriod() {
      this.$emit(
        'set-date',
        this.$moment(this.date).subtract(1, this.view === 'monthly' ? 'month' : 'week')
      );
    },
    nextPeriod() {
      this.$emit(
        'set-date',
        this.$moment(this.date).add(1, this.view === 'monthly' ? 'month' : 'week')
      );
    },
    refreshView() {
      this.$emit(
        'set-date',
        this.$moment(this.date)
      );
    },
    toggleViewSelect() {
      this.viewSelectIsOpen = !this.viewSelectIsOpen;
    },
    setView() {
      this.viewSelectIsOpen = false;
      this.$emit('set-view', this.oppositeView);
    },
    showAddModal() {
      this.$modal.show(
        CalendarMultidayTimeslotModal,
        {
          mode: 'ADD_SLOTS',
          onAdd: slots => this.add(slots),
          ...this.multidayTimeslotModalProps()
        },
        multidayTimeslotModalOptions
      );
    },
    showRemoveModal() {
      this.$modal.show(
        CalendarMultidayTimeslotModal,
        {
          mode: 'REMOVE_SLOTS',
          onRemove: slots => this.remove(slots),
          ...this.multidayTimeslotModalProps()
        },
        multidayTimeslotModalOptions
      );
    },
    add(timeslots) {
      this.addTimeslots({ timeslotParams: timeslots, teamMemberId: this.teamMemberId })
        .then(({ error }) => {
          if (error) this.$toastr.e(error);
        });
    },
    remove(timeslots) {
      this.removeTimeslots({ timeslotParams: timeslots, teamMemberId: this.teamMemberId })
        .then(({ error }) => {
          if (error) this.$toastr.e(error);
        })
        .finally(() => {
          this.refreshView();
        });
    },
    multidayTimeslotModalProps() {
      return {
        startDateTime: this.date.clone().startOf(this.view === 'monthly' ? 'month' : 'week'),
        endDateTime: this.date.clone().endOf(this.view === 'monthly' ? 'month' : 'week'),
        period: this.view === 'monthly' ? 'MONTH' : 'WEEK'
      };
    }
  }
};
</script>
<style lang="scss">
  @import "calendar-header.scss";
</style>
