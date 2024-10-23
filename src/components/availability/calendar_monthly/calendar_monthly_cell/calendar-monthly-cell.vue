<template>
  <div class="CalendarMonthlyCell__wrapper" ref="wrapper">
    <div
      class="CalendarMonthlyCell__title"
      :class="{ current: isCurrentDay }">
      <div
        v-if="$slots.default"
        class="CalendarMonthlyCell__title-day">
        <slot></slot>
      </div>
      <div class="CalendarMonthlyCell__title-date">
        {{ cell.day }}
      </div>
    </div>
    <div class="CalendarMonthlyCell__content">
      <div
        class="CalendarMonthlyCell__timeslots-group"
        v-for="group in groups"
        :key="group.type"
        :class="group.type">
        {{ group.h ? `${group.h}h` : null }}
        {{ group.m ? `${group.m}m` : null }}
        ({{ group.slots }} {{ $tc('calendar.slots', group.slots) }})
      </div>
    </div>
    <div
      class="CalendarMonthlyCell__presentation"
      :class="direction"
      @click="$emit('select-date')">
      {{ $t('calendar.see_details') }}
    </div>
  </div>
</template>

<script>
import { TIMESLOT_DURATION_SECONDS } from '@/constants';
import { getMouseDirection } from '@/utils';

export default {
  name: 'CalendarMonthlyCell',
  props: {
    cell: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    },
    mouseX: {
      required: true,
      type: Number
    },
    mouseY: {
      required: true,
      type: Number
    }
  },
  computed: {
    direction() {
      return getMouseDirection(this.$refs.wrapper, this.mouseX, this.mouseY);
    },
    isCurrentDay() {
      return this.$moment().isSame(this.cell.date, 'day');
    },
    groups() {
      const types = ['free', 'pending'];
      const visitStates = [null, 'pending'];
      const groups = types.reduce((obj, item) => ({...obj, [item]: 0}), {});
      this.cell.timeslots.forEach(({ duration, status, taken }) => {
        switch (status) {
          case 'free':
            groups[status] += duration;
            break;
          case 'taken':
            groups[visitStates[taken[0].visitState] || 'pending'] += duration;
            break;
          default:
            break;
        }
      });
      return Object.keys(groups)
        .map(type => (groups[type] ? {
          type,
          slots: groups[type] / TIMESLOT_DURATION_SECONDS,
          h: Math.floor(groups[type] / 3600),
          m: (groups[type] % 3600) / 60
        } : false)).filter(v => v);
    }
  }
};
</script>
<style scoped lang="scss">
  @import "calendar-monthly-cell.scss";
</style>
