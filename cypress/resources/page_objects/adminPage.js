/// <reference types="cypress" />

let randomAcronym = null;

export class AdminPage {

    /**
    * Command: `addJobTitle`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new job title with a given description and note.
    * 
    * Usage:
    * onAdminPage.addJobTitle('jobTitle', 'description', 'note')
    * 
    * Parameters:
    * - `jobTitle` (String): Job Title.
    * - `description` (String): The job title description
    * - `note` (String): The job title note.
    * 
    * Example:
    * onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
    */
    addJobTitle(jobTitle, description, note) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Job', 'Job Titles')
        cy.clickAdd()
        cy.get('input.oxd-input').eq(1).type(jobTitle)
        cy.get('input.oxd-input').eq(1).invoke('prop', 'value').should('contain', jobTitle)
        cy.get('textarea.oxd-textarea').eq(0).type(description)
        cy.get('textarea.oxd-textarea').eq(0).invoke('prop', 'value').should('contain', description)
        cy.get('textarea.oxd-textarea').eq(1).type(note)
        cy.get('textarea.oxd-textarea').eq(1).invoke('prop', 'value').should('contain', note)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteJobTitle`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given job title.
    * 
    * Usage:
    * onAdminPage.deleteJobTitle('jobTitle')
    * 
    * Parameters:
    * - `jobTitle` (String): Job Title to be deleted.
    * 
    * Example:
    * onAdminPage.deleteJobTitle('Senior DevOps')
    */
    deleteJobTitle(jobTitle) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Job', 'Job Titles')
        cy.findAndDelete(jobTitle)
    }

    /**
    * Command: `addLocation`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Create a new location with a given name, city, state, country, zip code, phone and fax.
    * 
    * Usage:
    * onAdminPage.addLocation('name', 'city', 'state', 'country', 'zip_code', 'phone', 'fax')
    * 
    * Parameters:
    * - `name` (String): Location identifier.
    * - `city` (String): The city.
    * - `state` (String): The state.
    * - `country` (String): The country.
    * - `zip_code` (Int): (Optional) zip code area.
    * - `phone` (Int): (Optional) phone.
    * - `fax` (Int): (Optional) fax.
    * 
    * Example:
    * onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
    */
    addLocation(name, city, state, country, zip_code = null, phone = null, fax = null) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Organization', 'Locations')
        cy.clickAdd()
        cy.typeIntoTextField('Name', name)
        cy.typeIntoTextField('City', city)
        cy.typeIntoTextField('State/Province', state)
        if (zip_code) {
            cy.typeIntoTextField('Zip/Postal Code', zip_code)
        }
        if (phone) {
            cy.typeIntoTextField('Phone', phone)
        }
        if (fax) {
            cy.typeIntoTextField('Fax', fax)
        }
        cy.selectInDropbox(country)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteLocation`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given location.
    * 
    * Usage:
    * onAdminPage.deleteLocation('name')
    * 
    * Parameters:
    * - `name` (String): Location identifier to be deleted.
    * 
    * Example:
    * onAdminPage.deleteLocation('R&D')
    */
    deleteLocation(name) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Organization', 'Locations')
        cy.findAndDelete(name)
    }

    addLanguage(language) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Languages')
        cy.clickAdd()
        cy.typeIntoTextField('Name', language)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteLanguage`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given language.
    * 
    * Usage:
    * onAdminPage.deleteLanguage('language')
    * 
    * Parameters:
    * - `language` (String): Language identifier to be deleted.
    * 
    * Example:
    * onAdminPage.deleteLanguage('R&D')
    */
    deleteLanguage(language) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Languages')
        cy.findAndDelete(language)
    }

    addMembership(membership) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Memberships')
        cy.clickAdd()
        cy.typeIntoTextField('Name', membership)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteMembership`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given membership.
    * 
    * Usage:
    * onAdminPage.deleteMembership('membership')
    * 
    * Parameters:
    * - `membership` (String): Membership identifier to be deleted.
    * 
    * Example:
    * onAdminPage.deleteMembership('ISTQB')
    */
    deleteMembership(membership) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Memberships')
        cy.findAndDelete(membership)
    }

    /**
    * Command: `addNationality`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Add a given nationality. To avoid duplication errors, a random string 3 chars long is added
    * at the end of the nationality name.
    * 
    * Usage:
    * onAdminPage.addNationality('nationality')
    * 
    * Parameters:
    * - `nationality` (String): Nationality identifier to be added.
    * 
    * Example:
    * onAdminPage.addNationality('Brazilian')
    */
    addNationality(nationality) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Nationalities')
        cy.clickAdd()
        cy.getRandomString(3).then((randomString) => {
            cy.log('Random Nationality: ', randomString)
            cy.typeIntoTextField('Name', nationality + " - " + randomString)
            randomAcronym = " - " + randomString
        })
        cy.clickSubmit()
    }

    /**
    * Command: `deleteNationality`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given nationality.
    * 
    * Usage:
    * onAdminPage.deleteNationality('nationality')
    * 
    * Parameters:
    * - `nationality` (String): Nationality identifier to be deleted.
    * 
    * Example:
    * onAdminPage.deleteNationality('Brazilian')
    */
    deleteNationality(nationality) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Nationalities')
        if (randomAcronym) {
            cy.findAndDelete(nationality + randomAcronym)
        } else {
            cy.findAndDelete(nationality)
        }
    }

    /**
    * Command: `sendEmailConfiguration`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Send a email from the desired email set to a deseired destination.
    * 
    * Usage:
    * onAdminPage.sendEmailConfiguration('emailSender', 'emailDestination')
    * 
    * Parameters:
    * - `emailSender` (String): Email sender, must contain @.
    * - `emailDestination` (String): Email destination, must contain @.
    * 
    * Example:
    * onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
    */
    sendEmailConfiguration(emailSender, emailDestination) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Email Configuration')
        cy.typeIntoTextField('Mail Sent As', emailSender)
        cy.get('[type="radio"][value="sendmail"]').click({ force: true })
        cy.get('.oxd-switch-input').click()
        cy.typeIntoTextField('Test Email Address', emailDestination)
        cy.clickSubmit()
    }

    /**
    * Command: `addSocialMediaAuthentication`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Add a given social media authentication.
    * 
    * Usage:
    * onAdminPage.addSocialMediaAuthentication('name', 'providerUrl', 'clientId', 'clientSecret')
    * 
    * Parameters:
    * - `name` (String): Provider to be added.
    * - `providerUrl` (String): Provider url must exists.
    * - `clientId` (String): Client id.
    * - `clientSecret` (String): Client secret.
    * 
    * Example:
    * onAdminPage.addSocialMediaAuthentication('provider_test', 'provider.com', '123456', '123456')
    */
    addSocialMediaAuthentication(name, providerUrl, clientId, clientSecret) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Social Media Authentication')
        cy.clickAdd()
        cy.typeIntoTextField('Name', name)
        cy.typeIntoTextField('Provider URL', providerUrl)
        cy.typeIntoTextField('Client ID', clientId)
        cy.typeIntoTextField('Client Secret', clientSecret)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteSocialMediaAuthentication`
    * 
    * Author: Gabriel Martins
    * 
    * Description:
    * Find and delete a given social media authentication.
    * 
    * Usage:
    * onAdminPage.deleteSocialMediaAuthentication('name')
    * 
    * Parameters:
    * - `name` (String): Social media authentication identifier to be deleted.
    * 
    * Example:
    * onAdminPage.deleteSocialMediaAuthentication('provider_test')
    */
    deleteSocialMediaAuthentication(name) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Social Media Authentication')
        cy.findAndDelete(name)
    }

}

export const onAdminPage = new AdminPage()