export const render = () => {
  const xhr = new XMLHttpRequest()
  const container = document.getElementById('app')
  xhr.onload = function () {
    if (this.status === 200) {
      container.innerHTML = xhr.responseText
    } else {
      console.warn('Did not recieve 200 ok response!')
    }
  }
  xhr.open('get', 'Expense.html')
  xhr.send()

  //   function getCategory() {
  //     const resonse = await fetch('https://localhost:7073/api/Category/category')
  //     const data = await resonse.json()
  //     console.log('data', data)

  //     document.querySelector('#categoryName').innerHTML = `
  //       <select id="val">
  //       ${data.map((category) => `<option>${category.categoryName}</option>`)}
  //       </select
  //       `
  //   }

  async function get() {
    const resonse = await fetch('https://localhost:7073/api/Category/category')
    const data = await resonse.json()
    console.log('data', data)
    document.querySelector('#categoryName').innerHTML = `
    <select id="val">
    ${data.map((category) => `<option>${category.categoryName}</option>`)}
    </select
    `
  }
  get()

  //   const Fetching = () => {
  //     form.addEventListener('submit', (e) => {
  //       e.preventDefault()

  //       let recipient = document.querySelector('#expenseRecipient').value
  //       let Amount = document.querySelector('#expenseAmount').value
  //       let expenseDate = document.querySelector('#expenseDate').value
  //       let expenseComment = document.querySelector('#expenseComment').value
  //       let categoryName = document.querySelector('#val').value

  //       let expense = {
  //         amount: Amount,
  //         recipient: recipient,
  //         date: expenseDate,
  //         comment: expenseComment,
  //         categoryName: categoryName,
  //       }
  //       fetch('https://localhost:7073/AddExpense', {
  //         method: 'POST',
  //         headers: { 'Content-type': 'application/json; charset=UTF-8' },
  //         body: JSON.stringify({ expense }),
  //       })
  //         .then((response) => response.json())
  //         .then(function (data) {
  //           PopulateList(data)
  //         })
  //     })
  //   }
  getCategory()
  //   Fetching()
}
