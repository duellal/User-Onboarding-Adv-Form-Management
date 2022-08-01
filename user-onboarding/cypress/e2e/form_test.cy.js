describe('User Onboarding', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const firstNameInput = () => cy.get('input[name="first_name"]')
  const lastNameInput = () => cy.get('input[name="last_name"]')
  const emailInput = () => cy.get('input[name="email"]')
  const passInput = () => cy.get('input[name="password"]')
  const confirmPassInput = () => cy.get('input[name="confirmPassword"]')

  it('name input', () => {
    firstNameInput()
      .should("have.value", "")
      .type('Marele')
      .should('have.value', 'Marele')

    lastNameInput()
      .should('have.value', '')
      .type('Stormwind')
      .should('have.value', 'Stormwind')
  });

  it('email input', () => {
    emailInput()
      .should('have.value', '')
      .type('marele@stormwind.com')
      .should('have.value', 'marele@stormwind.com')
  });

  it('password/confirm input', () => {
    passInput()
      .should('have.value', '')
      .type('M@releSt0rmw1nd')
      .should('have.value', 'M@releSt0rmw1nd')

    confirmPassInput()
      .should('have.value', '')
      .type('M@releSt0rmw1nd')
      .should('have.value', 'M@releSt0rmw1nd')
  });
})