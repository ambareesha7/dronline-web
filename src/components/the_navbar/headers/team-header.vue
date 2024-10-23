<template>
  <div class="TeamHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_team">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'TeamHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.team'),
          disabled: true
        }
      ]
    };
  }
};
</script>
