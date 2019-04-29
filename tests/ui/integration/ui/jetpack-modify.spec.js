/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('modify a new Jetpack', () => {

        cy.get('#name-modify-1').should('be.visible');
        cy.get('#image-modify-1').should('be.visible');
        cy.get('#name-modify-1').type('le jetpack de oufff2');
        cy.get('#image-modify-1').type('image');

        cy.get('#edit-1').click();
        cy.contains("le jetpack de oufff2");
    })
});