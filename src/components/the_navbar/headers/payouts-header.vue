<template>
  <div class="PayoutsHeader__wrapper">
    <!-- TODO: add icon_payouts icon -->
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_payouts">
    </breadcrumbs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'PayoutsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.payouts'),
          disabled: true
        }
      ]
    };
  }
};
</script>
