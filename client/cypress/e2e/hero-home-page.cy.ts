/// <reference types="cypress" />

describe("hero-home-page", () => {

    describe('User not logged', () => {
        it('reload the page by clicking in title and still not logged', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.contains('button', 'Login').should('be.visible');

            cy.get('img[alt="Cypress Heroes Logo"]').click();
            cy.contains('button', 'Login').should('be.visible');
        });

        it('like hero should alert the user need to login', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.get('button[data-cy="like"]').first().click();

            cy.get('.open.modal').should('be.visible');
            cy.contains('h5', 'You must log in to like.').should('be.visible');
            cy.contains('button', 'Ok').should('be.visible');
        });
        
        it('donate to hero should alert the user need to login', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.get('button[data-cy="money"]').first().click();

            cy.get('.open.modal').should('be.visible');
            cy.contains('h5', 'You must log in to hire this hero.').should('be.visible');
            cy.contains('button', 'Ok').should('be.visible');
        });

        it('user not logged can see the login button', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.contains('button', 'Login').click();

            cy.contains('h5', 'Login').should('be.visible');

            cy.get('[data-cy="email"]').should('exist');
            cy.get('[data-cy="email"]').parents('label').should('contain.text', 'Email');

            cy.get('[data-cy="password"]').should('exist');
            cy.get('[data-cy="password"]').parents('label').should('contain.text', 'Password');
        });
        
    });

    describe('Verify error messages in Login modal', () => {
        it('login with empty user and pass', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.contains('button', 'Login').click();

            cy.contains('h5', 'Login').should('be.visible');
            cy.get('[data-cy="email"]').should('exist');
            cy.get('[data-cy="password"]').should('exist');

            cy.contains('button', 'Sign in').should('be.visible').click();

            cy.contains('div', 'Email is required').should('be.visible');
            cy.contains('div', 'Email is required').prev('label').should('have.text', 'Email');

            cy.contains('div', 'Password is required').should('be.visible');
            cy.contains('div', 'Password is required').prev('label').should('have.text', 'Password');
        });

        it('login with invalid email', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.contains('button', 'Login').click();

            cy.get('[data-cy="email"]').type('invalidEmail');
            cy.get('[data-cy="password"]').type('pass');

            cy.contains('button', 'Sign in').should('be.visible').click();

            cy.contains('div', 'Email is not valid').should('be.visible');
            cy.contains('div', 'Email is not valid').prev('label').should('have.text', 'Email');
        });
        
        it.only('login with wrong email and password', () => {
            cy.visit('http://localhost:3000/heroes');
            cy.contains('button', 'Login').click();

            cy.get('[data-cy="email"]').type('invalidEmail@mail.com');
            cy.get('[data-cy="password"]').type('pass');

            cy.contains('button', 'Sign in').should('be.visible').click();

            cy.contains('div', 'Invalid email or password').should('be.visible');
            cy.contains('button', 'Sign in').prev('div').should('have.text', 'Invalid email or password');
        });
    })
  });
  