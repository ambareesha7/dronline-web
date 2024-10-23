<template>
  <div
    class="TermsAndConditions__wrapper"
    :class="{ webview: isWebView, authorized }">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <terms-and-conditions-body/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TermsAndConditionsBody from '@/components/authorisation/terms_and_conditions_body/terms-and-conditions-body';

export default {
  name: 'TermsAndConditions',

  components: {
    TermsAndConditionsBody
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
.TermsAndConditions {
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
