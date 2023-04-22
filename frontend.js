var homePage;
var signupPage;
var signupPage;
var loginPage;
var aboutPage;
var gamePage;
var loginForm;
var signupForm;

// out semi users db
var users = {}
users["p"] = "testuser"

// window.addEventListener('load', function () {
//     alert("It's loaded!")
//   });


function switchScreen(screen) {
    homePage = document.getElementById("home");
    signupPage = document.getElementById("signup");
    loginPage = document.getElementById("login");
    aboutPage = document.getElementById("about");
    // gameButton = document.getElementById("game__button");
    gamePage = document.getElementById("game");

    loginForm = document.getElementById("loginForm");
    signupForm = document.getElementById("signupForm");

    span = document.getElementsByClassName("close")[0];
    if (screen == "home") {
        homePage.style.display = "block";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        // gameButton.style.display = "none";
        gamePage.style.display = "none";
    } else if (screen == "signup") {
        clearFormMessages(signupForm);
        signupForm.reset();
        homePage.style.display = "none";
        signupPage.style.display = "block";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        // gameButton.style.display = "none";
    } else if (screen == "login") {
        clearFormMessages(loginForm);
        loginForm.reset();
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "block";
        aboutPage.style.display = "none";
        // gameButton.style.display = "none";
    } else if (screen == "about") {
        // homePage.style.display = "none";
        // signupPage.style.display = "none";
        // loginPage.style.display = "none";
        aboutPage.style.display = "block";
        // gameButton.style.display = "none";
    } else if (screen == "game") {
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        // gameButton.style.display = "block";
        gamePage.style.display = "block";
    }
}

// function showLoginPassword(){
//     var password = document.getElementById("#loginPassword");
//     var eye = document.getElementById("#show_password")
//     if (password.type === "password"){
//         password.type = "text";
//         eye.classList.add("hide-password")
//     } else {
//         password.type = "password"
//         eye.classList.remove("hide-password")
//     }
// }

function resetForm() {
    for (form in document.forms) {
        form.reset();
    }
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = "";
    messageElement.classList.remove("form__message--success", "form__message--error");
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function clearFormMessages(formElement) {
    clearFormMessage(formElement);
    document.querySelectorAll(".form__input").forEach(inputElement => {
        clearInputError(inputElement)
    });
}

function createuser(userName, siPassword) {
    users[userName] = siPassword
}

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();

        // loginForm.classList.add("hidden");
        // signupForm.classList.remove("hidden");

        signup.style.display = "block";
        login.style.display = "none";

        clearFormMessages(loginForm);
        loginForm.reset();
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();

        // loginForm.classList.remove("hidden");
        // signupForm.classList.add("hidden");

        signup.style.display = "none";
        login.style.display = "block";

        clearFormMessages(signupForm);
        signupForm.reset();
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        clearFormMessages(loginForm);

        var username = document.getElementById('loginUsername').value;
        var password = document.getElementById('loginPassword').value;

        //login checks
        if (username === "" && password === "") {
            setFormMessage(loginForm, "error", "Please fill all fileds")
        } else if (username in users && users[username] === password) {
            game = document.getElementById("game__button");
            // login = document.getElementById("loginTab");
            game.classList.remove("hidden");
            // login.classList.add("hidden");
            switchScreen("game");
        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }

        clearFormMessages(loginForm);
        loginForm.reset();

    });
    // signup form errors and submit
    signupForm.addEventListener("submit", function (e) {
        flag = true;

        e.preventDefault();
        clearFormMessages(signupForm);

        signupUsername = document.getElementById("signupUsername").value;
        signupPassword = document.getElementById("signupPassword").value;

        const inputs = signupForm.querySelectorAll('input, select');
        inputs.forEach(function (input) {
            if (input.value.trim() === '') {
                setFormMessage(signupForm, "error", "Please fill all fileds");
                flag = false;
            }
        });

        if (document.getElementById("confirmPassword").value != document.getElementById("signupPassword").value) {
            setFormMessage(signupForm, "error", "The password are diferent");
            flag = false;
        }

        if (flag) {
            user = createuser(signupUsername, signupPassword);
            // loginForm.classList.remove("hidden");
            // signupForm.classList.add("hidden");
            signup.style.display = "none"
            login.style.display = "block"

            clearFormMessages(signupForm);
            signupForm.reset();
        }
    });
    // input errors
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e) {
                clearFormMessage(signupForm);
            }
            if (e.target.id === "signupPassword" && !/^[a-zA-Z0-9]+$/.test(e.target.value)) {
                setInputError(inputElement, "Please enter only numbers and letters");
            }
            if (e.target.id === "signupFirstName" && /\d/.test(e.target.value)) {
                setInputError(inputElement, "First name can't contain numbers");
            }
            if (e.target.id === "signupLastName" && /\d/.test(e.target.value)) {
                setInputError(inputElement, "Last name can't contain numbers");
            }
            // if (e.target.id === "signupEmail" && !/\S+@\S+\.\S+/.test(e.target.value)) {
            //     setInputError(inputElement, "invalide email");
            // }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});


// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal = document.getElementById("about");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    modal = document.getElementById("about");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When the user clicks the ESC, close it
document.onkeydown = function (event) {
    modal = document.getElementById("about");
    span = document.getElementsByClassName("close")[0];
    if (event.keyCode == 27) {
        modal.style.display = "none";
    }
}

// $('.form').find('input, textarea').on('keyup blur focus', function (e) {

//     var $this = $(this),
//         label = $this.prev('label');

//     if (e.type === 'keyup') {
//         if ($this.val() === '') {
//             label.removeClass('active highlight');
//         } else {
//             label.addClass('active highlight');
//         }
//     } else if (e.type === 'blur') {
//         if ($this.val() === '') {
//             label.removeClass('active highlight');
//         } else {
//             label.removeClass('highlight');
//         }
//     } else if (e.type === 'focus') {

//         if ($this.val() === '') {
//             label.removeClass('highlight');
//         }
//         else if ($this.val() !== '') {
//             label.addClass('highlight');
//         }
//     }

// });

// $('.tab a').on('click', function (e) {

//     e.preventDefault();

//     $(this).parent().addClass('active');
//     $(this).parent().siblings().removeClass('active');

//     target = $(this).attr('href');

//     $('.tab-content > div').not(target).hide();

//     $(target).fadeIn(600);

// });
