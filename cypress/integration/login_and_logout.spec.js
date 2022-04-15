/// <reference types="cypress" />

describe('User login and logout', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Submit empty form', () => {
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.form-group [name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with empty username', function() {
        cy.get('[type="password"]').type('demouser', { force: true })
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.form-group [name="email"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with empty password', function() {
        cy.get('.form-group [name="email"]').type('user@phptravels.com', { force: true });
        cy.get('[type="submit"]').contains('Login').click({ force: true });
        cy.get('[type="password"]').then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            cy.log($input[0].validationMessage)
        })
    })

    it('Submit form with wrong username', function() {
        cy.get('.form-group [name="email"]').type('invalid@test.com', { force: true })
        cy.get('[type="password"]').type("demouser", { force: true })
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.alert-danger').should('contain', 'Wrong credentials. try again!');
    })

    it('Submit form with wrong password', function() {
        cy.get('.form-group [name="email"]').type('user@phptravels.com', { force: true });
        cy.get('[type="password"]').type("654321", { force: true })
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.alert-danger').should('contain', 'Wrong credentials. try again!');
    })

    it('Validate successful Login', function() {
        cy.get('.form-group [name="email"]').type('user@phptravels.com', { force: true });
        cy.get('[type="password"]').type("demouser", { force: true })
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.sidebar-menu a').contains('Logout').should('be.visible');
    })

    it('Logout user', function() {
        cy.get('.form-group [name="email"]').type('user@phptravels.com', { force: true });
        cy.get('[type="password"]').type("demouser", { force: true })
        cy.get('[type="submit"]').contains('Login').click({ force: true })
        cy.get('.sidebar-menu a').contains('Logout').click({ force: true })
        cy.get('h5.modal-title').contains('Login').should('be.visible');
    })

})