var homePage;
var signupPage;
var signupPage;
var loginPage;
var aboutPage;
var gamePage;
var loginForm;
var signupForm;

var loginPassword;
var eye;

// our semi users db
var users = {}
users["p"] = "testuser"
var loggedUser


// switch screens
function switchScreen(screen) {
    homePage = document.getElementById("home");
    signupPage = document.getElementById("signup");
    loginPage = document.getElementById("login");
    aboutPage = document.getElementById("about");
    confiPage = document.getElementById("confi");
    gamePage = document.getElementById("gamePage");
    game_butt = document.getElementById("game__button");
    gameLost = document.getElementById("loseGame");
    // console.log('this is game page' ,gamePage);

    loginForm = document.getElementById("loginForm");
    signupForm = document.getElementById("signupForm");

    loginEye = document.getElementById("show_login_password");
    signupEye = document.getElementById("show_singup_password");
    confirmEye = document.getElementById("show_confirm_password");

    gameCanvas = document.getElementById("gameCanvas");

    span = document.getElementsByClassName("close")[0];
    if (screen == "home") {
        homePage.style.display = "block";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        gamePage.style.display = "none";
        confi.style.display = "none";
        gameLost.style.display = "none";
        gameCanvas.style.display = "none";
    } else if (screen == "signup") {
        clearFormMessages(signupForm);
        signupPassword.type = "password";
        signupEye.classList.remove("hide-password");
        confirmPassword.type = "password";
        confirmEye.classList.remove("hide-password");
        signupForm.reset();
        homePage.style.display = "none";
        signupPage.style.display = "block";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        confi.style.display = "none";
        gameLost.style.display = "none";
        gameCanvas.style.display = "none";
    } else if (screen == "login") {
        clearFormMessages(loginForm);
        loginPassword.type = "password";
        loginEye.classList.remove("hide-password");
        loginForm.reset();
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "block";
        aboutPage.style.display = "none";
        confi.style.display = "none";
        gameLost.style.display = "none";
        gameCanvas.style.display = "none";
    } else if (screen == "about") {
        aboutPage.style.display = "block";
    } else if (screen == "game") {
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        gamePage.style.display = "block";
        confi.style.display = "none";
        gameLost.style.display = "none";
        gameCanvas.style.display = "block";
    }  else if (screen == "confi") {
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        gamePage.style.display = "none";
        confi.style.display = "block";
        gameLost.style.display = "none";
        gameCanvas.style.display = "none";
    }  else if (screen == "loseGame") {
        homePage.style.display = "none";
        signupPage.style.display = "none";
        loginPage.style.display = "none";
        aboutPage.style.display = "none";
        gamePage.style.display = "block";
        confi.style.display = "none";
        gameLost.style.display = "block";
        gameCanvas.style.display = "none";

    }
}

// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');

// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }

// // Initial resize
// resizeCanvas();

// // Resize canvas whenever the window is resized
// window.addEventListener('resize', resizeCanvas);

var Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// index => month [0-11]
$(document).ready(function () {
    var option = '<option value="day">day</option>';
    var selectedDay = "day";

    loginPassword = document.getElementById("loginPassword");
    signupPassword = document.getElementById("signupPassword");
    confirmPassword = document.getElementById("confirmPassword");
    loginEye = document.getElementById("show_login_password");
    signupEye = document.getElementById("show_singup_password");
    confirmEye = document.getElementById("show_confirm_password");

    for (var i = 1; i <= Days[0]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#day').append(option);
    $('#day').val(selectedDay);

    var option = '<option value="month">month</option>';
    var selectedMon = "month";
    for (var i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#month').append(option);
    $('#month').val(selectedMon);

    var option = '<option value="month">month</option>';
    var selectedMon = "month";
    for (var i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#month2').append(option);
    $('#month2').val(selectedMon);

    var d = new Date();
    var option = '<option value="year">year</option>';
    selectedYear = "year";
    for (var i = 1930; i <= d.getFullYear(); i++) {// years start i
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#year').append(option);
    $('#year').val(selectedYear);

});

function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 != 0) {
        return false;
    } else if (year % 400 == 0) {
        return true;
    } else if (year % 100 == 0) {
        return false;
    } else {
        return true;
    }
}

function change_year(select) {
    if (isLeapYear($(select).val())) {
        Days[1] = 29;

    }
    else {
        Days[1] = 28;
    }
    if ($("#month").val() == 2) {
        var day = $('#day');
        var val = $(day).val();
        $(day).empty();
        var option = '<option value="day">day</option>';
        for (var i = 1; i <= Days[1]; i++) { //add option days
            option += '<option value="' + i + '">' + i + '</option>';
        }
        $(day).append(option);
        if (val > Days[month]) {
            val = 1;
        }
        $(day).val(val);
    }
}

function change_month(select) {
    var day = $('#day');
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day">day</option>';
    var month = parseInt($(select).val()) - 1;
    for (var i = 1; i <= Days[month]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $(day).append(option);
    if (val > Days[month]) {
        val = 1;
    }
    $(day).val(val);
}

function showLoginPassword(){
    showPassword(loginPassword, loginEye);
}
function showSignupPassword(){
    showPassword(signupPassword, signupEye);
}
function showConfirmPassword(){
    showPassword(confirmPassword, confirmEye);
}

function showPassword(password, eye){   
    if (password.type === "password"){
        password.type = "text";
        eye.classList.add("hide-password");
    } else {
        password.type = "password";
        eye.classList.remove("hide-password");
    }
}

//reseting all the forms
function resetForm() {
    for (form in document.forms) {
        form.reset();
    }
}

// setting error messages to the form
function setFormMessage(formElement, type, message) {

    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}
//clearing error messages from form
function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = "";
    messageElement.classList.remove("form__message--success", "form__message--error");
}
//setting input error in form
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}
//clearing input error in form
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}
//clearing all error messages from form
function clearFormMessages(formElement) {
    clearFormMessage(formElement);
    document.querySelectorAll(".form__input").forEach(inputElement => {
        clearInputError(inputElement)
    });
}
//creating new user
function createuser(userName, siPassword) {
    users[userName] = siPassword
}

function updateSliderValue(val) {
    var percentage = val + '%'
    document.getElementById("vol_volume-value").textContent = percentage
  }

function updateSliderTime(val) {
    var percentage = formatTime(val)
    document.getElementById("countdown-value").textContent = percentage
}

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.querySelector("#loginForm");
    const signupForm = document.querySelector("#signupForm");

    //switching to signup form by clicking on link in login form
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();

        signup.style.display = "block";
        login.style.display = "none";

        clearFormMessages(loginForm);
        loginForm.reset();
    });
    //switching to login form by clicking on link in signup form
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();

        signup.style.display = "none";
        login.style.display = "block";

        clearFormMessages(signupForm);
        signupForm.reset();
    });
    //submitting login form
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        clearFormMessages(loginForm);

        var loginUsernameValue = document.getElementById('loginUsername').value;
        var loginPasswordValue = document.getElementById('loginPassword').value;

        //login checks
        if (loginUsernameValue === "" && loginPasswordValue === "") {
            setFormMessage(loginForm, "error", "Please fill all fileds")
        } else if (loginUsernameValue in users && users[loginUsernameValue] === loginPasswordValue) {
            game = document.getElementById("game__button");
            confi = document.getElementById("confi");
            loggedUser = loginUsernameValue
            // login = document.getElementById("loginTab");
            game.classList.remove("hidden");
            // login.classList.add("hidden");
            switchScreen("confi");
            clearFormMessages(loginForm);
            loginForm.reset();
        } else {
            setFormMessage(loginForm, "error", "Invalid username/password combination");
        }
    });
    //submitting login form
    signupForm.addEventListener("submit", function (e) {
        flag = true;

        e.preventDefault();
        clearFormMessages(signupForm);

        signupUsernameValue = document.getElementById("signupUsername").value;
        signupPasswordValue = document.getElementById("signupPassword").value;

        const inputs = signupForm.querySelectorAll('input, select');
        inputs.forEach(function (input) {
            if (input.value.trim() === '') {
                setFormMessage(signupForm, "error", "Please fill all fileds");
                flag = false;
            }
        });

        if (document.getElementById("confirmPassword").value != document.getElementById("signupPassword").value) {
            setFormMessage(signupForm, "error", "The passwords are diferent");
            flag = false;
        }

        if (flag) {
            user = createuser(signupUsernameValue, signupPasswordValue);
            // loginForm.classList.remove("hidden");
            // signupForm.classList.add("hidden");
            signup.style.display = "none"
            login.style.display = "block"

            clearFormMessages(signupForm);
            signupForm.reset();
        }
    });
    // input errors in form
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

//MODAL DIALOG exits:
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


