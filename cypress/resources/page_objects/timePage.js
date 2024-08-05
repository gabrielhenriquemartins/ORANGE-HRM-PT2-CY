/// <reference types="cypress" />

export class TimePage {

    addPunchInPunchOut(descriptionIn) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Attendance', 'Punch In/Out')
        cy.get('.orangehrm-card-container h6').invoke('text').then((text) => {
            if (text.trim() === 'Punch Out') {
                cy.get('button[type="submit"]').click()
                cy.checkPopUpAndClose('Successfully Saved')
            }
        })
        cy.get('.orangehrm-card-container h6').should('contain', 'Punch In')
        cy.get('textarea.oxd-textarea').eq(0).type(descriptionIn)
        cy.get('button[type="submit"]').click()
        cy.checkPopUpAndClose('Successfully Saved')
        cy.get('.orangehrm-card-container h6').should('contain', 'Punch Out')
        cy.get('button[type="submit"]').click()
    }

    deletePunchInPunchOut(descriptionIn) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Attendance', 'My Records')
        cy.get('.oxd-table-card').contains(descriptionIn).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addCostumer(costumer, description) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Customers')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Name', costumer)
        cy.get('textarea.oxd-textarea').eq(0).type(description)
        cy.get('button[type="submit"]').click()
    }

    deleteCostumer(costumer) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Customers')
        cy.get('.oxd-table-card').contains(costumer).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addProjectAndActivity(name, customer, activity, description) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Projects')
        cy.get('button').contains(' Add ').click()
        cy.typeIntoTextField('Name', name)
        cy.typeIntoTextField('Customer Name', customer)
        cy.get('[role="option"]').contains(customer).click()
        cy.get('textarea.oxd-textarea').type(description)
        cy.get('button[type="submit"]').click()
        cy.checkPopUpAndClose('Successfully Saved')
        cy.get('.oxd-text').should('contain', 'No Records Found')
        cy.checkPopUpAndClose('No Records Found')
        cy.get('.orangehrm-header-container').contains('Add').click()
        cy.get('[role="document"] .oxd-input-group').find('input').clear().type(activity)
        cy.get('[role="document"] button[type="submit"]').click()
    }

    addRowInMyTimesheet(project, activity) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Timesheets', 'My Timesheets')
        cy.get('[type="button"]').contains('Edit').click()
        cy.get('input[placeholder="Type for hints..."]').clear().type(project)
        cy.get('[role="option"]').contains(project).click()
        cy.selectInDropbox(activity)
        cy.get('.oxd-input-group .oxd-input').clear().eq(2).type('10:00')
        cy.get('button[type="submit"]').click()
    }
}

export const onTimePage = new TimePage()