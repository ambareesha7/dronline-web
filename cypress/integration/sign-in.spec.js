import { forEachShould } from '../support/utils';
import { sign_in, sign_up, password_recovery } from '../support/selectors';
const {
  email_field,
  email_field_validation_error,
  password_field,
  password_field_validation_error,
  submit_button,
  form_error,
  forgot_password_link,
  sign_up_link,
  password_visibility_trigger
} = sign_in;
const { home_link } = password_recovery;
const { sign_in_link } = sign_up;

describe('Sign In', () => {
  context('Check page appearance and the availability of its components', () => {
    it('Check if logged out user redirected to Sign In view by default', () => {
      cy.visit('/');
      cy.url()
        .should('include', 'sign_in');
    });

    it('Check if all fields & buttons are on the place', () => {
      forEachShould([
        email_field,
        password_field,
        submit_button
      ], 'exist');
    });

    it('Check if "I forgot my password" link exist and it leads to corresponding page', () => {
      cy.get(forgot_password_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'password_recovery');
      cy.get(home_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'sign_in');
    });

    it('Check if "Sign Up" link exist and it leads to corresponding page', () => {
      cy.get(sign_up_link)
        .should('exist')
        .click({waitForAnimations: false});
      cy.url()
        .should('include', 'sign_up');
      cy.get(sign_in_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'sign_in');
    });

    it('Check if password visibility trigger exist and it could be triggered', () => {
      cy.get(password_visibility_trigger)
        .should('exist')
        .click({waitForAnimations: false})
        .should('have.class', 'show');
      cy.get(password_field)
        .should('have.attr', 'type', 'text');
      cy.get(password_visibility_trigger)
        .click()
        .should('have.class', 'hide');
      cy.get(password_field)
        .should('have.attr', 'type', 'password');
    });

    it('Get email field, fill it with incorrect data and verify that the validation error exist', () => {
      cy.get(email_field)
        .type('invalid email');
      cy.get(email_field, { timeout: 600 })
        .should('have.class', 'is-danger');
      cy.get(email_field_validation_error)
        .should('exist');
      cy.get(email_field)
        .clear();
    });

    it('Fill email field with correct data and verify that the validation error does not exist', () => {
      cy.fixture('credentials.json').then(roles => {
        const { email } = roles['gp'];
        cy.get(email_field)
          .type(email);
        cy.get(email_field_validation_error, { timeout: 600 })
          .should('not.exist');
      });
    });

    it('Сheck whether the focus switches from email to password field when user press enter', () => {
      cy.get(email_field)
        .type('{enter}');
      cy.focused()
        .should('have.attr', 'name')
        .and('eq', 'password');

    });

    it('Blur Password field and verify that the validation error exist', () => {
      cy.get(password_field)
        .blur();
      cy.get(password_field, { timeout: 600 })
        .should('have.class', 'is-danger');
      cy.get(password_field_validation_error)
        .should('exist');
    });

    it('Fill incorrect password, verify that the validation error does not exist', () => {
      cy.get(password_field)
        .type('1234567890');
      cy.get(password_field_validation_error)
        .should('not.exist');
    });

    it('Submit form with incorrect password field and verify that the error from server appears', () => {
      cy.server();
      cy.route('POST', '**/panel_api/login').as('login');
      cy.get(submit_button)
        .click();
      cy.wait('@login').its('status').should('be', 401);
      cy.get(form_error)
        .should('exist');
    });
  });

  ['gp', 'nurse', 'external'].forEach(role => context(`Sign In as ${role}`, () => {

    before(() => {
      cy.visit('/');
    });

    after(() => {
      cy.clearCookie('auth_token');
      cy.visit('/');
    });

    it(`Type correct password for ${role} account type and Submit form, verify that the user is logged in`, () => {
      cy.fixture('credentials.json').then(roles => {
        const { email, password } = roles[role];
        cy.get(email_field).type(email);
        cy.get(password_field).type(password);
        cy.get(submit_button).click();
        cy.get(submit_button, {timeout: 10000}).should('not.have.class', 'processing');
        cy.wait(1000);
        cy.url()
          .should('not.include', 'sign_in');
        cy.window().then(
          window => expect(window.localStorage.getItem('role').toLowerCase()).to.equal(role.toLowerCase())
        );
      });
    });
  }));
});
