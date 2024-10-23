import { forEachShould } from '../support/utils';
import { sign_up, password_validation } from '../support/selectors';
const {
  email_field,
  email_field_validation_error,
  password_field,
  password_field_validation_error,
  submit_button,
  sign_in_link,
  password_visibility_trigger,
  terms_and_conditions_link,
  privacy_policy_link,
  successful_registration
} = sign_up;
const {
  lowercase,
  uppercase,
  digit,
  special_character
} = password_validation;


describe('Sign up', () => {
  context('Check page appearance and the availability of its components', () => {
    beforeEach(() => {
      cy.visit('/sign_up');
    });

    it('Check if email & password fields, submit button are on the place', () => {
      forEachShould([
        email_field,
        password_field,
        submit_button
      ], 'exist');
    });

    it('Check if "Terms & conditions" link exist and it leads to corresponding page', () => {
      cy.get(terms_and_conditions_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'terms_and_conditions');
    });

    it('Check if "Privacy Policy" link exist and it leads to corresponding page', () => {
      cy.get(privacy_policy_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'privacy_policy');
    });

    it('Check if "Sign In" link exist and it leads to corresponding page', () => {
      cy.get(sign_in_link)
        .should('exist')
        .click();
      cy.url()
        .should('include', 'sign_in');
    });

    it('Check if password visibility trigger exist and it could be triggered', () => {
      cy.get(password_visibility_trigger)
        .should('exist')
        .click()
        .should('have.class', 'show');
      cy.get(password_field)
        .should('have.attr', 'type', 'text');
      cy.get(password_visibility_trigger)
        .click()
        .should('have.class', 'hide');
      cy.get(password_field)
        .should('have.attr', 'type', 'password');
    });
  });

  context('Check form validation', () => {
    it('Get email field, fill it with incorrect data and verify that the validation error exist', () => {
      cy.visit('/sign_up');
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
        const { email } = roles['external'];
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

    it('Fill invalid password, verify that the field validation error does not exist', () => {
      cy.get(password_field)
        .type('12345678');
      cy.get(password_field_validation_error)
        .should('not.exist');
      cy.get(password_field)
        .clear();
    });

    const checkValidationIndicators = ({ all, except }) => {
      const indicators = {
        lowercase: lowercase,
        uppercase: uppercase,
        digit: digit,
        character: special_character
      };

      const opposite = all === 'valid' ? 'invalid' : 'valid';

      Object.keys(indicators).forEach(key => {
        const className = except && key === except ? opposite : all;
        cy.get(indicators[key])
          .should('exist')
          .and('have.class', className);
      });
    };

    it('Check password validation indicators', () => {
      cy.get(password_field)
        .type(' ');
      checkValidationIndicators({ all: 'invalid' });

      cy.get(password_field)
        .clear()
        .type('123');
      checkValidationIndicators({ all: 'invalid', except: 'digit' });

      cy.get(password_field)
        .clear()
        .type('!@#');
      checkValidationIndicators({ all: 'invalid', except: 'character' });

      cy.get(password_field)
        .clear()
        .type('qwe');
      checkValidationIndicators({ all: 'invalid', except: 'lowercase' });

      cy.get(password_field)
        .clear()
        .type('QWE');
      checkValidationIndicators({ all: 'invalid', except: 'uppercase' });

      cy.get(password_field)
        .clear()
        .type('123!@#qweQWE');
      checkValidationIndicators({ all: 'valid' });
    });

    it('Submit form and verify that the success message appears', () => {
      cy.server();
      cy.route('POST', '**/panel_api/signup').as('signup');
      cy.fixture('credentials.json').then(roles => {
        const { password } = roles['external'];
        cy.get(password_field)
          .clear()
          .type(password);
        cy.get(submit_button)
          .click();
        cy.wait('@signup').its('status')
          .should('be', 200);
        cy.get(successful_registration)
          .should('exist');
      });
    });
  });
});
