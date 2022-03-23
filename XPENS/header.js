import { changePage } from './router.js'

const registerMenuLi = (id, page) => {
  const li = document.getElementById(id)
  li.addEventListener('click', () => {
    changePage(page)
    changeColor()
  })
}
const changeColor = () => {
  const lis = document.getElementsByTagName('li')
  for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
      for (let i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = ''
      }
      this.style.backgroundColor = 'darkcyan'
    }
  }
}

export class Header {
    constructor() {
        registerMenuLi("li1", "home");
        registerMenuLi("li2", "savingPlan");
        registerMenuLi("li3", "checkPlan");
       registerMenuLi('li8', 'addincome')
        registerMenuLi("li4", "addexpense");
        registerMenuLi("li5", "ListAllExpensesInBudget");
        registerMenuLi("li6", "filters");
        registerMenuLi("li7", "ListAllExpensesInBudgetCat");
    }
}

