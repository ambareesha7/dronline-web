<template>
  <div class="DashboardHeader__wrapper">
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
  name: 'DashboardHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('global.dashboard'),
          disabled: true
        }
      ]
    };
  },

  computed: {
    ...mapGetters('profile', [
      'isGP',
      'isNurse',
      'isDoctor'
    ])
  }
};
</script>
