<template>
  <div class="RegistrationStep7__wrapper">

    <div class="RegistrationStep7__content">

      <div class="RegistrationStep7__section">

        <transition
          appear
          name="appear-from-bottom"
          mode="out-in">
          <div v-if="categoriesPrices" class="RegistrationStep7__section-content">
            <category-prices-form
              v-for="(categoryPrices, index) in categoriesPrices"
              :key="categoryPrices.categoryId"
              :category-prices="categoryPrices"
              :index="index"
              @isBodyShown="getIsBodyShown"
            />
          </div>
        </transition>
      </div>

      <div
        v-if="!processing"
        class="RegistrationStep7__footer">
        <div class="RegistrationStep7__footer-content">
          <div
            v-if="error"
            class="form-row form-help is-danger">
            {{ error }}
          </div>
          <div class="form-actions full RegistrationStep7__footer-actions" v-if="!hideActionButton">
            <btn
              class="RegistrationStep7__cancel"
              @onclick="back"
              btn-class="blue"
              :btn-label="$t('global.back')"
              data-cy="RegistrationStep7__back">
            </btn>
            <btn
              @onclick="submit"
              class="RegistrationStep7__submit"
              btn-class="submit"
              :btn-label="$t('global.send_to_verification')"
              data-cy="RegistrationStep7__submit">
            </btn>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import CategoryPricesForm from '@/components/form/category_prices_form/category-prices-form';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'RegistrationStep7',
  inject: ['$validator'],
  components: {
    CategoryPricesForm
  },
  data() {
    return {
      error: null,
      processing: false,
      hideActionButton: false
    };
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
    ...mapActions(['fetchCategoriesPrices']),
    ...mapMutations(['setRegistrationStep', 'setRegistrationComplete']),
    getIsBodyShown(value) {
      this.hideActionButton = value
    },
    back() {
      this.processing = true;
      setTimeout(() => {
        this.setRegistrationStep(6);
      }, 200);
    },
    async submit() {
      let categoriesPrices = this.categoriesPrices;
      
      for (let i = 0; i < categoriesPrices.length; i++) {
        if(!this.categoriesPrices[i]['priceMinutes_15'] || this.categoriesPrices[i]['priceMinutes_15'] === 0) {
          this.$root.$emit('categoryPricesFormisBodyShown', true);
          return
        }
      }

      this.error = null;
      this.processing = true;
      this.setRegistrationComplete(true)
      this.$router.push({ name: 'registration-complete' });

    }
  }
};
</script>

<style scoped lang="scss">
@import "registration-step-7.scss";
</style>
