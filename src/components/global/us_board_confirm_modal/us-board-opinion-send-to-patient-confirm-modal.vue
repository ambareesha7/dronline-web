<template>
  <div class="SecondOpinionSpecialistConfirmModal__wrapper">
    <img
      src="/static/images/attention-triangle.svg"
      class="SecondOpinionSpecialistConfirmModal__icon" />
    <div class="SecondOpinionSpecialistConfirmModal__title">
      {{ $t('us_board.confirm_submit') }}
    </div>

    <div class="form-actions full SecondOpinionSpecialistConfirmModal__footer">
      <btn
        class="SecondOpinionSpecialistConfirmModal__confirm"
        @onclick="hide"
        btn-class="red"
        :btn-label="$t('global.no_go_back')">
      </btn>
      <btn
        class="SecondOpinionSpecialistConfirmModal__cancel"
        @onclick="confirm"
        btn-class="blue"
        :btn-label="$t('global.yes_i_want')">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UsBoardOpinionSendToPatientConfirmModal',

  props: {
    confirm: {
      required: true,
      type: Function
    }
  },

  methods: {
    hide() {
      this.$modal.hide('us-board-opinion-send-to-patient-confirm-modal');
    }
  }
};
</script>
<style scoped lang="scss">
@import "us-board-opinion-send-to-patient-confirm-modal.scss";
</style>
