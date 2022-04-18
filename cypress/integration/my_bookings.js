/// <reference types="cypress" />

import { user } from '../fixtures/config'

describe('Cancelation of pending booking', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it.only('Check if proper error message is displayed after cancelation of pending booking', function() {
        cy.loginUser(user.username, user.password);
        cy.get(".sidebar-menu li a").contains('My Bookings').click({ force: true });
        cy.contains('tr', 'pending').find('a').contains('View Voucher').click({ force: true });
        cy.get('[value="Request Cancellation"]').click({ force: true });
        cy.get('.alert-danger').should('contain.text', "Your cancellation request has been sent successlly. please wait for our response")
    });

})