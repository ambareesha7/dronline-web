import { login, forEachShould } from '../../support/utils';
import { emr, sidebar } from '../../support/selectors';
import { registerMockedCall } from '../../support/api';

const { patients_list, patient, patient_records } = emr;

const openDetails = () => {
  registerMockedCall({
    fixture: 'patients-search-result.json',
    encoderName: 'GetPatientsResponse',
    method: 'GET',
    url: '**/panel_api/emr/patients**',
    alias: 'patientsSearch'
  });
  cy.visit('/emr');
  cy.wait('@patientsSearch');
  cy.get(patients_list.search_field_label)
    .click();
  cy.get(patients_list.search_field)
    .type('john', { force: true });
  cy.wait('@patientsSearch');
  cy.get(patients_list.patient)
    .first()
    .find(patients_list.patient_id)
    .invoke('text').then(id => {
      registerMockedCall({
        fixture: 'patient-records-list.json',
        encoderName: 'GetPatientRecordsResponse',
        method: 'GET',
        url: `**/panel_api/emr/patients/${Number(id)}/records**`,
        alias: 'patientRecords'
      });
      cy.get(patients_list.details_button)
        .should('exist')
        .first()
        .click();
      cy.get(patient.patient_records_tab)
        .should('exist')
        .click();
      cy.wait('@patientRecords');
    });
};

export default function() {
  before(() => {
    login('gp');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
    openDetails();
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check the appearance of the Patient records list', () => {
    cy.get(patient.patient_records_view)
      .should('exist');
    cy.get(patient_records.record)
      .should('exist')
      .and('have.length', 2);
  });

  it('Check patient record availability', () => {
    cy.get(patient_records.record)
      .first()
      .find(patient_records.record_id)
      .invoke('text').then(id => {
      cy.get(patient_records.record)
        .first()
        .find(patient_records.record_details_link)
        .should('exist')
        .click();
    });
  });
}
