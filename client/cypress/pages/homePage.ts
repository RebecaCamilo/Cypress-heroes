class HomePage {
  
    selectorsList() {
      return {
        loginButtonText: 'Login',
        cyHeroesLogo: 'img[alt="Cypress Heroes Logo"]',
        likeButton: 'button[data-cy="like"]',
        alertModalMustLoginTo: '.open.modal',
        textOfAlertModalMustLoginTo: 'You must log in to like.',
        textoOkButtonOfAlertModalMustLoginTo: 'Ok',
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

    checkIfAlertMustLoginToLikeIsVisible() {
      cy.get(this.selectorsList().alertModalMustLoginTo).should("be.visible");
      cy.contains("h5", this.selectorsList().textOfAlertModalMustLoginTo).should("be.visible");
      cy.contains("button", this.selectorsList().textoOkButtonOfAlertModalMustLoginTo).should("be.visible");
    }



    /**
     * it("like hero should alert the user need to login", () => {
      cy.get('button[data-cy="like"]').first().click();

      cy.get(".open.modal").should("be.visible");
      cy.contains("h5", "You must log in to like.").should("be.visible");
      cy.contains("button", "Ok").should("be.visible");
    });
     */
      
  }
  
  export default HomePage