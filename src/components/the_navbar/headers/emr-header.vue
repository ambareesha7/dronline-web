<template>
  <div class="EmrHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_emr">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'EmrHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.emr'),
          disabled: true
        }
      ]
    };
  }
};
</script>
