/// <reference types="cypress" />

let claimEndpoint = null



export class ClaimPage {

    /**
    * Command: `createAnEvent`
    * 
    * Description:
    * Create a new event with a description.
    * 
    * Usage:
    * onClaimPage.createAnEvent('event', 'description')
    * 
    * Parameters:
    * - `event` (String): Event to be created.
    * - `description` (String): Event description.
    * 
    * Example:
    * onClaimPage.createAnEvent('Carnival', 'Brazilian holiday!')
    */
    createAnEvent(event, description) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Events')
        cy.clickAdd()
        cy.typeIntoTextField('Event Name', event)
        cy.typeIntoTextArea(description)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteAnEvent`
    * 
    * Description:
    * Find and delete a new event.
    * 
    * Usage:
    * onClaimPage.deleteAnEvent('event')
    * 
    * Parameters:
    * - `event` (String): Event to be deleted.
    * 
    * Example:
    * onClaimPage.deleteAnEvent('Carnival')
    */
    deleteAnEvent(event) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Events')
        cy.findAndDelete(event)
    }

    /**
    * Command: `createAnExpenseType`
    * 
    * Description:
    * Create a new expense type with a description.
    * 
    * Usage:
    * onClaimPage.createAnExpenseType('expense', 'description')
    * 
    * Parameters:
    * - `expense` (String): Expense type to be created.
    * - `description` (String): Expense type description.
    * 
    * Example:
    * onClaimPage.createAnExpenseType('Expense_test', 'Expense description!')
    */
    createAnExpenseType(expense, description) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Expense Types')
        cy.clickAdd()
        cy.typeIntoTextField('Name', expense)
        cy.typeIntoTextArea(description)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteAnExpenseType`
    * 
    * Description:
    * Find and delete an expense type.
    * 
    * Usage:
    * onClaimPage.deleteAnExpenseType('expense')
    * 
    * Parameters:
    * - `expense` (String): Expense type to be deleted.
    * 
    * Example:
    * onClaimPage.deleteAnExpenseType('Expense Test')
    */
    deleteAnExpenseType(expense) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Expense Types')
        cy.findAndDelete(expense)
    }

    /**
    * Command: `submitClaim`
    * 
    * Description:
    * Create a new claim type with a associate currency and remarks.
    * 
    * Usage:
    * onClaimPage.submitClaim('claim', 'currency', 'remarks')
    * 
    * Parameters:
    * - `claim` (String): Claim to be created.
    * - `currency` (String): Currency of the event.
    * - `remarks` (String): Claim remarks.
    * 
    * Example:
    * onClaimPage.submitClaim('Accommodation', 'Canadian Dollar', 'My Remarks')
    */
    submitClaim(claim, currency, remarks) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Submit Claim')
        cy.selectInDropbox(claim)
        cy.selectInDropbox(currency)
        cy.typeIntoTextArea(remarks)
        cy.clickSubmit()
    }

    /**
    * Command: `addExpenses`
    * 
    * Description:
    * Create a new expense with the associate amount.
    * 
    * Usage:
    * onClaimPage.addExpenses('expense', 'amount')
    * 
    * Parameters:
    * - `expense` (String): Expense to be created.
    * - `amount` (Int): Expense spent.
    * 
    * Example:
    * onClaimPage.addExpenses('Transport', '20')
    */
    addExpenses(expense, amount) {
        cy.fixture('claimUrl.json').then((data) => {
            cy.visit(data.url);
            cy.clickAdd()
            cy.selectInDropbox(expense)
            cy.typeIntoTextField('Amount', amount)
            cy.get('.bi-calendar').click()
            cy.get('.oxd-calendar-date.--today').click()
            cy.clickSubmit()
        })
    }

    /**
    * Command: `deleteExpenses`
    * 
    * Description:
    * Find and delete an expense.
    * 
    * Usage:
    * onClaimPage.deleteExpenses('expense')
    * 
    * Parameters:
    * - `expense` (String): Expense to be deleted.
    * 
    * Example:
    * onClaimPage.deleteExpenses('Transport')
    */
    deleteExpenses(expense) {
        cy.fixture('claimUrl.json').then((data) => {
            cy.visit(data.url)
            cy.findAndDelete(expense)
        })
    }

    /**
    * Command: `addPdfToClaim`
    * 
    * Description:
    * Associate a pdf file to a claim.
    * 
    * Example:
    * onClaimPage.addPdfToClaim()
    */
    addPdfToClaim() {
        cy.fixture('claimUrl.json').then((data) => {
            cy.visit(data.url);
            cy.get('.orangehrm-action-header').eq(1).contains(' Add ').click()
            cy.get('input[type="file"]').selectFile('cypress/utils/files/pdf_test.pdf', { force: true })
            cy.get('.oxd-file-input-div').should('contain', 'pdf_test.pdf')
            cy.clickSubmit()
        })
    }

    /**
    * Command: `deletePdfOfClaim`
    * 
    * Description:
    * Find and delete a pdf file associate to a claim.
    * 
    * Example:
    * onClaimPage.deletePdfOfClaim()
    */
    deletePdfOfClaim() {
        cy.fixture('claimUrl.json').then((data) => {
            cy.visit(data.url)
            cy.findAndDelete('pdf_test.pdf')
        })
    }

    getCurrentUrl() {
        cy.get('h6').should('contain', 'Expenses')
        cy.url().then((url) => {
            cy.writeFile('cypress/fixtures/claimUrl.json', { url })
        })
    }
}

export const onClaimPage = new ClaimPage()