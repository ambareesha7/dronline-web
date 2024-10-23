<template>
  <header
    class="TheNavbar__wrapper"
    :class="{'filled shaded-outline': isFilled}">
    <nav class="TheNavbar__container">
      <router-link
        :to="{name: 'dashboard'}"
        class="TheNavbar__brand"
        data-cy="TheNavbar__home-link">
        <img
          src="/static/images/logo.png"
          class="TheNavbar__logo" />
      </router-link>

      <div class="TheNavbar__nav-container">
        <transition
          appear
          name="appear-from-top"
          mode="out-in">
          <component
            :is="viewHeaderName"
            class="TheNavbar__view-header">
          </component>
        </transition>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { kebabToPascalCase } from '@/utils/filters';
import Headers from './headers';

export default {
  name: 'TheNavbar',

  components: {
    ...Headers
  },

  computed: {
    ...mapGetters('oauth', ['authorized']),
    headers() {
      return Object.keys(Headers);
    },
    viewHeaderName() {
      let route_name = this.$route.name === 'create-team' ? 'team' : this.$route.name
      const name = `${route_name}-header`;
      const PascalCaseName = kebabToPascalCase(name);
      return this.headers.includes(PascalCaseName) ? name : false;
    },
    isFilled() {
      return !this.authorized || this.$route.name === 'registration';
    }
  }
};
</script>
<style scoped lang="scss">
@import "the-navbar.scss";
</style>
