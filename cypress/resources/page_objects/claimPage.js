/// <reference types="cypress" />

let claimEndpoint = null

export class ClaimPage {

    createAnEvent(event, description) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Events')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Event Name', event)
        cy.get('textarea.oxd-textarea').type(description)
        cy.get('textarea.oxd-textarea').invoke('prop', 'value').should('contain', description)
        cy.get('button[type="submit"]').click()
    }

    deleteAnEvent(event) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Events')
        cy.get('.oxd-table-card').contains(event).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    createAnExpenseType(expense, description) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Expense Types')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Name', expense)
        cy.get('textarea.oxd-textarea').type(description)
        cy.get('textarea.oxd-textarea').invoke('prop', 'value').should('contain', description)
        cy.get('button[type="submit"]').click()
    }

    deleteAnExpenseType(expense) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Configuration', 'Expense Types')
        cy.get('.oxd-table-card').contains(expense).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    submitClaim(event, currency, remarks) {
        cy.openLeftMenu('Claim')
        cy.selectSubMenu('Submit Claim')
        cy.selectInDropbox(event)
        cy.selectInDropbox(currency)
        cy.get('textarea.oxd-textarea').type(remarks)
        cy.get('textarea.oxd-textarea').invoke('prop', 'value').should('contain', remarks)
        cy.get('button[type="submit"]').click()
    }

    getCurrentUrl() {
        cy.get('h6').should('contain', 'Expenses')
        cy.url().then((url) => {
            cy.writeFile('cypress/fixtures/savedUrl.json', { url })
        })
    }

    addExpenses(expense, amount) {
        cy.fixture('savedUrl.json').then((data) => {
            cy.visit(data.url);
            cy.get('.orangehrm-action-header').eq(0).contains(' Add ').click()
            cy.selectInDropbox(expense)
            cy.typeIntoTextField('Amount', amount)
            cy.get('.bi-calendar').click()
            cy.get('.oxd-calendar-date.--today').click()
            cy.get('button[type="submit"]').click()
        })
    }

    deleteExpenses(expense) {
        cy.fixture('savedUrl.json').then((data) => {
            cy.visit(data.url)
            cy.get('.oxd-table-card').contains(expense).then(tableRow => {
                cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
            })
            cy.get('button').contains(' Yes, Delete ').click()
        })
    }

    addPdfToClaim() {
        cy.fixture('savedUrl.json').then((data) => {
            cy.visit(data.url);
            cy.get('.orangehrm-action-header').eq(1).contains(' Add ').click()
            cy.get('input[type="file"]').selectFile('cypress/utils/files/pdf_test.pdf', { force: true })
            cy.get('.oxd-file-input-div').should('contain', 'pdf_test.pdf')
            cy.get('button[type="submit"]').click()
        })
    }

    deletePdfOfClaim() {
        cy.fixture('savedUrl.json').then((data) => {
            cy.visit(data.url);
            cy.get('.oxd-table-card').contains('pdf_test.pdf').then(tableRow => {
                cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
            })
            cy.get('button').contains(' Yes, Delete ').click()
        })
    }
}

export const onClaimPage = new ClaimPage()