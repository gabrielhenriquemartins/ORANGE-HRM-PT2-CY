/// <reference types="cypress" />

export class DashboardPage {

    /**
    * Command: `DashboardPage`
    * 
    * Description:
    * Verify if the page contains the expense title, and get the current url.
    * The url is saved in 'cypress/fixtures/claimUrl.json'
    * 
    * Example:
    * onDashboardPage.checkDashboard('Time at Work')
    */
    checkDashboard(dashboard) {
        cy.get('.oxd-text').should('contain', dashboard)
    }
}

export const onDashboardPage = new DashboardPage()