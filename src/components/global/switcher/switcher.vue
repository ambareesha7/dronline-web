<template>
  <div class="Switcher__container"
    :class="{'checked': selected}"
    @click="toggle">
    <div class="Switcher__bar"></div>
    <div class="Switcher__thumb-container">
      <div class="Switcher__thumb"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Switcher',
  props: {
    value: {}
  },
  watch: {
    value(val) {
      this.selected = val;
    }
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    toggle() {
      this.selected = !this.selected;
      this.$emit('input', this.selected);
      this.$emit('onchange', this.selected);
    }
  },
  beforeMount() {
    this.selected = this.value || false;
  }
};
</script>

<style lang="scss">
  @import 'switcher.scss';
</style>
