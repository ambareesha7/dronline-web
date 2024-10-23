import { login, forEachShould } from '../support/utils';
import { specialists, sidebar, general } from '../support/selectors';
import { registerMockedCall } from '../support/api';

describe('Specialists', () => {
  before(() => {
    login('gp');
    cy.get(sidebar.nav_specialists)
      .should('exist')
      .click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('auth_token');
    registerMockedCall({
      fixture: 'specialists-list.json',
      encoderName: 'GetSpecialistsResponse',
      method: 'GET',
      url: '**/panel_api/specialists',
      alias: 'specialists'
    });
  });

  after(() => {
    cy.clearCookie('auth_token');
    cy.visit('/');
  });

  it('Check page appearance and the availability of its components', () => {
    cy.url()
      .should('include', 'specialists');
    forEachShould([
      general.table_search_field,
      general.table_search_field_label
    ], 'exist');
    cy.get(sidebar.nav_specialists)
      .should('have.class', 'active');
  });

  it ('Check Specialists list', () => {
    registerMockedCall({
      fixture: 'specialists-list-single.json',
      encoderName: 'GetSpecialistsResponse',
      method: 'GET',
      url: '**/panel_api/specialists/online',
      alias: 'specialistsOnline'
    });
    cy.visit('/specialists');
    cy.wait('@specialists').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 2);
    cy.get(specialists.toggle_online)
      .should('exist')
      .click();
    cy.wait('@specialistsOnline').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 1);
    cy.get(specialists.toggle_online)
      .click();
    cy.wait('@specialists').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 2);
  });

  it ('Check Specialists list search', () => {
    registerMockedCall({
      fixture: 'specialists-list-single.json',
      encoderName: 'GetSpecialistsResponse',
      method: 'GET',
      url: '**/panel_api/specialists?filter=Jane',
      alias: 'specialistsSearchResult'
    });
    cy.get(general.table_search_field_label)
      .should('exist')
      .click();
    cy.focused().should('exist').then($focused => {
      cy.get(general.table_search_field).should($field => {
        expect($focused[0]).to.eql($field[0]);
      });
    });
    cy.get(general.table_search_field)
      .type('Jane', { force: true });
    cy.wait('@specialistsSearchResult').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 1);
    cy.get(general.table_search_reset)
      .should('exist')
      .click();
    cy.wait('@specialists').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 2);
    cy.get(general.table_search_field)
      .should('have.value', '');
  });

  it ('Check possibility to filter Specialists list by membership level', () => {
    registerMockedCall({
      fixture: 'specialists-list-single.json',
      encoderName: 'GetSpecialistsResponse',
      method: 'GET',
      url: '**/panel_api/specialists?membership=basic',
      alias: 'specialistsFilteredResult'
    });
    cy.get(general.table_filter)
      .should('exist')
      .and('not.have.class', 'active');
    cy.get(general.table_filter_dropdown)
      .should('not.exist');
    cy.get(general.table_filter_toggle)
      .should('exist')
      .click();
    cy.get(general.table_filter_dropdown)
      .should('exist');
    cy.get(general.table_filter_option)
      .first()
      .should('exist')
      .click();
    cy.wait('@specialistsFilteredResult').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 1)
      .find(specialists.specialist_package)
      .invoke('text').then(membershipPackage => {
        expect(membershipPackage).to.include('Basic');
      });
    cy.get(general.table_filter)
      .and('have.class', 'active');
    cy.get(general.table_filter_toggle)
      .click();
    cy.get(general.table_filter_option)
      .first()
      .click();
    cy.wait('@specialists').its('status').should('be', 200);
    cy.get(specialists.specialist)
      .should('exist')
      .and('have.length', 2);
    cy.get(general.table_filter)
      .and('not.have.class', 'active');
  });
});
