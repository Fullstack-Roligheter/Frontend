import { changePage } from './router.js'

const registerNavBtn = (id, page) => {
  const navBtn = document.getElementById(id)
  navBtn.addEventListener('click', () => {
    changePage(page)
    // changeColor()
  })
}

// const changeColor = () => { // Behövs denna om css style för buttons ändrar färg?
//   const navBtns = document.getElementsByClassName('menu-item')
//   for (let i = 0; i < navBtns.length; i++) {
//     navBtns[i].onclick = function () {
//       for (let i = 0; i < navBtns.length; i++) {
//         navBtns[i].style.backgroundColor = ''
//       }
//     }
//   }
// }

export class Header {
  constructor() {
    registerNavBtn("nav-btn-1", "ListAllExpensesInBudget"); //Budget Default view
    registerNavBtn("nav-btn-2", "addincome"); // Income Default view
    registerNavBtn("nav-btn-3", "home"); // Logo Default View
    registerNavBtn("nav-btn-4", "addexpense"); // Expense Default view
    registerNavBtn("nav-btn-5", "savingPlan"); // Default view for Item-4

    // registerMenuLi("li1", "home");
    // registerMenuLi("li2", "savingPlan");
    // registerMenuLi("li3", "checkPlan");
    // registerMenuLi('li8', 'addincome')
    // registerMenuLi("li4", "addexpense");
    // registerMenuLi("li5", "ListAllExpensesInBudget");
    // registerMenuLi("li6", "filters");
    // registerMenuLi("li7", "ListAllExpensesInBudgetCat");
    // registerMenuLi("li9", "CreateNewCategory");
  }
}

