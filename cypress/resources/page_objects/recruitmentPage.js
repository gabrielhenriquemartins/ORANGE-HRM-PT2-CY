/// <reference types="cypress" />

export class RecruitmentPage {

    addCandidate(name, middle, last, email, phone) {
        cy.openLeftMenu('Recruitment')
        cy.selectSubMenu('Candidates')
        cy.get('button').contains(' Add ').click()
        cy.get('[placeholder="First Name"]').type(name)
        cy.get('[placeholder="Middle Name"]').type(middle)
        cy.get('[placeholder="Last Name"]').type(last)
        cy.typeIntoTextField('Email', email)
        cy.typeIntoTextField('Contact Number', phone)
        cy.get('label .bi-check').click()
        cy.get('button[type="submit"]').click()
    }

    deleteCandidate(name) {
        cy.openLeftMenu('Recruitment')
        cy.selectSubMenu('Candidates')
        cy.get('.oxd-table-card').contains(name).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }
}

export const onRecruitmentPage = new RecruitmentPage()