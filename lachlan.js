let userId = 1;
let budgetId = 3;

const ListAllBudgetForSpecificUser = () => {

    let body = document.getElementById('app')
    let dropdownMenu = document.createElement('select')
    body.appendChild(dropdownMenu)

    const GetBudgets = (userId) => {
        fetch
            ('https://localhost:7073/ListAllBudgetForSpecificUser',
                {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify({ userId: userId })
                },
            )
            .then(response => response.json())
            .then(function (data) {
                dropdownList(data);
            })
    }

    const dropdownList = (data) => {
        let menu = document.createElement('select')
        for (var i = 0; i < data.length; i++) {
            let div = document.createElement('div')

            menu.innerHTML =
                data[i].budgetName;
            menu.appendChild(div)

        }
        body.appendChild(menu);
    }
}
//GetBudgets(userId);

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

        for (var i = 0; i < data.length; i++) {
            let div = document.createElement("div");

            div.innerHTML =
                'Budget Name : ' + data[i].budgetName + '<br/><br/>' + 'Expenses :' + '<br/>';

            body.appendChild(div);

            for (var j = 0; j < data[i].expenses.length; j++) {
                let div2 = document.createElement("div");
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

GetExpenses();
ListAllBudgetForSpecificUser();