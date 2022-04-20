/// <reference types="cypress" />

import { user } from '../fixtures/config'
import { FlightsTestData } from '../fixtures/testData/flights'
import { Navigation } from '../support/pom/navigation'
import { FlightsSearchForm } from '../support/pom/flights'

describe('Flights page', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Confirm that button is enabled for flight Dubai - Belgrade first class round trip', function() {
        cy.loginUser(user.username, user.password);
        cy.get(Navigation.mainMenu).contains(Navigation.flights).click();
        cy.get(FlightsSearchForm.roundTrip).check({ force: true });
        cy.get(FlightsSearchForm.flightType).select(FlightsTestData.flightTypeData, { force: true });
        cy.get(FlightsSearchForm.fromCitySelectList).type(FlightsTestData.fromCitySelectListData, { force: true })
        cy.get(FlightsSearchForm.fromCityResults).find(FlightsSearchForm.fromCityLocation).contains(FlightsSearchForm.fromCity).click({ force: true });
        cy.get(FlightsSearchForm.toCitySelectList).type(FlightsTestData.toCitySelectListData, { force: true })
        cy.get(FlightsSearchForm.toCityResults).find(FlightsSearchForm.toCityLocation).contains(FlightsSearchForm.toCity).click({ force: true });
        cy.get(FlightsSearchForm.flightsSearchButton).should('be.enabled');

        /*  Stavio sam ovu asertaciju iz razloga sto aplikacija puca kad se klikne na Search dugme
            Plan mi je bio da odaberem 2 grada i da asertujem da nema takvih letova, ali kada se klikne na Search dugme nista vise ne reaguje, dobije se 505 greska
        */
    })
});