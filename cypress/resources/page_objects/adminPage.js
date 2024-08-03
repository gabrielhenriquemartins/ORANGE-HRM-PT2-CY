/// <reference types="cypress" />

let randomAcronym = null;

function typeIntoTextField(fieldName, value) {
    cy.get('.oxd-label').contains(fieldName).then(inputName => {
        cy.wrap(inputName).parents('.oxd-input-group').find('input').clear().type(value)
        cy.wrap(inputName).parents('.oxd-input-group').find('input').invoke('prop', 'value').should('contain', value)
    })
}

export class AdminPage {

    addJobTitle(jobTitle, description, note) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Job', 'Job Titles')
        cy.get('button').contains(' Add ').click()
        cy.get('input.oxd-input').eq(1).type(jobTitle)
        cy.get('input.oxd-input').eq(1).invoke('prop', 'value').should('contain', jobTitle)
        cy.get('textarea.oxd-textarea').eq(0).type(description)
        cy.get('textarea.oxd-textarea').eq(0).invoke('prop', 'value').should('contain', description)
        cy.get('textarea.oxd-textarea').eq(1).type(note)
        cy.get('textarea.oxd-textarea').eq(1).invoke('prop', 'value').should('contain', note)
        cy.get('button[type="submit"]').click()
    }

    deleteJobTitle(jobTitle) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Job', 'Job Titles')
        cy.get('.oxd-table-card').contains(jobTitle).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addLocation(name, city, state, country, zip_code = null, phone = null, fax = null) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Organization', 'Locations')
        cy.get('button').contains(' Add ').click()
        typeIntoTextField('Name', name)
        typeIntoTextField('City', city)
        typeIntoTextField('State/Province', state)
        if (zip_code) {
            typeIntoTextField('Zip/Postal Code', zip_code)
        }
        if (phone) {
            typeIntoTextField('Phone', phone)
        }
        if (fax) {
            typeIntoTextField('Fax', fax)
        }
        cy.get('.oxd-select-text-input').contains('-- Select --').click()
        cy.get('[role="option"]').contains(country).click()
        cy.get('.oxd-select-text-input').should('contain', country)
        cy.get('button[type="submit"]').click()
    }

    deleteLocation(name) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Organization', 'Locations')
        cy.get('.oxd-table-card').contains(name).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addLanguage(language) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Languages')
        cy.get('button').contains(' Add ').click()
        typeIntoTextField('Name', language)
        cy.get('button[type="submit"]').click()
    }

    deleteLanguage(language) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Languages')
        cy.get('.oxd-table-card').contains(language).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addMembership(membership) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Memberships')
        cy.get('button').contains(' Add ').click()
        typeIntoTextField('Name', membership)
        cy.get('button[type="submit"]').click()
    }

    deleteMembership(membership) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Qualifications', 'Memberships')
        cy.get('.oxd-table-card').contains(membership).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    addNationality(nationality) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Nationalities')
        cy.get('button').contains(' Add ').click()
        cy.getRandomString(6).then((randomString) => {
            cy.log('Random Nationality: ', randomString)
            typeIntoTextField('Name', nationality + " - " + randomString)
            randomAcronym = " - " + randomString
        })
        cy.get('button[type="submit"]').click()
    }

    deleteNationality(nationality) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Nationalities')
        cy.get('.oxd-table-card').contains(nationality + randomAcronym).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

    sendEmailConfiguration(emailSender, emailDestination) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Email Configuration')
        typeIntoTextField('Mail Sent As', emailSender)
        cy.get('[type="radio"][value="sendmail"]').click({ force: true })
        cy.get('.oxd-switch-input').click()
        typeIntoTextField('Test Email Address', emailDestination)
        cy.get('button[type="submit"]').click()
    }

    addSocialMediaAuthentication(name, providerUrl, clientId, clientSecret) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Social Media Authentication')
        cy.get('button').contains(' Add ').click()
        typeIntoTextField('Name', name)
        typeIntoTextField('Provider URL', providerUrl)
        typeIntoTextField('Client ID', clientId)
        typeIntoTextField('Client Secret', clientSecret)
        cy.get('button[type="submit"]').click()
    }

    deleteSocialMediaAuthentication(name) {
        cy.openLeftMenu('Admin')
        cy.selectSubMenu('Configuration', 'Social Media Authentication')
        cy.get('.oxd-table-card').contains(name).then(tableRow => {
            cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
        })
        cy.get('button').contains(' Yes, Delete ').click()
    }

}




export const onAdminPage = new AdminPage()