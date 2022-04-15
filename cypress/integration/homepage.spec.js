/// <reference types="cypress" />

import { user } from '../fixtures/config'

describe('Homepage tab selection, and Visa tab', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Validate that tabs has appropriate class when selected', function() {
        cy.loginUser(user.username, user.password);
        cy.get('.main-menu-content a').contains('Home').click();
        cy.selectedTab('[data-bs-target="#flights"]');
        cy.selectedTab('[data-bs-target="#tours"]');
        cy.selectedTab('[data-bs-target="#visa"]');
        cy.selectedTab('[data-bs-target="#hotels"]');
    });

    it('Send request for Visa', function() {
        cy.loginUser(user.username, user.password);
        cy.get('.main-menu-content a').contains('Home').click();
        cy.get('[data-bs-target="#visa"]').click({ force: true });
        cy.get('#from_country').select('Serbia', { force: true });
        cy.get('#to_country').select('Spain', { force: true });
        cy.get('#visa-submit #submit').click({ force: true });
        cy.get('h3.title').contains('Submission Form').should('be.visible');
        cy.get('[name="first_name"]').type("Mladen", { force: true })
        cy.get('[name="last_name"]').type("Maksimovic", { force: true })
        cy.get('[name="email"]').type("mladen.maksimovic@gmail.com", { force: true })
        cy.get('[name="phone"]').type("0651234567", { force: true })
        cy.get('[name="notes"]').type("Visa request", { force: true })
        cy.get('#submit').click({ force: true });
        cy.get('h2').contains('Your visa form has been submitted').should('be.visible');
    })
})