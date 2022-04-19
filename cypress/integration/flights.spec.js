/// <reference types="cypress" />

import { user } from '../fixtures/config'

describe('Homepage tab selection, and Visa tab', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Confirm that button is enabled for flight Dubai - Belgrade first class round trip', function() {
        cy.loginUser(user.username, user.password);
        cy.get('.main-menu-content a').contains('flights').click();
        cy.get('#round-trip').check({ force: true });
        cy.get('#flight_type').select('First', { force: true });
        cy.get('#autocomplete').type('Dubai', { force: true })
        cy.get('.autocomplete-result').find('.autocomplete-location').contains('Dubai, United Arab Emirates').click({ force: true });
        cy.get('#autocomplete2').type('Belgrade', { force: true })
        cy.get('.autocomplete-result').find('.autocomplete-location').contains('Belgrade, Serbia').click({ force: true });
        cy.get('#flights-search').should('be.enabled');

        /*  Stavio sam ovu asertaciju iz razloga sto aplikacija puca kad se klikne na Search dugme
            Plan mi je bio da odaberem 2 grada i da asertujem da nema takvih letova, ali kada se klikne na Search dugme nista vise ne reaguje, dobije se 505 greska
        */
    })
});