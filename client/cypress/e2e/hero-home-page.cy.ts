/// <reference types="cypress" />

describe("hero-home-page", () => {
  describe("User not logged", () => {
    it("reload the page by clicking in title and still not logged", () => {
      cy.visit("http://localhost:3000/heroes");
      cy.contains("button", "Login").should("be.visible");

      cy.get('img[alt="Cypress Heroes Logo"]').click();
      cy.contains("button", "Login").should("be.visible");
    });

    it("like hero should alert the user need to login", () => {
      cy.visit("http://localhost:3000/heroes");
      cy.get('button[data-cy="like"]').first().click();

      cy.get(".open.modal").should("be.visible");
      cy.contains("h5", "You must log in to like.").should("be.visible");
      cy.contains("button", "Ok").should("be.visible");
    });

    it("donate to hero should alert the user need to login", () => {
      cy.visit("http://localhost:3000/heroes");
      cy.get('button[data-cy="money"]').first().click();

      cy.get(".open.modal").should("be.visible");
      cy.contains("h5", "You must log in to hire this hero.").should(
        "be.visible"
      );
      cy.contains("button", "Ok").should("be.visible");
    });

    it("user not logged can see the login button", () => {
      cy.visit("http://localhost:3000/heroes");
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
      cy.visit("http://localhost:3000/heroes");
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
      cy.visit("http://localhost:3000/heroes");
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
      cy.visit("http://localhost:3000/heroes");
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
      cy.visit("http://localhost:3000/heroes");
      cy.contains("button", "Login").click();

      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.contains("button", "Logout").should("be.visible");
    });

    it("reload the page by clicking in title and still logged", () => {
      cy.visit("http://localhost:3000/heroes");

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('img[alt="Cypress Heroes Logo"]').click();
      cy.contains("button", "Logout").should("be.visible");
    });

    it("Logged user liked a hero", () => {
      cy.visit("http://localhost:3000/heroes");

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="fans"]').first().invoke("text").then((fansNumber) => {
          let initialFansNumber = parseInt(fansNumber);

          cy.get('[data-cy="hero-card"]').first().find('[data-cy="like"]').click();

          cy.get('[data-cy="fans"]').first().invoke("text").then((updatedFansNumber) => {
              expect(initialFansNumber + 1).to.eq(parseInt(updatedFansNumber));
            });
        });
    });

    it("Logged user donate to a hero", () => {
      cy.visit("http://localhost:3000/heroes");

      cy.contains("button", "Login").click();
      cy.get('[data-cy="email"]').type("test@test.com");
      cy.get('[data-cy="password"]').type("test123");
      cy.contains("button", "Sign in").click();

      cy.get('[data-cy="saves"]').first().invoke("text").then((savesNumber) => {
          let initialSavesNumber = parseInt(savesNumber);

          cy.get('[data-cy="hero-card"]').first().find('[data-cy="money"]').click();
          cy.contains("button", "Yes").click();


          cy.get('[data-cy="saves"]').first().invoke("text").then((updatedSavesNumber) => {
              expect(initialSavesNumber + 1).to.eq(parseInt(updatedSavesNumber));
            });
        });
    });
    
  });
});
