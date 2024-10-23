<template>
  <div class="ChangePassword__wrapper">
    <div class="content ChangePassword__content">
      <change-password-form></change-password-form>
    </div>
  </div>
</template>

<script>
import ChangePasswordForm from '@/components/authorisation/change_password_form/change-password-form';

export default {
  name: 'ChangePassword',

  components: {
    ChangePasswordForm
  }
};
</script>

<style lang="scss" scoped>
.ChangePassword {
  &__wrapper {
    transition: transform .16s ease-out, opacity .2s ease-out;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
