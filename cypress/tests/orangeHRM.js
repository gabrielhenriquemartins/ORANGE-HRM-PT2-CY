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

    it('[CY] Check Invalid Credentials', () => {
        cy.log('OTS-2')
        cy.loginPage()
        onLoginPage.checkInvalidCredentialsWithRandomUsernameAndPassword()
    })

    it('[CY] Check Required Password', () => {
        cy.log('OTS-3')
        cy.loginPage()
        onLoginPage.checkRequiredPassword()
    })

    it('[CY] Check Required Username', () => {
        cy.log('OTS-4')
        cy.loginPage()
        onLoginPage.checkRequiredUsername()
    })

    it('[CY] [CY] Check Required Username and Password', () => {
        cy.log('OTS-4')
        cy.loginPage()
        onLoginPage.checkRequiredUsernameAndPassword()
    })

    it('[CY] Check Official Orange Home Page', () => {
        cy.log('OTS-6')
        cy.loginPage()
        onLoginPage.checkOrangeHomePage()
    })

    it('[CY] Check Forgot Password and Email Message Sent', () => {
        cy.log('OTS-7')
        cy.loginPage()
        onLoginPage.checkForgottenPasswordEmail()
    })

    it('[CY] Login as Admin', () => {
        cy.log('OTS-8')
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

    it('[CY] Add Location', () => {
        cy.log('OTS-9')
        onAdminPage.addLocation('R&D', 'New York', 'California', 'Brazil', '1000', '1000', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Location', () => {
        cy.log('OTS-10')
        onAdminPage.deleteLocation('R&D')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add Language', () => {
        cy.log('OTS-11')
        onAdminPage.addLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Language', () => {
        cy.log('OTS-12')
        onAdminPage.deleteLanguage('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add Membership', () => {
        cy.log('OTS-13')
        onAdminPage.addMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Membership', () => {
        cy.log('OTS-14')
        onAdminPage.deleteMembership('ISTQB')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add Nationality', () => {
        cy.log('OTS-15')
        onAdminPage.addNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Nationality', () => {
        cy.log('OTS-16')
        onAdminPage.deleteNationality('Brazilian')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Send Email Configuration', () => {
        cy.log('OTS-17')
        onAdminPage.sendEmailConfiguration('test_sender@hotmail.com', 'test_destination@hotmail.com')
        cy.checkPopUpAndClose('Test Email Sent')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Add Social Media Authentication', () => {
        cy.log('OTS-18')
        onAdminPage.addSocialMediaAuthentication('provider_test', 'provider.com', '123456', '123456')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Social Media Authentication', () => {
        cy.log('OTS-19')
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

    it('[CY] Add Termination Reason', () => {
        cy.log('OTS-20')
        onPimPage.addTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Termination Reason', () => {
        cy.log('OTS-21')
        onPimPage.deleteTerminationReason('Vacation')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add Reporting Method', () => {
        cy.log('OTS-22')
        onPimPage.addReportingMethod('One-o-One')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Reporting Method', () => {
        cy.log('OTS-23')
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

    it('[CY] Add Leave Type', () => {
        cy.log('OTS-24')
        onLeavePage.addLeaveType('Carnival', "true")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Leave Type', () => {
        cy.log('OTS-25')
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

    it('[CY] Add Punch in Punch Out', () => {
        cy.log('OTS-26')
        onTimePage.addPunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Punch in Punch Out', () => {
        cy.log('OTS-27')
        onTimePage.deletePunchInPunchOut("My Description!")
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add Costumer', () => {
        cy.log('OTS-28')
        cy.getRandomString(3).then((randomString) => {
            costumerAcronym = " - " + randomString
            onTimePage.addCostumer("Amazon" + costumerAcronym, 'Customer Description!')
        })
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Add Project and Activity', () => {
        cy.log('OTS-29')
        onTimePage.addProjectAndActivity("Arquiteture", 'Amazon', 'Bug Fix', 'Activity Description')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Edit Row In My Timesheet', () => {
        cy.log('OTS-30')
        onTimePage.addRowInMyTimesheet("Amazon" + costumerAcronym, 'Bug Fix')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Costumer', () => {
        cy.log('OTS-31')
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

    it('[CY] Add Candidate', () => {
        cy.log('OTS-32')
        onRecruitmentPage.addCandidate('Gabriel', 'Henrique', 'Martins', 'test@hotmail.com', '1000')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Candidate', () => {
        cy.log('OTS-33')
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

    it('[CY] Add Pdf To Profile', () => {
        cy.log('OTS-34')
        onMyInfoPage.addPdfToProfile()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Pdf From Profile', () => {
        cy.log('OTS-35')
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
    it('[CY] Add Job Title', () => {
        cy.log('OTS-36')
        onAdminPage.addJobTitle('Senior DevOps', 'My Description', 'My Note')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Add KPI', () => {
        cy.log('OTS-37')
        onPerformancePage.addKpi('Active Defects', 'Senior DevOps')
        cy.checkPopUpAndClose('Successfully Saved')
    })


    it('[CY] Delete KPI', () => {
        cy.log('OTS-38')
        onPerformancePage.deleteKpi('Active Defects')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Delete Job Title', () => {
        cy.log('OTS-39')
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

    it('[CY] Check Main Dashboards', () => {
        cy.log('OTS-40')
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

    it('[CY] Add Employee', () => {
        cy.log('OTS-41')
        onPimPage.addEmployee('Gabriel', 'Martins', '8884')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Find Profession Role', () => {
        cy.log('OTS-42')
        onDirectoryPage.findProfessional('Gabriel', 'Martins')
    })

    it('[CY] Delete Employee', () => {
        cy.log('OTS-43')
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

    it('[CY] Purge Candidate Records', () => {
        cy.log('OTS-44')
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

    it('[CY] Create An Event', () => {
        cy.log('OTS-45')
        onClaimPage.createAnEvent('Event Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete An Event', () => {
        cy.log('OTS-46')
        onClaimPage.deleteAnEvent('Event Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Create An Expense Type', () => {
        cy.log('OTS-47')
        onClaimPage.createAnExpenseType('Expense Test', 'My description!')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Submit Claim', () => {
        cy.log('OTS-48')
        onClaimPage.submitClaim('Accommodation', 'Canadian Dollar', 'My Remarks')
        cy.checkPopUpAndClose('Successfully Saved')
        onClaimPage.getCurrentUrl()
    })

    it('[CY] Add Expenses', () => {
        cy.log('OTS-49')
        onClaimPage.addExpenses('Expense Test', '20')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete Expenses', () => {
        cy.log('OTS-50')
        onClaimPage.deleteExpenses('Expense Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Delete An Expense Type', () => {
        cy.log('OTS-51')
        onClaimPage.deleteAnExpenseType('Expense Test')
        cy.checkPopUpAndClose('Successfully Deleted')
    })

    it('[CY] Add PDF to a Claim', () => {
        cy.log('OTS-52')
        onClaimPage.addPdfToClaim()
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Delete a PDF from a Claim', () => {
        cy.log('OTS-53')
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

    it('[CY] Post a Message', () => {
        cy.log('OTS-54')
        onBuzzPage.postAMessage('Hello world!!! :)')
        cy.checkPopUpAndClose('Successfully Saved')
    })

    it('[CY] Check Published Message', () => {
        cy.log('OTS-55')
        onBuzzPage.checkFirstPublishedMessage('Hello world!!! :)')
    })

    it('[CY] Like a Message', () => {
        cy.log('OTS-56')
        onBuzzPage.likeAMessage()
    })
})