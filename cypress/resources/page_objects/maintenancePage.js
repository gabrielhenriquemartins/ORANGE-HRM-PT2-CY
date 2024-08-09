/// <reference types="cypress" />

export class MaintenancePage {

    /**
    * Command: `purgeCandidateRecords`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Check if there are some data to be purge and purge all. Otherwise,
    * verify the no records pop-up.
    * 
    * Usage:
    * cy.purgeCandidateRecords('vacancy')
    * 
    * Parameters:
    * - `vacancy` (String): Vacancy.
    *
    * Example:
    * onMaintenancePage.purgeCandidateRecords('Software Engineer')
    */
    purgeCandidateRecords(vacancy) {
        cy.openLeftMenu('Maintenance')
        cy.get('[type="password"]').type('admin123')
        cy.clickSubmit()
        cy.selectSubMenu('Purge Records', 'Candidate Records')
        cy.typeIntoTextField('Vacancy', vacancy)
        cy.selectOption(vacancy)
        cy.clickSubmit()
        cy.get('.orangehrm-horizontal-padding').find('.oxd-text').invoke('text').then((text) => {
            if (text.trim() === 'No Records Found') {
                cy.checkPopUpAndClose('No Records Found')
            } else {
                cy.get('button').contains('Purge All').click()
                cy.get('button').contains(' Yes, Purge ').click()
                cy.checkPopUpAndClose('Successfully Purged')
            }
        })
    }
}

export const onMaintenancePage = new MaintenancePage()