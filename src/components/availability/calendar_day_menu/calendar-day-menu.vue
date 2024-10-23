<template>
  <div
    class="CalendarDayMenu__wrapper"
    :class="direction"
    v-on-click-outside="close">
    <div
      class="CalendarDayMeny__option"
      :class="{ 'invalidate': noTimeslots }"
      @click="deleteAll">
      {{ $t('calendar.delete_all_appointments') }}
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Switcher from '@/components/global/switcher/switcher';
import ConfirmDayDeletionModal from '../confirm_day_deletion_modal/confirm-day-deletion-modal';

const { mapActions, mapMutations } = createNamespacedHelpers('availability');

export default {
  name: 'CalendarDayMeny',

  components: {
    Switcher
  },

  props: {
    timeslotsPerDay: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    date: {
      required: true
    },
    direction: {
      type: String,
      default: 'left'
    }
  },

  computed: {
    day() {
      return this.timeslotsPerDay[this.index];
    },

    nextDay() {
      return this.timeslotsPerDay[this.index + 1] || [];
    },

    noTimeslots() {
      return !this.day.length;
    }
  },

  methods: {
    ...mapActions(['saveTimeslot', 'removeTimeslot', 'updateTimeslot']),
    ...mapMutations(['setTimeslot']),

    close() {
      this.$emit('close');
    },

    deleteAll() {
      this.close();
      this.$modal.show(
        ConfirmDayDeletionModal,
        {
          confirm: () => this.day.forEach(timeslot => this.removeTimeslot(timeslot.id)),
          date: this.date
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
<style lang="scss">
  @import "calendar-day-menu.scss";
</style>
