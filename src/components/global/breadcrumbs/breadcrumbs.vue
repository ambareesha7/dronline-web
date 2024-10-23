<template>
  <transition-group
    tag="div"
    class="Breadcrumbs__wrapper"
    name="appear-from-top"
    mode="out-in">
    <router-link
      class="Breadcrumbs__step"
      v-for="(step, index) in breadcrumbSteps"
      :key="step.key"
      :data-key="step.key"
      :class="{ disabled: step.disabled }"
      :disabled="step.disabled"
      :to="step"
      data-cy="Breadcrumbs__step">
      <i
        v-if="index === 0 && icon"
        class="Breadcrumbs__icon"
        :class="icon"></i>
      <slot v-if="index===0"></slot>
      {{ step.label }}
    </router-link>
  </transition-group>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    steps: {
      type: Array,
      default: () => ([])
    },
    icon: {
      type: String
    }
  },
  computed: {
    breadcrumbSteps() {
      return this.steps.map((step, index) => ({
        ...step,
        key: `${step.name || step.label.replace(/[ ]|\n/g, '')}_${step.params ? Object.keys(step.params).map(key => step.params[key]).join('-') : ''}_${index}`
      }));
    }
  }
};
</script>

<style lang="scss">
  @import 'breadcrumbs.scss';
</style>
