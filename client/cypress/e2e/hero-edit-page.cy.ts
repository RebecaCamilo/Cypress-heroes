/// <reference types="cypress" />

import EditPage from "../pages/editPage"
import userData from "../fixtures/userData.json"

const editPage = new EditPage()

describe("hero-edit-page", () => {
    beforeEach(() => {
        cy.visit("/");
        editPage.login(userData.admUserSuccess.user, userData.admUserSuccess.pass);
        editPage.clickInEditButton();
    })

    it("Logged admin user can access edit page", () => {
        editPage.checkIfInEditHeroPage();
    });

});