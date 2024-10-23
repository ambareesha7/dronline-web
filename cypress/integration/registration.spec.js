import { login, forEachShould, uploadFile } from '../support/utils';
import { registration, sidebar, general } from '../support/selectors';
import { registerMockedCall } from '../support/api';

describe('Freelancer onboarding steps (registration)', () => {
  before(() => {
    registerMockedCall({
      responseData: {
        status: {
          onboardingCompleted: false
        }
      },
      encoderName: 'specialist_profile.GetStatusResponse',
      method: 'GET',
      url: '**/panel_api/profile/status',
      alias: 'profileStatus'
    });
    login('external');
    cy.wait('@profileStatus').its('status').should('be', 200);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check page appearance and the availability of its components', () => {
    registerMockedCall({
      responseData: {
        basicInfo: {}
      },
      encoderName: 'specialist_profile.GetBasicInfoResponse',
      method: 'GET',
      url: '**/panel_api/profile/basic_info',
      alias: 'fetchBasicInfo'
    });
    cy.visit('/registration');
    cy.url()
      .should('include', 'registration');
    forEachShould([
      registration.indicator_step_1,
      registration.indicator_step_2,
      registration.indicator_step_3,
      registration.profile_photo_section,
      registration.personal_info_section,
      registration.step_1_submit,
      registration.title_field,
      registration.first_name_field,
      registration.last_name_field,
      registration.dob_field,
      general.phone_number_field
    ], 'exist');
    cy.get(registration.indicator_step_1)
      .should('have.class', 'active');
  });

  it('Upload profile photo', () => {
    const profilePhotoUrl = 'https://storage.googleapis.com/dronline-prod/images/patients/Man.png';
    registerMockedCall({
      responseData: {
        uploadUrl: 'upload_url.example',
        downloadUrl: profilePhotoUrl
      },
      encoderName: 'UploadResponse',
      method: 'GET',
      url: '**/panel_api/upload/profile_image_url?file_name=man-default.png&content_type=image/png',
      alias: 'getProfileImageUrls'
    });
    registerMockedCall({
      responseData: ' ',
      encoderName: null,
      method: 'PUT',
      url: '**upload_url.example',
      alias: 'uploadFile'
    });
    uploadFile({
      fileName: 'man-default.png',
      selector: general.file_uploader_field
    });
    cy.get(registration.step_1_profile_photo)
      .should('exist')
      .and('have.css', 'background-image', `url("${profilePhotoUrl}")`);
  });

  it('Fill Personal info form and submit step #1', () => {
    registerMockedCall({
      fixture: 'specialist-basic-info.json',
      encoderName: 'specialist_profile.UpdateBasicInfoRequest',
      method: 'PUT',
      url: '**/panel_api/profile/basic_info',
      alias: 'updateBasicInfo'
    });
    cy.get(registration.step_1_submit)
      .click();
    forEachShould([
      registration.title_validation_error,
      registration.first_name_validation_error,
      registration.last_name_validation_error,
      general.phone_number_field_validation_error
    ], 'exist');
    cy.get(registration.title_field)
      .click()
      .type('{enter}');
    cy.fixture('specialist-basic-info.json').then(({ basicInfo }) => {
      cy.get(registration.first_name_field)
        .type(basicInfo.firstName);
      cy.get(registration.last_name_field)
        .type(basicInfo.lastName);
      cy.get(general.phone_number_field)
        .type(basicInfo.phoneNumber);
    });
    cy.get(registration.step_1_submit)
      .click();
    cy.wait('@updateBasicInfo').its('status').should('be', 200);
    cy.get(registration.indicator_step_2)
      .should('have.class', 'active');
  });

  it('Check step #2', () => {
    registerMockedCall({
      fixture: 'specialist-location.json',
      encoderName: 'specialist_profile.UpdateLocationRequest',
      method: 'PUT',
      url: '**/panel_api/profile/location',
      alias: 'updateLocation'
    });
    registerMockedCall({
      responseData: {
        location: {}
      },
      encoderName: 'specialist_profile.GetLocationResponse',
      method: 'GET',
      url: '**/panel_api/profile/location',
      alias: 'fetchLocation'
    });
    forEachShould([
      registration.number_field,
      registration.street_field,
      registration.neighborhood_field,
      registration.additional_numbers_field,
      registration.city_field,
      registration.postal_code_field,
      registration.country_field,
      registration.step_2_submit,
      registration.step_2_back
    ], 'exist');
    cy.get(registration.step_2_submit)
      .click();
    forEachShould([
      registration.number_validation_error,
      registration.street_validation_error,
      registration.city_validation_error,
      registration.postal_code_validation_error,
      registration.country_validation_error
    ], 'exist');
    cy.get(registration.country_field)
      .click()
      .contains('United Arab Emirates')
      .click();
    forEachShould([
      registration.number_validation_error, // not required for UAE
      registration.street_validation_error, // not required for UAE
      registration.postal_code_validation_error, // not required for UAE
      registration.country_validation_error
    ], 'not.exist');
    cy.get(registration.country_field)
      .click()
      .contains('United States')
      .click();
    cy.fixture('specialist-location.json').then(({ location }) => {
      cy.get(registration.number_field)
        .type(location.number, { force: true });
      cy.get(registration.street_field)
        .type(location.street, { force: true });
      cy.get(registration.neighborhood_field)
        .type(location.neighborhood, { force: true });
      cy.get(registration.additional_numbers_field)
        .type(location.additionalNumbers, { force: true });
      cy.get(registration.city_field)
        .type(location.city, { force: true });
      cy.get(registration.postal_code_field)
        .type(location.postalCode, { force: true });
      cy.get(registration.country_field)
        .click()
        .contains('United Arab Emirates')
        .click();
      cy.get(registration.step_2_submit)
        .click();
      cy.wait('@updateLocation').its('status').should('be', 200);
      cy.get(registration.indicator_step_3)
        .should('have.class', 'active');
    });
  });

  it('Check step #3', () => {
    registerMockedCall({
      responseData: {},
      encoderName: 'specialist_profile.UpdateMedicalCategoriesRequest',
      method: 'PUT',
      url: '**/panel_api/profile/medical_categories',
      alias: 'updateMedicalCategories'
    });
    registerMockedCall({
      responseData: {},
      encoderName: 'specialist_profile.UpdateMedicalCredentialsRequest',
      method: 'PUT',
      url: '**/panel_api/profile/medical_credentials',
      alias: 'updateMedicalCredentials'
    });
    registerMockedCall({
      responseData: {},
      encoderName: 'specialist_profile.GetMedicalCategoriesResponse',
      method: 'GET',
      url: '**/panel_api/profile/medical_categories',
      alias: 'fetchMedicalCategories'
    });
    registerMockedCall({
      responseData: {},
      encoderName: 'specialist_profile.GetMedicalCredentialsResponse',
      method: 'GET',
      url: '**/panel_api/profile/medical_credentials',
      alias: 'fetchMedicalCredentials'
    });
    forEachShould([
      general.mc_form_category_field,
      registration.add_category,
      registration.step_3_submit,
      registration.step_3_back
    ], 'exist');
    cy.get(general.file_uploader_field)
      .should('exist')
      .and('have.length', 2);
    cy.get(registration.expiry_date_field)
      .and('have.length', 2);
    cy.get(general.mc_form_category_field)
      .should('have.length', 1);
    cy.get(general.mc_form_remove)
      .should('not.exist');
    for (let i = 1; i <= 4; i++) {
      if (i === 4) {
        cy.get(registration.add_category)
          .should('not.exist');
        cy.get(general.mc_form_remove)
          .should('exist')
          .and('have.length', i).then($removeButtons => {
            for (let i = $removeButtons.length - 1; i > 0; i--) {
              $removeButtons[i].click();
            }
          });
        cy.get(general.mc_form_remove)
          .should('not.exist');
        cy.get(general.mc_form_category_field)
          .should('have.length', 1);
      } else {
        cy.get(general.mc_form_category_field)
          .should('have.length', i);
        cy.get(registration.add_category)
          .click();
        cy.get(general.mc_form_category_field)
          .should('have.length', i + 1);
      }
    }
    cy.get(registration.step_3_submit)
      .click();
    cy.get(general.mc_form_category_validation_error)
      .should('exist');
    cy.get(general.mc_form_category_field)
      .click()
      .contains('Mental Health')
      .click();
    cy.wait(500);
    cy.get(general.mc_form_category_validation_error)
      .should('not.exist');
    cy.get(general.mc_form_speciality_field)
      .should('not.exist');
    cy.get(general.mc_form_category_field)
      .click()
      .contains('Medical')
      .click();
    cy.get(general.mc_form_speciality_field)
      .should('exist');
    cy.get(registration.step_3_submit)
      .click();
    cy.get(general.mc_form_speciality_validation_error)
      .should('exist');
    cy.get(general.mc_form_speciality_field)
      .click()
      .contains('Cardiology')
      .click();
    cy.get(general.mc_form_speciality_validation_error)
      .should('not.exist');
    const profilePhotoUrl = 'https://storage.googleapis.com/dronline-prod/images/patients/Man.png';
    registerMockedCall({
      responseData: {
        uploadUrl: 'upload_url.example',
        downloadUrl: profilePhotoUrl
      },
      encoderName: 'UploadResponse',
      method: 'GET',
      url: '**/panel_api/upload/profile_image_url?file_name=man-default.png&content_type=image/png',
      alias: 'getProfileImageUrls'
    });
    registerMockedCall({
      responseData: ' ',
      encoderName: null,
      method: 'PUT',
      url: '**upload_url.example',
      alias: 'uploadFile'
    });
    cy.get(general.file_uploader_field).then($fields => {
      for (let i = 0; i < $fields.length; i++) {
        uploadFile({
          fileName: 'man-default.png',
          field: $fields[i]
        });
      }
    });
    cy.get(registration.step_3_submit)
      .click();
    cy.wait(['@updateMedicalCategories', '@updateMedicalCredentials']).then(xhrs => {
      for (let i = 0; i < xhrs.length; i++) {
        expect(xhrs[i].status).to.be.eq(200);
      }
    });
    forEachShould([
      registration.indicator_step_1,
      registration.indicator_step_2,
      registration.indicator_step_3
    ], 'not.have.class', 'active');
    forEachShould([
      registration.indicator_step_1,
      registration.indicator_step_2,
      registration.indicator_step_3
    ], 'have.class', 'inactive');
  });
});
