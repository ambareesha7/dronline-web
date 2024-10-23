<template>
  <div class="ProfilePrices__wrapper">
    <div v-if="categoriesPrices.length" >
      <div v-for="categoryPrices in categoriesPrices"
        :key="categoryPrices.medicalCategoryId"
        class="ProfilePrices__section">
        <div class="ProfilePrices__section-title">
          {{ categoryPrices.medicalCategoryName }} {{ $t('profile.prices') }}
        </div>
        <div class="ProfilePrices__section-content">
            <div v-for="field in fields"
              :key="`${categoryPrices.medicalCategoryId}_${field.key}`"
              class="ProfilePrices__section-row">
                <div class="ProfilePrices__section-row-label">
                  {{ $t(`${field.label}`) }}
                </div>
                <div class="ProfilePrices__section-row-value">
                  {{ categoryPrices.currency }} {{ categoryPrices[field.key] }}
                </div>
            </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="ProfilePrices__section-initializing">
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('profile');

export default {
  name: 'ProfilePrices',

  computed: {
    ...mapGetters([
      'categoriesPrices'
    ])
  },
  mounted() {
    console.log("categoriesPrices");
    console.log(this.categoriesPrices);
  },

  data() {
    return {
      fields: [
        {
          key: 'priceMinutes_15',
          label: 'profile.15_minutes'
        },
        {
          key: 'priceMinutes_30',
          label: 'profile.30_minutes'
        },
        {
          key: 'priceMinutes_45',
          label: 'profile.45_minutes'
        },
        {
          key: 'priceMinutes_60',
          label: 'profile.60_minutes'
        },
        {
          key: 'priceSecondOpinion',
          label: 'profile.second_opinion'
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
@import "profile-prices.scss";
</style>
