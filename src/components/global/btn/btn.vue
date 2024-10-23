<template>
  <div
    :class="['btn-'+btnClass, 'ripple', btnProcessing ? 'processing' : '']"
    @click.stop="$emit('onclick');">
    <span
      class="Btn__inner"
      :class="{ invalidate: btnProcessing }">
      <slot name="icon-before"></slot>
      <span v-html="btnLabel"></span>
      <slot name="icon-after"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    btnClass: {
      type: String,
      default: 'white'
    },
    btnLabel: {
      type: String,
      default: 'Submit'
    },
    btnProcessing: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
  .Btn__inner {
    display: flex;
    align-items: center;
    transition: transform .2s ease, opacity .22s ease;
  }
</style>
