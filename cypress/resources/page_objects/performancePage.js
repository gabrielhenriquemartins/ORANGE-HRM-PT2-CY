/// <reference types="cypress" />

export class PerformancePage {

    addKpi(name, jobTitle) {
        cy.openLeftMenu('Performance')
        cy.selectSubMenu('Configure', 'KPIs')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Key Performance Indicator', name)
        cy.selectInDropbox(jobTitle)
        cy.get('button[type="submit"]').click()
    }

    deleteKpi(name) {
        cy.openLeftMenu('Performance')
        cy.selectSubMenu('Configure', 'KPIs')
        cy.get('.oxd-table-card').contains(name).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }
}

export const onPerformancePage = new PerformancePage()