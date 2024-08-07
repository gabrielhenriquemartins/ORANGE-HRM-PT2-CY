/// <reference types="cypress" />

export class PerformancePage {

    /**
    * Command: `addKpi`
    * 
    * Description:
    * Create a new kpi.
    * 
    * Usage:
    * onPerformancePage.addKpi('expense', 'amount')
    * 
    * Parameters:
    * - `name` (String): Key Performance indicator.
    * - `jobTitle` (String): Job title.
    * 
    * Example:
    * onPerformancePage.addKpi('Active Defects', 'Account Assistant')
    */
    addKpi(name, jobTitle) {
        cy.openLeftMenu('Performance')
        cy.selectSubMenu('Configure', 'KPIs')
        cy.clickAdd()
        cy.typeIntoTextField('Key Performance Indicator', name)
        cy.selectInDropbox(jobTitle)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteKpi`
    * 
    * Description:
    * Find and delete a KPI.
    * 
    * Usage:
    * onPerformancePage.deleteKpi('name')
    * 
    * Parameters:
    * - `name` (String): KPI to be deleted.
    *
    * Example:
    * onPerformancePage.deleteKpi('Active Defects')
    */
    deleteKpi(name) {
        cy.openLeftMenu('Performance')
        cy.selectSubMenu('Configure', 'KPIs')
        cy.findAndDelete(name)
    }
}

export const onPerformancePage = new PerformancePage()