/// <reference types="cypress" />

import HomePage from "../pages/homePage"

const homePage = new HomePage()

describe("hero-home-page", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  describe("User not logged", () => {
    it.only("reload the page by clicking in title and still not logged", () => {
      homePage.checkIfUserIsNotLogged();
      homePage.clickInLogo();
      homePage.checkIfUserIsNotLogged();
    });

    it.only("like hero should alert the user need to login", () => {
      homePage.clickInLikeButtonOfFirstCard();
      homePage.checkIfAlertMustLoginToLikeIsVisible();
    });

    it("donate to hero should alert the user need to login", () => {
      cy.get('button[data-cy="money"]').first().click();

      cy.get(".open.modal").should("be.visible");
      cy.contains("h5", "You must log in to hire this hero.").should(
        "be.visible"
      );
      cy.contains("button", "Ok").should("be.visible");
    });

    it("user not logged can see the login button", () => {
      cy.contains("button", "Login").click();

      cy.contains("h5", "Login").should("be.visible");

      cy.get('[data-cy="email"]').should("exist");
      cy.get('[data-cy="email"]')
        .parents("label")
        .should("contain.text", "Email");

      cy.get('[data-cy="password"]').should("exist");
      cy.get('[data-cy="password"]')
        .parents("label")
        .should("contain.text", "Password");
    });
  });

  describe("Verify error messages in Login modal", () => {
    it("login with empty user and pass", () => {
      cy.contains("button", "Login").click();

      cy.contains("h5", "Login").should("be.visible");
      cy.get('[data-cy="email"]').should("exist");
      cy.get('[data-cy="password"]').should("exist");

      cy.contains("button", "Sign in").should("be.visible").click();

      cy.contains("div", "Email is required").should("be.visible");
      cy.contains("div", "Email is required")
        .prev("label")
        .should("have.text", "Email");

      cy.contains("div", "Password is required").should("be.visible");
      cy.contains("div", "Password is required")
        .prev("label")
        .should("have.text", "Password");
    });

    it("login with invalid email", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("invalidEmail");
      cy.get('[data-cy="password"]').type("pass");

      cy.contains("button", "Sign in").should("be.visible").click();

      cy.contains("div", "Email is not valid").should("be.visible");
      cy.contains("div", "Email is not valid")
        .prev("label")
        .should("have.text", "Email");
    });

    it("login with wrong email and password", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("invalidEmail@mail.com");
      cy.get('[data-cy="password"]').type("pass");

      cy.contains("button", "Sign in").should("be.visible").click();

      cy.contains("div", "Invalid email or password").should("be.visible");
      cy.contains("button", "Sign in")
        .prev("div")
        .should("have.text", "Invalid email or password");
    });
  });

  describe("Logged user", () => {
    it("Successful  login", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").should("be.visible");
    });

    it("reload the page by clicking in title and still logged", () => {

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('img[alt="Cypress Heroes Logo"]').click();
      cy.contains("button", "Logout").should("be.visible");
    });

    it("Logged user liked a hero", () => {

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="fans"]')
        .first()
        .invoke("text")
        .then((fansNumber) => {
          let initialFansNumber = parseInt(fansNumber);

          cy.get('[data-cy="hero-card"]')
            .first()
            .find('[data-cy="like"]')
            .click();

          cy.get('[data-cy="fans"]')
            .first()
            .invoke("text")
            .then((updatedFansNumber) => {
              expect(initialFansNumber + 1).to.eq(parseInt(updatedFansNumber));
            });
        });
    });

    it("Logged user donate to a hero", () => {

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
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

    it("Logged user dont donate to a hero", () => {

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
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
          cy.contains("button", "No").click();

          cy.get('[data-cy="saves"]')
            .first()
            .invoke("text")
            .then((updatedSavesNumber) => {
              expect(initialSavesNumber).to.eq(parseInt(updatedSavesNumber));
            });
        });
    });

    it("Logged user loggout", () => {

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"').type("test@test.com");
      cy.get('[data-cy="password"').type("test123");
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").click();

      cy.contains("button", "Login").should("be.visible");
    });
  });

  describe("Adm logged user", () => {
    it("Successful login as adm user", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").should("be.visible");
    });

    it("Logged admin user liked a hero", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="fans"]')
        .first()
        .invoke("text")
        .then((fansNumber) => {
          let initialFansNumber = parseInt(fansNumber);

          cy.get('[data-cy="hero-card"]')
            .first()
            .find('[data-cy="like"]')
            .click();

          cy.get('[data-cy="fans"]')
            .first()
            .invoke("text")
            .then((updatedFansNumber) => {
              expect(initialFansNumber + 1).to.eq(parseInt(updatedFansNumber));
            });
        });
    });

    it("Logged admin user donate to a hero", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
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

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
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

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").click();

      cy.contains("button", "Login").should("be.visible");
    });

    it.skip("Logged admin user delete hero by delete button in edit page", () => {
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("admin@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="pencil"]').first().click();

      cy.contains('button', 'Delete Hero').click();
      cy.contains('button', 'Yes').click();
    });
  });
});
