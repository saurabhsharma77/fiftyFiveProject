//  To store all the locators on todo Page https://example.cypress.io/todo#/
class ToDoPage
{
    getNewToDoTextBox()
    {
        return cy.get('body > section > div > header > input')
    }

    getAllTaskLink()
    {
        return cy.get('body > section > div > footer > ul > li:nth-child(1) > a')
    }

    getActiveTaskLink()
    {
        return cy.get('body > section > div > footer > ul > li:nth-child(3) > a')
    }

    getCompletedTaskLink()
    {
        return cy.get('body > section > div > footer > ul > li:nth-child(5) > a')
    }
}
//To make this class available across the framework
export default ToDoPage;