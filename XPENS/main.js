import { render as page1Render } from "./home.js";
import { render as page2Render } from "./checkUser.js";
import { render as page3Render } from "./addexpense.js";
import { render as ListAllExpensesInBudgetRender } from "./ListAllExpensesInBudget.js";
import { render as page5Render } from "./filters.js";
import { render as ListAllExpensesInBudgetCatRender } from "./ListAllExpensesInBudgetCat.js";
import { render as CreateNewCategory } from "./CreateNewCategory.js";
import { registerChangeListener } from "./router.js";
import { Header } from "./header.js";

const header = new Header();
const app = document.getElementById("app");

registerChangeListener((newPage) => {
  app.innerHTML = "";
  switch (newPage) {
    case "home":
      page1Render(app);
      break;
    case "checkUser":
      page2Render(app);
      break;
    case "addexpense":
      page3Render(app);
      break;
    case "ListAllExpensesInBudget":
      ListAllExpensesInBudgetRender(app);
      break;
    case "filters":
      page5Render(app);
      break;
    case "ListAllExpensesInBudgetCat":
      ListAllExpensesInBudgetCatRender(app);
      break;
      case "CreateNewCategory":
        CreateNewCategory(app);
        break;
  }
});

page1Render(app);
