/// <reference types="cypress" />

export class RecruitmentPage {

    /**
    * Command: `addCandidate`
    * 
    * Description:
    * Create a new candidate with full name, email and phone.
    * 
    * Usage:
    * onRecruitmentPage.addCandidate('name', 'middle', 'last', 'email', 'phone')
    * 
    * Parameters:
    * - `name` (String): First name.
    * - `middle` (String): Middle name.
    * - `last` (String): Last name.
    * - `email` (String): Email must contain @.
    * - `phone` (Int): Contact number.
    *
    * Example:
    * onRecruitmentPage.addCandidate('Gabriel', 'Henrique', 'Martins', 'test@test.com', '1000')
    */
    addCandidate(name, middle, last, email, phone) {
        cy.openLeftMenu('Recruitment')
        cy.selectSubMenu('Candidates')
        cy.clickAdd()
        cy.get('[placeholder="First Name"]').type(name)
        cy.get('[placeholder="Middle Name"]').type(middle)
        cy.get('[placeholder="Last Name"]').type(last)
        cy.typeIntoTextField('Email', email)
        cy.typeIntoTextField('Contact Number', phone)
        cy.get('label .bi-check').click()
        cy.clickSubmit()
    }

    /**
    * Command: `deleteCandidate`
    * 
    * Description:
    * Find and delete a candidate by name.
    * 
    * Usage:
    * onRecruitmentPage.deleteCandidate('name')
    * 
    * Parameters:
    * - `name` (String): Candidate to be deleted.
    *
    * Example:
    * onRecruitmentPage.deleteCandidate('Gabriel')
    */
    deleteCandidate(name) {
        cy.openLeftMenu('Recruitment')
        cy.selectSubMenu('Candidates')
        cy.findAndDelete(name)
    }
}

export const onRecruitmentPage = new RecruitmentPage()