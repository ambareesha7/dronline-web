import { login, forEachShould } from '../../support/utils';
import { emr, sidebar } from '../../support/selectors';
import { registerMockedCall } from '../../support/api';

const { patients_list, patient } = emr;
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
  });
};

export default function() {
  before(() => {
    login('gp');
    cy.get(nav_emr)
      .should('exist')
      .click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
    openDetails();
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check the appearance of the Patient details page and the availability of its components', () => {
    forEachShould([
      patient.new_record_button,
      patient.basic_info_tab,
      patient.health_info_tab,
      patient.patient_records_tab
    ], 'exist');
    cy.get(nav_emr)
      .should('have.class', 'active');
  });

  it('Check the availability of the Patient details page tabs', () => {
    cy.server();
    cy.route('GET', '**/panel_api/patients/**/history').as('history');
    cy.route('GET', '**/panel_api/patients/**/bmi').as('bmi');
    cy.route('GET', '**/panel_api/patients/**/address').as('address');
    cy.route('GET', '**/panel_api/emr/patients/**/records').as('records');
    cy.get(patient.basic_info_tab)
      .should('have.class', 'active');
    cy.get(patient.health_info_tab)
      .click()
      .should('have.class', 'active');
    cy.wait(['@history', '@bmi'])
      .spread((history, bmi) => {
        expect(history.status).to.be.eq(200);
        expect(bmi.status).to.be.eq(200);
      });
    cy.get(patient.health_info_view)
      .should('exist');
    cy.get(patient.patient_records_tab)
      .click()
      .should('have.class', 'active');
    cy.wait('@records')
      .its('status')
      .should('be', 200);
    cy.get(patient.patient_records_view)
      .should('exist');
    cy.get(patient.basic_info_tab)
      .click()
      .should('have.class', 'active');
    cy.wait('@address')
      .its('status')
      .should('be', 200);
    cy.get(patient.basic_info_view)
      .should('exist');
  });
}
