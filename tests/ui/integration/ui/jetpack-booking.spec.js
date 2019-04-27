/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Search a Jetpack', () => {

        cy.contains('Jetpack JackTalior');
        cy.contains('Jetpack Fortnite Wiki');

        cy.get('#startDate').should('be.visible');
        cy.get('#endDate').should('be.visible');
        cy.get('#startDate').type('2019-05-04');
        cy.get('#endDate').type('2019-06-10');
        cy.contains('Search').click();

        cy.contains('Jetpack JackTalior');
        cy.contains('Jetpack Fortnite Wiki').not();
    })
});