<template>
  <div :class="{
    'CategoryPricesForm__wrapper': true,
    'CategoryPricesForm--open': isBodyShown
    }">
    <div
      class="CategoryPricesForm__header"
      @click="toggleBody">
      <div class="CategoryPricesForm__header__title">
        {{ categoryPrices.medicalCategoryName }}
      </div>
      <i class="icon-caret CategoryPricesForm__header__caret" />
    </div>

    <div class="CategoryPricesForm__body" v-show="isBodyShown">

      <div class="CategoryPricesForm__pricing-info">
        <div class="CategoryPricesForm__pricing-info-content">
          <div><img src="/static/images/information-outline.png"/></div>
          <div class="CategoryPricesForm__pricing-info-title">Current app update allows to set only 15 minutes slots</div> 
        </div>
      </div>

      <div class="form-row">
        <multiselect
          :class="{'is-danger': errors.has('currencies')}"
          v-model="currency"
          ref="currencies"
          :options="currencies"
          value="value"
          label="label"
          track-by="id"
          :placeholder="$t('global.select_currency')"
          :searchable="false"
          v-validate="'required'"
          data-vv-name="currencies"
          :data-vv-as="$t('global.currency')"
          data-vv-value-path="value">
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"></i>
        </multiselect>
        <input
          :class="{'filled': currency}"
          class="form-hidden-validator form-field"
          type="text"
          :value="currency"/>
        <label
          class="form-label label-inner"
          @click="$refs.currencies.$el.focus()">
          {{ $t('global.currency') }}
        </label>
        <span
          v-if="errors.has('currencies')"
          class="form-help is-danger">
          {{ errors.first('currencies') }}
        </span>
      </div>

      <div v-for="field in categoryPriceFields"
        :key="`${categoryPrices.medicalCategoryId}_${field.key}`"
        class="form-row">
        <input
          :disabled="field.disable"
          :placeholder="categoryPrices.currency ? '00 ' + categoryPrices.currency : '00'"
          :name="`category_prices_input_${field.key}`"
          :id="`category_prices_input_${field.key}`"
          type="number"
          class="form-field"
          :class="{
            'is-danger': errors.has(`category_prices_input_${field.key}`),
            'filled': field.value >= 0,
            'disabled': field.disable
          }"
          v-model.number="field.value"
          v-validate="field.disable ? 'numeric|min_value:1' : 'required|numeric|min_value:1'"
          data-vv-delay="500"
          :data-vv-as="field.label"/>
        <label
          :class="{ disabled: field.disable }"
          class="form-label label-inner"
          :for="`category_prices_input_${field.key}`">
          {{ $t(`${field.label}`) }}
        </label>
        <span
          v-if="errors.has(`category_prices_input_${field.key}`)"
          class="form-help is-danger">
          {{ errors.first(`category_prices_input_${field.key}`) }}
        </span>
      </div>

      <btn
        btn-class="submit"
        :btn-label="$t('profile.update_category_prices', [categoryPrices.medicalCategoryName])"
        class="CategoryPricesForm__submit"
        @onclick="submit">
      </btn>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'CategoryPricesForm',
  // inject: ['$validator'],
  props: {
    categoryPrices: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },
  mounted() {
    this.categoryPriceFields.forEach(field => {
      field.value = this.categoryPrices[field.key];
    });

    this.$root.$on('categoryPricesFormisBodyShown', (v) => {
      if(!this.categoryPrices.currency) {
        this.toggleBody();
        this.submit();
      }
    });
    
  },
  computed: {
    currency: {
      get() {
        return this.categoryPrices && this.categoryPrices.currency ? { id: this.categoryPrices.currency, label: this.categoryPrices.currency } : null
      },
      set(val) {
        this.setCategoriesPricesField({field: 'currency', value: val, index: this.index})
      }
    }
  },
  data() {
    return {
      isBodyShown: false,
      currencies: [
        {
          id: 'USD',
          label: 'USD ($)'
        },
        {
          id: 'AED',
          label: 'AED (د.إ)'
        },
        {
          id: 'INR',
          label: 'INR (₹)'
        }
      ],
      categoryPriceFields: [
        {
          key: 'priceMinutes_15',
          label: '15 minutes',
          value: null
        },
        {
          key: 'priceMinutes_30',
          label: '30 minutes',
          value: null,
          disable: true
        },
        {
          key: 'priceMinutes_45',
          label: '45 minutes',
          value: null,
          disable: true
        },
        {
          key: 'priceMinutes_60',
          label: '60 minutes',
          value: null,
          disable: true
        },
        {
          key: 'priceSecondOpinion',
          label: 'Second opinion',
          value: null,
          disable: true
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      'updateCategoryPrices'
    ]),
    ...mapMutations([
      'setCategoriesPricesField'
    ]),
    toggleBody() {
      this.isBodyShown = !this.isBodyShown;
      this.$emit('isBodyShown', this.isBodyShown);
    },
    submit() {
      this.$validator.validateAll().then(result => {

        if(!result) {
          this.isBodyShown = true
          return
        }

        if (result) {

          const newCategoryPrices = this.categoryPriceFields
          .reduce(
            (aggr, curr) => ({...aggr, [curr.key]: curr.value}),
            this.categoryPrices
          );

          this.updateCategoryPrices(newCategoryPrices).then(({ error }) => {
            if (!error) {
              this.isBodyShown = false;
              this.$emit('isBodyShown', this.isBodyShown);
            }
          });
        }
      });

    }
  }
};
</script>

<style scoped lang="scss">
  @import "category-prices-form.scss";
</style>
