/// <reference types="cypress" />

import { user } from '../fixtures/config'
import { VisaRequestFormData, VisaSubmissionFormData } from '../fixtures/testData/homepage'
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
        cy.get(VisaRequestForm.fromCountrySelectlist).select(VisaRequestFormData.fromCountrySelectlistData, { force: true });
        cy.get(VisaRequestForm.toCountrySelectlist).select(VisaRequestFormData.toCountrySelectlistData, { force: true });
        cy.get(VisaRequestForm.visaSubmitButton).click({ force: true });
        cy.get(VisaSubmissionForm.visaTitle).contains(VisaSubmissionFormData.visaTitleData).should('be.visible');
        cy.get(VisaSubmissionForm.firstName).type(VisaSubmissionFormData.firstNameData, { force: true })
        cy.get(VisaSubmissionForm.lastName).type(VisaSubmissionFormData.lastNameData, { force: true })
        cy.get(VisaSubmissionForm.email).type(VisaSubmissionFormData.emailData, { force: true })
        cy.get(VisaSubmissionForm.phone).type(VisaSubmissionFormData.phoneData, { force: true })
        cy.get(VisaSubmissionForm.notes).type(VisaSubmissionFormData.notesData, { force: true })
        cy.get(VisaSubmissionForm.visaSubmitButton).click({ force: true });
        cy.get(VisaSubmissionForm.visaConfirmationMessage).contains(VisaSubmissionFormData.visaConfirmationMessageData).should('be.visible');
    })

})