/// <reference types="cypress" />

export class PimPage {

    addEmployee(name, last, id) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Add Employee')
        cy.get('[placeholder="First Name"]').type(name)
        cy.get('[placeholder="Last Name"]').type(last)
        cy.typeIntoTextField('Employee Id', id)
        cy.get('button[type="submit"]').click()
    }

    deleteEmployee(employeeId) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Employee List')
        cy.get('.oxd-table-card').contains(employeeId).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addTerminationReason(reason) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Termination Reasons')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Name', reason)
        cy.get('button[type="submit"]').click()
    }

    deleteTerminationReason(reason) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Termination Reasons')
        cy.get('.oxd-table-card').contains(reason).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addReportingMethod(method) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Reporting Methods')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Name', method)
        cy.get('button[type="submit"]').click()
    }

    deleteReportingMethod(method) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Reporting Methods')
        cy.get('.oxd-table-card').contains(method).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

}

export const onPimPage = new PimPage()