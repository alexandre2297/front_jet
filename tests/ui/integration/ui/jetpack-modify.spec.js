/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('modify a new Jetpack', () => {

        cy.get('#jetpack-form-edit-a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d').should;

        const jetPack = cy.get('#jetpack-form-edit-a8019ec0-bfdc-4140-9dbb-4927e5ef5c8d');

        jetPack.get('#name-modify').should('be.visible');
        jetPack.get('#image-modify').should('be.visible');
        jetPack.get('#name-modify').type('le jetpack de oufff2');
        jetPack.get('#image-modify').type('image');

     //   cy.contains('Edit').click();
      //  cy.contains("le jetpack de oufff2");
    })
});