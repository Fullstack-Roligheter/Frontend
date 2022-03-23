export const render = () => {
  const app = document.querySelector('#app')
  const div = document.createElement('div')
  div.classList.add('income')

  const form = document.createElement('form')
  form.id = 'myForm'
  CreateFormElement(
    'label',
    'Income name',
    'add-income',
    'text',
    'add-income',
    form
  )
  CreateFormElement(
    'label',
    'Income amount',
    'income-amount',
    'number',
    'income-amount',
    form
  )
  CreateFormDropDownElement('Income category', 'income-category', form)

  CreateFormElement(
    'label',
    'Income date',
    'income-date',
    'date',
    'income-date',
    form
  )

  CreateFormButton('Add', form)

  div.append(form)
  app.append(div)

  async function IncomeCategory() {
    const resonse = await fetch('https://localhost:7073/getincome')
    const data = await resonse.json()
    console.log('data', data)
    document.querySelector('#income-category').innerHTML = `
      ${data.map((income) => `<option>${income.categoryName}</option>`)}
    `
  }
  IncomeCategory()

  const myForm1 = document.querySelector('#myForm')

  myForm1.addEventListener('submit', (e) => {
    e.preventDefault()
    let userId = 1
    let incomeName = document.querySelector('#add-income').value
    let incomeAmount = document.querySelector('#income-amount').value
    let incomeDate = document.querySelector('#income-date').value
    let IncomeCategoryValue = document.querySelector('#income-category').value

    let Income = {
      UserId: userId,
      IncomeName: incomeName,
      Amount: incomeAmount,
      Created: incomeDate,
      IncomeCategory: IncomeCategoryValue,
    }
    debugger
    fetch('https://localhost:7073/addincome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(Income),
    })
    alert('Income Added')
    clearForms()
  })
}

// income name / amount / Income Category / DateTime / Submit / Reset Form

function CreateFormElement(
  elementName,
  labelTextContent,
  forAttribute,
  inputType,
  inputName,
  formName
) {
  const label = document.createElement(elementName)
  label.textContent = labelTextContent
  label.setAttribute('for', forAttribute)

  const input = document.createElement('input')
  input.type = inputType
  input.setAttribute('for', forAttribute)
  input.id = forAttribute
  input.name = inputName
  input.setAttribute('required', '')

  formName.append(label)
  formName.append(input)
}

function CreateFormButton(buttonTextContent, formName) {
  const button = document.createElement('button')
  button.textContent = buttonTextContent
  button.type = 'submit'
  button.classList.add('btn')
  formName.append(button)
}

function CreateFormDropDownElement(labelTextContent, forAttribute, formName) {
  const label = document.createElement('label')
  label.textContent = labelTextContent
  label.setAttribute('for', forAttribute)

  const selectElement = document.createElement('select')
  selectElement.id = forAttribute

  formName.append(label)
  formName.append(selectElement)
}

function clearForms() {
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].reset()
  }
}
