const registerButton = document.getElementById("id1");
const signInButton = document.getElementById("id2");
const input = document.getElementsByClassName("input");

const RegisterPage = () => {
  console.log("Button was clicked");
  //Det finns en liten risk att denna url adress inte längre funkar, kolla funktionalitet efter att allt är merge'at
  window.location.replace("http://127.0.0.1:5500/Register-an-account.html");
};

registerButton.addEventListener("click", RegisterPage);

const minDiv = document.getElementById("Felmeddelande");

const felmeddelande = document.createElement("p");
const text = document.createTextNode("Username or Password is missing");
felmeddelande.appendChild(text);

const noLogin = document.createElement("p");
const noLoginText = document.createTextNode("Wrong Username or Password");
noLogin.appendChild(noLoginText);

const SignIn = (e) => {
  e.preventDefault();
  const signInForm = {};
  signInForm.Username = document.getElementById("Username").value;
  signInForm.Password = document.getElementById("Password").value;
  const jsonStringObj = JSON.stringify(signInForm);

  if (signInForm.Username === "" || signInForm.Password === "") {
    minDiv.appendChild(felmeddelande);
    setTimeout(() => minDiv.removeChild(felmeddelande), 5000);
  } else {
    fetch("https://localhost:7073/api/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonStringObj,
    }).then((resp) => {
      console.log(resp.status);
      if (resp.status === 401) {
        minDiv.appendChild(noLogin);
        setTimeout(() => minDiv.removeChild(noLogin), 5000);
      } else {
        //Det finns en liten risk att denna url adress inte längre funkar, kolla funktionalitet efter att allt är merge'at
        window.location.replace("http://127.0.0.1:5500/XPENS/index.html");
        return resp.json().then((data) => console.log(data)); //Denna ska så småningsom göras om till en locale data storage för att ta User ID
      }
      //lägga till en ny else if för att fånga andra fel typ 500??
    });
  }
};

signInButton.addEventListener("click", SignIn);
