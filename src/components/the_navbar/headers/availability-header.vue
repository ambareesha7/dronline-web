<template>
  <div class="AvailabilityHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_calendar">
    </breadcrumbs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'AvailabilityHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.my_calendar'),
          disabled: true
        }
      ]
    };
  }
};
</script>
