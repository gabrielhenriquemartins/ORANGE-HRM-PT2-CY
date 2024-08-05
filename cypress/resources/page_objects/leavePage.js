/// <reference types="cypress" />

let randomAcronym = null;

export class LeavePage {

    addLeaveType(leave, state) {
        cy.openLeftMenu('Leave')
        cy.selectSubMenu('Configure', 'Leave Types')
        cy.get('button').contains(' Add ').click()
        cy.getRandomString(3).then((randomString) => {
            cy.log('Random acronym: ', randomString)
            cy.typeIntoTextField('Name', randomString + " - " + leave)
            randomAcronym = randomString + " - "
        })
        cy.get('[type="radio"][value=' + state + ']').click({ force: true })
        cy.get('button[type="submit"]').click()
    }

    deleteLeaveType(leave) {
        cy.openLeftMenu('Leave')
        cy.selectSubMenu('Configure', 'Leave Types')
        if (randomAcronym) {
            cy.get('.oxd-table-card').contains(randomAcronym + leave).then(tableRow => {
                cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
            })
        } else {
            cy.get('.oxd-table-card').contains(leave).then(tableRow => {
                cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
            })
        }
        cy.get('button').contains(' Yes, Delete ').click()
    }
}

export const onLeavePage = new LeavePage()