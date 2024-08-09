/// <reference types="cypress" />

export class BuzzPage {

    /**
    * Command: `postAMessage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Publish a given message on buzz feed.
    * 
    * Usage:
    * onBuzzPage.postAMessage('message')
    * 
    * Parameters:
    * - `message` (String): Message to be published.
    * 
    * Example:
    * onBuzzPage.postAMessage('Hi everyone!')
    */
    postAMessage(message) {
        cy.openLeftMenu('Buzz')
        cy.get('textarea.oxd-buzz-post-input').type(message)
        cy.clickSubmit()
    }

    /**
    * Command: `checkFirstPublishedMessage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Check if the first message on buzz feed contains the desired text.
    * 
    * Usage:
    * onBuzzPage.checkFirstPublishedMessage('message')
    * 
    * Parameters:
    * - `message` (String): Message to be verified.
    * 
    * Example:
    * onBuzzPage.checkFirstPublishedMessage('Hi everyone!')
    */
    checkFirstPublishedMessage(message) {
        cy.openLeftMenu('Buzz')
        cy.get('.orangehrm-buzz-post-body .oxd-text').eq(0).should('contain', message)
    }

    /**
    * Command: `likeAMessage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Check if the first message contains '0 likes', then hit the heart button and check if
    * the numbers of likes change to '1 like'.
    * 
    * Example:
    * onBuzzPage.likeAMessage()
    */
    likeAMessage() {
        cy.openLeftMenu('Buzz')
        cy.get('.oxd-grid-item .orangehrm-buzz-stats-row').eq(0).find('.oxd-text').should('contain', '0 Likes')
        cy.get('.oxd-grid-item .orangehrm-buzz-post-actions').eq(0).find('#heart-svg').click()
        cy.get('.oxd-grid-item .orangehrm-buzz-stats-row').eq(0).find('.oxd-text').should('contain', '1 Like')
    }
}

export const onBuzzPage = new BuzzPage()