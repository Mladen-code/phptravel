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


    it.only('Confirm that no results are displayed for flight Dubai - Belgrade first class round trip', function() {
        cy.loginUser(user.username, user.password);
        cy.get('.main-menu-content a').contains('flights').click();
        cy.get('#round-trip').check({ force: true });
        cy.get('#flight_type').select('First', { force: true });
        cy.get('#autocomplete').type('Dubai', { force: true })
        cy.get('.autocomplete-result').find('.autocomplete-location').contains('Dubai, United Arab Emirates').click({ force: true });
        cy.get('#autocomplete2').type('Belgrade', { force: true })
        cy.get('.autocomplete-result').find('.autocomplete-location').contains('Belgrade, Serbia').click({ force: true });
        cy.get('#flights-search').should('be.enabled');

        //cy.url().should('include', '/dxb/beg/return/first/')
        //cy.get('#loading_flight').find('.flying_from').should('have.text', "DXB");
        //cy.get('#loading_flight').find('.destination.flying_to').should('have.text', "BEG");


        //cy.get('h2, "SEARCH FOR BEST FLIGHTS"').should('not.be.visible');
        //cy.get('img').should('be.visible'); // .should('have.attr', 'alt')
        // .and('include', 'no results')
    });
})