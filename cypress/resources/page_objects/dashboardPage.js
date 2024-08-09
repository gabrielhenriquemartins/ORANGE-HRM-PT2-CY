/// <reference types="cypress" />

export class DashboardPage {

    /**
    * Command: `dashboardPage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Verify if the page contains the expense title, and get the current url.
    * The url is saved in 'cypress/fixtures/claimUrl.json'
    * 
    * Usage:
    * onAdminPage.deleteSocialMediaAuthentication('name')
    * 
    * Parameters:
    * - `name` (String): Social media authentication identifier to be deleted.
    * 
    * Example:
    * onDashboardPage.checkDashboard('Time at Work')
    */
    checkDashboard(dashboard) {
        cy.get('.oxd-text').should('contain', dashboard)
    }
}

export const onDashboardPage = new DashboardPage()