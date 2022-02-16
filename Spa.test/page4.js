export const render = () => {
    let userId = 1;
    let budgetId = '';
    let tempList = [];
    let budgetName = '';
    let newData = [];

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
            .then(function (data) { PopulateList(data); })
    }

    const PopulateList = (data) => {
        tempList = data
        ListAllBudgetInDropdown(data)
        console.log(tempList)
    }


    const ListAllBudgetInDropdown = (data) => {

        let body = document.getElementById('app')
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

        newData = JSON.stringify({ userId: userId, budgetId: budgetId })
        //ClearExpenses()
        GetExpenses(newData)
    }

    // const ClearExpenses = () => {
    //     document.getElementById('Budget-Title').remove
    //     document.getElementById('Budget-Item').remove
    // }

    const GetExpenses = (data) => {

        fetch
            ('https://localhost:7073/GetExpenseForSpecificBudget',
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ userId: userId, budgetId: budgetId })
                },
            )
            .then(response => response.json()) //.json() is a function that converts the "response" from the fetch into a JSON object
            .then(function (data) {
                appendData(data);
            })

        const appendData = (data) => {

            let body = document.getElementById('app')
            // document.getElementById('Budget-Title').remove
            // document.getElementById('Budget-Item').remove
            for (let i = 0; i < data.length; i++) {
                let div = document.createElement("div")
                div.setAttribute('id', 'Budget-Title')
                //div.innerHTML = '';
                div.innerHTML =
                    'Budget Name : ' + data[i].budgetName + '<br/><br/>' + 'Expenses :' + '<br/>';

                body.appendChild(div);

                for (let j = 0; j < data[i].expenses.length; j++) {
                    let div2 = document.createElement("div");
                    div2.setAttribute('id', 'Budget-Item')
                    //div2.innerHTML = '';
                    div2.innerHTML =
                        'Category Name : ' + data[i].expenses[j].categoryName + '<br/>' +
                        'Amount : ' + data[i].expenses[j].amount + '<br/>' +
                        'Recipient : ' + data[i].expenses[j].recipient + '<br/>' +
                        'Date : ' + data[i].expenses[j].date + '<br/>' +
                        'Comment : ' + data[i].expenses[j].comment + '<br/><br/>';
                    body.appendChild(div2);
                }
            }
        }
    }


    GetBudgets(userId);
    GetExpenses();
}
