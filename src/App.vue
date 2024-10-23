<template>
  <div id="app">
    <router-view/>
    <modals-container/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions('oauth', [
      'init'
    ])
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
  @import './stylesheets/global.scss';
</style>
