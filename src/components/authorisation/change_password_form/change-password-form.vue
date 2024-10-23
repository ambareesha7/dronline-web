<template>
  <div class="ChangePasswordForm__wrapper">
    <div class="ChangePasswordForm__header">
      <h2
        class="ChangePasswordForm__title"
        v-html="$t('authorisation.setup_new_password')">
      </h2>
    </div>

    <div class="ChangePasswordForm__content">
      <transition
        name="slide-right-to-left"
        mode="out-in">
        <div
          v-if="completed"
          key="true"
          class="ChangePasswordForm__completed">
          <div
            class="ChangePasswordForm__completed-description"
            v-html="$t('authorisation.reset_link_sent')"></div>
        </div>
        <div
          v-else
          key="false"
          class="ChangePasswordForm__form">
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
              class="ChangePasswordForm__password-visibility-trigger"
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
              :btn-label="$t('authorisation.save_new_password')"
              :btn-processing="processing">
            </btn>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import passwordValidation from '@/mixins/password-validation';
import PasswordValidationIndicators from '@/components/authorisation/password_validation_indicators/password-validation-indicators';

const { mapActions, mapGetters } = createNamespacedHelpers('oauth');

export default {
  name: 'ChangePasswordForm',

  components: {
    PasswordValidationIndicators
  },

  mixins: [passwordValidation],

  data() {
    return {
      password: '',
      passwordIsVisible: false,
      processing: false,
      error: null,
      completed: false
    };
  },

  mounted() {
    this.checkQuery();
  },

  methods: {
    ...mapActions([
      'changePassword',
      'confirmChangePassword'
    ]),

    async checkQuery() {
      if (this.$route.params.confirmation_token) {
        await this.confirmChangePassword({
          confirmationToken: this.$route.params.confirmation_token
        });
        this.$router.push({ name: 'change-password-confirmation' });
      }
    },

    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.error = null;
          this.processing = true;
          this.changePassword({
            password: this.password
          }).then(({error}) => {
            this.processing = false;
            if (error) {
              this.error = error;
            } else {
              this.completed = true;
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "change-password-form.scss";
</style>
