/// <reference types="cypress" />

import EditPage from "../pages/editPage"
import userData from "../fixtures/userData.json"

const editPage = new EditPage()

describe("hero-edit-page", () => {
    beforeEach(() => {
        cy.visit("/");
        editPage.login(userData.admUserSuccess.user, userData.admUserSuccess.pass);        
    })

    it("Logged admin user can access edit page", () => {
        editPage.clickInEditButton();
        editPage.checkIfInEditHeroPage();
    });

    //verificar se os dados no card do heroi sao os mesmos que na página de edição
    it("Verify the hero data in edit page", () => {
        editPage.checkTheFieldsInEditPage();
        
    })

    //verificar se nenhum dos campos da pagina de edição está vazio

    //verificar se após fazer alterações no heroi é possivel vê-la na tela home

});