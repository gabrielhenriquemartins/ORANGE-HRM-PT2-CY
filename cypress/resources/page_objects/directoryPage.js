/// <reference types="cypress" />

export class DirectoryPage {
    /**
    * Command: `findProfessional`
    * 
    * Description:
    * Find a given professional by name, job title or location. Then, the script select
    * the professional and check if the right menu is opened with the given name.
    * 
    * Usage:
    * onDirectoryPage.findProfessional('firstName', 'lastname', 'jobTitle', 'location')
    * 
    * Parameters:
    * - `firstName` (String): First employee name.
    * - `lastname` (String): Last Employee name.
    * - `jobTitle` (String): (Optional) Job title.
    * - `location` (String): (Optional) Location.
    * 
    * Example:
    * onDirectoryPage.findProfessional('Gabriel', 'Martins')
    */
    findProfessional(firstName, lastname, jobTitle = null, location = null) {
        cy.openLeftMenu('Directory')
        if (firstName) {
            cy.typeIntoTextField('Employee Name', firstName)
            cy.selectOption(firstName + ' ' + lastname)
        }
        if (jobTitle) {
            cy.selectInDropbox(jobTitle)
            if (location) {
                cy.selectInDropbox(location)
            }
        }
        cy.clickSubmit()
        cy.get('.orangehrm-directory-card-header').contains(firstName).click()
        cy.get('.orangehrm-corporate-directory-sidebar').should('contain', firstName + '  ' + lastname)
    }
}

export const onDirectoryPage = new DirectoryPage()