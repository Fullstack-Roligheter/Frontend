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
  xhr.open('get', './Expense/Expense.html')
  xhr.send()

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
}
