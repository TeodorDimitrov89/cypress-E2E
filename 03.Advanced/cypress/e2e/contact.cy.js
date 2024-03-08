///<reference types="Cypress" />
describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello World!");
    cy.get('[data-cy="contact-input-name"]').type("Jonh Doe");
    cy.get('[data-cy="contact-input-email"]').type("jonh@gmail.com");

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains("Send Message")
    //   .should("not.be.disabled");

    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.be.eq("Send Message");
    });

    // cy.get('[data-cy="contact-btn-submit"]').should("not.be.disabled");

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn"); //Alias
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("be.disabled");

    // cy.get('[data-cy="contact-btn-submit"]').should("be.disabled");
    // cy.get('[data-cy="contact-btn-submit"]').should("have.attr", 'disabled');
  });
});
