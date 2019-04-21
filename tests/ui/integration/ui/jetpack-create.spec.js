/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Create a new Jetpack', () => {
        cy.get('#name').should('be.visible');
        cy.get('#image').should('be.visible');
        cy.get('#name').type('le jetpack de ouf');
        cy.get('#image').type('http:.//test.com/image.png');

        cy.contains('Confirmer').click();
        cy.contains("Le jetpack de ouf");
    })
});