<template>
  <div class="VisitsHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_camera">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'VisitsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.visits'),
          disabled: true
        }
      ]
    };
  }
};
</script>
