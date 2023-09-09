
export const dataQa = (input, options) => {
  return cy.get(`[data-qa=${input}]`, options);
}