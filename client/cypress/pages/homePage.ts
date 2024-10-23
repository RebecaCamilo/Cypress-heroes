class HomePage {
  
    selectorsList() {
      return {
        loginButtonText: 'Login',
        signInButtonText: 'Sign in',
        cyHeroesLogo: 'img[alt="Cypress Heroes Logo"]',
        likeButton: 'button[data-cy="like"]',
        moneyButton: 'button[data-cy="money"]',
        alertModalMustLoginTo: '.open.modal',
        textOfAlertModalMustLoginToLike: 'You must log in to like.',
        textOfAlertModalMustLoginToHire: 'You must log in to hire this hero.',
        textoOkButtonOfAlertModalMustLogin: 'Ok',
        loginModalTitle: 'Login',
        loginEmailField: '[data-cy="email"]',
        loginPasswordField: '[data-cy="password"]',
        loginEmailFieldLabel: 'Email',
        loginPasswordFieldLabel: 'Password',
        // searchField: 'input[placeholder="Search Amazon"]',
        // searchButton: "#nav-search-submit-button",
        // listOfProducts: "div .s-result-list > div",
        // singleProduct: '[data-cy="title-recipe"] > h2 > a > span'
      };
    }

    checkIfUserIsNotLogged() {
      cy.contains("button", this.selectorsList().loginButtonText).should("be.visible");
    }

    clickInLogo() {
      cy.get(this.selectorsList().cyHeroesLogo).click();
    }

    clickInLikeButtonOfFirstCard() {
      cy.get(this.selectorsList().likeButton).first().click();
    }

    clickInMoneyButtonOfFirstCard() {
      cy.get(this.selectorsList().moneyButton).first().click();
    }

    clickInLoginButton() {
      cy.contains("button", this.selectorsList().loginButtonText).click();
    }

    clickInSignInButton() {
      cy.contains("button", this.selectorsList().signInButtonText).click();
    }

    checkIfAlertMustLoginToLikeIsVisible() {
      cy.get(this.selectorsList().alertModalMustLoginTo).should("be.visible");
      cy.contains("h5", this.selectorsList().textOfAlertModalMustLoginToLike).should("be.visible");
      cy.contains("button", this.selectorsList().textoOkButtonOfAlertModalMustLogin).should("be.visible");
    }

    checkIfAlertMustLoginToHireIsVisible() {
      cy.get(this.selectorsList().alertModalMustLoginTo).should("be.visible");
      cy.contains("h5", this.selectorsList().textOfAlertModalMustLoginToHire).should("be.visible");
      cy.contains("button", this.selectorsList().textoOkButtonOfAlertModalMustLogin).should("be.visible");
    }

    checkIfLoginModalIsVisible() {
      cy.get(this.selectorsList().alertModalMustLoginTo).should("be.visible");
      cy.contains("h5", this.selectorsList().loginModalTitle).should("be.visible");

      cy.get(this.selectorsList().loginEmailField).should("exist");
      cy.get(this.selectorsList().loginEmailField)
        .parents("label")
        .should("contain.text", this.selectorsList().loginEmailFieldLabel);

      cy.get(this.selectorsList().loginPasswordField).should("exist");
      cy.get(this.selectorsList().loginPasswordField)
        .parents("label")
        .should("contain.text", this.selectorsList().loginPasswordFieldLabel);

      cy.contains("button", this.selectorsList().signInButtonText).should("be.visible");
    }
     
  }
  
  export default HomePage