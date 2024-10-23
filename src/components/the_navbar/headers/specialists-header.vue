<template>
  <div class="Specialists__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_specialists">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'SpecialistsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.specialists'),
          disabled: true
        }
      ]
    };
  }
};
</script>
