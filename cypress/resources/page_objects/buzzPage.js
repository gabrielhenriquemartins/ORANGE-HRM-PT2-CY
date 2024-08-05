/// <reference types="cypress" />

export class BuzzPage {

    postAMessage(message) {
        cy.openLeftMenu('Buzz')
        cy.get('textarea.oxd-buzz-post-input').type(message)
        cy.get('button[type="submit"]').click()
    }

    checkFirstPublishedMessage(message) {
        cy.openLeftMenu('Buzz')
        cy.get('.orangehrm-buzz-post-body .oxd-text').eq(0).should('contain', message)
    }

    likeAMessage() {
        cy.openLeftMenu('Buzz')
        cy.get('.oxd-grid-item .orangehrm-buzz-stats-row').eq(0).find('.oxd-text').should('contain', '0 Likes')
        cy.get('.oxd-grid-item .orangehrm-buzz-post-actions').eq(0).find('#heart-svg').click()
        cy.get('.oxd-grid-item .orangehrm-buzz-stats-row').eq(0).find('.oxd-text').should('contain', '1 Like')
    }
}

export const onBuzzPage = new BuzzPage()