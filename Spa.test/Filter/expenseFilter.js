async function List() {
  const budgetValue = document.querySelector('.budget-value').value
  const categoryValue = document.querySelector('.category-value').value

  const response = await fetch(
    `https://localhost:7073/api/expense/expensefilter?BudgetName=${budgetValue}&CategoryName=${categoryValue}`
  )
  const data = await response.json()
  let expenseData
  expenseData = data

  CreateTable(data)

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
}
