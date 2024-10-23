<template>
  <div class="Rating__wrapper">
    <i
      class="icon-star Rating__star"
      v-for="(s, index) in max"
      :key="index"
      :class="{'active': index < value}">
    </i>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped lang="scss">
  @import "rating.scss";
</style>
