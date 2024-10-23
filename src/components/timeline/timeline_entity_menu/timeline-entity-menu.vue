<template>
  <div class="TimelineEntityMenu__wrapper">
    <i
      class="TimelineEntityMenu__trigger icon-more-vert"
      @click="toggleMenu"></i>

    <transition
      name="scale-vertically"
      mode="out-in">
      <div
        v-if="isOpen"
        v-on-click-outside="toggleMenu"
        class="TimelineEntityMenu__dropdown">
        <div
          class="TimelineEntityMenu__action"
          @click="action('edit')">
          {{ $t('global.edit') }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'TimelineEntityMenu',

  data() {
    return {
      isOpen: false
    };
  },

  methods: {
    toggleMenu(e) {
      if (e) e.stopPropagation();
      this.isOpen = !this.isOpen;
    },
    action(type) {
      this.toggleMenu();
      this.$emit(type);
    }
  }
};
</script>

<style lang="scss">
@import "timeline-entity-menu.scss";
</style>
