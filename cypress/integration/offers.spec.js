/// <reference types="cypress" />

import { user } from '../fixtures/config'

describe('Offers page', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Check if Rent a Car offer page is opened', function() {
        cy.loginUser(user.username, user.password);
        cy.get('.main-menu-content a').contains('Offers').click();
        cy.get(".author-bio a").contains('Rent Car').click({ force: true });
        cy.get('h3').should('contain.text', "Rent Car")
    });

})