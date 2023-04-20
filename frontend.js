const userLoggedin = false;

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

const game__button = document.querySelector("#game__button");

var home = document.getElementById("home");
    var login = document.getElementById("login");
    var about = document.getElementById("about");
    var game = document.getElementById("playGame");

function switchScreen(screen) {
    var home = document.getElementById("home");
    var login = document.getElementById("login");
    var about = document.getElementById("about");
    var game = document.getElementById("playGame");

    if (screen == "home") {
        home.style.display = "block";
        login.style.display = "none";
        about.style.display = "none";
        game.style.display = "none";
    } else if (screen == "login") {
        home.style.display = "none";
        login.style.display = "block";
        about.style.display = "none";
        game.style.display = "none";
    } else if (screen == "about") {
        home.style.display = "none";
        login.style.display = "none";
        about.style.display = "block";
        game.style.display = "none";
    } else if (screen == "game") {
        home.style.display = "none";
        login.style.display = "none";
        about.style.display = "none";
        game.style.display = "block";
    } else if (screen == "settings") {
        home.style.display = "none";
        login.style.display = "none";
        about.style.display = "none";
        game.style.display = "none";
    }
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


document.addEventListener("DOMContentLoaded", () => {


    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        signupForm.classList.remove("form--hidden");
        home.style.display = "none";
        login.style.display = "block";
        about.style.display = "none";
        game.style.display = "none";
        document.getElementById("signupForm").reset();
        document.querySelectorAll(".form__input").forEach(inputElement => {
            clearInputError(inputElement)
        });
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        signupForm.classList.add("form--hidden");
        home.style.display = "none";
        login.style.display = "block";
        about.style.display = "none";
        game.style.display = "none";
        document.getElementById("loginForm").reset();
        //TODO:
        // document.querySelectorAll(".form__input").forEach(inputElement => {
        //     clearInputError(inputElement)
        // });
    });

    document.querySelector("#loginForm").addEventListener("submit", e => {
        e.preventDefault();

        //TODO
        // Perform your AJAX/Fetch login
        if (false) {

        } else {
            game__button.classList.remove("game--hidden");
            login.style.display = "none";
            game.style.display = "block";     
        }

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    //TODO:
    // document.querySelector("#signupForm").addEventListener("submit", function (e) {
    //     e.preventDefault();
    //     flag = true;
    //     const inputs = form.querySelectorAll('input, select');
    //     let emptyInputs = [];
    //     inputs.forEach(function (input) {
    //         if (input.value.trim() === '') {
    //             setFormMessage(signupForm, "error", "Please fill all fileds");
    //             flag = false;
    //         }
    //     });

    //     password = document.getElementById("signupPassword");
    //     confirmPassword = document.getElementById("confirmPassword");
    //     if (password != confirmPassword){
    //         setFormMessage(signupForm, "error", "The passwords are different");
    //         flag = false;
    //     }

    //     if (flag){
    //         document.getElementById("signupForm").submit();
    //     }
    //     // setFormMessage(signupForm, "error", "Invalid username/password combination");
    // });
    //TODO:
    // document.querySelectorAll(".form__input").forEach(inputElement => {
    //     const passwordRegex = /^[a-zA-Z0-9]+$/;
    //     const numbersPattern = "^[0-9]+$"
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     inputElement.addEventListener("blur", e => {
    //         if (e.target.id === "signupPassword") {
    //             setInputError(inputElement, "Please enter only numbers and letters");
    //         }
    //         if (e.target.id === "signupFirstName" && !(re.match(numbersPattern, e.target.value))) {
    //             setInputError(inputElement, "First name can't contain numbers");
    //         }
    //         if (e.target.id === "signupLastName" && !(re.match(numbersPattern, e.target.value))) {
    //             setInputError(inputElement, "Last name can't contain numbers");
    //         }
    //         if (e.target.id === "signupEmail" && !(emailPattern.test(e.target.value))) {
    //             setInputError(inputElement, "invalide email");
    //         }
    //     });

    //     inputElement.addEventListener("input", e => {
    //         clearInputError(inputElement);
    //     });
    // });
});


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
