import { changePage } from './router.js'

const registerMenuLi = (className, page) => {
  const li = document.getElementsByClassName(className);

  for (const item of li) {
    item.addEventListener('click', () => {
      changePage(page)
    })
  }
  // changeColor()
}
// const changeColor = () => {
//   const lis = document.getElementsByTagName('li')
//   for (let i = 0; i < lis.length; i++) {
//     lis[i].onclick = function () {
//       for (let i = 0; i < lis.length; i++) {
//         lis[i].style.backgroundColor = ''
//       }
//       this.style.backgroundColor = 'darkcyan'
//     }
//   }
// }

export class Header {
    constructor() {
        registerMenuLi("homeLinkPage", "home");
        registerMenuLi("savingPlanLink", "savingPlan");
        registerMenuLi("checkPlanLink", "checkPlan");
        registerMenuLi('addIncomeLink', 'addincome')
        registerMenuLi("addExpenseLink", "addexpense");
        registerMenuLi("checkBudgetLink", "ListAllExpensesInBudget");
        registerMenuLi("filterLink", "filters");
        registerMenuLi("checkBudgetCatLink", "ListAllExpensesInBudgetCat");
        registerMenuLi("addCatLink", "CreateNewCategory");
    }
}

