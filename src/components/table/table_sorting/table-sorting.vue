<template>
  <div
    class="TableSorting__wrapper"
    :class="{ active }">
    <div
      class="TableSorting__content"
      @click="toggle">
      <div class="TableSorting__label">
        <slot></slot>
      </div>
      <div class="TableSorting__directions">
        <i
          class="icon-up-dir TableSorting__asc"
          :class="{ active: order === 'asc' }">
        </i>
        <i
          class="icon-down-dir TableSorting__desc"
          :class="{ active: order === 'desc' }">
        </i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSorting',

  props: {
    current: {
      type: String,
      default: null
    },
    order: {
      type: String,
      default: 'desc'
    },
    field: {
      type: String,
      required: true
    }
  },

  computed: {
    active() {
      return this.current === this.field;
    }
  },

  methods: {
    toggle() {
      const order = this.active && this.order === 'desc' ? 'asc' : 'desc';
      this.$emit('change', {
        sortBy: this.field,
        order
      });
    }
  }
};
</script>

<style lang="scss">
  @import "table-sorting.scss";
</style>
