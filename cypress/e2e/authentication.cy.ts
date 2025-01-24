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

    cy.get('[data-id="submit-button"]')
      .click()
      .then(() => {
        cy.url().should("include", "/auth/login");
      });
  });

  it("Login user", () => {
    cy.visit("/auth/login");

    cy.get('[data-id="login-form-element"]').should("be.visible");
    cy.get('[data-id="login-form-element"]').should("be.visible");
    cy.get('[data-id="login-email-input"]').type(email);
    cy.get('[data-id="login-password-input"]').type(password);

    cy.get('[data-id="login-submit-button"]')
      .click()
      .then(() => {
        cy.url().should("include", "/dashboard");

        cy.get('[data-id="theme-switch-trigger"]').click();
        cy.get('[data-id="theme-switch-color-button-green"]').click();

        cy.visit("/dashboard/customer");

        cy.get('[data-testid="shared-table"]').should("be.visible");

        cy.get('[data-testid="shared-table"]')
          .find("tbody tr")
          .should("have.length.greaterThan", 0, { timeout: 10000 });
        cy.get('[data-testid="search-table"]').type("Rosaline");

        // Wait for the API call to complete and the table to update
        cy.get('[data-testid="shared-table"]')
          .find("tbody tr")
          .should("have.length.greaterThan", 0, { timeout: 10000 });

        cy.get('[data-testid="search-table"]').clear();

        cy.get('[data-id="logout"]').should("be.visible").click();
        cy.get('[data-id="logout-user"]').should("be.visible").click();
      });
  });
});
