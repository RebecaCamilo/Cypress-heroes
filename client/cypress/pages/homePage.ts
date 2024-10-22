class HomePage {
  
    selectorsList() {
      return {
        loginButtonText: 'Login',
        cyHeroesLogo: 'img[alt="Cypress Heroes Logo"]',
        searchField: 'input[placeholder="Search Amazon"]',
        searchButton: "#nav-search-submit-button",
        listOfProducts: "div .s-result-list > div",
        singleProduct: '[data-cy="title-recipe"] > h2 > a > span'
      };
    }

    checkIfUserIsNotLogged() {
      cy.contains("button", this.selectorsList().loginButtonText).should("be.visible");
    }

    clickInLogo() {
      cy.get(this.selectorsList().cyHeroesLogo).click();
    }
      
  }
  
  export default HomePage