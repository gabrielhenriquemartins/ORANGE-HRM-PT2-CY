// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'

Cypress.Commands.add('getRandomString', (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
})

Cypress.Commands.add('loginPage', () => {
    cy.visit('/auth/login')
})

Cypress.Commands.add('loginAsAdmin', () => {
    cy.visit('/auth/login')
    cy.get('input[placeholder="Username"]').type('Admin')
    cy.get('input[placeholder="Password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-main-menu').should('be.visible')
    cy.getCookies().then(cookies => {
        cy.writeFile('cypress/fixtures/cookies.json', cookies);
    })

    cy.getAllLocalStorage().then(localStorage => {
        cy.writeFile('cypress/fixtures/localStorage.json', localStorage);
    })
})

Cypress.Commands.add('restoreSession', () => {
    cy.readFile('cypress/fixtures/cookies.json').then(cookies => {
        cookies.forEach(cookie => {
            cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                expiry: cookie.expiry,
                httpOnly: cookie.httpOnly,
                path: cookie.path,
                secure: cookie.secure
            })
        })
    })

    cy.readFile('cypress/fixtures/localStorage.json').then(localStorage => {
        cy.window().then(window => {
            Object.keys(localStorage).forEach(key => {
                window.localStorage.setItem(key, localStorage[key]);
            })
        })
    })
})

Cypress.Commands.add('adminPage', () => {
    cy.visit('/admin/viewSystemUsers')
})

Cypress.Commands.add('pimPage', () => {
    cy.visit('/pim/viewEmployeeList')
})

Cypress.Commands.add('leavePage', () => {
    cy.visit('/leave/viewLeaveList')
})

Cypress.Commands.add('recruitmentPage', () => {
    cy.visit('/recruitment/viewCandidates')
})

Cypress.Commands.add('performancePage', () => {
    cy.visit('/performance/searchEvaluatePerformanceReview')
})

Cypress.Commands.add('dashboardPage', () => {
    cy.visit('/dashboard/index')
})

Cypress.Commands.add('directoryPage', () => {
    cy.visit('/directory/viewDirectory')
})

Cypress.Commands.add('maintenancePage', () => {
    cy.visit('/maintenance/purgeEmployee')
})

Cypress.Commands.add('claimPage', () => {
    cy.visit('/claim/viewAssignClaim')
})

Cypress.Commands.add('buzzPage', () => {
    cy.visit('/buzz/viewBuzz')
})

Cypress.Commands.add('timePage', () => {
    cy.visit('/time/viewEmployeeTimesheet')
})

Cypress.Commands.add('selectInDropbox', (name, index = 0) => {
    cy.get('.oxd-select-text-input').contains('-- Select --').eq(index).click()
    cy.get('[role="option"]').contains(name).click()
    cy.get('.oxd-select-text-input').should('contain', name)
})

Cypress.Commands.add('openLeftMenu', (menu) => {
    cy.get('aside .oxd-main-menu-item').contains(menu).click()
})

Cypress.Commands.add('selectSubMenu', (subMenu, subMenu2 = null) => {
    cy.get('nav .oxd-topbar-body-nav-tab-item').contains(subMenu).click()

    if (subMenu2) {
        cy.get('.oxd-topbar-body-nav-tab-link').contains(subMenu2).click()
    }
})

Cypress.Commands.add('checkPopUpAndClose', (message) => {
    cy.get('.oxd-toast').then(toastMessage => {
        cy.wrap(toastMessage).find('.oxd-text').should('contain', message)
        cy.wrap(toastMessage).find('.oxd-text').contains(message).parents('.oxd-toast').find('.oxd-toast-close').click()
    })
})

Cypress.Commands.add('typeIntoTextField', (fieldName, value, index = 0) => {
    cy.get('.oxd-label').contains(fieldName).then(inputName => {
        cy.wrap(inputName).parents('.oxd-input-group').find('input').eq(index).clear().type(value)
        cy.wrap(inputName).parents('.oxd-input-group').find('input').eq(index).invoke('prop', 'value').should('contain', value)
    })
})