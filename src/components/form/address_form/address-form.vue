<template>
  <form
    class="AddressForm__wrapper"
    :class="{ invalidate: readonly }">
    <div class="form-row--cols">
      <div class="form-col col-1">
        <input
          :class="{
            'is-danger': errors.has('home_number'),
            'filled': buildingNumber
          }"
          id="home_number"
          name="home_number"
          class="form-field"
          type="text"
          v-model="buildingNumber"
          v-validate="'required'"
          data-vv-delay="500"
          :data-vv-as="$t('global.home_number')"
          ref="home_number"
          @keyup.enter="$refs.street.focus()" />
        <label
          for="home_number"
          class="form-label label-inner">
          {{ $t('global.home_number') }}
        </label>
        <span
          v-if="errors.has('home_number')"
          class="form-help is-danger">
          {{ errors.first('home_number') }}
        </span>
      </div>
      <div class="form-col col-2">
        <input
          :class="{
            'is-danger': errors.has('street'),
            'filled': streetName
          }"
          id="street"
          name="street"
          class="form-field"
          type="text"
          v-model="streetName"
          v-validate="'required|min:2'"
          data-vv-delay="500"
          :data-vv-as="$t('global.street')"
          ref="street"
          @keyup.enter="$refs.neighborhood.focus()" />
        <label
          for="street"
          class="form-label label-inner">
          {{ $t('global.street') }}
        </label>
        <span
          v-if="errors.has('street')"
          class="form-help is-danger">
          {{ errors.first('street') }}
        </span>
      </div>
    </div>
    <div class="form-row">
      <input
        :class="{
          'is-danger': errors.has('neighborhood'),
          'filled': district
        }"
        id="neighborhood"
        name="neighborhood"
        class="form-field"
        type="text"
        v-model="district"
        data-vv-delay="500"
        :data-vv-as="$t('global.neighborhood_district')"
        ref="neighborhood"
        @keyup.enter="$refs.additional_numbers.focus()" />
      <label
        for="neighborhood"
        class="form-label label-inner">
        {{ $t('global.neighborhood_district') }}
      </label>
      <span
        v-if="errors.has('neighborhood')"
        class="form-help is-danger">
        {{ errors.first('neighborhood') }}
      </span>
    </div>
    <div class="form-row">
      <input
        :class="{
          'is-danger': errors.has('additional_numbers'),
          'filled': additionalNumbers
        }"
        id="additional_numbers"
        name="additional_numbers"
        class="form-field"
        type="text"
        v-model="additionalNumbers"
        data-vv-delay="500"
        :data-vv-as="$t('global.additional_numbers')"
        ref="additional_numbers"
        @keyup.enter="$refs.city.focus()" />
      <label
        for="additional_numbers"
        class="form-label label-inner">
        {{ $t('global.additional_numbers') }}
      </label>
      <span
        v-if="errors.has('additional_numbers')"
        class="form-help is-danger">
        {{ errors.first('additional_numbers') }}
      </span>
    </div>
    <div class="form-row--cols">
      <div class="form-col col-2">
        <multiselect
          :disabled="true"
          :class="{'is-danger': errors.has('city')}"
          v-model="city"
          ref="city"
          :options="city_options"
          placeholder=""
          :searchable="false"
          v-validate="'required'"
          data-vv-name="city"
          :data-vv-as="$t('global.city')">
          <i
            class="icon-caret multiselect-caret"
            slot="caret"
            slot-scope="{ toggle }"
            @mousedown.prevent.stop="toggle"></i>
        </multiselect>
        <input
          :class="{'filled': city}"
          class="form-hidden-validator form-field"
          type="text"
          :value="city"/>
        <label
          class="form-label label-inner"
          @click="$refs.city.$el.focus()">
          {{ $t('global.city') }}
        </label>
        <span
          v-if="errors.has('city')"
          class="form-help is-danger">
          {{ errors.first('city') }}
        </span>
      </div>
      <div class="form-col col-1">
        <input
          :class="{
            'is-danger': errors.has('postal_code'),
            'filled': postalCode
          }"
          id="postal_code"
          name="postal_code"
          class="form-field"
          type="text"
          v-model="postalCode"
          v-validate="'required|min:2'"
          data-vv-delay="500"
          :data-vv-as="$t('global.postal_code')"
          ref="postal_code"
          @keyup.enter="$refs.country.focus()" />
        <label
          for="postal_code"
          class="form-label label-inner">
          {{ $t('global.postal_code') }}
        </label>
        <span
          v-if="errors.has('postal_code')"
          class="form-help is-danger">
          {{ errors.first('postal_code') }}
        </span>
      </div>
    </div>
    <div class="form-row">
      <multiselect
        :disabled="true"
        :class="{'is-danger': errors.has('country')}"
        v-model="country"
        ref="country"
        :options="country_options"
        placeholder=""
        :searchable="false"
        v-validate="'required'"
        data-vv-name="country"
        :data-vv-as="$t('global.country')">
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
        class="form-label label-inner"
        @click="$refs.country.$el.focus()">
        {{ $t('global.country') }}
      </label>
      <span
        v-if="errors.has('country')"
        class="form-help is-danger">
        {{ errors.first('country') }}
      </span>
    </div>
  </form>
</template>

<script>
const propertyModel = prop => ({
  get() {
    return this.address[prop];
  },
  set(value) {
    this.$emit('update', { field: prop, value });
  }
});

export default {
  name: 'AddressForm',

  props: {
    address: {
      required: true,
      type: Object
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      country_options: [
        'United Arab Emirates'
      ],
      city_options: [
        'Dubai'
      ]
    };
  },

  computed: {
    buildingNumber: propertyModel('buildingNumber'),
    streetName: propertyModel('streetName'),
    district: propertyModel('district'),
    additionalNumbers: propertyModel('additionalNumbers'),
    city: propertyModel('city'),
    postalCode: propertyModel('postalCode'),
    country: propertyModel('country')
  }
};
</script>

<style lang="scss">
@import "address-form.scss";
</style>
