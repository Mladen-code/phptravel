/// <reference types="cypress" />

import { user } from '../fixtures/config'
import { Navigation } from '../support/pom/navigation'
import { Navigation, Offers } from '../support/pom/offers'

describe('Offers page', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Check if Rent a Car offer page is opened', function() {
        cy.loginUser(user.username, user.password);
        cy.get(Navigation.mainMenu).contains(Navigation.offers).click();
        cy.get(Offers.offerLink).contains(Offers.offerName).click({ force: true });
        cy.get(Offers.offerTitle).should('contain.text', Offers.offerName)
    });
})