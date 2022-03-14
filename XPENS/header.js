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
        registerMenuLi('li1', 'home');
        registerMenuLi('li2', 'checkUser');
        registerMenuLi('li3', 'page3');
        registerMenuLi('li4', 'ListAllExpensesInBudget');
        registerMenuLi('li5', 'filters');
        registerMenuLi('li6', 'ListAllExpensesInBudgetCat');
    }
}
