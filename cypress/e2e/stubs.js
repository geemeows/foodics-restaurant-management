const CORS_ANYWHERE_SERVICE = 'https://cors-anywhere.herokuapp.com/'
const baseURL = `${CORS_ANYWHERE_SERVICE}https://api.foodics.dev/v5`

export const stubGetBranchesRequest = ({
  modifiedData = {},
  config = {},
}) => {
  return cy.fixture('branches.json').then((data) => {
    if (modifiedData) data = { ...data, ...modifiedData }

    console.log({ data })

    return cy
      .intercept(
        {
          method: 'GET',
          url: `${baseURL}/branches?include[0]=sections&include[1]=sections.tables`,
        },
        {
          body: data,
          ...config,
        },
      )
      .as('branches')
  })
}