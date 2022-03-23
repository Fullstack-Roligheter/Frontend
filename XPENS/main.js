import { render as page1Render } from './home.js'
import { render as page2Render } from './checkUser.js'
import { render as addexpense } from './addexpense.js'
import { render as ListAllExpensesInBudgetRender } from './ListAllExpensesInBudget.js'
import { render as filter } from './filters.js'
import { render as ListAllExpensesInBudgetCatRender } from './ListAllExpensesInBudgetCat.js'
import { render as addincome } from './addincome.js'
import { registerChangeListener } from './router.js'
import { Header } from './header.js'

const header = new Header()
const app = document.getElementById('app')

registerChangeListener((newPage) => {
  app.innerHTML = ''
  switch (newPage) {
    case 'home':
      page1Render(app)
      break
    case 'checkUser':
      page2Render(app)
      break
    case 'addexpense':
      addexpense(app)
      break
    case 'ListAllExpensesInBudget':
      ListAllExpensesInBudgetRender(app)
      break
    case 'filters':
      filter(app)
      break
    case 'ListAllExpensesInBudgetCat':
      ListAllExpensesInBudgetCatRender(app)
      break
    case 'addincome':
      addincome(app)
      break
  }
})

page1Render(app)
