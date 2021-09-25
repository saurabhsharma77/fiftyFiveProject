/// <reference types="cypress" />
import ToDoPage from '../support/pageObjects/ToDoPage'

describe('TodoMVC', function () {
  // set up these constants to match what TodoMVC does
  let TODO_ITEM_ONE = 'Pay electric bill'
  let TODO_ITEM_TWO = 'Walk the dog'
  
  before(function () {
    cy.visit(Cypress.env('baseUrl'))
  })

  context('New Todo', function () {
    it('should allow me to add todo items', function () {
      cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')
      cy.get('.todo-list li').eq(0).find('label').should('contain', TODO_ITEM_ONE)
      cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')
      cy.get('.todo-list li').eq(1).find('label').should('contain', TODO_ITEM_TWO)
    })

    it('can add new todo items', () => {
      // We'll store our item text in a variable so we can reuse it
      const newItem = 'Feed the cat'
  
      // Let's get the input element and use the `type` command to
      // input our new list item. After typing the content of our item,
      // we need to type the enter key as well in order to submit the input.
      // This input has a data-test attribute so we'll use that to select the
      // element in accordance with best practices:
      
      cy.get('.new-todo').type(`${newItem}{enter}`)
  
      // Now that we've typed our new item, let's check that it actually was added to the list.
      // Since it's the newest item, it should exist as the last element in the list.
      // In addition, with the two default items, we should have a total of 3 elements in the list.
      // Since assertions yield the element that was asserted on,
      // we can chain both of these assertions together into a single statement.
      cy.get('.todo-list li')
        .should('have.length', 3)
        .last()
        .should('have.text', newItem)
    })
  
    it('can check off an item as completed', () => {
      // In addition to using the `get` command to get an element by selector,
      // we can also use the `contains` command to get an element by its contents.
      // However, this will yield the <label>, which is lowest-level element that contains the text.
      // In order to check the item, we'll find the <input> element for this <label>
      // by traversing up the dom to the parent element. From there, we can `find`
      // the child checkbox <input> element and use the `check` command to check it.
      cy.contains('Walk the dog')
        .parent()
        .find('input[type=checkbox]')
        .check()
  
      // Now that we've checked the button, we can go ahead and make sure
      // that the list element is now marked as completed.
      // Again we'll use `contains` to find the <label> element and then use the `parents` command
      // to traverse multiple levels up the dom until we find the corresponding <li> element.
      // Once we get that element, we can assert that it has the completed class.
      cy.contains('Walk the dog')
        .parents('li')
        .should('have.class', 'completed')
    })
  
    
      it('can filter for uncompleted tasks', () => {
        // We'll click on the "active" button in order to
        // display only incomplete items
        cy.contains('Active').click()
  
        // After filtering, we can assert that there is only the two
        // incomplete item in the list.
        cy.get('.todo-list li')
          .should('have.length', 2)
          .first()
          .should('have.text', 'Pay electric bill')
  
        // For good measure, let's also assert that the task we checked off
        // does not exist on the page.
        cy.contains('Walk the dog').should('not.exist')
      })
  
      it('can filter for completed tasks', () => {
        // We can perform similar steps as the test above to ensure
        // that only completed tasks are shown
        const ToDoPageElements = new ToDoPage()
        ToDoPageElements.getCompletedTaskLink().click({ force: true })
  
        cy.get('.todo-list li')
          .should('have.length', 1)
          .first()
          .should('have.text', 'Walk the dog')
  
        cy.contains('Pay electric bill').should('not.exist')
      })
  
      it('can delete all completed tasks', () => {
        // First, let's click the "Clear completed" button
        // `contains` is actually serving two purposes here.
        // First, it's ensuring that the button exists within the dom.
        // This button only appears when at least one task is checked
        // so this command is implicitly verifying that it does exist.
        // Second, it selects the button so we can click it.
        cy.contains('Clear completed').click()
  
        // Finally, make sure that the clear button no longer exists.
        cy.contains('Clear completed').should('not.exist')
      })
    })

    })