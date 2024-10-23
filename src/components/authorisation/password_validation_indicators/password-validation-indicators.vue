<template>
  <div
    class="PasswordValidationIndicators__wrapper"
    data-cy="PasswordValidationIndicators__container">
    <div class="form-row--cols">
      <div
        class="form-col PasswordValidationIndicators__validation"
        :class="haveLowercase ? 'valid' : 'invalid'"
        data-cy="PasswordValidationIndicators__lowercase">
        <i class="PasswordValidationIndicators__validation-icon valid icon-check-small"></i>
        <i class="PasswordValidationIndicators__validation-icon invalid icon-close-small"></i>
        <div class="PasswordValidationIndicators__validation-label">
          {{ $t('authorisation.lowercase') }}
        </div>
      </div>
      <div
        class="form-col PasswordValidationIndicators__validation"
        :class="haveUppercase ? 'valid' : 'invalid'"
        data-cy="PasswordValidationIndicators__uppercase">
        <i class="PasswordValidationIndicators__validation-icon valid icon-check-small"></i>
        <i class="PasswordValidationIndicators__validation-icon invalid icon-close-small"></i>
        <div class="PasswordValidationIndicators__validation-label">
          {{ $t('authorisation.uppercase') }}
        </div>
      </div>
    </div>
    <div class="form-row--cols">
      <div
        class="form-col PasswordValidationIndicators__validation"
        :class="haveDigit ? 'valid' : 'invalid'"
        data-cy="PasswordValidationIndicators__digit">
        <i class="PasswordValidationIndicators__validation-icon valid icon-check-small"></i>
        <i class="PasswordValidationIndicators__validation-icon invalid icon-close-small"></i>
        <div class="PasswordValidationIndicators__validation-label">
          {{ $t('authorisation.1_digit') }}
        </div>
      </div>
      <div
        class="form-col PasswordValidationIndicators__validation"
        :class="haveSpecialCharacter ? 'valid' : 'invalid'"
        data-cy="PasswordValidationIndicators__special-character">
        <i class="PasswordValidationIndicators__validation-icon valid icon-check-small"></i>
        <i class="PasswordValidationIndicators__validation-icon invalid icon-close-small"></i>
        <div class="PasswordValidationIndicators__validation-label">
          {{ $t('authorisation.special_character') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PasswordValidationIndicators',

  props: {
    haveLowercase: {
      required: true,
      type: Boolean
    },

    haveUppercase: {
      required: true,
      type: Boolean
    },

    haveDigit: {
      required: true,
      type: Boolean
    },

    haveSpecialCharacter: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
@import "password-validation-indicators.scss";
</style>
