import { onAdminPage } from "../resources/page_objects/adminPage";
import { onLoginPage } from "../resources/page_objects/loginPage";


let firstTestFailed = false;

describe('0 - Pipeline Login', () => {
    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
    })

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            firstTestFailed = true;
        }
    })

    it('Check Invalid Credentials', () => {
        cy.loginPage()
        onLoginPage.checkInvalidCredentialsWithRandomUsernameAndPassword()
    })

    it('Check Required Password', () => {
        cy.loginPage()
        onLoginPage.checkRequiredPassword()
    })

    it('Check Required Username', () => {
        cy.loginPage()
        onLoginPage.checkRequiredUsername()
    })

    it('Check Required Username and Password', () => {
        cy.loginPage()
        onLoginPage.checkRequiredUsernameAndPassword()
    })

    it('Check Official Orange Home Page', () => {
        cy.loginPage()
        onLoginPage.checkOrangeHomePage()
    })

    it('Check Forgot Password and Email Message Sent', () => {
        cy.loginPage()
        onLoginPage.checkOrangeHomePage()
    })

    it('Login as Admin', () => {
        cy.loginPage()
        cy.loginAsAdmin()
    })
})

describe('1 - Admin', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        cy.restoreSession()
        cy.adminPage()
    })

    it('Add Job Title', () => {
        onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Job Title', () => {
        onAdminPage.deleteJobTitle('Senior DevOps')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Location', () => {
        onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Location', () => {
        onAdminPage.deleteLocation('R&D')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Language', () => {
        onAdminPage.addLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Language', () => {
        onAdminPage.deleteLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Membership', () => {
        onAdminPage.addMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Membership', () => {
        onAdminPage.deleteMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Nationality', () => {
        onAdminPage.addNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Nationality', () => {
        onAdminPage.deleteNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Send Email Configuration', () => {
        onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
        cy.checkPopUpAndClose('Test Email Sent')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Add Social Media Authentication', () => {
        onAdminPage.addSocialMediaAuthentication('provider_test', 'provider.com', '123456', '123456')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Social Media Authentication', () => {
        onAdminPage.deleteSocialMediaAuthentication('provider_test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })


})