/// <reference types="cypress" />

export class MyInfoPage {

    addPdfToProfile() {
        cy.openLeftMenu('My Info')
        cy.get('.orangehrm-action-header').eq(0).contains(' Add ').click()
        cy.get('input[type="file"]').selectFile('cypress/utils/files/pdf_test.pdf', { force: true })
        cy.get('.oxd-file-input-div').should('contain', 'pdf_test.pdf')
        cy.get('button[type="submit"]').eq(2).click()
    }

    deletePdfFromProfile() {
        cy.openLeftMenu('My Info')
        cy.get('.oxd-table-card').contains('pdf_test.pdf').then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }
}

export const onMyInfoPage = new MyInfoPage()