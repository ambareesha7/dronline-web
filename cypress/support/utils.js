/// <reference types="cypress" />
/* global cy */

import { sign_in } from './selectors';
const {
  email_field,
  password_field,
  submit_button
} = sign_in;

export const login = role => {
  cy.server();
  cy.route('POST', '**/panel_api/login').as('login');
  cy.visit('/');
  cy.fixture('credentials.json').then(roles => {
    const { email, password } = roles[role];
    cy.get(email_field)
      .type(email);
    cy.get(password_field)
      .type(password);
    cy.get(submit_button).click();
    cy.wait('@login').its('status').should('be', 200);
  });
};

export const forEachShould = (list, arg1, arg2) => list.forEach(selector => cy.get(selector).should(arg1, arg2));

export const uploadFile = ({ fileName, selector, field }) => {
  const fileUrl = `../fixtures/${fileName}`;
  const upload = subject => cy
    .fixture(fileUrl, 'base64')
    .then(Cypress.Blob.base64StringToBlob)
    .then(blob => {
      return cy.window().then(win => {
        const el = subject[0];
        const testFile = new win.File([blob], fileName, { type:'image/png' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        el.dispatchEvent(new Event('change', {bubbles: true}));
        return subject;
      })
    });
  if (selector) return cy.get(selector).then(upload);
  else if (field) return upload([field]);
  else throw 'selector or field argument is required';
};
