
<template>
  <div class="FullscreenModalWrapper__wrapper">
    <div class="FullscreenModalWrapper__header shaded-outline">
      <div class="FullscreenModalWrapper__header-logo-container">
        <img
          src="/static/images/logo.png"
          class="FullscreenModalWrapper__header-logo" />
      </div>

      <h2 class="FullscreenModalWrapper__header-title">
        {{ title }}
      </h2>
      <i
        class="icon-close FullscreenModalWrapper__header-close"
        @click="$emit('close')"></i>
    </div>

    <div
      class="FullscreenModalWrapper__content"
      :class="{ 'with-footer': showFooter }">
      <slot></slot>
    </div>

    <div
      class="FullscreenModalWrapper__footer shaded-outline"
      v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FullscreenModalWrapper',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    showFooter() {
      return Boolean(this.$slots.footer);
    }
  },
  mounted() {
    document.addEventListener('keyup', this.handleKeyUp, false);
    document.body.classList.add('disable-scroll');
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyUp);
    document.body.classList.remove('disable-scroll');
  },
  methods: {
    handleKeyUp(e) {
      if (e.keyCode === 27) {
        this.$emit('close');
      }
    }
  }
};
</script>
<style scoped lang="scss">
  @import "fullscreen-modal-wrapper.scss";
</style>
