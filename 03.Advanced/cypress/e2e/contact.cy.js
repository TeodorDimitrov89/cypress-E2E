///<reference types="Cypress" />
describe("contact form", () => {
  before(() => {
    //Runs only once, before all tests.
  });
  beforeEach(() => {
    // Runs before every test (i.e it's repeated)
    cy.visit("/about");
  });
  it("should submit the form", () => {
    cy.task("seedDatabase", "filename.scv").then((returnedValue) => {
      // we can use the returnedValue
    });
    cy.getById("contact-input-message").type("Hello World!");
    cy.getById("contact-input-name").type("Jonh Doe");

    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains("Send Message")
    //   .should("not.be.disabled");

    cy.getById("contact-btn-submit").then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.be.eq("Send Message");
    });

    cy.screenshot();

    // cy.get('[data-cy="contact-input-email"]').type("jonh@gmail.com{enter}");
    cy.getById("contact-input-email").type("jonh@gmail.com");

    // cy.get('[data-cy="contact-btn-submit"]').click();
    cy.submitForm();

    cy.screenshot();
    // cy.get('[data-cy="contact-btn-submit"]').should("not.be.disabled");

    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn"); //Alias
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("be.disabled");

    // cy.get('[data-cy="contact-btn-submit"]').should("be.disabled");
    // cy.get('[data-cy="contact-btn-submit"]').should("have.attr", 'disabled');
  });

  it("should validate the form input", () => {
    // cy.get('[data-cy="contact-btn-submit"]').click();
    cy.submitForm();
    cy.getById("contact-btn-submit").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.eq("Sending...");
    });

    cy.getById("contact-btn-submit").contains("Send Message");

    cy.getById("contact-input-message").focus().blur();

    cy.getById("contact-input-message")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    // .should((el) => {
    //   expect(el.attr("class")).not.to.be.undefined;
    //   expect(el.attr("class")).contains("invalid");
    // });

    cy.getById("contact-input-name").focus().blur();
    cy.getById("contact-input-name")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.getById("contact-input-email").focus().blur();
    cy.getById("contact-input-email")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);
  });
});
