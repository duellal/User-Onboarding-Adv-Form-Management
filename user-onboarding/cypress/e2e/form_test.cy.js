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

describe('User Onboarding MVPs', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

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

describe('Stretch - form on load', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Loads page correctly', () => {
    cy.get('form').should('exist')

    cy.get('div[class="user-container container"]')
      .should('exist')

    cy.get('div[class="user container"]')
      .should('exist')

    cy.get('div[class="first-name"]')
      .should('contain', 'First Name')

    cy.get('div[class="last-name"]')
      .should('contain', 'Last Name')

    cy.get('div[class="email"]')
      .should('contain', 'Email')

    cy.get('div[class="role"]')
      .should('contain', 'Role')

    cy.get('div[class="password"]')
      .should('contain', 'Password')

    //Can't confirm that Confirm Password is on the form because I made its class to be password (same as Password's class)

    cy.get('div[class="formTerms"]')
      .should('contain', 'Terms of Service')
    cy.get('div[class="terms"]')
      .find('p')
      .should((p) => {
        const text = p.map((i, el) => Cypress.$(el).text())
        const paragraphs = text.get()
        console.log(`p:`, p)
        console.log(`text:`, text)
        console.log(`paragraphs:`, paragraphs)

        expect(paragraphs, 'has 5 paragraphs').to.have.length(5)

        expect(paragraphs, 'has expected text in each paragraph')
          .to.eql([`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Facilisi morbi tempus iaculis urna id volutpat lacus laoreet non.Vivamus arcu felis bibendum ut tristique et egestas quis ipsum.Facilisi etiam dignissim diam quis.Nunc scelerisque viverra mauris in aliquam sem fringilla.Amet est placerat in egestas erat imperdiet sed euismod nisi.Pulvinar pellentesque habitant morbi tristique senectus et.Mi proin sed libero enim sed faucibus.Enim sed faucibus turpis in eu.Vulputate ut pharetra sit amet aliquam.Ipsum suspendisse ultrices gravida dictum fusce.Mauris a diam maecenas sed enim ut sem viverra aliquet.Nulla facilisi morbi tempus iaculis urna id.Blandit volutpat maecenas volutpat blandit.Porta nibh venenatis cras sed felis eget velit.`, `Scelerisque varius morbi enim nunc faucibus a pellentesque.Aliquam eleifend mi in nulla posuere sollicitudin aliquam.Eu mi bibendum neque egestas congue quisque.Volutpat lacus laoreet non curabitur gravida arcu ac.Sed id semper risus in.Elementum integer enim neque volutpat ac tincidunt.Congue quisque egestas diam in arcu cursus euismod.Eget sit amet tellus cras adipiscing enim eu turpis egestas.Bibendum est ultricies integer quis auctor elit sed vulputate mi.Curabitur gravida arcu ac tortor dignissim convallis aenean.Nulla porttitor massa id neque aliquam.Nullam ac tortor vitae purus.Senectus et netus et malesuada fames ac turpis egestas.`,

            `At in tellus integer feugiat scelerisque varius.Facilisi nullam vehicula ipsum a arcu cursus vitae congue.At auctor urna nunc id.Lectus proin nibh nisl condimentum id venenatis a.Nullam vehicula ipsum a arcu cursus vitae.Gravida arcu ac tortor dignissim convallis aenean.Ultrices vitae auctor eu augue ut lectus arcu bibendum at.Cras fermentum odio eu feugiat pretium nibh ipsum.Tellus mauris a diam maecenas sed enim ut sem viverra.Est ultricies integer quis auctor elit sed.Elementum integer enim neque volutpat ac tincidunt vitae semper.Mauris in aliquam sem fringilla ut morbi tincidunt augue interdum.`,

            `Quis enim lobortis scelerisque fermentum.Dignissim diam quis enim lobortis scelerisque.Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat.Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.Lacus sed turpis tincidunt id aliquet risus feugiat.Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed.Vel facilisis volutpat est velit egestas dui id.Mattis ullamcorper velit sed ullamcorper morbi.Pharetra convallis posuere morbi leo urna molestie.Volutpat est velit egestas dui id ornare arcu odio.Nec sagittis aliquam malesuada bibendum.Enim nec dui nunc mattis enim ut tellus.Pretium aenean pharetra magna ac placerat.Sit amet mattis vulputate enim nulla aliquet porttitor.Vitae aliquet nec ullamcorper sit amet.Lorem sed risus ultricies tristique nulla aliquet enim tortor at.Fringilla est ullamcorper eget nulla facilisi etiam dignissim.`,

            `Egestas quis ipsum suspendisse ultrices gravida dictum fusce.Dignissim enim sit amet venenatis urna.Amet dictum sit amet justo donec enim diam vulputate.Non sodales neque sodales ut etiam sit.Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat.Cursus vitae congue mauris rhoncus aenean vel.Adipiscing elit ut aliquam purus sit amet luctus venenatis.Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate.Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.Cum sociis natoque penatibus et magnis dis parturient montes nascetur.Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis.Adipiscing bibendum est ultricies integer quis.Vitae auctor eu augue ut lectus.At ultrices mi tempus imperdiet nulla malesuada pellentesque.Egestas fringilla phasellus faucibus scelerisque.Imperdiet proin fermentum leo vel orci.Vestibulum morbi blandit cursus risus.`
          ])
      })

    termsCheckbox().should('not.be.checked')
    submitButton().should('exist').and('be.disabled')
  })

  it('Input is empty and sumbit button disabled', () => {
    firstNameInput()
      .should('be.empty')
    lastNameInput()
      .should('be.empty')
    emailInput()
      .should('be.empty')
    cy.get('option[value=""]').should('have.text', 'Select Role')
    passInput()
      .should('be.empty')
    confirmPassInput()
      .should('be.empty')
    termsCheckbox()
      .should('not.be.checked')
    submitButton()
      .should('be.disabled')
  })
})

describe('Stretch - On submit, creates a new div card with info from inputs', () => {
  before(() => {
    cy.visit('http://localhost:3000')
  })

  //Want to make a new div card (above) and then count the number of div cards (should increase by 1)
  it('Creates a new div card and adds it to the DOM', async () => {
    //checking there are user divs in the DOM
    cy.get('div[class="user-container container"]')
      .find('div[class="user container"]')
      .should((div) => {
        const divs = div.map((i, el) => Cypress.$(el).text())
        const divsArr = divs.get()

        expect(divsArr, `has ${divsArr.length} items`).to.have.length(6)
      })

    //submits a new user div to DOM
    cy.contains('Raja Christopher').should('not.exist')
    firstNameInput()
      .type('Raja')
      .should('have.value', 'Raja')
    lastNameInput()
      .type('Christopher')
      .should('have.value', 'Christopher')
    emailInput()
      .type('raja@dog.com')
      .should('have.value', 'raja@dog.com')
    passInput()
      .type('d0ggyHe@ven!')
      .should('have.value', 'd0ggyHe@ven!')
    confirmPassInput()
      .type('d0ggyHe@ven!')
      .should('have.value', 'd0ggyHe@ven!')
    termsCheckbox()
      .click()
    submitButton()
      .click()

    //Need to wait so that the info above gets put into the DOM
    cy.wait(1500)

    //checking that the new div is in the DOM and the arrays have added one more item
    cy.get('div[class="user-container container"]')
      .find('div[class="user container"]')
      .should((addDiv) => {
        const newDivs = addDiv.map((i, el) => Cypress.$(el).text())
        const newDivsArr = newDivs.get()

        expect(newDivsArr, `has ${newDivsArr.length} items`).to.have.length(7)

        //Making sure that the new div card contains the intended inputted information from above
        expect(newDivsArr[0], 'has Raja Christopher in the array').to.eql('Raja ChristopherEmail: raja@dog.comRole: Agreed to Terms?Yes')
      })
  })
})