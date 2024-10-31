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

  describe.skip("Adm logged user", () => {
    it("Successful login as adm user", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").should("be.visible");
    });

    it("Logged admin user liked a hero", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      homePage.checkTheNumberofFansWhenLikeFirstHero()

      // cy.get('[data-cy="fans"]')
      //   .first()
      //   .invoke("text")
      //   .then((fansNumber) => {
      //     let initialFansNumber = parseInt(fansNumber);

      //     cy.get('[data-cy="hero-card"]')
      //       .first()
      //       .find('[data-cy="like"]')
      //       .click();

      //     cy.get('[data-cy="fans"]')
      //       .first()
      //       .invoke("text")
      //       .then((updatedFansNumber) => {
      //         expect(initialFansNumber + 1).to.eq(parseInt(updatedFansNumber));
      //       });
      //   });
    });

    it("Logged admin user donate to a hero", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="saves"]')
        .first()
        .invoke("text")
        .then((savesNumber) => {
          let initialSavesNumber = parseInt(savesNumber);

          cy.get('[data-cy="hero-card"]')
            .first()
            .find('[data-cy="money"]')
            .click();
          cy.contains("button", "Yes").click();

          cy.get('[data-cy="saves"]')
            .first()
            .invoke("text")
            .then((updatedSavesNumber) => {
              expect(initialSavesNumber + 1).to.eq(
                parseInt(updatedSavesNumber)
              );
            });
        });
    });

    it.skip("Logged admin user delete hero by trash button in home page", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      // Captura o nome do herói no primeiro card
      cy.get('[data-cy="hero-card"]').first().find("h5").invoke("text").then((heroName) => {

          // Exclui o herói clicando no ícone de lixeira no primeiro card
          cy.get('[data-cy="hero-card"]').first().find('[data-cy="trash"]').click();

          // Confirma a exclusão se necessário
          cy.contains("button", "Yes").click();  // Descomente se houver confirmação

          // Verifica que o card com o nome do herói não existe mais
          cy.get('[data-cy="hero-card"]').should("not.contain", heroName);
        });
    });

    it("Logged admin user loggout", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").click();

      cy.contains("button", "Login").should("be.visible");
    });

    it.skip("Logged admin user delete hero by delete button in edit page", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type(userData.admUserSuccess.user);
      cy.get('[data-cy="password"]').type(userData.userSuccess.pass);
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="pencil"]').first().click();

      cy.contains('button', 'Delete Hero').click();
      cy.contains('button', 'Yes').click();
    });
  });
});
