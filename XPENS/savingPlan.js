export const render = (app) => {
    const div = document.createElement('div');
    div.classList.add('container', 'saving');
    const form = document.createElement('form');
    form.setAttribute('id', 'myForm');
    const label = document.createElement('LABEL');
    label.textContent = "Title";
    label.setAttribute('for', 'title');
    const inputTitle = document.createElement('input');
    inputTitle.setAttribute('id', 'title');
    inputTitle.setAttribute('type', 'text');
    inputTitle.setAttribute('required', '');
    var br = document.createElement("br");

    const label2 = document.createElement('LABEL');
    label2.textContent = "Amount";
    label2.setAttribute('for', 'count');
    const inputTitle2 = document.createElement('input');
    inputTitle2.setAttribute('id', 'count');
    inputTitle2.setAttribute('type', 'text');
    inputTitle2.setAttribute('required', '');
    var br2 = document.createElement("br");

    const label3 = document.createElement('LABEL');
    label3.textContent = "Start Date";
    label3.setAttribute('for', 'start');
    const inputTitle3 = document.createElement('input');
    inputTitle3.setAttribute('id', 'start');
    inputTitle3.setAttribute('type', 'date');
    inputTitle3.setAttribute('required', '');
    var br3 = document.createElement("br");

    const label4 = document.createElement('LABEL');
    label4.textContent = "End Date";
    label4.setAttribute('for', 'end');
    const inputTitle4 = document.createElement('input');
    inputTitle4.setAttribute('id', 'end');
    inputTitle4.setAttribute('type', 'date');
    inputTitle4.setAttribute('required', '');
    var br4 = document.createElement("br");

    var submit = document.createElement("input");
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'submit');
    submit.setAttribute('id', 'submit');


    label.appendChild(inputTitle);
    label2.appendChild(inputTitle2);
    label3.appendChild(inputTitle3);
    label4.appendChild(inputTitle4);

    form.appendChild(label);
    form.appendChild(br);
    form.appendChild(label2);
    form.appendChild(br2);
    form.appendChild(label3);
    form.appendChild(br3);
    form.appendChild(label4);
    form.appendChild(br4);
    form.appendChild(submit);
    div.appendChild(form);
    app.appendChild(div);

    const myForm = document.getElementById('myForm');
    myForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('https://localhost:7073/api/saving', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: 2,
                    name: form[0].value,
                    amount: form[1].value,
                    planStartDate: form[2].value,
                    planEndDate: form[3].value
                })
            })
            .then(response => {
                clearForms();
                if (response.ok === true) {
                    alert('Added successfully!');
                }
                return response.json()
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function clearForms() {
    for (let i = 0; i < document.forms.length; i++) {
        document.forms[i].reset();
    }
}