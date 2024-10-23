<template>
  <div class="PasswordRecoveryStep1__wrapper">

    <div class="PasswordRecoveryStep1__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="PasswordRecoveryStep1__header-logo-container"
        data-cy="PasswordRecovery__home-link">
        <img
          src="/static/images/logo.png"
          class="PasswordRecoveryStep1__header-logo" />
      </router-link>
    </div>

    <div class="PasswordRecoveryStep1__content">
      <div class="title PasswordRecoveryStep1__title">
        {{ $t('authorisation.forgotten_password') }}
      </div>
      <div class="PasswordRecoveryStep1__description">
        {{ $t('authorisation.forgotten_password_description') }}
      </div>
      <div class="form-row">
        <input
          id="email"
          :class="{
            'is-danger': errors.has('email'),
            'filled': email
          }"
          name="email"
          class="form-field"
          type="text"
          v-model="email"
          v-validate="'required|email'"
          data-vv-delay="500"
          :data-vv-as="$t('global.email_address')"
          @keyup.enter="submit" />
        <label
          for="email"
          class="form-label label-inner">
          {{ $t('global.email_address') }}
        </label>
        <span
          v-show="errors.has('email')"
          class="form-help is-danger">
          {{ errors.first('email') }}
        </span>
      </div>

      <div
        v-if="error"
        class="form-row form-help is-danger">
        {{ error }}
      </div>

      <div class="form-actions full PasswordRecoveryStep1__actions">
        <btn
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('authorisation.reset_password')"
          :btn-processing="processing">
        </btn>
      </div>

      <div class="PasswordRecoveryStep1__footer">
        <i18n
          class="PasswordRecoveryStep1__prompt"
          path="authorisation.have_account"
          tag="div"
          for="global.sign_in">
          <router-link
            class="PasswordRecoveryStep1__prompt-link"
            :to="{ name: 'sign-in' }"
            data-cy="PasswordRecoveryStep1__sign-in-link">
            {{ $t('global.sign_in') }}
          </router-link>
        </i18n>
      </div>
      
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('oauth');

export default {
  name: 'PasswordRecoveryStep1',

  data() {
    return {
      email: null,
      processing: false,
      error: null
    };
  },

  methods: {
    ...mapActions(['passwordRecoveryRequest']),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.passwordRecoveryRequest(this.email).then(({response, error}) => {
            this.processing = false;
            if (error) {
              this.error = error.message;
            } else {
              this.$emit('set-step', 2);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "password-recovery-step-1.scss";
</style>
