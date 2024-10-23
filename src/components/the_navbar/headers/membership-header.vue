<template>
  <div class="MembershipHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_star">
    </breadcrumbs>
    <!-- <div v-if="!isPaymentEnabled" class="badge-red MembershipHeader__demo-badge">
      {{ $t('membership.demo') }}
    </div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

const { mapGetters } = createNamespacedHelpers('membership');

export default {
  name: 'MembershipHeader',

  components: {
    Breadcrumbs
  },

  computed: {
    ...mapGetters([
      'isPaymentEnabled'
    ])
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.membership'),
          disabled: true
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.MembershipHeader {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__demo-badge {
    height: fit-content;
  }
}
</style>
