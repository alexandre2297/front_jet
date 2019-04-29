/// <reference types="Cypress" />

context('Jetpack features', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Search and Book Jetpack', () => {
        cy.get('#startDate').should('be.visible');
        cy.get('#endDate').should('be.visible');

        cy.get('#startDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 255, 255)");
            });
        cy.get('#endDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 255, 255)");
            });

        //Wrong dates
        cy.get('#startDate').type('2019-05-20');
        cy.get('#endDate').type('2019-05-10');

        cy.contains('Rechercher').click();

        cy.get('#startDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });
        cy.get('#endDate')
            .should(($input) => {
                expect($input).to.have.css('background-color', "rgb(255, 0, 0)");
            });

        //Good dates
        cy.get('#startDate').type('2019-05-04');
        cy.get('#endDate').type('2019-06-10');

        cy.contains('Rechercher').click();
        cy.get('#jetpacksAvailable').contains('Jetpack JackTalior');

        cy.get("#reserve-1").click();
        cy.contains("Le Jetpack JackTalior a été réservé du 2019/06/05 au 2019/07/03");
    })
});