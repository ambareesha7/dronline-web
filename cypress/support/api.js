/// <reference types="cypress" />
/* global cy */

export const registerMockedCall = ({ fixture, responseData, encoderName, method, url, alias }) => {
  return new Promise(async resolve => {
    const encodeAndSet = data => cy.task('protobufEncode', { data, encoderName }).then(setCall);
    const setCall = response => {
      cy.server();
      cy.route({
        method,
        headers: {
          'content-type': 'application/x-protobuf; charset=utf-8'
        },
        response,
        url
      }).as(alias);
      resolve(response);
    };

    if (encoderName) {
      if (fixture) {
        cy.fixture(fixture).then(encodeAndSet);
      } else {
        encodeAndSet(responseData);
      }
    } else {
      if (fixture) {
        cy.fixture(fixture).then(setCall);
      } else {
        setCall(responseData);
      }
    }
  });
};
