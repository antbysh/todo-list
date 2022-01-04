import faker from "faker";

describe("Todo app", () => {
  const newItem = faker.random.words(2);

  beforeEach(() => {
    cy.visit("http://localhost:3000");

    // Add task to test
    cy.get("input[placeholder='Add task']").type(`${newItem}{enter}`);
  });

  it("loads main parts", () => {
    cy.get("nav")
      .should("be.visible")
      .within(() => {
        cy.get("div").should("contain.text", "All");
        cy.get("div").should("be.visible").should("contain.text", "Completed");
        cy.get("div")
          .should("be.visible")
          .should("contain.text", "Uncompleted");
      });

    cy.get("input").should("be.visible");
  });

  it("handles adding and deleting task", () => {
    cy.get("ul li")
      .first()
      .within(() => {
        cy.get("span").should("have.text", newItem);
      });

    cy.get(
      "ul li[data-task-completed] div button[aria-label='Delete task']"
    ).click();

    cy.get("ul li[data-task-completed]").should("have.length", 0);
  });

  it("handles task status change", () => {
    cy.get("ul li div button[aria-label='Change task status']").click();

    cy.get("ul li[data-task-completed='true']").should("be.visible");
  });

  it("handles task title edit", () => {
    cy.get("ul li div button[aria-label='Edit task']").click();

    cy.get("input[placeholder='Edit task']").type(`Edit{enter}`);

    cy.get("ul li")
      .first()
      .within(() => {
        cy.get("span").should("have.text", `${newItem}Edit`);
      });
  });

  it("handles task filtering", () => {
    cy.get("nav div[aria-label='Uncompleted']").click();
    cy.get("ul li[data-task-completed]").should("have.length", 1);

    cy.get("nav div[aria-label='Completed']").click();
    cy.get("ul li[data-task-completed]").should("have.length", 0);

    cy.get("nav div[aria-label='All']").click();
    cy.get("ul li[data-task-completed]").should("have.length", 1);
  });

  it("handles task search", () => {
    const searchedTaskTitle = "Im here";

    cy.get("input[placeholder='Add task']").type(`${searchedTaskTitle}{enter}`);
    cy.get("input").first().type("HERE");

    cy.get("ul li[data-task-completed]")
      .should("have.length", 1)
      .within(() => {
        cy.get("span").should("have.text", `${searchedTaskTitle}`);
      });
  });

  it("theme switching", () => {
    const switchThemeButton = cy.get("button[aria-label='Switch theme']");

    switchThemeButton.click();
    switchThemeButton.should(
      "have.css",
      "background-color",
      "rgb(255, 255, 255)"
    );
  });
});
