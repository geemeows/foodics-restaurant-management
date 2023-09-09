import { stubGetBranchesRequest } from './stubs'

describe('Branches Page - States', () => {

  it('Should show loading state', () => {
    cy.visit('/')
    cy.dataQa('table-loading-row')
      .should('exist')
  })

  it('Should show error state correctly', () => {
    cy.visit('/')
    stubGetBranchesRequest({
      modifiedData: {},
      config: {
        statusCode: 500
      }
    })

    cy.wait('@branches')
      .then(() => {
        cy.dataQa('table-error-state')
        .should('exist')
      })
  })

  it('Should show empty state correctly', () => {
    cy.visit('/')
    stubGetBranchesRequest({
      modifiedData: {},
      config: {
        statusCode: 500
      }
    })

    cy.wait('@branches')
      .then(() => {
        cy.dataQa('table-error-state')
        .should('exist')
      })
  })
})

describe('Branches Page - Table', () => {
  beforeEach(() => {
    cy.visit('/')
    stubGetBranchesRequest({
      modifiedData: {},
      config: {
        delay: 500
      }
    })
  })

  it('Should show 3 rows of data', () => {
    cy.dataQa('table-data-row')
    .should('have.length', 3)
  })
})