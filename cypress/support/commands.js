// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("loginUser", (username, password) => {
    cy.get('.form-group [name="email"]').type('user@phptravels.com', { force: true });
    cy.get('[type="password"]').type("demouser", { force: true })
    cy.get('[type="submit"]').contains('Login').click({ force: true })
});

Cypress.Commands.add("selectedTab", (tab) => {
    cy.get(tab).click({ force: true })
    cy.get(tab)
        .invoke('attr', 'aria-selected')
        .should('eql', 'true')
    cy.wait(2000)
});