<template>
  <div class="PasswordRecoveryStep2__wrapper">

    <div class="PasswordRecoveryStep2__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="PasswordRecoveryStep2__header-logo-container"
        data-cy="PasswordRecovery__home-link">
        <img
          src="/static/images/logo.png"
          class="PasswordRecoveryStep2__header-logo" />
      </router-link>
    </div>

    <div class="PasswordRecoveryStep2__content">
      <div class="title PasswordRecoveryStep2__title">
        {{ $t('authorisation.forgotten_password') }}
      </div>
      <div
        class="PasswordRecoveryStep2__description"
        v-html="$t('authorisation.reset_link_sent')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordRecoveryStep2'
};
</script>

<style scoped lang="scss">
@import "password-recovery-step-2.scss";
</style>
