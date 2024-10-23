<template>
  <div class="PatientConfirmCancelationModal__wrapper">
    <img
      class="PatientConfirmCancelationModal__icon"
      src="/static/images/attention-triangle.svg" />
    <div
      class="PatientConfirmCancelationModal__title"
      v-html="$t('patients.confirm_cencelation_title')">
    </div>
    <div
      class="PatientConfirmCancelationModal__description"
      v-html="$t('patients.confirm_cencelation_description')">
    </div>
    <div class="PatientConfirmCancelationModal__footer">
      <btn
        @onclick="$emit('close')"
        btn-class="red"
        :btn-label="$t('global.no_go_back')"
        data-cy="PatientCreate__decline-cancellation">
      </btn>
      <btn
        @onclick="confirm();$emit('close')"
        btn-class="blue"
        :btn-label="$t('global.yes_i_want')"
        data-cy="PatientCreate__confirm-cancellation">
      </btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientConfirmCancelationModal',

  props: {
    confirm: {
      required: true,
      type: Function
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-confirm-cancelation-modal.scss";
</style>
