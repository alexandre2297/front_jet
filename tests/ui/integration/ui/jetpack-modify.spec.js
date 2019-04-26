/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('modify a new Jetpack', () => {
        cy.get('.card-body').contains('#jetpack-form-edit-a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d');
        cy.get('#name-modify').should('be.visible');
        cy.get('#image-modify').should('be.visible');
        cy.get('#name-modify').type('c');

        cy.contains('Edit').click();
        cy.contains("le jetpack de oufff2");
    })
});