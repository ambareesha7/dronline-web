<template>
  <div class="PasswordRecoveryStep3__wrapper">
    <div class="PasswordRecoveryStep3__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="PasswordRecoveryStep3__header-logo-container"
        data-cy="PasswordRecovery__home-link">
        <img
          src="/static/images/logo.png"
          class="PasswordRecoveryStep3__header-logo" />
      </router-link>
    </div>

    <div class="PasswordRecoveryStep3__content">
      <div class="title PasswordRecoveryStep3__title">
        {{ $t('authorisation.setup_password') }}
      </div>
      <div class="form-row">
        <input
          id="password"
          :class="{
            'is-danger': errors.has('password'),
            'filled': password
          }"
          name="password"
          class="form-field icon-inside"
          :type="passwordIsVisible ? 'text' : 'password'"
          v-model="password"
          v-validate="'required|min:8'"
          data-vv-delay="500"
          :data-vv-as="$t('global.password')"
          ref="password"
          @keyup.enter="submit" />
        <label
          for="password"
          class="form-label label-inner">
          {{ $t('global.password') }}
        </label>
        <span
          v-show="errors.has('password')"
          class="form-help is-danger">
          {{ errors.first('password') }}
        </span>
        <i
          class="PasswordRecoveryStep3__password-visibility-trigger"
          :class="[passwordIsVisible ? 'icon-eye' : 'icon-eye-off']"
          @click="passwordIsVisible = !passwordIsVisible">
        </i>
      </div>

      <password-validation-indicators
        :have-lowercase="haveLowercase"
        :have-uppercase="haveUppercase"
        :have-digit="haveDigit"
        :have-special-character="haveSpecialCharacter">
      </password-validation-indicators>

      <div class="form-actions full">
        <btn
          :class="{'invalidate': !isValid}"
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('authorisation.save_password')"
          :btn-processing="processing">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import passwordValidation from '@/mixins/password-validation';
import PasswordValidationIndicators from '@/components/authorisation/password_validation_indicators/password-validation-indicators';

const { mapActions, mapGetters } = createNamespacedHelpers('oauth');

export default {
  name: 'PasswordRecoveryStep3',

  components: {
    PasswordValidationIndicators
  },

  mixins: [passwordValidation],

  props: {
    passwordRecoveryToken: {
      required: true,
      type: String
    }
  },

  data() {
    return {
      password: '',
      passwordIsVisible: false,
      processing: false,
      error: null
    };
  },

  computed: {
    ...mapGetters(['authorized'])
  },

  methods: {
    ...mapActions(['recoverPassword']),
    complete() {
      if (this.authorized) {
        this.$router.push({name: 'profile'});
      } else {
        this.$emit('set-step', 4);
      }
    },
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.recoverPassword({
            passwordRecoveryToken: this.passwordRecoveryToken,
            newPassword: this.password
          }).then(({error}) => {
            this.processing = false;
            if (error) {
              this.error = error;
            } else {
              this.complete();
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "password-recovery-step-3.scss";
</style>
