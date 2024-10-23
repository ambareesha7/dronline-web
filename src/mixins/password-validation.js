export default {
  computed: {
    haveLowercase() {
      return (/[a-z]/.test(this.password));
    },

    haveUppercase() {
      return (/[A-Z]/.test(this.password));
    },

    haveDigit() {
      return (/\d/.test(this.password));
    },

    haveSpecialCharacter() {
      return (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(this.password));
    },

    haveNoValidationErrors() {
      return !this.errors.any();
    },

    fieldsFilled() {
      return (this.password !== null && this.password !== '');
    },

    isValid() {
      return (
        this.haveLowercase &&
        this.haveUppercase &&
        this.haveDigit &&
        this.haveSpecialCharacter &&
        this.fieldsFilled &&
        this.haveNoValidationErrors
      );
    }
  }
};
