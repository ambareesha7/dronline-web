<template>
  <div class="PhoneNumberField__wrapper form-row--cols">
    <div class="form-col PhoneNumberField__code">
      <multiselect
        class="field-label-less"
        :class="{'is-danger': errors.has('code')}"
        v-model="code"
        ref="code"
        :options="countries"
        :custom-label="customLabel"
        placeholder=""
        :searchable="false"
        :show-labels="false">
        <template
          slot="singleLabel"
          slot-scope="props">
          <div class="PhoneNumberField__code">
            <div
              class="PhoneNumberField__code__flag-container">
              <img class="PhoneNumberField__code__flag"
                :src="`/static/images/flags/${props.option.id}.png`"
                :alt="props.option.name"
                :title="props.option.name"
              />
            </div>
            <span class="PhoneNumberField__code-value">
              +{{ props.option.dialCode }}
            </span>
          </div>
        </template>
        <template
          slot="option"
          slot-scope="props">
          <div class="PhoneNumberField__code">
            <div
              class="PhoneNumberField__code__flag-container">
              <img class="PhoneNumberField__code__flag"
                :src="`/static/images/flags/${props.option.id}.png`"
                :alt="props.option.name"
                :title="props.option.name"
              />
            </div>
            <span class="PhoneNumberField__code-value">
              +{{ props.option.dialCode }}
            </span>
          </div>
        </template>
        <i
          class="icon-caret multiselect-caret"
          slot="caret"
          slot-scope="{ toggle }"
          @mousedown.prevent.stop="toggle"></i>
      </multiselect>
    </div>
    <div class="form-col PhoneNumberField__number">
      <input
        name="number"
        id="number"
        type="text"
        class="form-field"
        :class="{
          'is-danger': errors.has('number'),
          'filled': number
        }"
        v-model="number"
        v-validate="rules"
        data-vv-delay="500"
        :data-vv-as="$t('global.phone_number')"
        data-cy="PhoneNumberField__field"/>
      <label
        class="form-label label-inner"
        for="number">
        {{ $t('global.phone_number') }}
      </label>
      <span
        v-if="errors.has('number')"
        class="form-help is-danger"
        data-cy="PhoneNumberField__validation-error">
        {{ errors.first('number') }}
      </span>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { decode } from '@/utils/proto';

const removeCode = (value, countries) => {
  if (!value || value === '') return '';
  let result = value;
  countries.forEach(({ dialCode }) => {
    const p = new RegExp(`^[+]${dialCode}`);
    result = result.replace(p, '');
  });
  return result;
};
const getCountry = (value, countries) => {
  if (!value || value === '') return countries[0];
  let result;
  countries.forEach(country => {
    const p = new RegExp(`^[+]${country.dialCode}`);
    if (p.test(value)) result = country;
  });
  return result;
};

export default {
  name: 'PhoneNumberField',

  props: {
    value: {},
    validationRules: {
      type: String
    }
  },

  inject: ['$validator'],

  mounted() {
    this.getCountries();
  },

  data() {
    return {
      countries: []
    };
  },

  computed: {
    number: {
      get() {
        return removeCode(this.value, this.countries);
      },
      set(val) {
        this.$emit('input', `+${this.code.dialCode}${val}`);
      }
    },
    code: {
      get() {
        return getCountry(this.value, this.countries);
      },
      set({ dialCode }) {
        this.$emit('input', `+${dialCode}${this.number}`);
      }
    },
    rules() {
      if (typeof this.validationRules === 'string') {
        return this.validationRules;
      }
      return 'required|alpha_num|min:4|max:15';
    }
  },
  methods: {
    customLabel({ dialCode }) {
      return `+${dialCode}`;
    },
    getCountries() {
      api.getCountries().then(data => {
        const {countries} = decode('Countries', data);
        this.countries = countries;
      });
    }
  }
};
</script>

<style lang="scss">
  @import 'phone-number-field.scss';
</style>
