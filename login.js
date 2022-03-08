const registerButton = document.getElementById('register')
const signInButton = document.getElementById('signIn')
const input = document.getElementsByClassName('input')

const RegisterPage = () => {
    console.log('Button was clicked')
    window.location.replace("http://127.0.0.1:5500/Register-an-account.html");
}

// const Reload = () => {
//     let count = 0;
//     for (let count = 0; count < 10000; count++) {
//         if (count < 1000){
//             setTimeout(() => minDiv.remove(felmeddelande), 5000)
//         }
//         count++
//     }
// }

registerButton.addEventListener('click', RegisterPage)

//set timeout eller liknande för att få bort texten så att felmeddelande och nologintext visas samtidigt
const minDiv = document.getElementById('Felmeddelande')

const felmeddelande = document.createElement("p")
const text = document.createTextNode('Username or Password is missing')
felmeddelande.appendChild(text)

const noLogin = document.createElement('p')
const noLoginText = document.createTextNode('Wrong Username or Password')
noLogin.appendChild(noLoginText)

const SignIn = (e) => {

    e.preventDefault()
    const signInForm = {};
    signInForm.Username = document.getElementById("Username").value
    signInForm.Password = document.getElementById("Password").value
    const jsonStringObj = JSON.stringify(signInForm);


    if (signInForm.Username === "" || signInForm.Password === "") {

        minDiv.appendChild(felmeddelande)
        setTimeout(() => minDiv.remove(felmeddelande), 5000)
        //Reload()
        // (function() 
        // {
        //     var counter = 0;
         
        //     function foo() 
        //     {
        //         minDiv.remove(felmeddelande)
         
        //         if ((++counter) < 5) window.setTimeout(foo, 3000);
        //     }
        // })
        // ();
    } 
    else
    {
        fetch('https://localhost:7073/api/User/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonStringObj
            })
            .then(resp => {

                console.log(resp.status)
                if (resp.status === 401)
                {
                    //Varför funkar inte min SetTimeout??
                    minDiv.appendChild(noLogin)
                    setTimeout(() => minDiv.remove(noLogin), 5000)
                    console.log('NoSuccess')
                } 
                else 
                {
                    window.location.replace("http://127.0.0.1:5500/Spa.test/index.html");
                    return resp.json()
                    .then(data => console.log(data)) //Denna ska så småningsom göras om till en locale data storage för att ta User ID
                }
                //lägga till en ny else if för att fånga andra fel typ 500??
            })
    }
}
//debugger
//setTimeout(minDiv.removeChild(felmeddelande), 2000)
//setTimeout(minDiv.removeChild(noLogin), 2000)
signInButton.addEventListener('click', SignIn)
//input.addEventListener('click', minDiv.remove())
//signInButton.addEventListener('submit', SignIn)