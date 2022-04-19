/// <reference types="cypress" />

import { user } from '../fixtures/config'
import { HomepageSearchForm, VisaRequestForm, VisaSubmissionForm } from '../support/pom/homepage'
import { Navigation } from '../support/pom/navigation'

describe('Homepage tab selection, and Visa tab', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Validate that tabs has appropriate class when selected', function() {
        cy.loginUser(user.username, user.password);
        cy.get(Navigation.mainMenu).contains(Navigation.home).click();
        cy.selectedTab(HomepageSearchForm.flightsTab);
        cy.selectedTab(HomepageSearchForm.toursTab);
        cy.selectedTab(HomepageSearchForm.visaTab);
        cy.selectedTab(HomepageSearchForm.hotelsTab);
    });

    it('Send request for Visa', function() {
        cy.loginUser(user.username, user.password);
        cy.get(Navigation.mainMenu).contains(Navigation.home).click();
        cy.get(HomepageSearchForm.visaTab).click({ force: true });
        cy.get(VisaRequestForm.fromCountrySelectlist).select('Serbia', { force: true });
        cy.get(VisaRequestForm.toCountrySelectlist).select('Spain', { force: true });
        cy.get(VisaRequestForm.visaSubmitButton).click({ force: true });
        cy.get(VisaSubmissionForm.visaTitle).contains('Submission Form').should('be.visible');
        cy.get(VisaSubmissionForm.firstName).type("Mladen", { force: true })
        cy.get(VisaSubmissionForm.lastName).type("Maksimovic", { force: true })
        cy.get(VisaSubmissionForm.email).type("mladen.maksimovic@gmail.com", { force: true })
        cy.get(VisaSubmissionForm.phone).type("0651234567", { force: true })
        cy.get(VisaSubmissionForm.notes).type("Visa request", { force: true })
        cy.get(VisaSubmissionForm.visaSubmitButton).click({ force: true });
        cy.get(VisaSubmissionForm.visaConfirmationMessage).contains('Your visa form has been submitted').should('be.visible');
    })

})