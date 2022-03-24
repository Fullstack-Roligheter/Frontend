"use strict";
export const render = () => {
  let userId = 1;
  let budgetId = "";
  let tempList = [];
  let budgetName = "";

  const oldStyleSheet = document.getElementById("lac-style");
  if (oldStyleSheet) oldStyleSheet.remove();

  const customStyleSheet = document.createElement("link");
  customStyleSheet.setAttribute("id", "lac-style");
  customStyleSheet.setAttribute("rel", "stylesheet");
  customStyleSheet.setAttribute("href", "lac.css");
  document.head.appendChild(customStyleSheet)

  const body = document.getElementById("app");

  let pageTitle = document.createElement("h2");
  pageTitle.innerHTML = "Expenses (Sorted by Category)";
  body.appendChild(pageTitle);



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
    console.log("MenuChange was entered");
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
      // let budgetNameDiv = document.createElement("div");
      // budgetNameDiv.setAttribute("class", "budget-name");
      // //budgetNameDiv.innerHTML = date.getMilliseconds();
      // budgetNameDiv.innerHTML = "Budget Name : " + data[i].budgetName;

      // newExpensesContainerEl.appendChild(budgetNameDiv);

      for (let k = 0; k < data[i].categories.length; k++) {


        let categoryContainer = document.createElement("div");
        categoryContainer.setAttribute("class", "category-container");
        newExpensesContainerEl.appendChild(categoryContainer);

        let categoryNameDiv = document.createElement("div");
        categoryNameDiv.setAttribute("class", "category-name");
        categoryNameDiv.innerHTML =
          "Category Name : " + data[i].categories[k].categoryName
        categoryContainer.appendChild(categoryNameDiv);

        let expensesContainerDiv = document.createElement("div");
        expensesContainerDiv.setAttribute("class", "expense-container");
        categoryContainer.appendChild(expensesContainerDiv);

            let expenseRowHeaderDiv = document.createElement("div");
            expenseRowHeaderDiv.setAttribute("class", "expense-row-header");
            expensesContainerDiv.appendChild(expenseRowHeaderDiv);

                let expensesDate = document.createElement("div");
                expensesDate.setAttribute("class", "expense-item expense-date");
                expensesDate.innerHTML = 'Date'
                expenseRowHeaderDiv.appendChild(expensesDate);

                let expensesRecipient = document.createElement("div");
                expensesRecipient.setAttribute("class", "expense-item expense-recipient");
                expensesRecipient.innerHTML = 'Recipient'
                expenseRowHeaderDiv.appendChild(expensesRecipient);

                let expensesAmount = document.createElement("div");
                expensesAmount.setAttribute("class", "expense-item expense-amount");
                expensesAmount.innerHTML = 'Amount';
                expenseRowHeaderDiv.appendChild(expensesAmount);

                let expensesComment = document.createElement("div");
                expensesComment.setAttribute("class", "expense-item expense-comment");        
                expensesComment.innerHTML = 'Comment';
                expenseRowHeaderDiv.appendChild(expensesComment);

        for (let j = 0; j < data[i].categories[k].expenses.length; j++) {

          let expenseRowDiv = document.createElement("div");
          expenseRowDiv.setAttribute("class", "expense-row");
          expensesContainerDiv.appendChild(expenseRowDiv);

          let expensesDate = document.createElement("div");
          expensesDate.setAttribute("class", "expense-item expense-date");
          expensesDate.innerHTML = data[i].categories[k].expenses[j].date
          expenseRowDiv.appendChild(expensesDate);

          let expensesRecipient = document.createElement("div");
          expensesRecipient.setAttribute("class", "expense-item expense-recipient");
          expensesRecipient.innerHTML = data[i].categories[k].expenses[j].recipient
          expenseRowDiv.appendChild(expensesRecipient);

          let expensesAmount = document.createElement("div");
          expensesAmount.setAttribute("class", "expense-item expense-amount");
          expensesAmount.innerHTML = data[i].categories[k].expenses[j].amount + ' kr';
          expenseRowDiv.appendChild(expensesAmount);

          let expensesComment = document.createElement("div");
          expensesComment.setAttribute("class", "expense-item expense-comment");        
          if (!data[i].categories[k].expenses[j].comment) {
            expensesComment.innerHTML = '';
          }
          else {
            expensesComment.innerHTML = data[i].categories[k].expenses[j].comment
          }
          expenseRowDiv.appendChild(expensesComment);
        }
      }
    }
  };
  GetBudgets(userId);
};
