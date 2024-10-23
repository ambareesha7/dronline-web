<template>
  <div class="LocationAutocomplete">
    <input
      name="location_autocomplete"
      :class="{'filled': validatedText}"
      class="form-hidden-validator form-field"
      type="text"
      v-validate="'required'"
      data-vv-delay="500"
      :data-vv-as="$t('global.selectLocation')"
      :value="validatedText"/>
    <div class="LocationAutocomplete__search">
      <i class="icon-location LocationAutocomplete__search__icon"
        slot="icon-before">
      </i>
      <input
        :id="id"
        class="form-field LocationAutocomplete__search__input"
        :class="{'filled': autocompleteText}"
        ref="autocomplete"
        type="text"
        v-model="autocompleteText"
        @keyup="onTextChanged"
        @blur="onBlur"
      />
      <label :for="id" class="form-label label-inner">
        {{ $t('global.selectLocation') }}
      </label>
      <btn
        v-if="showUndoButton &&
          savedAutocompleteText &&
          (autocompleteText !== savedAutocompleteText) &&
          errors.has('location_autocomplete')"
        @onclick="cancelChanges"
        btn-class="cancel"
        class="LocationAutocomplete__search__cancel"
        :btn-label="$t('global.undo')">
      </btn>
    </div>
    <div
      v-if="errors.has('location_autocomplete')"
      class="form-row form-help is-danger">
      {{ $t('authorisation.pleaseSelectLocation') }}
    </div>
  </div>
</template>

<script>
/* global google */

// https://developers.google.com/places/supported_types#table2
const ADDRESS_COMPONENTS = {
  neighborhood: 'long_name',
  route: 'long_name', // street name
  street_number: 'short_name',
  locality: 'long_name', // city name
  administrative_area_level_1: 'long_name', // state or region
  country: 'long_name',
  postal_code: 'short_name'
};

export default {
  name: 'LocationAutocomplete',
  inject: ['$validator'],
  props: {
    savedAutocompleteText: {
      type: String,
      default: ''
    },
    showUndoButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: 'location-autocomplete-id',
      autocompleteText: '',
      validatedText: '',
      valueSelected: false,

      /**
      * The Autocomplete object.
      *
      * @type {Autocomplete}
      * @link https://developers.google.com/maps/documentation/javascript/reference#Autocomplete
      */
      autocomplete: null
    };
  },
  created() {
    if (this.savedAutocompleteText) {
      this.autocompleteText = this.savedAutocompleteText;
    }
    this.validatedText = this.autocompleteText;
  },
  mounted() {
    const options = {
      types: ['address']
    };
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(this.id),
      options
    );
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  },
  methods: {
    onPlaceChanged() {
      const place = this.autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        this.setValidatedText('');
        return;
      }
      if (place.address_components !== undefined) {
        this.$emit(
          'place-changed',
          this.prepareResult(place)
        );
        this.autocompleteText = place.formatted_address;
        this.setValidatedText(this.autocompleteText);
      }
    },
    onTextChanged() {
      if (this.savedAutocompleteText && this.autocompleteText === this.savedAutocompleteText) {
        this.setValidatedText(this.autocompleteText);
      } else {
        this.setValidatedText('');
      }
    },
    onBlur() {
      // Reset value on blur to: [last saved value] or ['' to trigger validation error].
      // If blur was triggered by user selecting an option,
      // then validatedText('') will be almost immediately ovewritten inside onPlaceChanged()

      if (this.savedAutocompleteText && this.autocompleteText === this.savedAutocompleteText) {
        this.setValidatedText(this.autocompleteText);
      } else {
        setTimeout(() => {
          if (this.autocompleteText !== this.savedAutocompleteText) {
            this.autocompleteText = ''
            this.setValidatedText('');
          }
        // Timeout to let onPlaceChanged() do it's job (setting this.autocompleteText)
        }, 0);
      }
    },
    cancelChanges() {
      this.autocompleteText = this.savedAutocompleteText;
      this.setValidatedText(this.savedAutocompleteText);
    },
    setValidatedText(text) {
      this.validatedText = text;
      setTimeout(() => {
        this.$validator.validate('location_autocomplete');
      // Timeout to let (this.validatedText = text;) do it's job
      }, 0);
    },

    prepareResult(place) {
      const result = this.pruneGoogleResult(place);
      this.valueSelected = true
      return this.prepareUpdateRequestBody(result);
    },
    pruneGoogleResult(place) {
      const returnData = {};
      for (let i = 0; i < place.address_components.length; i++) {
        const addressType = place.address_components[i].types[0];
        if (ADDRESS_COMPONENTS[addressType]) {
          const val = place.address_components[i][ADDRESS_COMPONENTS[addressType]];
          returnData[addressType] = val;
        } else {
          returnData[addressType] = null;
        }
      }
      returnData.lat = place.geometry.location.lat();
      returnData.lon = place.geometry.location.lng();
      returnData.formattedAddress = place.formatted_address;
      return returnData;
    },
    prepareUpdateRequestBody(result) {
      const {
        neighborhood,
        route,
        street_number,
        locality,
        administrative_area_level_1,
        country,
        postal_code,
        formattedAddress,
        lat,
        lon
      } = result;

      return {
        street: route,
        number: street_number,
        postalCode: postal_code,
        city: locality,
        country,
        neighborhood,
        formattedAddress,
        coordinates: {
          lat,
          lon
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
  @import "location-autocomplete.scss";
</style>

<style lang="scss">
  @import "location-autocomplete-overwrites.scss";
</style>
