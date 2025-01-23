import { faker } from "@faker-js/faker";

describe("Authentical Test with AuthJS Credentials", () => {
  let email;
  let password;
  let username;

  before(() => {
    // Generate email and password for tests
    email = faker.internet.email();
    username = faker.internet.displayName();

    // Generate a password with at least 8 characters
    // and at least one uppercase letter, one lowercase letter,
    // one number, and one special character
    password = faker.internet.password({
      length: 10,
      prefix: "Aa1!",
    });
  });
  it("Register user", () => {
    cy.visit("/auth/register");

    cy.get('[data-id="register-form-element"]').should("be.visible");
    cy.get('[data-id="username-input"]').type(username);
    cy.get('[data-id="email-input"]').type(email);
    cy.get('[data-id="password-input"]').type(password);

    cy.get('[data-id="submit-button"]').click();
    // cy.intercept('POST', '/api/register').as('registerUser');
    // cy.wait('@registerUser').its('response.statusCode').should('eq', 200);
    // cy.url().should("include", "/auth/login");
  });

  it("Login user", () => {
    cy.visit("/auth/login");

    cy.get('[data-id="login-form-element"]').should("be.visible");
    cy.get('[data-id="login-form-element"]').should("be.visible");
    cy.get('[data-id="login-email-input"]').type(email);
    cy.get('[data-id="login-password-input"]').type(password);

    cy.get('[data-id="login-submit-button"]').click();
   
  });
});
