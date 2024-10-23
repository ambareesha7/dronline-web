import { login, forEachShould } from '../../support/utils';
import { emr, sidebar } from '../../support/selectors';
import { registerMockedCall } from '../../support/api';

const { patients_list, patient, patient_records } = emr;
const { nav_emr } = sidebar;

const openDetails = () => {
  registerMockedCall({
    fixture: 'patients-search-result.json',
    encoderName: 'GetPatientsResponse',
    method: 'GET',
    url: '**/panel_api/emr/patients**',
    alias: 'patientsSearch'
  });
  cy.visit('/emr');
  cy.get(patients_list.search_field_label)
    .click();
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
    cy.get(patient.patient_records_tab)
      .click();
    cy.get(patient_records.record_details_link)
      .first()
      .click();
  });
};

export default function() {
  before(() => {
    login('gp');
    cy.get(nav_emr)
      .should('exist')
      .click();
    openDetails();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check the appearance of the Patient record details page and the availability of its components', () => {
    cy.url()
      .should('include', '/patients/')
      .and('include', 'patient-record');
    forEachShould([
      patient_records.record_timeline,
      patient_records.record_overview,
      patient_records.record_hpi,
      patient_records.record_medical_summary
    ], 'exist');
  });

  it('Check if record is ended or not and if "end record" button is available', () => {
    cy.get(patient_records.record_ongoing_badge)
      .should('exist')
      .then(badge => {
        if (badge) {
          cy.get(patient_records.record_end_record)
            .should('exist');
        } else {
          cy.get(patient_records.record_end_record)
            .should('not.exist');
        }
      });
  });

  it('Check HPI section actions', () => {
    cy.get(patient_records.record_hpi_edit_button)
      .should('exist')
      .click();
    forEachShould([
      patient_records.record_hpi_cancel_button,
      patient_records.record_hpi_submit_button
    ], 'exist');
    cy.get(patient_records.record_hpi_edit_button)
      .should('not.exist');
    cy.get(patient_records.record_hpi_cancel_button)
      .click();
    cy.get(patient_records.record_hpi_edit_button)
      .should('exist');
    forEachShould([
      patient_records.record_hpi_cancel_button,
      patient_records.record_hpi_submit_button
    ], 'not.exist');
    cy.get(patient_records.record_hpi_history_button)
      .should('exist')
      .click();
    cy.get(patient_records.record_hpi_modal)
      .should('exist');
    cy.get(patient_records.record_hpi_modal_close)
      .should('exist')
      .click();
    cy.get(patient_records.record_hpi_modal)
      .should('not.exist');
  });

  it('Check Medical Summary section tabs', () => {
    forEachShould([
      patient_records.record_medical_summary_gp_tab,
      patient_records.record_medical_summary_nurse_tab,
      patient_records.record_medical_summary_doctor_tab
    ], 'exist');
    ['gp', 'nurse', 'doctor'].forEach(tab => {
      cy.get(patient_records[`record_medical_summary_${tab}_tab`])
        .click()
        .should('have.class', 'active');
    });
  });
}
