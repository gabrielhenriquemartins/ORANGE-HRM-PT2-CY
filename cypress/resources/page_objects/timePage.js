/// <reference types="cypress" />

export class TimePage {

    /**
    * Command: `addPunchInPunchOut`
    * 
    * Description:
    * Create a new punch in / punch out. If the punch out is the first option,
    * the script will confirm the punch out, to back to the punch in, only then the
    * validation begins.
    * 
    * Usage:
    * onTimePage.addPunchInPunchOut('descriptionIn')
    * 
    * Parameters:
    * - `descriptionIn` (String): Punch in description. It will be used to delete the punch in / punch out
    *
    * Example:
    * onTimePage.addPunchInPunchOut('My Punch In')
    */
    addPunchInPunchOut(descriptionIn) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Attendance', 'Punch In/Out')
        cy.get('.orangehrm-card-container h6').invoke('text').then((text) => {
            if (text.trim() === 'Punch Out') {
                cy.clickSubmit()
                cy.checkPopUpAndClose('Successfully Saved')
            }
        })
        cy.get('.orangehrm-card-container h6').should('contain', 'Punch In')
        cy.typeIntoTextArea(descriptionIn)
        cy.clickSubmit()
        cy.checkPopUpAndClose('Successfully Saved')
        cy.get('.orangehrm-card-container h6').should('contain', 'Punch Out')
        cy.clickSubmit()
    }

    /**
    * Command: `deletePunchInPunchOut`
    * 
    * Description:
    * Find and delete a given punch in / punch out based on the description field.
    * 
    * Usage:
    * onTimePage.deletePunchInPunchOut('descriptionIn')
    * 
    * Parameters:
    * - `descriptionIn` (String): Find the punch in based in its description
    *
    * Example:
    * onTimePage.deletePunchInPunchOut('My Punch In')
    */
    deletePunchInPunchOut(descriptionIn) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Attendance', 'My Records')
        cy.findAndDelete(descriptionIn)
    }

    /**
    * Command: `addCostumer`
    * 
    * Description:
    * Create a new customer.
    * 
    * Usage:
    * onTimePage.addCostumer('costumer', 'description')
    * 
    * Parameters:
    * - `costumer` (String): Costumer name
    * - `description` (String): Costumer description
    *
    * Example:
    * onTimePage.addCostumer('Amazon', 'My first client')
    */
    addCostumer(costumer, description) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Customers')
        cy.clickAdd()
        cy.typeIntoTextField('Name', costumer)
        cy.typeIntoTextArea(description)
        cy.clickSubmit()
    }

    /**
    * Command: `deleteCostumer`
    * 
    * Description:
    * Find and delete a given costumer.
    * 
    * Usage:
    * onTimePage.deleteCostumer('costumer')
    * 
    * Parameters:
    * - `costumer` (String): Costumer to be deleted
    *
    * Example:
    * onTimePage.deleteCostumer('Amazon')
    */
    deleteCostumer(costumer) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Customers')
        cy.findAndDelete(costumer)
    }

    /**
    * Command: `addProjectAndActivity`
    * 
    * Description:
    * Create a new project and associate a activity.
    * 
    * Usage:
    * onTimePage.addProjectAndActivity('name', 'customer', 'activity', 'description')
    * 
    * Parameters:
    * - `name` (String): Project name
    * - `customer` (String): Costumer name
    * - `activity` (String): Activity name
    * - `description` (String): Activity description
    *
    * Example:
    * onTimePage.addProjectAndActivity("Arquiteture", 'Amazon', 'Bug Fix', 'Activity Description')
    */
    addProjectAndActivity(name, customer, activity, description) {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Project Info', 'Projects')
        cy.clickAdd()
        cy.typeIntoTextField('Name', name)
        cy.typeIntoTextField('Customer Name', customer)
        cy.get('[role="option"]').contains(customer).click()
        cy.typeIntoTextArea(description)
        cy.clickSubmit()
        cy.checkPopUpAndClose('Successfully Saved')
        cy.get('.oxd-text').should('contain', 'No Records Found')
        cy.checkPopUpAndClose('No Records Found')
        cy.get('.orangehrm-header-container').contains('Add').click()
        cy.get('[role="document"] .oxd-input-group').find('input').clear().type(activity)
        cy.get('[role="document"] button[type="submit"]').click()
    }

    /**
    * Command: `addRowInMyTimesheet`
    * 
    * Description:
    * Change the first row in my timesheet.
    * 
    * Usage:
    * onTimePage.addRowInMyTimesheet('project', 'activity')
    * 
    * Parameters:
    * - `project` (String): Project name
    * - `activity` (String): Activity name
    * - `day` (Int): (Optional) Day of the week. Default value is set to Tuesday
    * - `hours` (String): (Optional) Time spent. Default value is set to 10:00
    * 
    * Example:
    * onTimePage.addRowInMyTimesheet("Amazon", 'Bug Fix')
    */
    addRowInMyTimesheet(project, activity, day = 2, hours = '10:00') {
        cy.openLeftMenu('Time')
        cy.selectSubMenu('Timesheets', 'My Timesheets')
        cy.get('[type="button"]').contains('Edit').click()
        cy.get('input[placeholder="Type for hints..."]').clear().type(project)
        cy.get('[role="option"]').contains(project).click()
        cy.selectInDropbox(activity)
        cy.get('.oxd-input-group .oxd-input').clear().eq(day).clear().type(hours)
        cy.clickSubmit()
    }
}

export const onTimePage = new TimePage()