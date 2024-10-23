<template>
  <div class="PatientCreateStep1__wrapper">
    <transition name="appear-from-top">
      <div
        v-if="showPrompt"
        class="PatientCreateStep1__header-prompt">
        {{ $t('patients.process_might_take') }}
      </div>
    </transition>
    <div class="PatientCreateStep1__content PatientCreateStep1__container">
      <div class="title-medium">
        {{ $t('patients.add_new_patient') }}
      </div>
      <div class="PatientCreateStep1__description">
        {{ $t('patients.add_new_patient_description') }}
      </div>

      <phone-number-field
        class="PatientCreateStep1__form"
        v-model="phoneNumber"
        data-cy="PatientCreate__phone-number-field">
      </phone-number-field>
    </div>

    <transition
      name="appear-from-bottom"
      appear>
      <div class="PatientCreateStep1__footer">
        <div class="form-actions full PatientCreateStep1__container">
          <btn
            btn-class="submit"
            @onclick="submit"
            :btn-processing="processing"
            :btn-label="$t('global.next')"
            data-cy="PatientCreate__submit-button">
          </btn>
        </div>
      </div>
    </transition>
    <span id="recaptcha-container"></span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PhoneNumberField from '@/components/global/phone_number_field/phone-number-field';
import { delayedCalls } from '@/utils';

const { mapActions } = createNamespacedHelpers('firebase');
export default {
  name: 'PatientCreateStep1',

  components: {
    PhoneNumberField
  },

  data() {
    return {
      phoneNumber: null,
      processing: false,
      showPrompt: false
    };
  },

  mounted() {
    delayedCalls(() => {
      this.showPrompt = !this.showPrompt;
    }, [600, 7000]);
  },

  methods: {
    ...mapActions(['authorize']),
    submit() {
      this.$validator.validateAll().then(async result => {
        if (result) {
          this.processing = true;
          await this.authorize(this.phoneNumber);
          this.$emit('set-step', 2);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-create-step-1.scss";
</style>
