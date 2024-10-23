<template>
  <div class="USBoardSecondOpinionHeader__wrapper">
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
  name: 'USBoardSecondOpinionNavbar',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.us-board-second-opinion-full'),
          disabled: true
        }
      ]
    };
  }
};
</script>
