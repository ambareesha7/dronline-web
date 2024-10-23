<template>
  <div
    class="PatientInviteModal__wrapper"
    data-cy="PatientInviteModal">
    <div class="PatientInviteModal__header">
      <div class="PatientInviteModal__title-container">
        <i class="icon_add-user PatientInviteModal__title-icon"></i>
        <div class="PatientInviteModal__title">
          {{ $t('patients.invite_new_patient') }}
        </div>
      </div>
      <div
        class="PatientInviteModal__close-container"
        @click="close">
        <i class="icon-close PatientInviteModal__close-icon"></i>
      </div>
    </div>
    <div class="PatientInviteModal__content">

      <div class="PatientInviteModal__section">
        <div class="PatientInviteModal__section-title">
          {{ $t('global.contact_info') }}
        </div>
        <phone-number-field
          :validation-rules="phoneRules"
          v-model="form.phoneNumber"
          data-cy="PatientInviteModal__phone-number-field">
        </phone-number-field>
        <div class="form-row">
          <input
            name="email"
            id="email"
            type="text"
            class="form-field"
            :class="{
              'is-danger': errors.has('email'),
              'filled': form.email
            }"
            v-model="form.email"
            v-validate="emailRules"
            data-vv-delay="500"
            :data-vv-as="$t('global.email_address')"
            @keyup.enter="submit"
            data-cy="PatientInviteModal__email-field"/>
          <label
            class="form-label label-inner"
            for="email">
            {{ $t('global.email_address') }}
          </label>
          <span
            v-if="errors.has('email')"
            class="form-help is-danger"
            data-cy="PatientInviteModal__email-field-validation-error">
            {{ errors.first('email') }}
          </span>
        </div>
      </div>
    </div>
    <div class="PatientInviteModal__footer">
      <div
        v-if="error"
        class="form-help is-danger PatientInviteModal__footer-error"
        data-cy="PatientInviteModal__form-error">
        {{ error }}
      </div>
      <div class="form-actions PatientInviteModal__footer-actions">
        <btn
          @onclick="close"
          btn-class="cancel"
          class="PatientInviteModal__cancel"
          :btn-label="$t('global.cancel')"
          data-cy="PatientInviteModal__cancel-button">
        </btn>

        <btn
          @onclick="submit"
          btn-class="blue-filled"
          class="PatientInviteModal__submit"
          :btn-label="$t('global.invite')"
          :btn-processing="processing"
          data-cy="PatientInviteModal__submit-button">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import PhoneNumberField from '@/components/global/phone_number_field/phone-number-field';
import api from '@/api';
import { decode } from '@/utils/proto';

const { mapActions } = createNamespacedHelpers('patients');
export default {
  name: 'PatientInviteModal',
  components: {
    PhoneNumberField
  },
  mounted() {
    this.getCountries();
  },
  data() {
    return {
      form: {},
      isValidPhoneNumber: true,
      error: null,
      processing: false,
      dialCodes: []
    };
  },
  methods: {
    ...mapActions(['invitePatient']),
    close() {
      this.$modal.hide('patient-invite-modal');
    },
    onInput({ number, isValid, country }) {
      this.isValidPhoneNumber = isValid;
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result && this.isValidPhoneNumber) {
          this.error = null;
          this.processing = true;

          const request = {
            email: this.form.email || null,
            phoneNumber: null
          };
          if (this.phoneNumberSet) {
            request.phoneNumber = this.form.phoneNumber;
          }
          this.invitePatient(request).then(({ error }) => {
            this.processing = false;
            if (error) {
              this.error = error;
            } else {
              this.$toastr.s(this.getSuccessMessage());
              this.close();
            }
          });
        }
      });
    },
    getCountries() {
      api.getCountries().then(data => {
        const {countries} = decode('Countries', data);
        this.dialCodes = countries.map(c => c.dialCode);
      });
    },
    getSuccessMessage() {
      let invitationDetails = '';
      if (this.phoneNumberSet) {
        invitationDetails += `${this.$t('global.phone_number')}: ${this.form.phoneNumber}`;
      }
      if (this.form.email) {
        if (invitationDetails.length) {
          invitationDetails += ', ';
        }
        invitationDetails += `${this.$t('global.email')}: ${this.form.email}`;
      }
      const name = `${this.form.firstName} ${this.form.lastName}`;
      return this.$t('patients.successfully_invited', [invitationDetails]);
    }
  },
  computed: {
    emailRules() {
      return this.phoneNumberSet ? '' : 'required';
    },
    phoneRules() {
      return this.form.email ? '' : 'required|alpha_num|min:4|max:15';
    },
    phoneNumberSet() {
      return this.form.phoneNumber &&
        !this.dialCodes.includes(`${parseInt(this.form.phoneNumber, 10)}`);
    }
  }
};
</script>
<style scoped lang="scss">
  @import "patient-invite-modal.scss";
</style>
