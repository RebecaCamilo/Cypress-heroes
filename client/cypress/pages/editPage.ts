class EditPage {
  
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
        priceField: '[data-cy="price"]',
        powersField: '[data-cy="powers"]', //list div > ul > li
        // heroCard: '[data-cy="hero-card"]',
        // searchField: 'input[placeholder="Search Amazon"]',
        // searchButton: "#nav-search-submit-button",
        // listOfProducts: "div .s-result-list > div",
        // singleProduct: '[data-cy="title-recipe"] > h2 > a > span'
        // 
        // 
        pencilButton: '[data-cy="pencil"]',
        heroNameTitleEditPage: '[data-cy="name"]',
        
      };
    }


    
    clickInEditButton() {
      cy.get(this.selectorsList().pencilButton).first().click();
    }

    checkIfInEditHeroPage() {
      cy.get('[data-cy="name"]').should("exist");
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

    clickInLoginButton() { 
      cy.contains("button", this.selectorsList().loginButtonText).click();
    }

    clickInLogoutButton() {
      cy.contains("button", this.selectorsList().logoutButtonText).click();
    }

    clickInSignInButton() {
      cy.contains("button", this.selectorsList().signInButtonText).click();
    }

    typeInEmailLoginField(email: string) {
      cy.get(this.selectorsList().loginEmailField).type(email);
    }

    typeInPasswordLoginField(pass: string) {
      cy.get(this.selectorsList().loginPasswordField).type(pass);
    }

    login(email : string, pass : string) {
      this.clickInLoginButton();

      this.typeInEmailLoginField(email);
      this.typeInPasswordLoginField(pass);
      this.clickInSignInButton();
    }


    checkTheFieldsInEditPage() {
      let fansNumber: any;
      let savesNumber: any;
      let priceNumber: any;

      // Localiza o card do produto específico
      cy.get('[data-cy="hero-card"]')
        .first()
        .within(() => {
          cy.get(this.selectorsList().fansField).invoke('text').then((text) => {
            fansNumber = text;
            console.log('Valor do produto no card:', fansNumber);
          });

          cy.get(this.selectorsList().savesField).invoke('text').then((text) => {
            savesNumber = text;
            console.log('Valor do produto no card:', savesNumber);
          });

          cy.get(this.selectorsList().priceField).invoke('text').then((text) => {
            priceNumber = text;
            console.log('Valor do produto no card:', priceNumber);
          });
  
          // Clica no botão de editar dentro do card
          this.clickInEditButton();
        });
  
      cy.then(() => {  // Usando cy.then para garantir que Cypress espere a atribuição de savesNumber
        cy.get(this.selectorsList().fansField)
          .should('be.visible') // Garante que o campo esteja visível
          .invoke('text') // Captura o texto do elemento
          .should('equal', fansNumber) // Verifica se o texto está correto
          .then(() => {
            console.log('Valor do produto na página de edição:', fansNumber);
          });

          cy.get(this.selectorsList().savesField)
          .should('be.visible') // Garante que o campo esteja visível
          .invoke('text') // Captura o texto do elemento
          .should('equal', savesNumber) // Verifica se o texto está correto
          .then(() => {
            cy.log('Valor do produto na página de edição:', savesNumber);
            console.log('Valor do produto na página de edição:', savesNumber);
          });

          cy.get(this.selectorsList().priceField)
          .should('be.visible') // Garante que o campo esteja visível
          .invoke('text') // Captura o texto do elemento
          .should('equal', priceNumber) // Verifica se o texto está correto
          .then(() => {
            cy.log('Valor do produto na página de edição:', priceNumber);
            console.log('Valor do produto na página de edição:', priceNumber);
          });
      });

    }    
    

     
  }
  
  export default EditPage