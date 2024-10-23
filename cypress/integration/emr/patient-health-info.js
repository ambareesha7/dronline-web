import { login, forEachShould } from '../../support/utils';
import { emr, sidebar } from '../../support/selectors';
import { registerMockedCall } from '../../support/api';

const { patients_list, patient, patient_health_info } = emr;

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
      // registerMockedCall({
      //   fixture: 'patient-history.json',
      //   encoderName: 'GetHistoryResponse',
      //   method: 'GET',
      //   url: `**/panel_api/patients/${Number(id)}/history`,
      //   alias: 'patientHistory'
      // });
      registerMockedCall({
        responseData: { bmi: {} },
        encoderName: 'GetBMIResponse',
        method: 'GET',
        url: `**/panel_api/patients/${Number(id)}/bmi`,
        alias: 'patientBMI'
      });
      cy.get(patients_list.details_button)
        .should('exist')
        .first()
        .click();
      cy.get(patient.health_info_tab)
        .should('exist')
        .click()
        .should('have.class', 'active');
      cy.wait(['@patientBMI']).then(xhrs => {
        for (let i = 0; i < xhrs.length; i++) {
          expect(xhrs[i].status).to.be.eq(200);
        }
      });
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

  it('Check the appearance of Vitals section', () => {
    cy.url()
      .should('include', '/patients/');
    cy.get(patient_health_info.bmi_form_edit_button)
      .should('exist');
    [
      patient_health_info.bmi_form_weight_value,
      patient_health_info.bmi_form_height_value,
      patient_health_info.bmi_form_result,
      patient_health_info.bmi_form_notes
    ].forEach(el => {
      cy.get(el)
        .should('exist')
        .invoke('text').then(value => {
          expect(value).to.be.eq('—');
        });
    });
  });

  it('Set values for Vitals section', () => {
    cy.fixture('patient-bmi.json').then(data => {
      registerMockedCall({
        responseData: data,
        encoderName: 'GetBMIResponse',
        method: 'PUT',
        url: '**/panel_api/patients/**/bmi',
        alias: 'updatePatientBMI'
      });
      const { weight, height } = data.bmi;
      const result = Number((weight.value / ((height.value / 100) ** 2)).toFixed(2));
      cy.get(patient_health_info.bmi_form_edit_button)
        .click();
      forEachShould([
        patient_health_info.bmi_form_weight_field,
        patient_health_info.bmi_form_height_field,
        patient_health_info.bmi_form_cancel,
        patient_health_info.bmi_form_submit
      ], 'exist');
      forEachShould([
        patient_health_info.bmi_form_weight_validation_error,
        patient_health_info.bmi_form_height_validation_error
      ], 'not.exist');
      cy.get(patient_health_info.bmi_form_submit)
        .click();
      forEachShould([
        patient_health_info.bmi_form_weight_validation_error,
        patient_health_info.bmi_form_height_validation_error
      ], 'exist');
      cy.get(patient_health_info.bmi_form_cancel)
        .click();
      cy.get(patient_health_info.bmi_form_edit_button)
        .should('exist')
        .click();
      cy.get(patient_health_info.bmi_form_weight_field)
        .type(weight.value);
      cy.get(patient_health_info.bmi_form_height_field)
        .type(height.value);
      cy.get(patient_health_info.bmi_form_submit)
        .click();
      cy.wait('@updatePatientBMI')
      cy.get(patient_health_info.bmi_form_weight_value)
        .should('exist')
        .invoke('text').then(value => {
          expect(Number(value)).to.equal(weight.value);
        });
      cy.get(patient_health_info.bmi_form_height_value)
        .should('exist')
        .invoke('text').then(value => {
          expect(Number(value)).to.equal(height.value);
        });
      cy.get(patient_health_info.bmi_form_result)
        .should('exist')
        .invoke('text').then(value => {
          expect(Number(value)).to.equal(result);
        });
    });
  });
}
