<template>
  <div
    class="CallRoomBrowserNotSupported__wrapper"
    :class="size">
    <h2 class="CallRoomBrowserNotSupported__title">
      {{ $t('call_room.browser_not_supported') }}
    </h2>
    <div class="CallRoomBrowserNotSupported__description">
      {{ $t('call_room.browser_not_supported_description') }}
    </div>
    <div
      v-if="isMaximized"
      class="form-actions center">
      <a
        class="CallRoomBrowserNotSupported__download-btn btn-submit"
        href="https://www.google.com/chrome/">
        <img
          src="/static/images/chrome.png"
          class="CallRoomBrowserNotSupported__download-btn-icon"/>
        {{ $t('global.download_chrome') }}
      </a>
      <a
        class="CallRoomBrowserNotSupported__download-btn btn-submit"
        href="https://www.mozilla.org/firefox/new/">
        <img
          src="/static/images/firefox.png"
          class="CallRoomBrowserNotSupported__download-btn-icon"/>
        {{ $t('global.download_firefox') }}
      </a>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('call');

export default {
  name: 'CallRoomCallRoomBrowserNotSupported',

  computed: {
    ...mapGetters([
      'size'
    ]),
    isMaximized() {
      return this.size === 'maximized';
    }
  }
};
</script>

<style lang="scss">
@import "call-room-browser-not-supported.scss";
</style>
