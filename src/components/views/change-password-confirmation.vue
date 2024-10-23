<template>
  <div class="ChangePasswordConfirmation__wrapper">
    <div class="ChangePasswordConfirmation__content">
      <div class="ChangePasswordConfirmation__header">
        <h2 class="ChangePasswordConfirmation__title">
          {{ $t('global.success') }}
        </h2>
      </div>
      <div class="ChangePasswordConfirmation__section">
        <div
          class="form-row ChangePasswordConfirmation__description"
          v-html="$t('authorisation.password_has_been_changed')">
        </div>
      </div>
      <div class="form-actions full ChangePasswordConfirmation__footer">
        <btn
          class="ChangePasswordConfirmation__submit"
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
  name: 'ChangePasswordConfirmation',

  methods: {
    submit() {
      this.$router.push({ name: 'sign-in' });
    }
  }
};
</script>

<style lang="scss" scoped>
.ChangePasswordConfirmation {

  &__wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    width: 100%;
    max-width: 470px;
    background: #FFFFFF;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.20);
  }

  &__header,
  &__footer {
    height: 64px;
    padding: 0 24px;
    display: flex;
    align-items: center;
  }

  &__header {
    border-bottom: 1px solid #E1E1E1;
  }

  &__footer {
    border-top: 1px solid #E1E1E1;
  }

  &__title {
    font-size: 16px;
    color: #23CE86;
    letter-spacing: .4px;
  }

  &__section {
    padding: 32px 24px;
  }

  &__submit {
    height: 36px;
  }

  &__description {
    font-size: 15px;
    color: #292929;
  }
}
</style>
