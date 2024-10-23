<template>
  <div class="SignUpForm__wrapper">
    <div class="SignUpForm__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="SignUpForm__header-logo-container"
        data-cy="SignUpForm__header-home-link">
        <img
          src="/static/images/logo.png"
          class="SignUpForm__header-logo" />
      </router-link>
    </div>

    <div class="SignUpForm__content">
      <div class="title SignUpForm__title">
        {{ $t('authorisation.welcome') }}
      </div>

      <div class="form-row">
        <input
          id="email"
          :class="{
            'is-danger': errors.has('email'),
            filled: credentials.email
          }"
          name="email"
          class="form-field"
          type="email"
          v-model="credentials.email"
          v-validate="'required|email'"
          data-vv-delay="500"
          :data-vv-as="$t('global.email_address')"
          ref="email"
          @keyup.enter="$refs.password.focus()"
          data-cy="SignUpForm__email-field"/>
        <label
          for="email"
          class="form-label label-inner">
          {{ $t('global.email_address') }}
        </label>
        <span
          v-if="errors.has('email')"
          class="form-help is-danger"
          data-cy="SignUpForm__email-field-validation-error">
          {{ errors.first('email') }}
        </span>
      </div>

      <div class="form-row">
        <input
          id="password"
          :class="{
            'is-danger': errors.has('password'),
            filled: credentials.password
          }"
          name="password"
          class="form-field"
          :type="passwordIsVisible ? 'text' : 'password'"
          v-model="credentials.password"
          v-validate="'required|min:8'"
          data-vv-delay="500"
          :data-vv-as="$t('global.password')"
          ref="password"
          @keyup.enter="submit"
          @focus="passwordInFocus = true"
          @blur="passwordInFocus = false"
          data-cy="SignUpForm__password-field"/>
        <label
          for="password"
          class="form-label label-inner">
          {{ $t('global.password') }}
        </label>
        <span
          v-if="errors.has('password')"
          class="form-help is-danger"
          data-cy="SignUpForm__password-field-validation-error">
          {{ errors.first('password') }}
        </span>
        <i
          class="SignUpForm__password-visibility-trigger"
          :class="[passwordIsVisible ? 'icon-eye show' : 'icon-eye-off hide']"
          @click="passwordIsVisible = !passwordIsVisible"
          data-cy="SignUpForm__password-visibility-trigger">
        </i>
      </div>

      <div
        class="form-row"
        v-if="showValidation">
        <password-validation-indicators
          :have-lowercase="haveLowercase"
          :have-uppercase="haveUppercase"
          :have-digit="haveDigit"
          :have-special-character="haveSpecialCharacter">
        </password-validation-indicators>
      </div>

      <div class="form-actions full">
        <btn
          :class="{'invalidate': !isValid}"
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('authorisation.create_account')"
          :btn-processing="processing"
          data-cy="SignUpForm__submit-button">
        </btn>
      </div>

      <div class="SignUpForm__error">
        <div
          v-if="error"
          class="form-row form-help is-danger"
          data-cy="SignUpForm__form-error">
          {{ error }}
        </div>
      </div>

      <div class="SignUpForm__prompt-container">
        <i18n
          class="SignUpForm__prompt"
          path="authorisation.agree_with_tos_and_pp"
          tag="div"
          for="global.terms_and_conditions">
          <router-link
            class="SignUpForm__prompt-link"
            :to="{name: 'terms-and-conditions'}"
            data-cy="SignUpForm__terms-and-conditions-link">
            {{ $t('global.terms_and_conditions') }}
          </router-link>
          <router-link
            class="SignUpForm__prompt-link"
            :to="{ name: 'privacy-policy' }"
            data-cy="SignUpForm__privacy-policy-link">
            {{ $t('global.privacy_policy') }}
          </router-link>
        </i18n>
      </div>
    </div>

    <div class="SignUpForm__footer">
      <i18n
        class="SignUpForm__prompt"
        path="authorisation.have_account"
        tag="div"
        for="global.sign_in">
        <router-link
          class="SignUpForm__prompt-link"
          :to="{ name: 'sign-in' }"
          data-cy="SignUpForm__sign-in-link">
          {{ $t('global.sign_in') }}
        </router-link>
      </i18n>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import passwordValidation from '@/mixins/password-validation';
import Checkbox from '@/components/global/checkbox/checkbox';
import PasswordValidationIndicators from '@/components/authorisation/password_validation_indicators/password-validation-indicators';

const { mapActions } = createNamespacedHelpers('oauth');

export default {
  name: 'SignUpFormForm',

  mixins: [passwordValidation],

  components: {
    Checkbox,
    PasswordValidationIndicators
  },

  data() {
    return {
      credentials: {},
      passwordIsVisible: false,
      passwordInFocus: false,
      processing: false,
      error: null
    };
  },
  computed: {
    showValidation() {
      return this.passwordInFocus || this.credentials.password;
    },
    fieldsFilled() {
      const emailFilled = this.credentials.email !== null && this.credentials.email !== '';
      const passwordFilled = this.credentials.password !== null && this.credentials.password !== '';
      return emailFilled && passwordFilled;
    },
    password() {
      return this.credentials.password;
    }
  },
  methods: {
    ...mapActions(['signUp']),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.signUp(this.credentials).then(({error}) => {
            this.processing = false;
            if (error) {
              this.error = error;
            } else {
              this.$emit('onsubmit');
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "sign-up-form.scss";
</style>
