const Fetching = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let recipient = document.querySelector('#expenseRecipient').value
        let Amount = document.querySelector('#expenseAmount').value
        let expenseDate = document.querySelector('#expenseDate').value
        let expenseComment = document.querySelector('#expenseComment').value
        let categoryName = document.querySelector('#val').value

        let expense = {
            amount: Amount,
            recipient: recipient,
            date: expenseDate,
            comment: expenseComment,
            categoryName: categoryName,
        }
        debugger

        fetch('https://localhost:7073/AddExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(expense),
        })
    })
    alert("Expenses Added")
}
