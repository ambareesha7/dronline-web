<template>
  <div class="ConfirmDayDeletionModal__wrapper">
    <div class="ConfirmDayDeletionModal__title">
      {{ $t('calendar.delete_all_appointments_title') }}
    </div>
    <div class="ConfirmDayDeletionModal__content">
      {{ $t('calendar.delete_all_appointments_content', [period]) }}
    </div>
    <div class="ConfirmDayDeletionModal__warn">
      <i class="icon-warn-circled ConfirmDayDeletionModal__warn-icon"></i>
      {{ $t('calendar.delete_all_appointments_warn') }}
    </div>
    <div class="ConfirmDayDeletionModal__actions">
      <btn
        @onclick="confirm(); close();"
        btn-class="red"
        class="ConfirmDayDeletionModal__action"
        :btn-label="'Yes, delete'">
      </btn>
      <btn
        @onclick="close"
        btn-class="blue"
        class="ConfirmDayDeletionModal__action"
        :btn-label="'No, keep'">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmDayDeletionModal',

  props: {
    date: {
      required: true
    },
    confirm: {
      required: true,
      type: Function
    }
  },

  computed: {
    period() {
      return this.$moment(this.date).format('MMMM DD, YYYY');
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
  @import "confirm-day-deletion-modal.scss";
</style>
