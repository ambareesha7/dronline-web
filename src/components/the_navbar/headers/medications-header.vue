<template>
  <div class="MedicationsHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_medications">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'MedicationsHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.medications')
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.MedicationsHeader {
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
