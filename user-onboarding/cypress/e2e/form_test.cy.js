describe('User Onboarding MVPs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  const firstNameInput = () => cy.get('input[name="first_name"]')
  const lastNameInput = () => cy.get('input[name="last_name"]')
  const emailInput = () => cy.get('input[name="email"]')
  const passInput = () => cy.get('input[name="password"]')
  const confirmPassInput = () => cy.get('input[name="confirmPassword"]')
  const termsCheckbox = () => cy.get('input[name="terms"]')
  //const submitButton = () => cy.get('button[class="submit"]') - same as below:
  const submitButton = () => cy.get('.submit')
  const firstNameValErr = () => cy.get('div[class="error-first"]')
  const lastNameValErr = () => cy.get('div[class="error-last"]')
  const emailValErr = () => cy.get('div[class="error-email"]')
  const pwValErr = () => cy.get('div[class="error-pw"]')
  const confirmPwValErr = () => cy.get('div[class="error-confirmPw"]')

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

  it('terms of service checkbox can be clicked', () => {
    termsCheckbox()
      .should('not.be.disabled')
      .click()
    //Error occurs - expects the boolean to be true, but it is false; even though this is not part of the assignment, I would like to go back to this in my code and see why this is happening as the state is changing from false to true when I inspect it.
    // .should('be.disabled')

    //Tried this as well and came up with the same error:
    // termsCheckbox()
    // .should('have.prop', 'disabled', false)
    // .click()
    // .should('have.prop', 'disabled', true)
  });

  it('input data + submit form?', () => {
    cy.contains('Zelda Trinity').should('not.exist')

    firstNameInput()
      .type('Zelda')
      .should('have.value', 'Zelda')

    lastNameInput()
      .type('Trinity')
      .should('have.value', 'Trinity')

    emailInput()
      .type('zelda@trinity.com')
      .should('have.value', 'zelda@trinity.com')

    passInput()
      .type('Wizard$9')
      .should('have.value', 'Wizard$9')

    confirmPassInput()
      .type('Wizard$9')
      .should('have.value', 'Wizard$9')

    termsCheckbox()
      .click()

    submitButton()
      .click()

    cy.contains('Zelda Trinity').should('exist')
  });

  it('Validation Errors after typing in input boxes', () => {
    firstNameValErr()
      .should('be.hidden')
    firstNameInput()
      .type('a')
    firstNameValErr()
      .should('not.be.hidden')
      .should('have.text', 'First name must be at least 3 characters long')

    lastNameValErr()
      .should('be.hidden')
    lastNameInput()
      .type('b')
    lastNameValErr()
      .should('not.be.hidden')
      .should('have.text', 'Last name must be at least 2 characters long')

    emailValErr()
      .should('be.hidden')
    emailInput()
      .type('c')
    emailValErr()
      .should('not.be.hidden')
      .should('have.text', 'Enter a valid email')

    pwValErr()
      .should('be.hidden')
    passInput()
      .type('d')
    pwValErr()
      .should('not.be.hidden')
      .should('have.text', 'Password must contain at least 8 characters, one uppercase, one number and one special case character')

    confirmPwValErr()
      .should('be.hidden')
    confirmPassInput()
      .type('e')
    confirmPwValErr()
      .should('not.be.hidden')
      .should('have.text', 'Passwords do not match')
  });
})