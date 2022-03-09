'use strict';
export const render = () => {
    let userId = 1;
    let budgetId = '';
    let tempList = [];
    let budgetName = '';

    const body = document.getElementById('app')

    const GetBudgets = (loggedInUserId) => {
        fetch
            ('https://localhost:7073/ListAllBudgetForSpecificUser',
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ userId: loggedInUserId })
                },
            )
            .then(response => response.json())
            .then(function (data) {
                PopulateList(data);
            })
    }

    const PopulateList = (data) => {
        tempList = data
        ListAllBudgetInDropdown(data)
    }

    const ListAllBudgetInDropdown = (data) => {
        let menu = document.createElement('select')
        menu.setAttribute('id', 'menu')

        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option')
            option.setAttribute('id', 'option')
            option.setAttribute('value', i)
            option.innerHTML = data[i].budgetName
            menu.appendChild(option)
        }
        body.appendChild(menu);
        MenuChange();
        SelectBudgetFromMenu();
    }

    const MenuChange = () => {
        const menu = document.getElementById('menu');
        console.log('select was pressed')
        menu.onchange = function () { UpdateName() };
    }

    const UpdateName = () => {
        const tempMenu = document.getElementById('menu')
        budgetName = tempMenu.options[tempMenu.selectedIndex].text;

        SelectBudgetFromMenu()
    }

    const SelectBudgetFromMenu = () => {
        const tempMenu = document.getElementById('menu')
        budgetName = tempMenu.options[tempMenu.selectedIndex].text;
        console.log(budgetName)

        for (let i = 0; i < tempList.length; i++) {
            if (tempList[i].budgetName === budgetName) {
                budgetId = tempList[i].budgetId
            }
        }

        GetExpenses()
    }

    const GetExpenses = async () => {
        const response = await fetch
            ('https://localhost:7073/GetExpenseForSpecificBudget',
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ userId: userId, budgetId: budgetId })
                },
            )
        const data = await response.json();

        const oldExpensesContainerEl = document.getElementById('expenses-container');
        if (oldExpensesContainerEl) oldExpensesContainerEl.remove();

        const newExpensesContainerEl = document.createElement('div')
        newExpensesContainerEl.setAttribute('id', 'expenses-container')

        const date = new Date();
        // newExpensesContainerEl.innerHTML = date.getMilliseconds();

        body.appendChild(newExpensesContainerEl)

        for (let i = 0; i < data.length; i++) {

            let div1 = document.createElement("div")
            div1.setAttribute('id', 'Budget-Title')
            // div1.innerHTML = date.getMilliseconds();
            div1.innerHTML =
                'Budget Name : ' + data[i].budgetName + '<br/><br/>' + 'Expenses :' + '<br/>';

            newExpensesContainerEl.appendChild(div1);

            for (let j = 0; j < data[i].expenses.length; j++) {
                let div2 = document.createElement("div");
                div2.setAttribute('class', 'Budget-Item')
                //div2.innerHTML = date.getMilliseconds();
                div2.innerHTML =
                    'Category Name : ' + data[i].expenses[j].categoryName + '<br/>' +
                    'Amount : ' + data[i].expenses[j].amount + '<br/>' +
                    'Recipient : ' + data[i].expenses[j].recipient + '<br/>' +
                    'Date : ' + data[i].expenses[j].date + '<br/>' +
                    'Comment : ' + data[i].expenses[j].comment + '<br/><br/>';
                newExpensesContainerEl.appendChild(div2);
            }
        }
    }
    GetBudgets(userId);
}
