/// <reference types="cypress" />

export class DashboardPage {

    checkDashboard(dashboard) {
        cy.get('.oxd-text').should('contain', dashboard)
    }
}

export const onDashboardPage = new DashboardPage()