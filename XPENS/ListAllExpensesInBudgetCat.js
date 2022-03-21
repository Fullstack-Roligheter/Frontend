"use strict";
export const render = () => {
  let userId = 1;
  let budgetId = "";
  let tempList = [];
  let budgetName = "";

  const body = document.getElementById("app");

  const GetBudgets = (loggedInUserId) => {
    fetch("https://localhost:7073/ListAllBudgetForSpecificUser", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ userId: loggedInUserId }),
    })
      .then((response) => response.json())
      .then(function (data) {
        PopulateList(data);
      });
  };

  const PopulateList = (data) => {
    tempList = data;
    ListAllBudgetInDropdown(data);
  };

  const ListAllBudgetInDropdown = (data) => {
    let menu = document.createElement("select");
    menu.setAttribute("id", "menu");

    for (let i = 0; i < data.length; i++) {
      let option = document.createElement("option");
      option.setAttribute("id", "option");
      option.setAttribute("value", i);
      option.innerHTML = data[i].budgetName;
      menu.appendChild(option);
    }
    body.appendChild(menu);
    MenuChange();
    SelectBudgetFromMenu();
  };

  const MenuChange = () => {
    const menu = document.getElementById("menu");
    console.log("select was pressed");
    menu.onchange = function () {
      UpdateName();
    };
  };

  const UpdateName = () => {
    const tempMenu = document.getElementById("menu");
    budgetName = tempMenu.options[tempMenu.selectedIndex].text;

    SelectBudgetFromMenu();
  };

  const SelectBudgetFromMenu = () => {
    const tempMenu = document.getElementById("menu");
    budgetName = tempMenu.options[tempMenu.selectedIndex].text;
    console.log(budgetName);

    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].budgetName === budgetName) {
        budgetId = tempList[i].budgetId;
      }
    }

    GetExpenses();
  };

  const GetExpenses = async () => {
    const response = await fetch(
      "https://localhost:7073/GetExpenseForSpecificBudgetSortedIntoCategories",
      {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ userId: userId, budgetId: budgetId }),
      }
    );
    const data = await response.json();
    console.log(data);
    const oldExpensesContainerEl =
      document.getElementById("expenses-container");
    if (oldExpensesContainerEl) oldExpensesContainerEl.remove();

    const newExpensesContainerEl = document.createElement("div");
    newExpensesContainerEl.setAttribute("id", "expenses-container");

    const date = new Date();
    // newExpensesContainerEl.innerHTML = date.getMilliseconds();

    body.appendChild(newExpensesContainerEl);

    for (let i = 0; i < data.length; i++) {
      let div1 = document.createElement("div");
      div1.setAttribute("id", "budget-title");
      // div1.innerHTML = date.getMilliseconds();
      div1.innerHTML = "Budget Name : " + data[i].budgetName + "<br/><br/>";

      newExpensesContainerEl.appendChild(div1);

      for (let k = 0; k < data[i].categories.length; k++) {
        console.log(data[i].categories.length);
        let div3 = document.createElement("div");
        div3.setAttribute("class", "category-name");
        div3.innerHTML =
          "Category Name : " +
          data[i].categories[k].categoryName +
          "<br/><br/>" +
          "Expenses :" +
          "<br/>";
        // div3.innerHTML = date.getMilliseconds();
        newExpensesContainerEl.appendChild(div3);

        for (let j = 0; j < data[i].categories[k].expenses.length; j++) {
          let div2 = document.createElement("div");
          div2.setAttribute("class", "budget-item");
          //div2.innerHTML = date.getMilliseconds();
          div2.innerHTML =
            "Amount : " +
            data[i].categories[k].expenses[j].amount +
            "<br/>" +
            "Recipient : " +
            data[i].categories[k].expenses[j].recipient +
            "<br/>" +
            "Date : " +
            data[i].categories[k].expenses[j].date +
            "<br/>" +
            "Comment : " +
            data[i].categories[k].expenses[j].comment +
            "<br/><br/>";
          newExpensesContainerEl.appendChild(div2);
        }
      }
    }
  };
  GetBudgets(userId);
};
