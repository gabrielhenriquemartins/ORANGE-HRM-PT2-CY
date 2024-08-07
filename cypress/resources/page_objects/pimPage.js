/// <reference types="cypress" />

export class PimPage {

    /**
    * Command: `addEmployee`
    * 
    * Description:
    * Create a new employee with an unique id.
    * Must be specified the first and last name.
    * 
    * Usage:
    * onPimPage.addEmployee('name', 'last', 'id')
    * 
    * Parameters:
    * - `name` (String): Employee first name.
    * - `last` (String): Employee last name.
    * - `id` (Int): Employee identifier.
    * 
    * Example:
    * onPimPage.addEmployee('Gabriel', 'Martins', '8884')
    */
    addEmployee(name, last, id) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Add Employee')
        cy.get('[placeholder="First Name"]').type(name)
        cy.get('[placeholder="Last Name"]').type(last)
        cy.typeIntoTextField('Employee Id', id)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteEmployee`
    * 
    * Description:
    * Find and delete an employee by its id.
    * 
    * Usage:
    * onPimPage.deleteEmployee('employeeId')
    * 
    * Parameters:
    * - `employeeId` (String): Employee id to be deleted.
    *
    * Example:
    * onPimPage.deleteEmployee('8884')
    */
    deleteEmployee(employeeId) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Employee List')
        cy.findAndDelete(employeeId)
    }

    /**
    * Command: `addTerminationReason`
    * 
    * Description:
    * Create a new termination reason.
    * 
    * Usage:
    * onPimPage.addTerminationReason('reason')
    * 
    * Parameters:
    * - `reason` (String): New termination reason.
    * 
    * Example:
    * onPimPage.addTerminationReason('Vacation')
    */
    addTerminationReason(reason) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Termination Reasons')
        cy.clickAdd()
        cy.typeIntoTextField('Name', reason)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteTerminationReason`
    * 
    * Description:
    * Find and delete a termination reason.
    * 
    * Usage:
    * onPimPage.deleteTerminationReason('reason')
    * 
    * Parameters:
    * - `reason` (String): Termination reason to be deleted.
    *
    * Example:
    * onPimPage.deleteTerminationReason('Vacation')
    */
    deleteTerminationReason(reason) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Termination Reasons')
        cy.findAndDelete(reason)
    }

    /**
    * Command: `addReportingMethod`
    * 
    * Description:
    * Create a new reporting method.
    * 
    * Usage:
    * onPimPage.addReportingMethod('method')
    * 
    * Parameters:
    * - `method` (String): New reporting method.
    * 
    * Example:
    * onPimPage.addReportingMethod('One-o-one')
    */
    addReportingMethod(method) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Reporting Methods')
        cy.clickAdd()
        cy.typeIntoTextField('Name', method)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteReportingMethod`
    * 
    * Description:
    * Find and delete a reporting method.
    * 
    * Usage:
    * onPimPage.deleteReportingMethod('method')
    * 
    * Parameters:
    * - `method` (String): Reporting method to be deleted.
    *
    * Example:
    * onPimPage.deleteReportingMethod('One-o-one')
    */
    deleteReportingMethod(method) {
        cy.openLeftMenu('PIM')
        cy.selectSubMenu('Configuration', 'Reporting Methods')
        cy.findAndDelete(method)
    }

}

export const onPimPage = new PimPage()