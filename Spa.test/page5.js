export const render = (root) => {
  GetBudgetName('1')
  GetCategory()

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
}

async function GetBudgetName(id) {
  const resonse = await fetch(
    // `https://localhost:7073/ListAllBudgetForSpecificUser/${id}
    // `
    `https://localhost:7073/ListAllBudgetForSpecificUser?UserId=${id} 
    `
  )
  const data = await resonse.json()
  console.log('data', data)
  const app = (document.querySelector('.option1').innerHTML = `
  <label for="budget-value">Budget</label>
    <select class='budget-value'>
    ${data.map((budget) => `<option label>${budget.budgetName}</option>`)}
        </select> 
        `)
}

async function GetCategory() {
  const resonse = await fetch(`https://localhost:7073/api/Category/category`)
  const data = await resonse.json()
  console.log('data', data)
  const app = (document.querySelector('.option2').innerHTML = `
  <label for="category-value">Category</label>
    <select class='category-value'>
    ${data.map((category) => `<option>${category.categoryName}</option>`)}
        </select>
        `)
}
