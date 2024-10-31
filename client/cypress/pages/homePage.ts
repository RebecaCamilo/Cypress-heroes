class HomePage {
  
    selectorsList() {
      return {
        loginButtonText: 'Login',
        logoutButtonText: 'Logout',
        signInButtonText: 'Sign in',
        cyHeroesLogo: 'img[alt="Cypress Heroes Logo"]',
        likeButton: '[data-cy="like"]',
        moneyButton: '[data-cy="money"]',
        alertModalMustLoginTo: '.open.modal',
        textOfAlertModalMustLoginToLike: 'You must log in to like.',
        textOfAlertModalMustLoginToHire: 'You must log in to hire this hero.',
        textoOkButtonOfAlertModalMustLogin: 'Ok',
        loginModalTitle: 'Login',
        loginEmailField: '[data-cy="email"]',
        loginPasswordField: '[data-cy="password"]',
        loginEmailFieldLabel: 'Email',
        loginPasswordFieldLabel: 'Password',
        emailRequiredErrorMessage: 'Email is required',
        emailInvalidErrorMessage: 'Email is not valid',
        passwordRequiredErrorMessage: 'Password is required',
        invalidEmailOrPasswordErrorMessage: 'Invalid email or password',
        fansField: '[data-cy="fans"]',
        savesField: '[data-cy="saves"]',
        // heroCard: '[data-cy="hero-card"]',
        // searchField: 'input[placeholder="Search Amazon"]',
        // searchButton: "#nav-search-submit-button",
        // listOfProducts: "div .s-result-list > div",
        // singleProduct: '[data-cy="title-recipe"] > h2 > a > span'
      };
    }

    checkIfLoginButtonIsVisible() {
      cy.contains("button", this.selectorsList().loginButtonText).should("be.visible");
    }

    checkIfLogoutButtonIsVisible() {
      cy.contains("button", this.selectorsList().logoutButtonText).should("be.visible");
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

    clickInLogoutButton() {
      cy.contains("button", this.selectorsList().logoutButtonText).click();
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

    checkIfLoginModalEmailFieldIsRequired() {
      cy.contains("div", this.selectorsList().emailRequiredErrorMessage)
        .prev("label")
        .should("have.text", this.selectorsList().loginEmailFieldLabel);
    }

    checkIfLoginModalEmailFieldIsInvalid() {
      cy.contains("div", this.selectorsList().emailInvalidErrorMessage)
        .prev("label")
        .should("have.text", this.selectorsList().loginEmailFieldLabel);
    }

    checkIfLoginModalPasswordFieldIsRequired() {
        cy.contains("div", this.selectorsList().passwordRequiredErrorMessage)
        .prev("label")
        .should("have.text", this.selectorsList().loginPasswordFieldLabel);
    }

    checkIfLoginModalHasWrongEmailOrPassword() {
      cy.contains("div", this.selectorsList().invalidEmailOrPasswordErrorMessage).should("be.visible");
      cy.contains("button", this.selectorsList().signInButtonText)
        .prev("div")
        .should("have.text", this.selectorsList().invalidEmailOrPasswordErrorMessage);
  }

    typeInEmailLoginField(email: string) {
      cy.get(this.selectorsList().loginEmailField).type(email);
    }

    typeInPasswordLoginField(pass: string) {
      cy.get(this.selectorsList().loginPasswordField).type(pass);
    }

    checkTheNumberofFansWhenLikeFirstHero() {
      cy.get(this.selectorsList().fansField)
        .first()
        .invoke("text")
        .then((fansNumber) => {
          let initialFansNumber = parseInt(fansNumber);

          this.clickInLikeButtonOfFirstCard();

          cy.get(this.selectorsList().fansField)
            .first()
            .invoke("text")
            .then((updatedFansNumber) => {
              initialFansNumber += 1;
              expect(initialFansNumber).to.eq(parseInt(updatedFansNumber));
            });
        });
    }

    checkTheNumberofSavesWhenHireFirstHero() {
      cy.get(this.selectorsList().savesField)
        .first()
        .invoke("text")
        .then((savesNumber) => {
          let initialSavesNumber = parseInt(savesNumber);

          this.clickInMoneyButtonOfFirstCard();
          cy.contains("button", "Yes").click();

          cy.get(this.selectorsList().savesField)
            .first()
            .invoke("text")
            .then((updatedSavesNumber) => {
              initialSavesNumber += 1;
              expect(initialSavesNumber).to.eq(parseInt(updatedSavesNumber)
              );
            });
        });
    }

    login(email : string, pass : string) {
      this.clickInLoginButton();

      this.typeInEmailLoginField(email);
      this.typeInPasswordLoginField(pass);
      this.clickInSignInButton();
    }
     
  }
  
  export default HomePage