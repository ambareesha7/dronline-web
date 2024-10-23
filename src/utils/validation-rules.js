export const phoneNumber = PhoneNumber => ({
  getMessage: field => `${field} is not a valid phone number (correct format: +XXX XX XXX XXXX)`,
  validate(value) {
    return new Promise(resolve => {
      const phone = new PhoneNumber(value);
      resolve({ valid: phone.isValid() });
    });
  }
});

export const minAge = () => ({
  getMessage: (field, minAge) => `Specialist should be at least ${minAge} years old`,
  validate(value, minAge) {
    return new Promise(resolve => {
      const today = new Date();
      const birthDate = new Date(Number(value));
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const valid = age >= Number(minAge);
      resolve({ valid });
    });
  }
});
