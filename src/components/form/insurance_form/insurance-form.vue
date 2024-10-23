<template>
  <div class="InsuranceForm__wrapper">
    <div class="InsuranceForm__header">
      <div class="InsuranceForm__title">
        #{{ index + 1 }} Country 
      </div>
      <div v-if="length > 1" @click="removeForm(index, length)" class="InsuranceForm__remove" data-cy="InsuranceForm__remove">
        {{ $t('global.remove') }}
      </div>
    </div>
    <div class="form-row">
      <multiselect
        @select="onSelect"
        :class="{'is-danger': errors.has('countries')}"
        v-model="country"
        ref="countries"
        :options="countries"
        value="value"
        label="name"
        track-by="id"
        placeholder="Select"
        :searchable="true"
        data-vv-name="countries"
        :data-vv-as="$t('global.country')"
        data-vv-value-path="value">
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
      <input
        :class="{'filled': country}"
        class="form-hidden-validator form-field"
        type="text"
        :value="country"/>
      <label
        class="form-label label-inner country-label"
        @click="$refs.countries.$el.focus()">
        {{ $t('global.country') }}
      </label>
      <span
        v-if="errors.has('countries')"
        class="form-help is-danger">
        {{ errors.first('countries') }}
      </span>
    </div>

    <div v-if="showInsuranceCompanies">
      <div class="form-row insurance-title">
        <label class="form-label label-inner">Insurance Companies</label>
      </div>
      <div v-if="availableInsuranceProviders[form]" class="form-row" v-for="(provider, index) in availableInsuranceProviders[form]">
        <checkbox @input="onCheckboxInput" class="insurance-form" :data="provider" :value="insuranceProviders.some(i => i.name.includes(provider.name))">{{ provider.name }}</checkbox>
      </div>
      <div v-if="availableInsuranceProviders[form] && availableInsuranceProviders[form].length === 0" class="form-row">
        <label class="form-label label-inner">No Results</label>
      </div>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import api from '@/api';
import { decode } from '@/utils/proto';
import Checkbox from '@/components/global/checkbox/checkbox';

const { mapMutations, mapGetters, mapActions } = createNamespacedHelpers('profile');

export default {
  name: 'InsuranceForm',
  components: {
    Checkbox
  },
  props: {
    form: {
      required: true,
      type: String
    },
    index: {
      required: true,
      type: Number
    },
    length: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      showInsuranceCompanies: false,
      countries: []
    };
  },
  computed: {
    ...mapGetters(['availableInsuranceProviders', 'insuranceProviders', 'countryCode']),
    country: {
      get() {
        return this.form ? { id: this.form, name: this.countryCode[this.form] } : null
      },
      set(val) {
        if(val) {
          this.addCountrytoIndex({index: this.index, id: val.id});
        }
      }
    },
  },
  async beforeMount() {
    if(this.form) {
      await this.fetchAvailableInsuranceProviders(this.form); 
      this.showInsuranceCompanies = true
    }
    await this.getCountries();
  },
  methods: {
    ...mapActions([
      'fetchAvailableInsuranceProviders',
      'updateInsuranceProviders',
      'fetchInsuranceProviders'
    ]),
    ...mapMutations([
      'removeCountry',
      'addCountryCode',
      'addInsuranceProvider',
      'removeInsuranceProvider',
      'addCountrytoIndex'
    ]),
    async removeForm(index) {
      this.removeCountry(index)
      const list = this.insuranceProviders.filter(x => x.countryId !== this.form);
      await this.updateInsuranceProviders(list);
    },
    async getCountries() {
      await api.getCountries().then(data => {
        const {countries} = decode('Countries', data);
        let countryCodeObj = {}
        for (let index = 0; index < countries.length; index++) {
          countryCodeObj[countries[index]['id']] = countries[index]['name']
        }
        this.addCountryCode(countryCodeObj)
        this.countries = countries;
      });
    },
    async onCheckboxInput(checked, provider){

      checked ? this.addInsuranceProvider(provider) : this.removeInsuranceProvider(provider)

      await this.updateInsuranceProviders(this.insuranceProviders);
    },
    async onSelect(selectedOption) {
      this.showInsuranceCompanies = false
      await this.fetchAvailableInsuranceProviders(selectedOption.id);
      this.showInsuranceCompanies = true

      console.log("availableInsuranceProviders");
      console.log(this.availableInsuranceProviders);
    }
  }
};
</script>

<style scoped lang="scss">
  @import "insurance-form.scss";
</style>
