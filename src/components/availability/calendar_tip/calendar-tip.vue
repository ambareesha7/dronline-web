<template>
  <transition
    appear
    name="appear-from-bottom"
    mode="out-in">
    <div
      :key="tipType"
      class="CalendarTip__wrapper default">
      <slot></slot>
      <div
        class="CalendarTip__content CalendarTip__info"
        v-if="isInfo">
        <i class="icon-bulb CalendarTip__info-icon"></i>
        <div class="CalendarTip__content-message">
          {{ message }}
        </div>
        <i
          class="icon-close CalendarTip__info-close"
          @click="setTipType(null)"></i>
      </div>
      <div
        class="CalendarTip__content CalendarTip__restorable"
        v-if="isRestorable">
        <div class="CalendarTip__content-message">
          {{ message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('availability');

export default {
  name: 'CalendarTip',

  computed: {
    ...mapGetters(['tipType']),
    isInfo() {
      return ['empty_initialized', 'initialized'].includes(this.tipType);
    },
    isRestorable() {
      return ['saved', 'deleted'].includes(this.tipType);
    },
    message() {
      return this.$t(`calendar.tip_${this.tipType}`);
    }
  },

  methods: {
    ...mapActions(['undoLastAction']),
    ...mapMutations(['setTipType'])
  }
};
</script>
<style lang="scss">
  @import "calendar-tip.scss";
</style>
