'use strict';
export const render = () => {
    let userId = 1;
    let budgetId = '';
    let tempList = [];
    let budgetName = '';
    let newCategoryName = '';
    let newCategoryMaxAmount = '';

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
        NewCategoryForm();
    }
    const NewCategoryForm = () => {
        console.log('NewCategoryForm Entered')

        const oldContainer =
            document.getElementById("form-container");
        if (oldContainer) oldContainer.remove();

        const formContainer = document.createElement("div");
        formContainer.setAttribute("id", "form-container");
        formContainer.innerHTML = "New Category" + "<br/><br/>";
            body.appendChild(formContainer);

        const categoryForm = document.createElement("form");
        categoryForm.setAttribute("id", "form")
        categoryForm.setAttribute("action", "")
            formContainer.appendChild(categoryForm)

        const formCategoryNameLabel = document.createElement("label");
        formCategoryNameLabel.setAttribute("for", "new-category-name")
            categoryForm.appendChild(formCategoryNameLabel)

        const formCategoryNameInput = document.createElement("input");
        formCategoryNameInput.setAttribute("type", "text")
        formCategoryNameInput.setAttribute("name", "")
        formCategoryNameInput.setAttribute("placeholder", "Category Name")
        formCategoryNameInput.setAttribute("id", "new-category-name")
        formCategoryNameInput.setAttribute("required", "")
            formCategoryNameLabel.appendChild(formCategoryNameInput)

        const formCategoryAmountLabel = document.createElement("label");
        formCategoryAmountLabel.setAttribute("for", "new-category-amount")
            categoryForm.appendChild(formCategoryAmountLabel)

        const formCategoryAmountInput = document.createElement("input");
        formCategoryAmountInput.setAttribute("type", "text")
        formCategoryAmountInput.setAttribute("name", "")
        formCategoryAmountInput.setAttribute("placeholder", "Category Max Amount")
        formCategoryAmountInput.setAttribute("id", "new-category-amount")
        formCategoryAmountInput.setAttribute("required", "")
            formCategoryAmountLabel.appendChild(formCategoryAmountInput)

        const submitButton = document.createElement("button")
        submitButton.setAttribute("class", "btn")
        submitButton.setAttribute("type", "submit")
        submitButton.innerHTML = "Create"
            categoryForm.appendChild(submitButton)

        categoryForm.addEventListener('submit', (e) => { NewCatFetch() })
    }
    
    const NewCatFetch = () => {
                    console.log("Entered NewCatFetch")

                    let newPackage = {
                        userId: userId,
                        budgetId: budgetId,
                        categoryName: document.getElementById("new-category-name").value,
                        categoryMaxAmount: document.getElementById("new-category-amount").value,
                    }
        
                    fetch('https://localhost:7073/api/Category/AddNewCategory', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify(newPackage),
                    })
                    alert("New Category Added")
            }      

    GetBudgets(userId);
}
