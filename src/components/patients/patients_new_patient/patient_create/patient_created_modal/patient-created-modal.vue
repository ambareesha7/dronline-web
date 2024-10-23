<template>
  <div class="PatientCreatedModal__wrapper">
    <div class="PatientCreatedModal__avatar">
      <i class="icon-person PatientCreatedModal__avatar-icon"></i>
    </div>
    <div
      class="PatientCreatedModal__title"
      v-html="$t('patients.patient_created')">
    </div>
    <div class="PatientCreatedModal__phone-number">
      {{ phoneNumber }}
    </div>
    <div class="PatientCreatedModal__footer">
      <btn
        @onclick="proceed();$emit('close')"
        btn-class="green"
        class="PatientCreatedModal__submit"
        :btn-label="$t('global.proceed')">
      </btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientCreatedModal',

  props: {
    phoneNumber: {
      required: true,
      type: String
    },
    proceed: {
      required: true,
      type: Function
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-created-modal.scss";
</style>
