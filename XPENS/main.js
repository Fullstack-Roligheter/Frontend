import { render as page1Render } from './home.js'
import { render as savingPlanRender } from './savingPlan.js'
import { render as checkPlanRender } from './checkPlan.js'
import { render as addincome } from './addincome.js'
import { render as addexpense } from './addexpense.js'
import { render as ListAllExpensesInBudgetRender } from './ListAllExpensesInBudget.js'
import { render as page5Render } from './filters.js'
import { render as ListAllExpensesInBudgetCatRender } from './ListAllExpensesInBudgetCat.js'
import { render as CreateNewCategory } from "./CreateNewCategory.js";
import { registerChangeListener } from './router.js'
import { Header } from './header.js'

const header = new Header()
const app = document.getElementById('app')

registerChangeListener((newPage) => {
  page1Render(app)

  app.innerHTML = ''
  switch (newPage) {
    case 'home':
      page1Render(app)
      break
    case 'savingPlan':
      savingPlanRender(app)
      break
    case 'checkPlan':
      checkPlanRender(app)
      break
    case 'addexpense':
      addexpense(app)
      break
    case 'ListAllExpensesInBudget':
      ListAllExpensesInBudgetRender(app)
      break
    case 'filters':
      page5Render(app)
      break
    case 'ListAllExpensesInBudgetCat':
      ListAllExpensesInBudgetCatRender(app)
      break
    case 'addincome':
      addincome(app)
      break
      case "CreateNewCategory":
        CreateNewCategory(app);
        break;
  }
})

page1Render(app)
