<template>
  <div class="PatientOnboardingStep2__wrapper">
    <transition name="appear-from-top">
      <div
        v-if="showPrompt"
        class="PatientOnboardingStep2__header-prompt">
        {{ $t('global.provide_missing_info_marked_red') }}
      </div>
    </transition>
    <div class="PatientOnboardingStep2__content PatientOnboardingStep2__container">
      <div class="title-medium">
        {{ $t('global.location') }}
      </div>
      <div class="PatientOnboardingStep2__description">
        {{ $t('patients.location_info_description') }}
      </div>

      <div
        v-if="editableAddress"
        class="PatientOnboardingStep2__form">
        <div class="form-row--cols">
          <div class="form-col col-1">
            <input
              :class="{
                'is-danger': errors.has('home_number'),
                'filled': home
              }"
              id="home_number"
              name="home_number"
              class="form-field"
              type="text"
              v-model="home"
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
                'filled': street
              }"
              id="street"
              name="street"
              class="form-field"
              type="text"
              v-model="street"
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
              'filled': neighborhood
            }"
            id="neighborhood"
            name="neighborhood"
            class="form-field"
            type="text"
            v-model="neighborhood"
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
              'filled': additional_numbers
            }"
            id="additional_numbers"
            name="additional_numbers"
            class="form-field"
            type="text"
            v-model="additional_numbers"
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
            <input
              :class="{
                'is-danger': errors.has('city'),
                'filled': city
              }"
              id="city"
              name="city"
              class="form-field"
              type="text"
              v-model="city"
              v-validate="'required'"
              data-vv-delay="500"
              :data-vv-as="$t('global.city')"
              ref="city"
              @keyup.enter="$refs.postal_code.focus()" />
            <label
              for="city"
              class="form-label label-inner">
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
                'filled': postal_code
              }"
              id="postal_code"
              name="postal_code"
              class="form-field"
              type="text"
              v-model="postal_code"
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
          <input
            :class="{
              'is-danger': errors.has('country'),
              'filled': country
            }"
            id="country"
            name="country"
            class="form-field"
            type="text"
            v-model="country"
            v-validate="'required|min:2'"
            data-vv-delay="500"
            :data-vv-as="$t('global.country')"
            ref="country"
            @keyup.enter="submit" />
          <label
            for="country"
            class="form-label label-inner">
            {{ $t('global.country') }}
          </label>
          <span
            v-if="errors.has('country')"
            class="form-help is-danger">
            {{ errors.first('country') }}
          </span>
        </div>
      </div>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientOnboardingStep2__footer">
        <div class="form-actions full PatientOnboardingStep2__container">
          <btn
            btn-class="blue"
            @onclick="$emit('set-step', 1)"
            :btn-label="$t('global.back')">
          </btn>
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-label="$t('global.next')">
          </btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { delayedCalls } from '@/utils';

const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('patient');
const editableFieldModel = (field, name) => ({
  get() {
    return this.editableAddress[field];
  },
  set(value) {
    this.setEditableAddressField({ field, value });
  }
});
export default {
  name: 'PatientOnboardingStep2',

  computed: {
    ...mapGetters(['editableAddress']),
    city: editableFieldModel('city'),
    street: editableFieldModel('street'),
    home: editableFieldModel('homeNumber'),
    postal_code: editableFieldModel('zipCode'),
    neighborhood: editableFieldModel('neighborhood'),
    additional_numbers: editableFieldModel('additionalNumbers'),
    country: editableFieldModel('country', true, 'label')
  },

  data() {
    return {
      showPrompt: false
    };
  },

  async beforeMount() {
    await this.fetchPatientAddress(this.$route.params.id);
    if (!this.editableAddress) this.setEditableAddress();
  },

  methods: {
    ...mapActions([
      'fetchPatientAddress'
    ]),
    ...mapMutations([
      'setEditableAddress',
      'setEditableAddressField'
    ]),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('set-step', 3);
        } else {
          delayedCalls(() => {
            this.showPrompt = !this.showPrompt;
          }, [0, 3000]);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-onboarding-step-2.scss";
</style>
