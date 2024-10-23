<template>
  <div class="EndedDispatchesHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_dashboard">
    </breadcrumbs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'EndedDispatchesHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('global.dashboard'),
          name: 'dashboard'
        },
        {
          label: this.$t('dashboard.ended_dispatches'),
          disabled: true
        }
      ]
    };
  }
};
</script>
