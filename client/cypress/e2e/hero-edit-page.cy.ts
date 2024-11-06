/// <reference types="cypress" />

import HomePage from "../pages/homePage"
import userData from "../fixtures/userData.json"

const homePage = new HomePage()

describe("hero-home-page", () => {
    beforeEach(() => {
        homePage.login(userData.admUserSuccess.user, userData.admUserSuccess.pass);
    })

});