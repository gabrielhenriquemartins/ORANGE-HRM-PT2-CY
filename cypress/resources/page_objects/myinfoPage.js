/// <reference types="cypress" />

export class MyInfoPage {

    /**
    * Command: `addPdfToProfile`
    * 
    * Description:
    * Add a pdf to the current profile.
    * 
    * Example:
    * onMyInfoPage.addPdfToProfile()
    */
    addPdfToProfile() {
        cy.openLeftMenu('My Info')
        cy.clickAdd()
        // cy.get('.orangehrm-action-header').eq(0).contains(' Add ').click()
        cy.get('input[type="file"]').selectFile('cypress/utils/files/pdf_test.pdf', { force: true })
        cy.get('.oxd-file-input-div').should('contain', 'pdf_test.pdf')
        cy.clickSubmit(2)
    }

    /**
    * Command: `deletePdfFromProfile`
    * 
    * Description:
    * Find and delete the pdf 'pdf_test.pdf'.
    * 
    * Example:
    * onMyInfoPage.deletePdfFromProfile()
    */
    deletePdfFromProfile() {
        cy.openLeftMenu('My Info')
        cy.findAndDelete('pdf_test.pdf')
    }
}

export const onMyInfoPage = new MyInfoPage()