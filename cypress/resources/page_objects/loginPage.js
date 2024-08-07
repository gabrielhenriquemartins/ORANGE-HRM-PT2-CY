/// <reference types="cypress" />

export class LoginPage {

    /**
    * Command: `checkInvalidCredentialsWithRandomUsernameAndPassword`
    * 
    * Description:
    * Check the invalid credentials, warning the user the wrong login.
    * 
    * Example:
    * onLoginPage.checkInvalidCredentialsWithRandomUsernameAndPassword()
    */
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
        cy.clickSubmit()
        cy.get('[role="alert"]').should('contain', 'Invalid credentials')
    }

    /**
    * Command: `checkRequiredPassword`
    * 
    * Description:
    * Check the required password, warning the user when the field is empty.
    * 
    * Example:
    * onLoginPage.checkRequiredPassword()
    */
    checkRequiredPassword() {
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Username: ', randomString)
            cy.get('input[placeholder="Username"]').type(randomString)
        })
        cy.clickSubmit()
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    }

    /**
    * Command: `checkRequiredUsername`
    * 
    * Description:
    * Check the required username, warning the user when the field is empty.
    * 
    * Example:
    * onLoginPage.checkRequiredUsername()
    */
    checkRequiredUsername() {
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Password: ', randomString)
            cy.get('input[placeholder="Password"]').type(randomString)
        })
        cy.clickSubmit()
        cy.get('.oxd-input-field-error-message').should('contain', 'Required')
    }

    /**
    * Command: `checkRequiredUsernameAndPassword`
    * 
    * Description:
    * Check the required username and password, warning the user when both fields are empty.
    * 
    * Example:
    * onLoginPage.checkRequiredUsernameAndPassword()
    */
    checkRequiredUsernameAndPassword() {
        cy.clickSubmit()
        cy.get('.oxd-input-field-error-message').eq(0).should('contain', 'Required')
        cy.get('.oxd-input-field-error-message').eq(1).should('contain', 'Required')
    }

    /**
    * Command: `checkOrangeHomePage`
    * 
    * Description:
    * Check the orange official home page. There is a expected error related to mansory.
    * 
    * Example:
    * onLoginPage.checkOrangeHomePage()
    */
    checkOrangeHomePage() {
        cy.get('[href="http://www.orangehrm.com"]').invoke('attr', 'href').then(() => {
            cy.origin('https://www.orangehrm.com', () => {
                cy.on('uncaught:exception', (e) => {
                    if (e.message.includes('Masonry is not defined')) {
                        return false;
                    }
                })
                cy.visit('https://www.orangehrm.com')
                cy.get('title').should('contain', 'Human Resources Management Software | OrangeHRM')
            })
        })
    }

    /**
    * Command: `checkForgottenPasswordEmail`
    * 
    * Description:
    * Check the email to be sent when the user forget the password.
    * 
    * Example:
    * onLoginPage.checkForgottenPasswordEmail()
    */
    checkForgottenPasswordEmail() {
        cy.get('form .orangehrm-login-forgot').click()
        cy.get('form h6').should('contain', 'Reset Password')
        cy.getRandomString(8).then((randomString) => {
            cy.log('Random Username: ', randomString)
            cy.get('input[placeholder="Username"]').type(randomString)
        })
        cy.clickSubmit()
        cy.get('div h6').should('contain', 'Reset Password link sent successfully')
    }
}

export const onLoginPage = new LoginPage()