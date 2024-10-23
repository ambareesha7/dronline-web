<template>
  <div class="TimelineVitalsFormConfirmModal__wrapper">
    <div class="TimelineVitalsFormConfirmModal__header">
      <img
        src="/static/images/attention-triangle.svg"
        class="TimelineVitalsFormConfirmModal__header-icon" />
    </div>
    <div class="TimelineVitalsFormConfirmModal__content">
      <div class="TimelineVitalsFormConfirmModal__title">
        {{ $t('call_room.provide_vitals') }}?
      </div>
      <div
        class="TimelineVitalsFormConfirmModal__description"
        v-html="$t('call_room.provide_vitals_description')">
      </div>
      <div class="TimelineVitalsFormConfirmModal__footer form-actions full">
        <btn
          class="TimelineVitalsFormConfirmModal__cancel"
          @onclick="$emit('close');"
          btn-class="red"
          :btn-label="$t('global.go_back_to_edition')">
        </btn>
        <btn
          class="TimelineVitalsFormConfirmModal__confirm"
          @onclick="confirm();$emit('close')"
          btn-class="blue"
          :btn-label="$t('global.сonfirm')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineVitalsFormConfirmModal',
  props: {
    confirm: {
      required: true,
      type: Function
    }
  }
};
</script>
<style scoped lang="scss">
@import "timeline-vitals-form-confirm-modal.scss";
</style>
