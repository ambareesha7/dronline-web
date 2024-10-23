<template>
  <div class="Membership__wrapper">
    <div class="content" :class="{ banner: status && status.banner }">
      <div class="content-inner">
        <h3 class="title">
          {{ $t('membership.your_current_plan') }}
        </h3>
        <div class="Membership__section">
          <membership-current-package/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MembershipCurrentPackage from '@/components/membership/membership_current_package/membership-current-package';

export default {
  name: 'Membership',

  components: {
    MembershipCurrentPackage
  },
  computed: {
    ...mapGetters('profile', ['status']),
  },
};
</script>

<style lang="scss">
.Membership {
  &__wrapper {
    padding-left: 185px;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__section {
    margin-bottom: 32px;
  }
}
</style>
