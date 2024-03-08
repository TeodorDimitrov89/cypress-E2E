///<reference types="Cypress" />
describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello World!");
    cy.get('[data-cy="contact-input-name"]').type("Jonh Doe");
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-email"]').type("jonh@gmail.com");
    cy.get('[data-cy="contact-btn-submit"]').should("not.be.disabled");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
    cy.get('[data-cy="contact-btn-submit"]').should("be.disabled");

    // cy.get('[data-cy="contact-btn-submit"]').should("have.attr", 'disabled');
  });
});
