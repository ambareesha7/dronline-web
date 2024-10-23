<template>
  <div
    class="PrivacyPolicy__wrapper"
    :class="{ webview: isWebView, authorized }">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <privacy-policy-body/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PrivacyPolicyBody from '@/components/authorisation/privacy_policy_body/privacy-policy-body';

export default {
  name: 'PrivacyPolicy',

  components: {
    PrivacyPolicyBody
  },

  computed: {
    ...mapGetters('oauth', ['authorized']),
    ...mapGetters('profile', ['status']),
    isWebView() {
      return this.$route.name.includes('webview');
    }
  }
};
</script>

<style lang="scss">
.PrivacyPolicy {
  &__wrapper:not(.webview) {
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__wrapper.authorized {
    padding-left: 185px;
  }

  &__wrapper.webview {
    padding: 12px 24px;
    .content,
    .content-inner {
      padding: 0;
    }
  }
}
</style>
