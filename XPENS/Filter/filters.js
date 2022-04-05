import { CreateTable } from '../reUse.js'
// import { ErrorMsg } from './Filter/expenseFilter.js'

export const render = (root) => {
 
  const app = document.querySelector('#app')

  const filterContainer = document.createElement('div')
  filterContainer.classList.add('filterContainer')
  const error = document.createElement('div')
  error.classList.add('error')
  const errorMsg = document.createElement('p')
  errorMsg.classList.add('para')
  error.append(errorMsg)

  const option1 = document.createElement('div')
  option1.classList.add('option1')
  const option2 = document.createElement('div')
  option2.classList.add('option2')
  const btnList = document.createElement('button')
  btnList.classList.add('btnFilter')
  btnList.innerText = 'List'
  btnList.onclick = () => {
    List()
  }

  filterContainer.append(error)
  filterContainer.append(option1)
  filterContainer.append(option2)
  filterContainer.append(btnList)
  app.append(filterContainer)

  async function GetBudgetName(Userid) {
    try {
      const response = await fetch(
        `https://localhost:7073/ListAllBudgetForSpecificUser?UserId=${Userid}
        `
      )
      if (!response.ok) {
        throw new Error(`No response ${response.status}`)
      }
      const data = await response.json()

      if (data.length == 0) {
        throw new Error(`There is/are no budget for this user yet!`)
      }
      console.log('budget', data)
      DropDown(data)

      GetCategory(data[0].budgetName)
    } catch (error) {
      ErrorMsg(error)
      console.error(error)
    }
  }
  GetBudgetName('1')

  const DropDown = (data) => {
    const app = (document.querySelector('.option1').innerHTML = `
          <label for="budget-value">Budget</label>
          <select class='budget-value'>
              ${data.map(
                (budget) => `<option label>${budget.budgetName}</option>`
              )}</select> `)
    changeCategory()
  }
  function changeCategory() {
    const budgetValue = document.querySelector('.budget-value')
    budgetValue.addEventListener('change', () => {
      console.log(`cat change ${budgetValue.value}`)
      GetCategory(budgetValue.value)
    })
  }

  async function GetCategory(budgetValue) {
    try {
      const response = await fetch(
        `https://localhost:7073/api/Category/categoryBudget?BudgetName=${budgetValue}`
      )

      if (!response.ok) {
        throw new Error(`Connection failed ${response.status}`)
      }
      const data = await response.json()
      console.log('category', data)
      const app = (document.querySelector('.option2').innerHTML = `
          <label for="category-value">Category</label>
          <select class='category-value'>
              ${data.map(
                (category) => `<option>${category.categoryName}</option>`
              )}
          </select>
          `)
    } catch (error) {
      ErrorMsg(error)
      console.log(error)
    }
  }

  function ErrorMsg(error) {
    const errorMsg = document.querySelector('.para')
    errorMsg.innerHTML = error
    return setTimeout(() => {
      errorMsg.innerHTML = ''
    }, 2000)
  }
  function ClearingBody() {
    const tbody = document.querySelector('.table')
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
    }
  }

  async function List() {
    const budgetValue = document.querySelector('.budget-value').value
    const categoryValue = document.querySelector('.category-value').value
    const Table = document.querySelector('.table')
    if (Table) Table.remove()
    const budgetTemp = budgetValue
    const catTemp = categoryValue

    try {
      const response = await fetch(
        `https://localhost:7073/api/expense/expensefilter?BudgetName=${budgetValue}&CategoryName=${categoryValue}`
      )
      if (!response.ok) {
        throw new Error(`No response ${response.status}`)
      }
      const data = await response.json()
      console.log('list', data)

      if (data.length == 0) {
        throw new Error(`There is/are no expenses`)
      }

      CreateTable(data)
    } catch (error) {
      ErrorMsg(error)
      console.error(error)
    }
  }
}
