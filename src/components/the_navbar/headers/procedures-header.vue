<template>
  <div class="ProceduresHeader__wrapper">
    <breadcrumbs
      :steps="breadcrumbs"
      icon="icon_procedures">
    </breadcrumbs>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/global/breadcrumbs/breadcrumbs';

export default {
  name: 'ProceduresHeader',

  components: {
    Breadcrumbs
  },

  data() {
    return {
      breadcrumbs: [
        {
          label: this.$t('sidebar.procedures')
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.ProceduresHeader {
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
