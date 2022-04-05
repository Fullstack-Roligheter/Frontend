export const render = (app) => {
  const div = document.createElement("div");
  div.classList.add("container", "saving");
  const form = document.createElement("form");
  form.setAttribute("id", "myForm");

  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("required", "");
  inputTitle.placeholder = "Title";

  const inputTitle2 = document.createElement("input");
  inputTitle2.setAttribute("id", "count");
  inputTitle2.setAttribute("type", "text");
  inputTitle2.setAttribute("required", "");
  inputTitle2.placeholder = "Amount";

  const inputTitle3 = document.createElement("input");
  inputTitle3.setAttribute("id", "start");
  inputTitle3.setAttribute("type", "date");
  inputTitle3.setAttribute("required", "");
  inputTitle3.placeholder = "Start Date";

  const inputTitle4 = document.createElement("input");
  inputTitle4.setAttribute("id", "end");
  inputTitle4.setAttribute("type", "date");
  inputTitle4.setAttribute("required", "");
  inputTitle4.placeholder = "End Date";

  var submit = document.createElement("button");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");
  submit.classList.add("form-button");
  submit.innerText = "submit";
  submit.setAttribute("id", "submit");
  form.append(inputTitle);
  form.append(inputTitle2);
  form.append(inputTitle3);
  form.append(inputTitle4);
  form.appendChild(submit);
  div.appendChild(form);
  app.appendChild(div);

  const myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("https://localhost:7073/api/saving/addplan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 2,
        name: form[0].value,
        amount: form[1].value,
        planStartDate: form[2].value,
        planEndDate: form[3].value,
      }),
    })
      .then((response) => {
        clearForms();
        if (response.ok === true) {
          alert("Added successfully!");
        }
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

function clearForms() {
  for (let i = 0; i < document.forms.length; i++) {
    document.forms[i].reset();
  }
}
