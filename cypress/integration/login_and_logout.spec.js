/// <reference types="cypress" />

import { LoginData } from '../fixtures/testData/login_and_logout'
import { LoginForm } from '../support/pom/login_and_logout'
import { Navigation } from '../support/pom/navigation'

describe('User login and logout', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Submit empty form', () => {
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(LoginForm.email).then(($input) => {
            expect($input[0].validationMessage).to.eq(LoginData.requiredFieldMessage)
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with empty username', function() {
        cy.get(LoginForm.password).type('demouser', { force: true })
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(LoginForm.email).then(($input) => {
            expect($input[0].validationMessage).to.eq(LoginData.requiredFieldMessage)
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with empty password', function() {
        cy.get(LoginForm.email).type(LoginData.emailData, { force: true });
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true });
        cy.get(LoginForm.password).then(($input) => {
            expect($input[0].validationMessage).to.eq(LoginData.requiredFieldMessage)
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with wrong username', function() {
        cy.get(LoginForm.email).type(LoginData.invalidEmailData, { force: true })
        cy.get(LoginForm.password).type(LoginData.passwordData, { force: true })
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(LoginForm.errorMessage).should('contain', LoginData.loginErrorMessage);
    })

    it('Submit form with wrong password', function() {
        cy.get(LoginForm.email).type(LoginData.emailData, { force: true });
        cy.get(LoginForm.password).type(LoginData.invalidPasswordData, { force: true })
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(LoginForm.errorMessage).should('contain', LoginData.loginErrorMessage);
    })

    it('Validate successful Login', function() {
        cy.get(LoginForm.email).type(LoginData.emailData, { force: true });
        cy.get(LoginForm.password).type(LoginData.passwordData, { force: true })
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(Navigation.logoutLink).contains('Logout').should('be.visible');
    })

    it('Logout user', function() {
        cy.get(LoginForm.email).type(LoginData.emailData, { force: true });
        cy.get(LoginForm.password).type(LoginData.passwordData, { force: true })
        cy.get(LoginForm.loginButton).contains(LoginForm.loginButtonText).click({ force: true })
        cy.get(Navigation.logoutLink).contains(Navigation.logout).click({ force: true })
        cy.get(LoginForm.loginTitle).contains('Login').should('be.visible');
    })

})