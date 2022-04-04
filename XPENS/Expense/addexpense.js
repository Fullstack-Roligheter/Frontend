import {
  CreateFormElement,
  CreateFormDropDownElement,
  CreateFormButton,
  clearForms,
} from '../reUse.js'

export const render = () => {
  const app = document.querySelector('#app')
  const div = document.createElement('div')
  div.classList.add('expense')

  const form = document.createElement('form')
  form.id = 'incomeForm'
  CreateFormElement(
    'label',
    'Recipient',
    'expenseRecipient',
    'text',
    'expenseRecipient',
    form
  )
  CreateFormElement(
    'label',
    'Amount',
    'expenseAmount',
    'number',
    'expenseAmount',
    form
  )
  CreateFormElement('label', 'Date', 'expenseDate', 'date', 'expenseDate', form)
  CreateFormElement(
    'label',
    'Comment',
    'expenseComment',
    'text',
    'expenseComment',
    form
  )
  CreateFormDropDownElement('Income category', 'expenseCategory', form)

  CreateFormButton('Add', 'expenseBtn', form)

  div.append(form)
  app.append(div)

  async function ExpenseCategory() {
    const resonse = await fetch('https://localhost:7073/api/Category/category')
    const data = await resonse.json()
    console.log('data', data)
    document.querySelector('#expenseCategory').innerHTML = `
    <select id="val">
    ${data.map((category) => `<option>${category.categoryName}</option>`)}
    </select
    `
  }
  ExpenseCategory()

  const expenseForm = document.querySelector('#expenseForm')
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let Amount = document.querySelector('#expenseAmount').value
    let recipient = document.querySelector('#expenseRecipient').value
    let expenseDate = document.querySelector('#expenseDate').value
    let expenseComment = document.querySelector('#expenseComment').value
    let categoryName = document.querySelector('#expenseCategory').value
    debugger
    let expense = {
      amount: Amount,
      recipient: recipient,
      date: expenseDate,
      comment: expenseComment,
      categoryName: categoryName,
    }

    fetch('https://localhost:7073/AddExpense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(expense),
    })
    alert('Expenses Added')
  })

  clearForms()
}
