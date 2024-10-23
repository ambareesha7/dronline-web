<template>
  <div class="GuideFinishedModal__wrapper">
    <i
      @click="$emit('close')"
      class="icon-close GuideFinishedModal__close"></i>
    <img
      class="GuideFinishedModal__icon"
      src="/static/images/confetti.svg" />
    <div class="GuideFinishedModal__title">
      {{ $t('guide.finished_title') }}
    </div>
    <div class="GuideFinishedModal__content">
      {{ $t('guide.finished_description') }}
    </div>
    <div class="GuideFinishedModal__actions">
      <btn
        @onclick="$emit('close')"
        btn-class="submit"
        class="GuideFinishedModal__action"
        :btn-label="$t('global.close')">
      </btn>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GuideFinishedModal'
};
</script>
<style scoped lang="scss">
  @import "guide-finished-modal.scss";
</style>
