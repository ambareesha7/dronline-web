import { login, forEachShould } from '../../support/utils';
import { emr, sidebar, navbar, general } from '../../support/selectors';
import { registerMockedCall } from '../../support/api';

const { invite_patient, create_patient, patients_list, patient } = emr;
const { nav_emr } = sidebar;

export default function() {
  before(() => {
    login('gp');
    cy.get(nav_emr)
      .should('exist')
      .click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
    cy.visit('/emr');
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check the appearance of the EMR page', () => {
    cy.url()
      .should('include', 'emr');
    forEachShould([
      invite_patient.invite_button,
      create_patient.create_button,
      patients_list.search_field,
      patients_list.search_field_label
    ], 'exist');
    cy.get(nav_emr)
      .should('have.class', 'active');
  });

  it ('Check EMR patients list', () => {
    registerMockedCall({
      fixture: 'patients-list.json',
      encoderName: 'GetPatientsResponse',
      method: 'GET',
      url: '**/panel_api/emr/patients',
      alias: 'patients'
    });
    cy.visit('/emr');
    cy.wait('@patients').its('status').should('be', 200);
    cy.get(patients_list.patient)
      .should('exist')
      .and('have.length', 2);
  });

  it ('Check EMR patients list search', () => {
    registerMockedCall({
      fixture: 'patients-list.json',
      encoderName: 'GetPatientsResponse',
      method: 'GET',
      url: '**/panel_api/emr/patients',
      alias: 'patients'
    });
    cy.visit('/emr');
    cy.wait('@patients');
    registerMockedCall({
      fixture: 'patients-search-result.json',
      encoderName: 'GetPatientsResponse',
      method: 'GET',
      url: '**/panel_api/emr/patients**',
      alias: 'patientsSearch'
    });
    cy.get(patients_list.search_field_label)
      .click();
    cy.focused()
      .should('have.attr', 'name')
      .and('eq', 'query');
    cy.get(patients_list.search_field)
      .type('john', { force: true });
    cy.wait('@patientsSearch');
    cy.get(patients_list.patient)
      .should('exist')
      .and('have.length', 1);
    registerMockedCall({
      fixture: 'patients-list.json',
      encoderName: 'GetPatientsResponse',
      method: 'GET',
      url: '**/panel_api/emr/patients',
      alias: 'patients'
    });
    cy.get(patients_list.search_reset)
      .click();
    cy.wait('@patients');
    cy.get(patients_list.patient)
      .should('exist')
      .and('have.length', 2);
    cy.get(patients_list.search_field_label)
      .click();
    cy.focused()
      .should('have.attr', 'name')
      .and('eq', 'query');
    cy.get(patients_list.search_field)
      .type('38066', { force: true });
    cy.wait('@patientsSearch');
    cy.get(patients_list.patient)
      .should('exist')
      .and('have.length', 1);
    cy.get(patients_list.search_reset)
      .click();
    cy.get(patients_list.patient)
      .should('exist')
      .and('have.length', 2);
  });

  it ('Check EMR patient details availability', () => {
    registerMockedCall({
      fixture: 'patients-search-result.json',
      encoderName: 'GetPatientsResponse',
      method: 'GET',
      url: '**/panel_api/emr/patients**',
      alias: 'patientsSearch'
    });
    cy.get(patients_list.search_field_label)
      .click();
    cy.focused()
      .should('have.attr', 'name')
      .and('eq', 'query');
    cy.get(patients_list.search_field)
      .type('john', { force: true });
    cy.wait('@patientsSearch');
    cy.get(patients_list.patient)
      .first()
      .find(patients_list.patient_id)
      .invoke('text').then(id => {
        cy.get(patients_list.details_button)
          .first()
          .click();
        cy.url()
          .should('eq', `${Cypress.config().baseUrl}/patients/${Number(id)}`);
      cy.wait(600);
        cy.get(navbar.breadcrumb_step)
          .first()
          .should('exist')
          .click();
        cy.url()
          .should('eq', `${Cypress.config().baseUrl}/emr`);
      });
  });

  it ('Check scenario for new patient invitation', () => {
    cy.server();
    cy.get(invite_patient.invite_button)
      .click();
    forEachShould([
      invite_patient.modal,
      invite_patient.phone_number_field,
      invite_patient.email_field,
      invite_patient.cancel_button,
      invite_patient.submit_button
    ], 'exist');
    cy.get(invite_patient.cancel_button)
      .click();
    cy.get(invite_patient.modal)
      .should('not.exist');
    cy.wait(500);
    cy.get(invite_patient.invite_button)
      .click();
    cy.fixture('credentials.json').then(roles => {
      const { email, phone_number } = roles['patient'];
      cy.get(invite_patient.email_field)
        .type(email);
      cy.get(invite_patient.phone_number_field)
        .find('input[id=number]')
        .type(phone_number);
      forEachShould([
        invite_patient.email_field_validation_error,
        general.phone_number_field_validation_error
      ], 'not.exist');
      cy.route({
        method: 'POST',
        response: '',
        url: '**/panel_api/emr/patients/invite'
      }).as('invitePatient');
      cy.get(invite_patient.submit_button)
        .click();
      cy.wait('@invitePatient');
      cy.get(invite_patient.modal)
        .should('not.exist');
    });
  });

  it ('Check scenario for new patient creation', () => {
    cy.server();
    cy.get(create_patient.create_button)
      .click();
    cy.url()
      .should('include', 'patients/add');
    forEachShould([
      create_patient.phone_number_field,
      create_patient.cancel_button,
      create_patient.submit_button,
      create_patient.step_1,
      create_patient.step_2
    ], 'exist');
    cy.get(create_patient.cancel_button)
      .click();
    cy.get(create_patient.decline_cancellation)
      .should('exist')
      .click();
    cy.wait(600);
    cy.get(create_patient.cancel_button)
      .click();
    cy.get(create_patient.confirm_cancellation)
      .should('exist')
      .click();
    cy.url()
      .should('include', 'emr');
    cy.get(create_patient.create_button)
      .click();
    cy.get(create_patient.step_1)
      .should('have.attr', 'class')
      .and('include', 'active');
    cy.fixture('credentials.json').then(roles => {
      const { phone_number } = roles['patient'];
      cy.get(create_patient.phone_number_field)
        .find('input[id=number]')
        .type(phone_number);
      cy.get(general.phone_number_field_validation_error)
        .should('not.exist');
      cy.route({
        method: 'GET',
        response: '',
        url: '**/getRecaptchaParam**'
      }).as('getRecaptchaParam');
      cy.get(create_patient.submit_button)
        .click();
      cy.wait('@getRecaptchaParam');
      cy.get(create_patient.step_2)
        .should('have.class', 'active');
      cy.get(create_patient.code_field)
        .should('exist')
        .type(123);
      cy.get(create_patient.code_field_validation_error)
        .should('exist');
      cy.get(create_patient.code_field)
        .clear()
        .type(123456);
      cy.get(create_patient.code_field_validation_error)
        .should('not.exist');
      cy.get(create_patient.cancel_button)
        .click();
      cy.get(create_patient.confirm_cancellation)
        .click();
      cy.url()
        .should('include', 'emr');
    });
  });
}
