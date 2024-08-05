/// <reference types="cypress" />

export class MaintenancePage {

    purgeCandidateRecords(vacancy) {
        cy.openLeftMenu('Maintenance')
        cy.get('[type="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.selectSubMenu('Purge Records', 'Candidate Records')
        cy.typeIntoTextField('Vacancy', vacancy)
        cy.get('[role="option"]').contains(vacancy).click()
        cy.get('button[type="submit"]').click()
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