<template>
  <div
    data-cy="CheckConfirmationEmail__wrapper"
    class="CheckConfirmationEmail__wrapper">
    <div class="CheckConfirmationEmail__header">
      <router-link
        :to="{ name: 'dashboard' }"
        class="CheckConfirmationEmail__header-logo-container"
        data-cy="CheckConfirmationEmail__home-link">
        <img
          src="/static/images/logo.png"
          class="CheckConfirmationEmail__header-logo" />
      </router-link>
    </div>

    <div class="CheckConfirmationEmail__content">
      <div class="title CheckConfirmationEmail__title">
        {{ $t('authorisation.check_email') }}
      </div>
      <div class="CheckConfirmationEmail__description">
        {{ $t('authorisation.check_email_with_confirmation') }}
      </div>

      <btn
        btn-class="submit"
        :btn-label="$t('global.sign_in')"
        class="CheckConfirmationEmail__submit"
        @onclick="submit">
      </btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckConfirmationEmail',

  methods: {
    submit() {
      this.$router.push({ name: 'sign-in' });
    }
  }
};
</script>

<style scoped lang="scss">
@import "check-confirmation-email.scss";
</style>
