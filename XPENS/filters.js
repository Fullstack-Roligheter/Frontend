export const render = (root) => {
  const xhr = new XMLHttpRequest()
  const container = document.getElementById('app')
  xhr.onload = function () {
    if (this.status === 200) {
      container.innerHTML = xhr.responseText
    } else {
      console.warn('Did not recieve 200 ok response!')
    }
  }
  xhr.open('get', './Filter/expenseFilter.html')
  xhr.send()

  GetBudgetName('1')
}

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

export const DropDown = (data) => {
  setTimeout(() => {
    const app = (document.querySelector('.option1').innerHTML = `
        <label for="budget-value">Budget</label>
        <select class='budget-value'>
            ${data.map(
              (budget) => `<option label>${budget.budgetName}</option>`
            )}</select> `)
  }, 0)
}
