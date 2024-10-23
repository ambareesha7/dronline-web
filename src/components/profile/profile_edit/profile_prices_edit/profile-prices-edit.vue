<template>
  <div class="ProfilePricesEdit__wrapper">
    <category-prices-form
      class="ProfilePricesEdit__category-prices-form"
      v-for="(categoryPrices, index) in categoriesPrices"
      :key="categoryPrices.categoryId"
      :category-prices="categoryPrices"
      :index="index"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import CategoryPricesForm from '@/components/form/category_prices_form/category-prices-form';

const { mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'ProfilePricesEdit',

  inject: ['$validator'],

  components: {
    CategoryPricesForm
  },

  computed: {
    ...mapGetters([
      'categoriesPrices'
    ])
  },

  async beforeMount() {
    await this.fetchCategoriesPrices();
  },

  methods: {
    ...mapActions([
      'fetchCategoriesPrices'
    ])
  }
};
</script>
<style scoped lang="scss">
@import "profile-prices-edit.scss";
</style>
