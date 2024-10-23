<template>
  <div class="SignInForm__wrapper">
    <div class="SignInForm__header">
      <div
        @click="refresh"
        class="SignInForm__header-logo-container"
        data-cy="SignInForm__header-home-link">
        <img
          src="/static/images/logo.png"
          class="SignInForm__header-logo" />
      </div>
    </div>

    <div class="SignInForm__content">
      <div class="title SignInForm__title">
        {{ $t('authorisation.welcome_again') }}
      </div>

      <div class="form-row">
        <input
          :class="{
            'is-danger': errors.has('email'),
            filled: credentials.email
          }"
          id="email"
          name="email"
          class="form-field"
          type="text"
          v-model="credentials.email"
          v-validate="'required|email'"
          data-vv-delay="500"
          :data-vv-as="$t('global.email')"
          ref="email"
          @keyup.enter="$refs.password.focus()"
          data-cy="SignInForm__email-field"/>
        <label
          for="email"
          class="form-label label-inner">
          {{ $t('global.email') }}
        </label>
        <span
          v-if="errors.has('email')"
          class="form-help is-danger"
          data-cy="SignInForm__email-field-validation-error">
          {{ errors.first('email') }}
        </span>
      </div>

      <div class="form-row">
        <input
          id="password"
          :class="{
            'is-danger': errors.has('password'),
            'filled': credentials.password
          }"
          name="password"
          class="form-field icon-inside"
          :type="passwordIsVisible ? 'text' : 'password'"
          v-model="credentials.password"
          v-validate="'required'"
          data-vv-delay="500"
          :data-vv-as="$t('global.password')"
          ref="password"
          @keyup.enter="submit"
          data-cy="SignInForm__password-field"/>
        <label
          for="password"
          class="form-label label-inner">
          {{ $t('global.password') }}
        </label>
        <span
          v-if="errors.has('password')"
          class="form-help is-danger"
          data-cy="SignInForm__password-field-validation-error">
          {{ errors.first('password') }}
        </span>
        <i
          class="SignInForm__password-visibility-trigger"
          :class="[passwordIsVisible ? 'icon-eye show' : 'icon-eye-off hide']"
          @click="passwordIsVisible = !passwordIsVisible"
          data-cy="SignInForm__password-visibility-trigger">
        </i>
      </div>

      <div class="form-actions pull-right">
        <router-link
          class="SignInForm__password-recovery-link"
          :to="{name: 'password-recovery'}"
          data-cy="SignInForm__forgot-password-link">
          {{ $t('authorisation.forgot_password') }}
        </router-link>
      </div>

      <div class="form-actions full">
        <btn
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('global.sign_in')"
          :btn-processing="processing"
          data-cy="SignInForm__submit-button">
        </btn>
      </div>

      <div class="SignInForm__form-error">
        <div
          v-if="error"
          class="form-row form-help is-danger"
          data-cy="SignInForm__form-error">
          {{ error }}
        </div>
      </div>

      <div class="SignInForm__footer">
        <i18n
          class="SignInForm__footer-prompt"
          path="authorisation.dont_have_account"
          tag="div"
          for="global.sign_up">
          <router-link
            class="SignInForm__footer-prompt-link"
            :to="{name: 'sign-up-type'}"
            data-cy="SignInForm__sign-up-link">
            {{ $t('global.sign_up') }}
          </router-link>
        </i18n>
      </div>

    </div>
  </div>
</template>

<script>
import cookie from 'vue-cookie';
import api from '@/api';
import { decode } from '@/utils/proto';
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('oauth');
const { mapMutations } = createNamespacedHelpers('profile');

export default {
  name: 'SignInForm',

  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      passwordIsVisible: false,
      processing: false,
      error: null
    };
  },

  methods: {
    ...mapActions(['signIn']),
    ...mapMutations(['setUSBoardUser']),
    async redirectUser() {

      const response = await api.fetchMedicalCategories();

      const data = decode('specialist_profile.GetMedicalCategoriesResponse', response);

      for (let index = 0; index < data.medicalCategories.length; index++) {
        if([8, 30].includes(data.medicalCategories[index].parentCategoryId)) {
          cookie.set('usBoardUser', true);
          this.setUSBoardUser(true)
          this.$router.push({name: 'us-board-second-opinion'});
          return
        }
      }

      this.$router.push({name: 'dashboard'});
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.signIn(this.credentials).then(({error}) => {
            this.processing = false;
            if (error) {
              this.error = error;
            } else {
              this.redirectUser();
            }
          });
        }
      });
    },
    refresh() {
      window.location.reload();
    }
  }
};
</script>

<style scoped lang="scss">
@import "sign-in-form.scss";
</style>
