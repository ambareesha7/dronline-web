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
        {{ $t('authorisation.create_account') }}
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

      <div class="form-actions full">
        <btn
          :class="{'invalidate': !fieldsFilled}"
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('authorisation.invite_gp_for_hospital')"
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import Checkbox from '@/components/global/checkbox/checkbox';

const { mapActions } = createNamespacedHelpers('oauth');

export default {
  name: 'SignUpFormForm',

  components: {
    Checkbox
  },

  data() {
    return {
      credentials: {},
      processing: false,
      error: null
    };
  },
  computed: {
    fieldsFilled() {
      const emailFilled = this.credentials.email !== null && this.credentials.email !== '';
      return emailFilled;
    },
    signUpType() {
      return this.$route.query.type;
    }
  },
  methods: {
    ...mapActions(['signUp']),
    submit() {
      const credentials = Object.assign(this.credentials, {signUpType: this.signUpType});
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.signUp(credentials).then(({error}) => {
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
