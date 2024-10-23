<template>
  <div class="ConfirmDeletionModal__wrapper">
    <div class="ConfirmDeletionModal__title">
      {{ $t('calendar.delete_availability_title') }}
    </div>
    <div class="ConfirmDeletionModal__content">
      {{ $t('calendar.delete_availability_content', [period]) }}
    </div>
    <div class="ConfirmDeletionModal__actions">
      <btn
        @onclick="confirm(); close();"
        btn-class="red"
        class="ConfirmDeletionModal__action"
        :btn-label="'Yes, delete'">
      </btn>
      <btn
        @onclick="close"
        btn-class="blue"
        class="ConfirmDeletionModal__action"
        :btn-label="'No, keep'">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmDeletionModal',

  props: {
    timeslot: {
      required: true,
      type: Object
    },
    confirm: {
      required: true,
      type: Function
    }
  },

  computed: {
    period() {
      const startTimestamp = this.timeslot.startTime * 1000;
      const startTime = this.$moment(startTimestamp).format('hh:mm A');
      const endTime = this.$moment(startTimestamp).add(this.timeslot.duration, 'seconds').format('hh:mm A');
      const date = this.$moment(startTimestamp).format('MMMM DD, YYYY');
      return `${startTime} - ${endTime}, ${date}`;
    }
  },

  methods: {
    close() {
      this.$modal.hide('confirm-deletion-modal');
    }
  }
};
</script>
<style scoped lang="scss">
  @import "confirm-deletion-modal.scss";
</style>
