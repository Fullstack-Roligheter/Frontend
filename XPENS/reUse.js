export function CreateFormElement(
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
  input.id = forAttribute
  input.name = inputName
  input.setAttribute('required', '')

  formName.append(label)
  formName.append(input)
}

export function CreateFormButton(buttonTextContent, buttonClassName, formName) {
  const button = document.createElement('button')
  button.textContent = buttonTextContent
  button.type = 'submit'
  button.classList.add(buttonClassName)
  formName.append(button)
}

export function CreateFormDropDownElement(
  labelTextContent,
  forAttribute,
  formName
) {
  const label = document.createElement('label')
  label.textContent = labelTextContent
  label.setAttribute('for', forAttribute)

  const selectElement = document.createElement('select')
  selectElement.id = forAttribute

  formName.append(label)
  formName.append(selectElement)
}

export function clearForms() {
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].reset()
  }
}

//Table functions

export function CreateTable(data) {
  const app = document.querySelector('#app')

  const filterContainer = document.querySelector('.filterContainer')
  const table = document.createElement('table')
  table.classList.add('table')

  const thead = document.createElement('thead')
  const trHead = document.createElement('tr')

  const thHeadValue = ['Recipient', 'Amount', 'Date', 'Comment']
  if (thead != ' ') {
    for (let i = 0; i < thHeadValue.length; i++) {
      const thHeadCell = document.createElement('th')
      thHeadCell.innerText = thHeadValue[i]
      trHead.append(thHeadCell)
    }
  }

  thead.append(trHead)
  table.append(thead)
  const tbody = document.createElement('tbody')
  tbody.classList.add('.table-data')

  const trbody = document.createElement('tr')

  let dataHtml = ' '
  data.forEach((element) => {
    dataHtml = `
      <td >${element.expenseRecipient}</td>
      <td>${element.expenseAmount}</td>
      <td>${element.expenseDate}</td>
      <td>${element.expenseComment}</td>
  `
  })

  trbody.innerHTML = dataHtml
  tbody.append(trbody)
  table.append(tbody)

  filterContainer.append(table)
  app.append(filterContainer)
}

// function CreateTable2(data) {
//   const tbl = document.querySelector('.table-data')
//   let dataHtml = ' '
//   for (data of data) {
//     dataHtml += `<tr>
//                     <td>${data.expenseRecipient}</td>
//                     <td>${data.expenseAmount}</td>
//                     <td>${data.expenseDate}</td>
//                     <td>${data.expenseComment}</td>
//                 </tr>`
//   }
//   tbl.innerHTML = dataHtml
// }

function ClearingBody() {
  const tbody = document.querySelector('tbody')
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  }
}
