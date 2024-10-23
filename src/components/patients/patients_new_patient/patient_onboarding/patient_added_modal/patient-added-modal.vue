<template>
  <div class="PatientAddedModal__wrapper">
    <div class="PatientAddedModal__avatar">
      <i class="icon-person PatientAddedModal__avatar-icon"></i>
    </div>
    <div
      class="PatientAddedModal__title"
      v-html="$t('patients.patient_added')">
    </div>
    <div class="title-middle PatientAddedModal__name">
      {{ basicInfo.firstName }} {{ basicInfo.lastName }}
    </div>
    <div class="PatientAddedModal__email">
      {{ basicInfo.email }}
    </div>
    <div class="PatientAddedModal__footer">
      <btn
        @onclick="$emit('close')"
        btn-class="green"
        :btn-label="$t('global.close')">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations } = createNamespacedHelpers('patient');
export default {
  name: 'PatientAddedModal',

  props: {
    basicInfo: {
      required: true,
      type: Object
    }
  },

  beforeDestroy() {
    this.resetEditableBasicInfo();
    this.resetEditableAddress();
    this.resetEditableHistories();
  },

  methods: {
    ...mapMutations([
      'resetEditableBasicInfo',
      'resetEditableAddress',
      'resetEditableHistories'
    ])
  }
};
</script>
<style scoped lang="scss">
  @import "patient-added-modal.scss";
</style>
