/// <reference types="cypress" />

let randomAcronym = null;

export class LeavePage {

    /**
    * Command: `addLeaveType`
    * 
    * Description:
    * Create a new leave type.
    * 
    * Usage:
    * onLeavePage.addLeaveType('leave', 'state')
    * 
    * Parameters:
    * - `leave` (String): Leave type.
    * - `state` (String): True or False, this is related to the entitlement situational.
    * 
    * Example:
    * onLeavePage.addLeaveType('Carnival', 'True')
    */
    addLeaveType(leave, state) {
        cy.openLeftMenu('Leave')
        cy.selectSubMenu('Configure', 'Leave Types')
        cy.clickAdd()
        cy.getRandomString(3).then((randomString) => {
            cy.log('Random acronym: ', randomString)
            cy.typeIntoTextField('Name', randomString + " - " + leave)
            randomAcronym = randomString + " - "
        })
        cy.get('[type="radio"][value=' + state + ']').click({ force: true })
        cy.clickSubmit()
    }

    /**
    * Command: `deleteLeaveType`
    * 
    * Description:
    * Find and delete a leave type.
    * 
    * Usage:
    * onLeavePage.deleteLeaveType('leave')
    * 
    * Parameters:
    * - `leave` (String): Leave type to be deleted.
    * 
    * Example:
    * onLeavePage.deleteLeaveType('Carnival')
    */
    deleteLeaveType(leave) {
        cy.openLeftMenu('Leave')
        cy.selectSubMenu('Configure', 'Leave Types')
        if (randomAcronym) {
            cy.findAndDelete(randomAcronym + leave)
        } else {
            cy.findAndDelete(leave)
        }
    }
}

export const onLeavePage = new LeavePage()