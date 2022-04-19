/// <reference types="cypress" />

import { user } from '../fixtures/config'

describe('My bookings page', () => {

    beforeEach(function() {
        cy.visit('/');
    })

    it('Check if link View Voucher is opened in new tab', function() {
        cy.loginUser(user.username, user.password);
        cy.get(".sidebar-menu li a").contains('My Bookings').click({ force: true });
        cy.contains('tr', 'pending').find('a').contains('View Voucher').should('have.attr', 'target"_blank"')
    });

    it('Check if total bookings number is equal as number of rows in the bookings table', function() {
        let totalRowNumber;
        let totalBookingsNumber;

        cy.loginUser(user.username, user.password);
        cy.get(".sidebar-menu li a").contains('My Bookings').click({ force: true });

        cy.get('tbody > tr').then((row) => {
            totalRowNumber = row.length;
        });

        totalBookingsNumber = cy.contains('p', 'Total Bookings').siblings('h4.info__title');

        totalBookingsNumber.invoke('text').then(text => {
            expect((text).trim()).to.equal('' + totalRowNumber)
        })

    });

})