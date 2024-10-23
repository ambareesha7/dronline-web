<template>
  <div class="TestsHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_tests">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'TestsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.tests')
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.TestsHeader {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__demo-badge {
    height: fit-content;
  }
}
</style>
