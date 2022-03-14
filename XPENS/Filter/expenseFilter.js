async function List() {
  const budgetValue = document.querySelector('.budget-value').value
  const categoryValue = document.querySelector('.category-value').value
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

function CreateTable(data) {
  const tbl = document.querySelector('.table-data')
  let dataHtml = ' '
  for (expense of data) {
    dataHtml += `<tr>
                    <td>${expense.expenseRecipient}</td>
                    <td>${expense.expenseAmount}</td>
                    <td>${expense.expenseDate}</td>
                    <td>${expense.expenseComment}</td>
                </tr>`
  }
  tbl.innerHTML = dataHtml
}

function changeCategory() {
  const budgetValue = document.querySelector('.budget-value')
  budgetValue.addEventListener('change', () => {
    console.log(budgetValue.value)
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
