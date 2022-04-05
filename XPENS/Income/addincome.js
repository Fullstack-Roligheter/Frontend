import {
  CreateFormElement,
  CreateFormDropDownElement,
  CreateFormButton,
  clearForms,
} from '../reUse.js'

export const render = () => {
  const app = document.querySelector('#app')
  const div = document.createElement('div')
  div.classList.add('income')

  const form = document.createElement('form')
  form.id = 'incomeForm'
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

  CreateFormButton('Add', 'incomeBtn', form)

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

  const incomeForm = document.querySelector('#incomeForm')

  incomeForm.addEventListener('submit', (e) => {
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
