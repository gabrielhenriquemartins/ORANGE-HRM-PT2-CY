import { onAdminPage } from "../resources/page_objects/adminPage"
import { onLoginPage } from "../resources/page_objects/loginPage"
import { onPimPage } from "../resources/page_objects/pimPage"
import { onLeavePage } from "../resources/page_objects/leavePage"
import { onTimePage } from "../resources/page_objects/timePage"
import { onRecruitmentPage } from "../resources/page_objects/recruitmentPage"
import { onMyInfoPage } from "../resources/page_objects/myinfoPage"
import { onPerformancePage } from "../resources/page_objects/performancePage"
import { onDashboardPage } from "../resources/page_objects/dashboardPage"
import { onDirectoryPage } from "../resources/page_objects/directoryPage"
import { onMaintenancePage } from "../resources/page_objects/maintenancePage"
import { onClaimPage } from "../resources/page_objects/claimPage"
import { onBuzzPage } from "../resources/page_objects/buzzPage"

let firstTestFailed = false
let login = false

describe('0 - Pipeline Login', () => {
    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
    })

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
            firstTestFailed = true
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
        login = true
    })
})

describe('1 - Admin', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.adminPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
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

describe('2 - PIM', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.pimPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Termination Reason', () => {
        onPimPage.addTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Termination Reason', () => {
        onPimPage.deleteTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Reporting Method', () => {
        onPimPage.addReportingMethod('One-o-One')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Reporting Method', () => {
        onPimPage.deleteReportingMethod('One-o-One')
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('3 - Leave', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.leavePage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Leave Type', () => {
        onLeavePage.addLeaveType('Carnival', "true")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Leave Type', () => {
        onLeavePage.deleteLeaveType('Carnival')
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('4 - Time', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure')
        }
        if (login) {
            cy.restoreSession()
            cy.timePage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Punch in Punch Out', () => {
        onTimePage.addPunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Punch in Punch Out', () => {
        onTimePage.deletePunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Costumer', () => {
        onTimePage.addCostumer("Amazon", 'Customer Description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Add Project and Activity', () => {
        onTimePage.addProjectAndActivity("Arquiteture", 'Amazon', 'Bug Fix', 'Activity Description')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Edit Row In My Timesheet', () => {
        onTimePage.addRowInMyTimesheet("Amazon", 'Bug Fix')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Costumer', () => {
        onTimePage.deleteCostumer("Amazon")
        cy.checkPopUpAndClose('Successfully Deleted')
    })


})


describe('5 - Recruitment', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.recruitmentPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Candidate', () => {
        onRecruitmentPage.addCandidate('Gabriel', 'Henrique', 'Martins', 'test@hotmail.com', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Candidate', () => {
        onRecruitmentPage.deleteCandidate('Gabriel Henrique Martins')
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('6 - My Info', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.adminPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Pdf To Profile', () => {
        onMyInfoPage.addPdfToProfile()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Pdf From Profile', () => {
        onMyInfoPage.deletePdfFromProfile()
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('7 - Performance', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.performancePage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add KPI', () => {
        onPerformancePage.addKpi('Active Defects', 'Account Assistant')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete KPI', () => {
        onPerformancePage.deleteKpi('Active Defects')
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('8 - Dashboard', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.dashboardPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Check Main Dashboards', () => {
        onDashboardPage.checkDashboard('Time at Work')
        onDashboardPage.checkDashboard('My Actions')
        onDashboardPage.checkDashboard('Quick Launch')
        onDashboardPage.checkDashboard('Buzz Latest Posts')
        onDashboardPage.checkDashboard('Employees on Leave Today')
        onDashboardPage.checkDashboard('Employee Distribution by Sub Unit')
        onDashboardPage.checkDashboard('Employee Distribution by Location')
    })
})

describe('9 - Directory/PIM', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.adminPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Add Employee', () => {
        onPimPage.addEmployee('Gabriel', 'Martins', '8884')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Find Profession Role', () => {
        onDirectoryPage.findProfessional('Gabriel', 'Martins')
    })

    it('Delete Employee', () => {
        onPimPage.deleteEmployee('8884')
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('10 - Maintenance', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.adminPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Purge Candidate Records', () => {
        onMaintenancePage.purgeCandidateRecords('Software Engineer')
    })
})

describe('11 - Claim', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.claimPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Create An Event', () => {
        onClaimPage.createAnEvent('Event Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete An Event', () => {
        onClaimPage.deleteAnEvent('Event Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Create An Expense Type', () => {
        onClaimPage.createAnExpenseType('Expense Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete An Expense Type', () => {
        onClaimPage.deleteAnExpenseType('Expense Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Submit Claim', () => {
        onClaimPage.submitClaim('Accommodation', 'Canadian Dollar', 'My Remarks')
        cy.checkPopUpAndClose('Successfully Saved')
        onClaimPage.getCurrentUrl()
    })

    it('Add Expenses', () => {
        onClaimPage.addExpenses('Transport', '20')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Expenses', () => {
        onClaimPage.deleteExpenses('Transport')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add PDF to a Claim', () => {
        onClaimPage.addPdfToClaim()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete a PDF from a Claim', () => {
        onClaimPage.deletePdfOfClaim()
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe.only('12 - Buzz', () => {

    beforeEach(() => {
        if (firstTestFailed) {
            throw new Error('Skipping test due to previous test failure');
        }
        if (login) {
            cy.restoreSession()
            cy.buzzPage()
        } else {
            cy.loginPage()
            cy.loginAsAdmin()
            login = true
        }
    })

    it('Post a Message', () => {
        onBuzzPage.postAMessage('Hello world!!! :)')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Check Published Message', () => {
        onBuzzPage.checkFirstPublishedMessage('Hello world!!! :)')
    })

    it('Like a Message', () => {
        onBuzzPage.likeAMessage()
    })
})