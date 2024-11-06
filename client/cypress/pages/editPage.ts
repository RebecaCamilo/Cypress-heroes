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
        savesField: '[data-cy="saves"]'
      };
    }

     
  }
  
  export default EditPage