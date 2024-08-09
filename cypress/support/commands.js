import 'cypress-file-upload'

/**
 * Command: `getRandomString`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Generate a random string with the specified length.
 * 
 * Usage:
 * cy.getRandomString(length)
 * 
 * Parameters:
 * - `length` (String): The username of the user.
 * 
 * Example:
 * cy.getRandomString(8)
 */
Cypress.Commands.add('getRandomString', (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
})

/**
 * Command: `loginAsAdmin`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Login into the website as admin and store cookies and localstorage in cypress/fixtures.
 * There is no input in this command. Orange HRM is a demo website, and a single
 * username and password exists in the application.
 * 
 * Usage:
 * cy.loginAsAdmin()
 * 
 * Parameters:
 * - `none`
 * 
 * Example:
 * cy.loginAsAdmin()
 */
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

/**
 * Command: `restoreSession`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * This command will restore the cookies and local storage, previously saved in cypress/fixture.
 * Make sure to run the command cy.loginAsAdmin(), before execute this command.
 * 
 * Usage:
 * cy.restoreSession()
 * 
 * Parameters:
 * - `none`
 * 
 * Example:
 * cy.restoreSession()
 */
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

/**
 * Command: `selectInDropbox`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * This command will click in the first dropbox with '-- Select --'.
 * Although, It is possible to select other elements beyond the first one.
 * Then, the option will be selected.
 * 
 * Usage:
 * cy.selectInDropbox('name', 'index')
 * 
 * Parameters:
 * - `name` (String): Option to be selected.
 * - `index` (Int): (Optional) The default value is '0'

 * Example:
 * cy.selectInDropbox('Brazil')
 */
Cypress.Commands.add('selectInDropbox', (name, index = 0) => {
    cy.get('.oxd-select-text-input').contains('-- Select --').eq(index).click()
    cy.get('[role="option"]').contains(name).click()
    cy.get('.oxd-select-text-input').should('contain', name)
})

/**
 * Command: `openLeftMenu`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * This command allows the user to open the desired left menu.
 * 
 * Usage:
 * cy.openLeftMenu('menu')
 * 
 * Parameters:
 * - `menu` (String): Menu to be open.
 * 
 * Example:
 * cy.openLeftMenu('Admin')
 */
Cypress.Commands.add('openLeftMenu', (menu) => {
    cy.get('aside .oxd-main-menu-item').contains(menu).click()
})

/**
 * Command: `selectSubMenu`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * This command allows the user to open the desired left menu.
 * 
 * Usage:
 * cy.selectSubMenu('subMenu', 'subMenu2')
 * 
 * Parameters:
 * - `subMenu` (String): Submenu to be open.
 * - `subMenu2` (String): (Optional) Submenu to be open. It is inside the new container.
 * 
 * Example:
 * cy.selectSubMenu('Employee List')
 * cy.selectSubMenu('Configuration', 'Termination Reasons')
 */
Cypress.Commands.add('selectSubMenu', (subMenu, subMenu2 = null) => {
    cy.get('nav .oxd-topbar-body-nav-tab-item').contains(subMenu).click()

    if (subMenu2) {
        cy.get('.oxd-topbar-body-nav-tab-link').contains(subMenu2).click()
    }
})

/**
 * Command: `checkPopUpAndClose`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Verify the popup message and close it.
 * 
 * Usage:
 * cy.checkPopUpAndClose('message')
 * 
 * Parameters:
 * - `message` (String): Popup message.
 * 
 * Example:
 * cy.checkPopUpAndClose('Succesfully Saved')
 */
Cypress.Commands.add('checkPopUpAndClose', (message) => {
    cy.get('.oxd-toast').then(toastMessage => {
        cy.wrap(toastMessage).find('.oxd-text').should('contain', message)
        cy.wrap(toastMessage).find('.oxd-text').contains(message).parents('.oxd-toast').find('.oxd-toast-close').click()
    })
})

/**
 * Command: `typeIntoTextField`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Check the label associated to a input field, then check for the
 * parents to find the associated input field. The command will type
 * the desired value.
 * 
 * Usage:
 * cy.typeIntoTextField('fieldName', 'value')
 * 
 * Parameters:
 * - `fieldName` (String): Check the label.
 * - `value` (String): Input value to be write into the text field.
 * - `index` (String): (Optional) The default value is '0'.
 *
 * Example:
 * cy.typeIntoTextField('Name', 'Gabriel')
 */
Cypress.Commands.add('typeIntoTextField', (fieldName, value, index = 0) => {
    cy.get('.oxd-label').contains(fieldName).then(inputName => {
        cy.wrap(inputName).parents('.oxd-input-group').find('input').eq(index).clear().type(value)
        cy.wrap(inputName).parents('.oxd-input-group').find('input').eq(index).invoke('prop', 'value').should('contain', value)
    })
})

/**
 * Command: `selectOption`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * This keyword should be used after a cy.typeIntoTextField() or any action that open the 
 * role='option' element. Shouldn't be used for dropbox.
 * 
 * Usage:
 * cy.selectOption('text')
 * 
 * Parameters:
 * - `option` (String): Option to select.
 *
 * Example:
 * cy.selectOption('Brazil')
 */
Cypress.Commands.add('selectOption', (option) => {
    cy.get('[role="option"]').contains(option).click()
})

/**
 * Command: `typeIntoTextArea`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * The command will type the desired text and verify if it was correctly typed.
 * 
 * Usage:
 * cy.typeIntoTextArea('text')
 * 
 * Parameters:
 * - `text` (String): Text description.
 *
 * Example:
 * cy.typeIntoTextArea('My description')
 */
Cypress.Commands.add('typeIntoTextArea', (text, index = 0) => {
    cy.get('textarea.oxd-textarea').eq(index).type(text)
    cy.get('textarea.oxd-textarea').invoke('prop', 'value').should('contain', text)
})

/**
 * Command: `findAndDelete`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Find and delete an item in a row.
 * 
 * Usage:
 * cy.findAndDelete('item')
 *  
 * Parameters:
 * - `item` (String): Item to be deleted.
 * 
 * Example:
 * cy.findAndDelete('Gabriel')
 */
Cypress.Commands.add('findAndDelete', (item) => {
    cy.get('.oxd-table-card').contains(item).then(tableRow => {
        cy.wrap(tableRow).parents('[role="row"]').find('.bi-trash').click()
    })
    cy.get('button').contains(' Yes, Delete ').click()
})

/**
 * Command: `clickAdd`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Click Button Add.
 * 
 * Example:
 * cy.clickAdd()
 */
Cypress.Commands.add('clickAdd', (index = 0) => {
    cy.get('button').contains(' Add ').eq(index).click()
})

/**
 * Command: `clickSubmit`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Click Button Submit, Save, or any with the given selector.
 * 
 * Example:
 * cy.clickSubmit()
 */
Cypress.Commands.add('clickSubmit', (index = 0) => {
    cy.get('button[type="submit"]').eq(index).click()
})

/**
 * Command: `loginPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to login page.
 * 
 * Example:
 * cy.loginPage()
 */
Cypress.Commands.add('loginPage', () => {
    cy.visit('/auth/login')
})

/**
 * Command: `adminPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to admin page.
 * 
 * Example:
 * cy.adminPage()
 */
Cypress.Commands.add('adminPage', () => {
    cy.visit('/admin/viewSystemUsers')
})

/**
 * Command: `pimPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to pim page.
 * 
 * Example:
 * cy.pimPage()
 */
Cypress.Commands.add('pimPage', () => {
    cy.visit('/pim/viewEmployeeList')
})

/**
 * Command: `leavePage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to leave page.
 * 
 * Example:
 * cy.leavePage()
 */
Cypress.Commands.add('leavePage', () => {
    cy.visit('/leave/viewLeaveList')
})

/**
 * Command: `recruitmentPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to recruitment page.
 * 
 * Example:
 * cy.recruitmentPage()
 */
Cypress.Commands.add('recruitmentPage', () => {
    cy.visit('/recruitment/viewCandidates')
})

/**
 * Command: `performancePage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to performance page.
 * 
 * Example:
 * cy.performancePage()
 */
Cypress.Commands.add('performancePage', () => {
    cy.visit('/performance/searchEvaluatePerformanceReview')
})

/**
 * Command: `dashboardPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to dashboard page.
 * 
 * Example:
 * cy.dashboardPage()
 */
Cypress.Commands.add('dashboardPage', () => {
    cy.visit('/dashboard/index')
})

/**
 * Command: `directoryPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to directory page.
 * 
 * Example:
 * cy.directoryPage()
 */
Cypress.Commands.add('directoryPage', () => {
    cy.visit('/directory/viewDirectory')
})

/**
 * Command: `maintenancePage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to maintenance page.
 * 
 * Example:
 * cy.maintenancePage()
 */
Cypress.Commands.add('maintenancePage', () => {
    cy.visit('/maintenance/purgeEmployee')
})

/**
 * Command: `claimPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to claim page.
 * 
 * Example:
 * cy.claimPage()
 */
Cypress.Commands.add('claimPage', () => {
    cy.visit('/claim/viewAssignClaim')
})

/**
 * Command: `buzzPage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to buzz page.
 * 
 * Example:
 * cy.buzzPage()
 */
Cypress.Commands.add('buzzPage', () => {
    cy.visit('/buzz/viewBuzz')
})

/**
 * Command: `timePage`
 * 
 * Author: Gabriel Martins
 * 
 * Description:
 * Go to time page.
 * 
 * Example:
 * cy.timePage()
 */
Cypress.Commands.add('timePage', () => {
    cy.visit('/time/viewEmployeeTimesheet')
})