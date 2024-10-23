<template>
  <div class="PasswordRecoveryStep4__wrapper">
    <div class="PasswordRecoveryStep4__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="PasswordRecoveryStep4__header-logo-container"
        data-cy="PasswordRecovery__home-link">
        <img
          src="/static/images/logo.png"
          class="PasswordRecoveryStep4__header-logo" />
      </router-link>
    </div>

    <div class="PasswordRecoveryStep4__content">
      <div class="title PasswordRecoveryStep4__title">
        {{ $t('global.success') }}
      </div>
      <div
        class="form-description PasswordRecoveryStep4__description"
        v-html="$t('authorisation.password_reset')">
      </div>

      <div class="form-actions full">
        <btn
          @onclick="submit"
          btn-class="submit"
          :btn-label="$t('global.sign_in')">
        </btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordRecoveryStep4',

  methods: {
    submit() {
      this.$router.push({name: 'sign-in'});
    }
  }
};
</script>

<style scoped lang="scss">
@import "password-recovery-step-4.scss";
</style>
