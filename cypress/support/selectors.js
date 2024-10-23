const selectors = {
  navbar: {
    home_link: 'TheNavbar__home-link',
    breadcrumb_step: 'Breadcrumbs__step'
  },
  sidebar: {
    nav_emr: 'TheSidebar__nav-emr',
    nav_specialists: 'TheSidebar__nav-specialists'
  },
  sign_in: {
    email_field: 'SignInForm__email-field',
    email_field_validation_error: 'SignInForm__email-field-validation-error',
    password_field: 'SignInForm__password-field',
    password_field_validation_error: 'SignInForm__password-field-validation-error',
    submit_button: 'SignInForm__submit-button',
    form_error: 'SignInForm__form-error',
    forgot_password_link: 'SignInForm__forgot-password-link',
    sign_up_link: 'SignInForm__sign-up-link',
    password_visibility_trigger: 'SignInForm__password-visibility-trigger'
  },
  sign_up: {
    email_field: 'SignUpForm__email-field',
    email_field_validation_error: 'SignUpForm__email-field-validation-error',
    password_field: 'SignUpForm__password-field',
    password_field_validation_error: 'SignUpForm__password-field-validation-error',
    submit_button: 'SignUpForm__submit-button',
    sign_in_link: 'SignUpForm__sign-in-link',
    password_visibility_trigger: 'SignUpForm__password-visibility-trigger',
    terms_and_conditions_link: 'SignUpForm__terms-and-conditions-link',
    privacy_policy_link: 'SignUpForm__privacy-policy-link',
    successful_registration: 'CheckConfirmationEmail__wrapper'
  },
  password_recovery: {
    home_link: "PasswordRecovery__home-link"
  },
  password_validation: {
    lowercase: 'PasswordValidationIndicators__lowercase',
    uppercase: 'PasswordValidationIndicators__uppercase',
    digit: 'PasswordValidationIndicators__digit',
    special_character: 'PasswordValidationIndicators__special-character'
  },
  emr: {
    invite_patient: {
      invite_button: 'PatientsNewPatient__method-invite-button',
      modal: 'PatientInviteModal',
      phone_number_field: 'PatientInviteModal__phone-number-field',
      email_field: 'PatientInviteModal__email-field',
      email_field_validation_error: 'PatientInviteModal__email-field-validation-error',
      cancel_button: 'PatientInviteModal__cancel-button',
      submit_button: 'PatientInviteModal__submit-button',
      form_error: 'PatientInviteModal__form-error'
    },
    create_patient: {
      create_button: 'PatientsNewPatient__method-create-button',
      phone_number_field: 'PatientCreate__phone-number-field',
      cancel_button: 'PatientCreate__cancel-button',
      submit_button: 'PatientCreate__submit-button',
      code_field: 'PatientCreate__code-field',
      code_field_validation_error: 'PatientCreate__code-field-validation-error',
      step_1: 'PatientCreate__step-1',
      step_2: 'PatientCreate__step-2',
      decline_cancellation: 'PatientCreate__decline-cancellation',
      confirm_cancellation: 'PatientCreate__confirm-cancellation'
    },
    patients_list: {
      patient: 'PatientsListPatient',
      details_button: 'PatientsListPatient__patient-details',
      patient_id: 'PatientsListPatient__id',
      search_field: 'PatientsListSearch__query-field',
      search_field_label: 'PatientsListSearch__query-field-label',
      search_reset: 'PatientsListSearch__reset'
    },
    patient: {
      header_breadcrumbs_patients_link: 'PatientHeader__breadcrumbs-patients-link',
      new_record_button: 'PatientHeader__new-record-button',
      basic_info_tab: 'PatientDetails__basic-info-tab',
      health_info_tab: 'PatientDetails__health-info-tab',
      patient_records_tab: 'PatientDetails__patient-records-tab',
      basic_info_view: 'PatientBasicInfo__view',
      health_info_view: 'PatientHealthInfo__view',
      patient_records_view: 'PatientRecords__view'
    },
    patient_records: {
      record: 'PatientRecordsRecord',
      record_details_link: 'PatientRecordsRecord__record-details',
      record_id: 'PatientRecordsRecord__record-id',
      record_timeline: 'PatientRecord__timeline',
      record_overview: 'PatientRecord__overview',
      record_hpi: 'PatientRecord__hpi',
      record_medical_summary: 'PatientRecord__medical-summary',
      record_ongoing_badge: 'PatientRecord__ongoing-badge',
      record_end_record: 'PatientRecord__end-record',
      record_hpi_history_button: 'PatientRecord__hpi-history-button',
      record_hpi_edit_button: 'PatientRecord__hpi-edit-button',
      record_hpi_cancel_button: 'PatientRecord__hpi-cancel-button',
      record_hpi_submit_button: 'PatientRecord__hpi-submit-button',
      record_hpi_modal: 'PatientRecord__hpi-history',
      record_hpi_modal_close: 'PatientRecord__hpi-history-close',
      record_medical_summary_gp_tab: 'PatientRecord__medical-summary-gp-tab',
      record_medical_summary_nurse_tab: 'PatientRecord__medical-summary-nurse-tab',
      record_medical_summary_doctor_tab: 'PatientRecord__medical-summary-doctor-tab'
    },
    patient_health_info: {
      bmi_form_edit_button: "BmiFormSection__edit-button",
      bmi_form_weight_field: "BmiFormSection__weight-field",
      bmi_form_height_field: "BmiFormSection__height-field",
      bmi_form_weight_value: "BmiFormSection__weight-value",
      bmi_form_height_value: "BmiFormSection__height-value",
      bmi_form_weight_validation_error: "BmiFormSection__weight-validation-error",
      bmi_form_height_validation_error: "BmiFormSection__height-validation-error",
      bmi_form_cancel: "BmiFormSection__cancel",
      bmi_form_submit: "BmiFormSection__submit",
      bmi_form_result: "BmiFormSection__result",
      bmi_form_notes: "BmiFormSection__notes"
    }
  },
  specialists: {
    specialist: "SpecialistsList__specialist",
    specialist_title: "SpecialistsList__specialist-title",
    specialist_name: "SpecialistsList__specialist-name",
    specialist_package: "SpecialistsList__specialist-package",
    specialist_country: "SpecialistsList__specialist-country",
    toggle_online: "SpecialistsList__toggle-online"
  },
  registration: {
    indicator_step_1: "RegistrationHeader__step-1",
    indicator_step_2: "RegistrationHeader__step-2",
    indicator_step_3: "RegistrationHeader__step-3",
    profile_photo_section: "RegistrationStep1__profile-photo-section",
    personal_info_section: "RegistrationStep1__personal-info-section",
    step_1_form_error: "RegistrationStep1__form-error",
    step_1_submit: "RegistrationStep1__submit",
    step_1_profile_photo: "RegistrationStep1__profile-photo",
    title_field: "RegistrationStep1__title-field",
    title_validation_error: "RegistrationStep1__title-validation-error",
    first_name_field: "RegistrationStep1__first-name-field",
    first_name_validation_error: "RegistrationStep1__first-name-validation-error",
    last_name_field: "RegistrationStep1__last-name-field",
    last_name_validation_error: "RegistrationStep1__last-name-validation-error",
    dob_field: "RegistrationStep1__dob-field",
    dob_validation_error: "RegistrationStep1__dob-validation-error",
    step_2_submit: "RegistrationStep2__submit",
    step_2_back: "RegistrationStep2__back",
    number_field: "RegistrationStep2__number-field",
    street_field: "RegistrationStep2__street-field",
    neighborhood_field: "RegistrationStep2__neighborhood-field",
    additional_numbers_field: "RegistrationStep2__additional-numbers-field",
    city_field: "RegistrationStep2__city-field",
    postal_code_field: "RegistrationStep2__postal-code-field",
    country_field: "RegistrationStep2__country-field",
    number_validation_error: "RegistrationStep2__number-validation-error",
    street_validation_error: "RegistrationStep2__street-validation-error",
    neighborhood_validation_error: "RegistrationStep2__neighborhood-validation-error",
    additional_numbers_validation_error: "RegistrationStep2__additional-numbers-validation-error",
    city_validation_error: "RegistrationStep2__city-validation-error",
    postal_code_validation_error: "RegistrationStep2__postal-code-validation-error",
    country_validation_error: "RegistrationStep2__country-validation-error",
    step_3_submit: "RegistrationStep3__submit",
    step_3_back: "RegistrationStep3__back",
    expiry_date_field: "RegistrationStep3__expiry-date-field",
    add_category: "RegistrationStep3__add-category"
  },
  general: {
    phone_number_field: "PhoneNumberField__field",
    phone_number_field_validation_error: "PhoneNumberField__validation-error",
    table_search_field: "TableSearch__query-field",
    table_search_field_label: "TableSearch__query-field-label",
    table_search_reset: "TableSearch__reset",
    table_filter: "TableFilter__wrapper",
    table_filter_toggle: "TableFilter__toggle",
    table_filter_dropdown: "TableFilter__dropdown",
    table_filter_option: "TableFilter__option",
    table_filter_suboption: "TableFilter__suboption",
    file_uploader_field: "FileUploader__field",
    mc_form_category_field: "MedicalCategoryForm__category-field",
    mc_form_category_validation_error: "MedicalCategoryForm__category-validation-error",
    mc_form_speciality_field: "MedicalCategoryForm__speciality-field",
    mc_form_speciality_validation_error: "MedicalCategoryForm__speciality-validation-error",
    mc_form_remove: "MedicalCategoryForm__remove"
  }
};

const convert = obj => {
  const converted = {};
  for (let i in obj) {
    if (typeof obj[i] === 'object') {
      converted[i] = convert(obj[i]);
    } else {
      converted[i] = `[data-cy=${obj[i]}]`
    }
  }
  return converted;
};

export default convert(selectors);
