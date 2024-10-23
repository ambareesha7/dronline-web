<template>
  <div class="DispatchDetailsHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_dashboard">
    </breadcrumbs>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

const { mapGetters } = createNamespacedHelpers('dispatches');

export default {
  name: 'DispatchDetailsHeader',

  components: {
    Breadcrumbs
  },

  computed: {
    ...mapGetters(['dispatchDetails']),
    id() {
      if (!this.dispatchDetails) return null;
      const { patientId, recordId } = this.dispatchDetails.dispatch;
      return `${patientId}-${recordId}`;
    },
    breadcrumbs() {
      return [
        {
          label: this.$t('global.dashboard'),
          name: 'dashboard'
        },
        {
          label: `${this.$t('dashboard.dispatch_details')} ${this.id}`,
          disabled: true
        }
      ];
    }
  }
};
</script>
