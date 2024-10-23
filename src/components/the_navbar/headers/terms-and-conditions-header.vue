<template>
  <div
    class="TermsAndConditionsHeader__wrapper"
    :class="{ authorized }">
    <breadcrumbs
      v-if="authorized"
      :steps="breadcrumbs"
      icon="icon_calendar">
    </breadcrumbs>
    <div
      v-else
      class="TermsAndConditionsHeader__prompt">
      <i class="icon-lock TermsAndConditionsHeader__prompt-icon"></i>
      {{ $t('authorisation.secure_connection') }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'TermsAndConditionsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('global.terms_and_conditions'),
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
.TermsAndConditionsHeader {
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
