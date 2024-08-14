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
let costumerAcronym = false

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
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkInvalidCredentialsWithRandomUsernameAndPassword()
    })

    it('Check Required Password', () => {
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkRequiredPassword()
    })

    it('Check Required Username', () => {
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkRequiredUsername()
    })

    it('Check Required Username and Password', () => {
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkRequiredUsernameAndPassword()
    })

    it('Check Official Orange Home Page', () => {
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkOrangeHomePage()
    })

    it('Check Forgot Password and Email Message Sent', () => {
        cy.log('OTS-XXX')
        cy.loginPage()
        onLoginPage.checkForgottenPasswordEmail()
    })

    it('Login as Admin', () => {
        cy.log('OTS-XXX')
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

    it('Add Location', () => {
        cy.log('OTS-XXX')
        onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Location', () => {
        cy.log('OTS-XXX')
        onAdminPage.deleteLocation('R&D')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Language', () => {
        cy.log('OTS-XXX')
        onAdminPage.addLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Language', () => {
        cy.log('OTS-XXX')
        onAdminPage.deleteLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Membership', () => {
        cy.log('OTS-XXX')
        onAdminPage.addMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Membership', () => {
        cy.log('OTS-XXX')
        onAdminPage.deleteMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Nationality', () => {
        cy.log('OTS-XXX')
        onAdminPage.addNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Nationality', () => {
        cy.log('OTS-XXX')
        onAdminPage.deleteNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Send Email Configuration', () => {
        cy.log('OTS-XXX')
        onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
        cy.checkPopUpAndClose('Test Email Sent')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Add Social Media Authentication', () => {
        cy.log('OTS-XXX')
        onAdminPage.addSocialMediaAuthentication('provider_test', 'provider.com', '123456', '123456')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Social Media Authentication', () => {
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onPimPage.addTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Termination Reason', () => {
        cy.log('OTS-XXX')
        onPimPage.deleteTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Reporting Method', () => {
        cy.log('OTS-XXX')
        onPimPage.addReportingMethod('One-o-One')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Reporting Method', () => {
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onLeavePage.addLeaveType('Carnival', "true")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Leave Type', () => {
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onTimePage.addPunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Punch in Punch Out', () => {
        cy.log('OTS-XXX')
        onTimePage.deletePunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add Costumer', () => {
        cy.log('OTS-XXX')
        cy.getRandomString(3).then((randomString) => {
            costumerAcronym = " - " + randomString
            onTimePage.addCostumer("Amazon" + costumerAcronym, 'Customer Description!')
        })
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Add Project and Activity', () => {
        cy.log('OTS-XXX')
        onTimePage.addProjectAndActivity("Arquiteture", 'Amazon', 'Bug Fix', 'Activity Description')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Edit Row In My Timesheet', () => {
        cy.log('OTS-XXX')
        onTimePage.addRowInMyTimesheet("Amazon" + costumerAcronym, 'Bug Fix')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Costumer', () => {
        cy.log('OTS-XXX')
        onTimePage.deleteCostumer("Amazon" + costumerAcronym)
        cy.checkPopUpAndClose('Successfully Deleted')
        // cy.checkPopUpAndClose('Not allowed to delete customer(s) associated with projects that have time logged against them')
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
        cy.log('OTS-XXX')
        onRecruitmentPage.addCandidate('Gabriel', 'Henrique', 'Martins', 'test@hotmail.com', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Candidate', () => {
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onMyInfoPage.addPdfToProfile()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Pdf From Profile', () => {
        cy.log('OTS-XXX')
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
    it('Add Job Title', () => {
        cy.log('OTS-XXX')
        onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Add KPI', () => {
        cy.log('OTS-XXX')
        onPerformancePage.addKpi('Active Defects', 'Senior DevOps')
        cy.checkPopUpAndClose('Successfully Saved')
    })


    it('Delete KPI', () => {
        cy.log('OTS-XXX')
        onPerformancePage.deleteKpi('Active Defects')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Delete Job Title', () => {
        cy.log('OTS-XXX')
        onAdminPage.deleteJobTitle('Senior DevOps')
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
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onPimPage.addEmployee('Gabriel', 'Martins', '8884')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Find Profession Role', () => {
        cy.log('OTS-XXX')
        onDirectoryPage.findProfessional('Gabriel', 'Martins')
    })

    it('Delete Employee', () => {
        cy.log('OTS-XXX')
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
        cy.log('OTS-XXX')
        onMaintenancePage.purgeCandidateRecords('Payroll Administrator')
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
        cy.log('OTS-XXX')
        onClaimPage.createAnEvent('Event Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete An Event', () => {
        cy.log('OTS-XXX')
        onClaimPage.deleteAnEvent('Event Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Create An Expense Type', () => {
        cy.log('OTS-XXX')
        onClaimPage.createAnExpenseType('Expense Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Submit Claim', () => {
        cy.log('OTS-XXX')
        onClaimPage.submitClaim('Accommodation', 'Canadian Dollar', 'My Remarks')
        cy.checkPopUpAndClose('Successfully Saved')
        onClaimPage.getCurrentUrl()
    })

    it('Add Expenses', () => {
        cy.log('OTS-XXX')
        onClaimPage.addExpenses('Expense Test', '20')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete Expenses', () => {
        cy.log('OTS-XXX')
        onClaimPage.deleteExpenses('Expense Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Delete An Expense Type', () => {
        cy.log('OTS-XXX')
        onClaimPage.deleteAnExpenseType('Expense Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('Add PDF to a Claim', () => {
        cy.log('OTS-XXX')
        onClaimPage.addPdfToClaim()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Delete a PDF from a Claim', () => {
        cy.log('OTS-XXX')
        onClaimPage.deletePdfOfClaim()
        cy.checkPopUpAndClose('Successfully Deleted')
    })
})

describe('12 - Buzz', () => {

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
        cy.log('OTS-XXX')
        onBuzzPage.postAMessage('Hello world!!! :)')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('Check Published Message', () => {
        cy.log('OTS-XXX')
        onBuzzPage.checkFirstPublishedMessage('Hello world!!! :)')
    })

    it('Like a Message', () => {
        cy.log('OTS-XXX')
        onBuzzPage.likeAMessage()
    })
})