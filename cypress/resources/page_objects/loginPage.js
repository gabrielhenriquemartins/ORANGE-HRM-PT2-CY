/// <reference types="cypress" />

export class LoginPage {

    checkInvalidCredentialsWithRandomUsernameAndPassword() {
        cy.loginPage()
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Username: ', randomString)
            cy.get('input[placeholder="Username"]').type(randomString)
        })
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Password: ', randomString)
            cy.get('input[placeholder="Password"]').type(randomString)
        })
        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain', 'Invalid credentials')
    }

    checkRequiredPassword() {
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Username: ', randomString)
            cy.get('input[placeholder="Username"]').type(randomString)
        })
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    }

    checkRequiredUsername() {
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Password: ', randomString)
            cy.get('input[placeholder="Password"]').type(randomString)
        })
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    }

    checkRequiredUsernameAndPassword() {
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-field-error-message').eq(0).should('contain', 'Required')
        cy.get('.oxd-input-field-error-message').eq(1).should('contain', 'Required')
    }

    checkOrangeHomePage() {
        cy.get('[href="http://www.orangehrm.com"]').invoke('attr', 'href').then(() => {
            cy.origin('https://www.orangehrm.com', () => {
                cy.on('uncaught:exception', (e) => {
                    // Suppress the specific 'Masonry is not defined' error
                    if (e.message.includes('Masonry is not defined')) {
                        // we expected this error, so let's ignore it
                        return false;
                    }
                })
                cy.visit('https://www.orangehrm.com')
                cy.get('title').should('contain', 'Human Resources Management Software | OrangeHRM')
            })
        })
    }

    checkOrangeHomePage() {
        cy.get('form .orangehrm-login-forgot').click()
        cy.get('form h6').should('contain', 'Reset Password')
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Username: ', randomString)
            cy.get('input[placeholder="Username"]').type(randomString)
        })
        cy.get('button[type="submit"]').click()
        cy.get('div h6').should('contain', 'Reset Password link sent successfully')
    }
}



export const onLoginPage = new LoginPage()