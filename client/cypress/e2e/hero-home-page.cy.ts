/// <reference types="cypress" />

import HomePage from "../pages/homePage"
import userData from "../fixtures/userData.json"

const homePage = new HomePage()

describe("hero-home-page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  describe.skip("User not logged", () => {
    it("reload the page by clicking in title and still not logged", () => {
      homePage.checkIfLoginButtonIsVisible();
      homePage.clickInLogo();
      homePage.checkIfLoginButtonIsVisible();
    });

    it("like hero should alert the user need to login", () => {
      homePage.clickInLikeButtonOfFirstCard();
      homePage.checkIfAlertMustLoginToLikeIsVisible();
    });

    it("hire a hero should alert the user need to login", () => {
      homePage.clickInMoneyButtonOfFirstCard();
      homePage.checkIfAlertMustLoginToHireIsVisible();
    });

    it("user not logged can see the login button", () => {
      homePage.clickInLoginButton();
      homePage.checkIfLoginModalIsVisible();
    });
  });

  describe.skip("Verify error messages in Login modal", () => {
    it("login with empty user and pass", () => {
      homePage.clickInLoginButton();
      homePage.clickInSignInButton();

      homePage.checkIfLoginModalEmailFieldIsRequired();
      homePage.checkIfLoginModalPasswordFieldIsRequired();
    });

    it("login with invalid email", () => {
      homePage.clickInLoginButton();

      homePage.typeInEmailLoginField('invalidEmail');
      homePage.clickInSignInButton();

      homePage.checkIfLoginModalEmailFieldIsInvalid();
    });

    it("login with wrong email and password", () => {
      homePage.clickInLoginButton();

      homePage.typeInEmailLoginField(userData.userFail.user);
      homePage.typeInPasswordLoginField(userData.userFail.pass);
      homePage.clickInSignInButton();

      homePage.checkIfLoginModalHasWrongEmailOrPassword();
    });
  });

  describe.skip("Logged user", () => {
    beforeEach(() => {
      homePage.login(userData.userSuccess.user, userData.userSuccess.pass);
    })

    it("Successful  login", () => {
      homePage.checkIfLogoutButtonIsVisible();
    });

    it("reload the page by clicking in title and still logged", () => {
      homePage.clickInLogo();

      homePage.checkIfLogoutButtonIsVisible();
    });

    it("Logged user liked a hero", () => {
      homePage.checkTheNumberofFansWhenLikeFirstHero();      
    });

    it("Logged user donate to a hero", () => {
      homePage.checkTheNumberofSavesWhenHireFirstHero();
    });

    it("Logged user dont donate to a hero", () => {
      homePage.checkTheNumberofSavesWhenHireFirstHero();
    });

    it("Logged user loggout", () => {
      homePage.clickInLogoutButton();

      homePage.checkIfLoginButtonIsVisible();
    });
  });

  describe("Adm logged user", () => {
    beforeEach(() => {
      homePage.login(userData.admUserSuccess.user, userData.admUserSuccess.pass);
    })

    it("Successful login as adm user", () => {
      cy.contains("button", "Logout").should("be.visible");
    });

    it("Logged admin user liked a hero", () => {
      homePage.checkTheNumberofFansWhenLikeFirstHero();
    });

    it("Logged admin user donate to a hero", () => {
      homePage.checkTheNumberofSavesWhenHireFirstHero();
    });

    it.skip("Logged admin user delete hero by trash button in home page", () => {
      homePage.checkIfFirstHeroWasDeletedWhenPressTrashButton();      
    });

    it("Logged admin user loggout", () => {
      homePage.clickInLogoutButton();

      homePage.checkIfLoginButtonIsVisible();
    });    
  });

});
