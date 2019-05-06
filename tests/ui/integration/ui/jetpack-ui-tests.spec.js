/// <reference types="Cypress" />

context('Jetpack features', () => {

    function createJetPack (jetPackName, image) {
            cy.contains('Ajouter').click();
            cy.get('#name').should('be.visible');
            cy.get('#image').should('be.visible');
            cy.get('#name').type(jetPackName);
            cy.get('#image').type(image);

            cy.contains('Confirmer').click();
            cy.contains(jetPackName);
    }

    before(() => {
        cy.visit('/');

        //Create a jetpack before each test to make sure that there is always at least one jetpack
        createJetPack('Mon Jetpack','https://gamewave.fr/static/images/news/headers/2600a-jetpack.jpg');
    });

    it('List all Jetpacks', () => {
        cy.contains('Mon Jetpack');
    });

    it('Create a new Jetpack', () => {
        createJetPack("Nouveau JetPack", "https://fortniteinsider.com/wp-content/uploads/2018/03/jetpackimg-e1520004136781.jpg");
        cy.contains("Nouveau JetPack")
    });

    it('modify a new Jetpack', () => {

        cy.get('#jetpacks').children().first().as('jetpack');

        cy.get('@jetpack').get('input[name="name"]').should('be.visible');
        cy.get('@jetpack').get('input[name="image"]').should('be.visible');
        cy.get('@jetpack').find('input[name="name"]').type('le jetpack de oufff2');
        cy.get('@jetpack').find('input[name="image"]').type('https://cf3.s3.souqcdn.com/item/2018/09/17/38/59/98/79/item_XL_38599879_150537095.jpg');

        cy.get('@jetpack').contains('Edit').click();
        cy.get('@jetpack').contains("le jetpack de oufff2");
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
        cy.get('#jetpacksAvailable').contains('Mon Jetpack');

        cy.get("#reserve-1").click();
        cy.contains("Mon Jetpack a été réservé du 2019/06/05 au 2019/07/03");
    });
});