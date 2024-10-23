<template>
  <div
    class="PrivacyPolicyHeader__wrapper"
    :class="{ authorized }">
    <breadcrumbs
      v-if="authorized"
      :steps="breadcrumbs"
      icon="icon_calendar">
    </breadcrumbs>
    <div
      v-else
      class="PrivacyPolicyHeader__prompt">
      <i class="icon-lock PrivacyPolicyHeader__prompt-icon"></i>
      {{ $t('authorisation.secure_connection') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'PrivacyPolicyHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('global.privacy_policy'),
          disabled: true
        }
      ]
    };
  },

  computed: {
    ...mapGetters('oauth', ['authorized'])
  }
};
</script>
<style scoped lang="scss">
.PrivacyPolicyHeader {
  &__wrapper {
    width: 100%;
    display: flex;

    &:not(.authorized) {
      justify-content: flex-end;
    }
  }

  &__prompt {
    font-size: 12px;
    letter-spacing: -.2px;
    line-height: 15px;
    color: #4A4A4A;
    display: flex;
    align-items: center;

    &-icon {
      font-size: 16px;
      color: #1877DA;
    }
  }
}
</style>
