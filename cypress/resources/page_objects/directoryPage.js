/// <reference types="cypress" />

export class DirectoryPage {

    findProfessional(firstName, lastname, jobTitle = null, location = null) {
        cy.openLeftMenu('Directory')
        if (firstName) {
            cy.typeIntoTextField('Employee Name', firstName)
            cy.get('[role="option"]').contains(firstName + ' ' + lastname).click()
        }
        if (jobTitle) {
            cy.selectInDropbox(jobTitle)
            if (location) {
                cy.selectInDropbox(location)
            }
        }
        cy.get('button[type="submit"]').click()
        cy.get('.orangehrm-directory-card-header').contains(firstName).click()
        cy.get('.orangehrm-corporate-directory-sidebar').should('contain', firstName + '  ' + lastname)
    }
}

export const onDirectoryPage = new DirectoryPage()