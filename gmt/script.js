// Today's date
var today = new Date();
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var day = dayList[today.getDay()];
var monthName = month[today.getMonth()];
var dateNumber = today.getDate();
var dateYear = today.getFullYear();
document.getElementById("todaysDate").innerHTML = "Today's Date is: " + day + ", " + monthName + " " + dateNumber + ", " + dateYear;

// Slider value
function sliderValidation(x)
{
  document.getElementById("sliderValue").innerHTML="$" + x;
}

// Error flags
const errorFlags = {
    firstNameFlag: false,
    middleInitialFlag: true,
    lastNameFlag: false,
    addressOneFlag: false,
    addressTwoFlag: true,
    cityFlag: false,
    stateFlag: false,
    zipFlag: false,
    phoneFlag: false,
    emailFlag: false,
    EINFlag: false,
    userIDFlag: false,
    passwordFlag: false,
    passwordCheckFlag: false,
    dateOfBirthFlag: false
};

// Check if all flags are true and enable/disable submit button
function checkFlags() {
    const submitButton = document.getElementById("submit");
    const flags = Object.values(errorFlags);
    const allFlagsValid = flags.every(flag => flag === true);
    submitButton.disabled = !allFlagsValid;
}

// First name validation
function firstNameValidation() {
    const firstName = document.getElementById("firstName").value;
    const firstNamePattern = /^[a-zA-Z](?:[ '\-a-zA-Z]?[a-zA-Z])*$/;
    const error = document.getElementById("firstNameError");

    if (firstName == "") {
        error.innerHTML = "First name must not be empty";
        errorFlags.firstNameFlag = false;
    } else if (firstName != "") {
        if (!firstName.match(firstNamePattern)) {
            error.innerHTML = "Letters, apostrophes, and dashes only";
            errorFlags.firstNameFlag = false;
        } else if (firstName.length < 1) {
            error.innerHTML = "First name must contain at least 1 character";
            errorFlags.firstNameFlag = false;
        } else if (firstName.length > 30) {
            error.innerHTML = "First name must not exceed 30 characters";
            errorFlags.firstNameFlag = false;
        } else {
            error.innerHTML = "";
            errorFlags.firstNameFlag = true;
        }
    }
    checkFlags();
}

// Middle initial validation
function middleInitialValidation() {
    const middleInitialInput = document.getElementById("middleInitial");
    const middleInitial = middleInitialInput.value.toUpperCase();
    middleInitialInput.value = middleInitial;

    const initialPattern = /^[A-Z]/;
    const error = document.getElementById("middleInitialError");

    if (middleInitial != "") {
        if (!middleInitial.match(initialPattern)) {
            error.innerHTML = "Upper letters only";
            errorFlags.middleInitialFlag = false;
        } else if (middleInitial.length > 1) {
            error.innerHTML = "Must not exceed 1 character";
            errorFlags.middleInitialFlag = false;
        } else {
            error.innerHTML = "";
            errorFlags.middleInitialFlag = true;
        }
    } else {
        error.innerHTML = "";
        errorFlags.middleInitialFlag = true;
    }
    checkFlags();
}

// Last name validation
function lastNameValidation() {
    const lastName = document.getElementById("lastName").value;
    const lastNamePattern = /^[a-zA-Z](?:[ "\-a-zA-Z2-5]?[a-zA-Z2-5])*$/;
    const error = document.getElementById("lastNameError");

    if (lastName == "") {
        error.innerHTML = "Last name must not be empty.";
        errorFlags.lastNameFlag = false;
    } else if (lastName != "") {
        if (!lastName.match(lastNamePattern)) {
            error.innerHTML = "Letters, apostrophes, and dashes only";
            errorFlags.lastNameFlag = false;
        } else if (lastName.length < 1) {
            error.innerHTML = "Last name must contain at least 1 character";
            errorFlags.lastNameFlag = false;
        } else if (lastName.length > 30) {
            error.innerHTML = "Last name must not exceed 30 characters";
            errorFlags.lastNameFlag = false;
        } else {
            error.innerHTML = "";
            errorFlags.lastNameFlag = true;
        }
    }
    checkFlags();
}

// Address 1 validation
function addressOneValidation() {
    const address = document.getElementById("addressLine1").value;
    const addressPattern = /^[a-zA-Z0-9\s,"-]*$/;
    const error = document.getElementById("addressLine1Error");

    if (address === "") {
        error.innerHTML = "Address must not be empty";
        errorFlags.addressOneFlag=false;
    } else if (!address.match(addressPattern)) {
        error.innerHTML = "Address must be valid";
        errorFlags.addressOneFlag=false;
    } else {
        error.innerHTML = "";
        errorFlags.addressOneFlag = true;
    }
    checkFlags();
}

// Address Line 2 validation
function addressTwoValidation() {
    const address = document.getElementById("addressLine2").value;
    const addressPattern = /^[a-zA-Z0-9\s]*$/;
    const error = document.getElementById("addressLine2Error");

    if (address !== "") {
        if (!address.match(addressPattern)) {
            error.innerHTML = "Address must be valid";
            errorFlags.addressTwoFlag = false;
        } else {
            error.innerHTML = "";
            errorFlags.addressTwoFlag = true;
        }
    } else {
        error.innerHTML = "";
        errorFlags.addressTwoFlag = true;
    }
    checkFlags();
}

// City validation
function cityValidation() {
    const city = document.getElementById("city").value;
    const cityPattern = /^[a-zA-Z\s]*$/;
    const error = document.getElementById("cityError");

    if (city === "") {
        error.innerHTML = "City must not be empty";
        errorFlags.cityFlag = false;
    } else if (!city.match(cityPattern)) {
        error.innerHTML = "City must be valid";
        errorFlags.cityFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.cityFlag = true;
    }
    checkFlags();
}

// State validation
function stateValidation() {
    const state = document.getElementById("state").value;
    const error = document.getElementById("stateError");

    if (state === "") {
        error.innerHTML = "State must not be empty";
        errorFlags.stateFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.stateFlag = true;
    }
    checkFlags();
}

// ZIP code validation
function zipValidation() {
    const zipInput = document.getElementById("zip");
    const maxlength = zipInput.getAttribute("maxlength");
    let zip = zipInput.value.replace(/\D/g, "");
    let formattedValue = "";

    if (zip.length > 5) {
        formattedValue = zip.slice(0, 5) + "-" + zip.slice(5);
    } else {
        formattedValue = zip;
    }
    zipInput.value = formattedValue;

    if (formattedValue.length > maxlength) {
        formattedValue = formattedValue.slice(0, maxlength);
        zipInput.value = formattedValue;
    }

    const zipPattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const error = document.getElementById("zipError");

    if (formattedValue === "") {
        error.innerHTML = "ZIP must not be empty";
        errorFlags.zipFlag = false;
    } else if (!formattedValue.match(zipPattern)) {
        error.innerHTML = "Format: xxxxx or xxxxx-xxxx";
        errorFlags.zipFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.zipFlag = true;
    }
    checkFlags();
}

// Phone number validation
function phoneValidation() {
    const phoneInput = document.getElementById("phone");
    const maxlength = phoneInput.getAttribute("maxlength");
    let phone = phoneInput.value.replace(/\D/g, "");
    let formattedValue = "";

    if (phone.length > 3) {
        formattedValue = phone.slice(0, 3) + "-";
        phone = phone.slice(3);
    }
    if (phone.length > 3) {
        formattedValue += phone.slice(0, 3) + "-";
        phone = phone.slice(3);
    }
    formattedValue += phone;
    phoneInput.value = formattedValue;

    if (formattedValue.length > maxlength) {
        formattedValue = formattedValue.slice(0, maxlength);
        phoneInput.value = formattedValue;
    }

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    const error = document.getElementById("phoneError");

    if (formattedValue === "") {
        error.innerHTML = "Phone number must not be empty";
        errorFlags.phoneFlag = false;
    } else if (!formattedValue.match(phonePattern)) {
        error.innerHTML = "Format: xxx-xxx-xxxx";
        errorFlags.phoneFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.phoneFlag = true;
    }
    checkFlags();
}

// Email validation
function emailValidation() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value.toLowerCase();
    emailInput.value = email;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const error = document.getElementById("emailError");


    if (email === "") {
        error.innerHTML = "Email must not be empty";
        errorFlags.emailFlag = false;
    } else if (!email.match(emailPattern)) {
        error.innerHTML = "Email must be valid";
        errorFlags.emailFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.emailFlag = true;
    }
    checkFlags();
}

// EIN validation
function EINValidation() {
    const EINInput = document.getElementById("EIN");
    const maxlength = EINInput.getAttribute("maxlength");
    let EIN = EINInput.value.replace(/\D/g, "");
    let formattedValue = "";

    if (EIN.length > 2) {
        formattedValue = EIN.slice(0, 2) + "-" + EIN.slice(2);
    } else {
        formattedValue = EIN;
    }
    EINInput.value = formattedValue;

    if (formattedValue.length > maxlength) {
        formattedValue = formattedValue.slice(0, maxlength);
        EINInput.value = formattedValue;
    }

    const EINPattern = /^\d{2}-\d{7}$/;
    const error = document.getElementById("EINError");

    if (formattedValue === "") {
        error.innerHTML = "EIN must not be empty";
        errorFlags.EINFlag = false;
    } else if (!formattedValue.match(EINPattern)) {
        error.innerHTML = "Format: xx-xxxxxxx";
        errorFlags.EINFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.EINFlag = true;
    }
    checkFlags();
}

// User ID validation
function userValidation() {
    const userID = document.getElementById("userID").value;
    const unamePattern = /^\S+[A-Za-z_-][A-Za-z0-9_-]+$/;
    const error = document.getElementById("userIDError");

    if (userID === "") {
        error.innerHTML = "Username must not be empty";
        errorFlags.userIDFlag = false;

    } else if (userID !== "") {
        if (!isNaN(userID.charAt(0))) {
            error.innerHTML = "Username must not start with a number";
            errorFlags.userIDFlag = false;
        } else if (userID.length < 5) {
            error.innerHTML = "Username must contain at least 5 characters";
            errorFlags.userIDFlag = false;
    
        } else if (userID.length > 30) {
            error.innerHTML = "Username must not exceed 30 characters";
            errorFlags.userIDFlag = false;
        } else if (!userID.match(unamePattern)) {
            error.innerHTML = "Username must not include spaces or special characters";
            errorFlags.userIDFlag = false;
        } else {
            error.innerHTML = "";
            errorFlags.userIDFlag = true;
        }
    }
    checkFlags();
}

// Password validation
function passwordValidation() {
    const password = document.getElementById("password").value;
    const user = document.getElementById("userID").value;
    const error = document.getElementById("passwordError");
    let errorFlag = 0;

    if (password !== "") {
        if (!password.match(/[a-z]/)) {
            document.getElementById("msg1").innerHTML = "Enter at least one lowercase letter";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg1").innerHTML = "";
        }
        if (!password.match(/[A-Z]/)) {
            document.getElementById("msg2").innerHTML = "Enter at least one uppercase letter";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg2").innerHTML = "";
        }
        if (!password.match(/[0-9]/)) {
            document.getElementById("msg3").innerHTML = "Enter at least one number";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg3").innerHTML = "";
        }
        if (!password.match(/[!\@#\$%&*\-_\\.+\(\)]/)) {
            document.getElementById("msg4").innerHTML = "Enter at least one special character";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg4").innerHTML = "";
        }
        if (password.length < 8) {
            document.getElementById("msg5").innerHTML = "Password must contain at least 8 characters";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg5").innerHTML = "";
        }
        if (password === user || password.includes(user) || password.includes(user.toLowerCase()) === true || password.includes(user.toUpperCase()) === true) {
            document.getElementById("msg6").innerHTML = "Password must not contain username";
            errorFlags.passwordFlag = false;
            errorFlag = 1;
        } else {
            document.getElementById("msg6").innerHTML = "";
        }
        if (errorFlag === 1) {
            error.innerHTML = "Password must meet the following requirements";
    
        } else {
            error.innerHTML = "";
            errorFlags.passwordFlag = true;
        }
    } else {
        error.innerHTML = "Password must not be empty";
        document.getElementById("msg1").innerHTML = "";
        document.getElementById("msg2").innerHTML = "";
        document.getElementById("msg3").innerHTML = "";
        document.getElementById("msg4").innerHTML = "";
        document.getElementById("msg5").innerHTML = "";
        document.getElementById("msg6").innerHTML = "";
    }
    checkFlags();
}

// Password check validation
function passwordCheckValidation() {
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("passwordCheck").value;
    const error = document.getElementById("passwordCheckError");

    if (password1 === "" || password2 === "") {
        error.innerHTML = "Passwords must not be empty";
        errorFlags.passwordCheckFlag = false;
    } else if (password1 !== password2) {
        error.innerHTML = "Passwords do not match";
        errorFlags.passwordCheckFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.passwordCheckFlag = true;
    }
    checkFlags();
}

// Date of birth validation
function dateOfBirthValidation() {
    const dateOfBirthInput = document.getElementById("dateOfBirth");
    const date = new Date(dateOfBirthInput.value);
    const maxAge = new Date().setFullYear(new Date().getFullYear() - 120);
    const error = document.getElementById("dateOfBirthError");

    if (date > new Date() || date < new Date(maxAge)) {
        error.innerHTML = "Please enter a date that is not in the future or more than 120 years ago";
        dateOfBirthInput.value = "";
        errorFlags.dateOfBirthFlag = false;
    } 
    else if (dateOfBirthInput.value === "") {
        error.innerHTML = "Date of birth must not be empty";
        errorFlags.dateOfBirthFlag = false;
    } else {
        error.innerHTML = "";
        errorFlags.dateOfBirthFlag = true;
    }
    checkFlags();
}

// Cookie functions
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Check if local storage is supported
function isLocalStorageSupported() {
    try {
        const testKey = "test";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

// SET DATA!
function setData(key, value, expiryDays) {
    if (isLocalStorageSupported()) {
        localStorage.setItem(key, value);
    } else {
        setCookie(key, value, expiryDays);
    }
}

// GET DATA!
function getData(key) {
    if (isLocalStorageSupported()) {
        return localStorage.getItem(key);
    } else {
        return getCookie(key);
    }
}

// Input data array
var inputs = [
    { id: "firstName", dataKey: "firstName", validation: firstNameValidation },
    { id: "middleInitial", dataKey: "middleInitial", validation: middleInitialValidation },
    { id: "lastName", dataKey: "lastName", validation: lastNameValidation },
    { id: "addressLine1", dataKey: "addressLine1", validation: addressOneValidation },
    { id: "addressLine2", dataKey: "addressLine2", validation: addressTwoValidation },
    { id: "city", dataKey: "city", validation: cityValidation },
    { id: "state", dataKey: "state", validation: stateValidation },
    { id: "zip", dataKey: "zip", validation: zipValidation },
    { id: "phone", dataKey: "phone", validation: phoneValidation },
    { id: "email", dataKey: "email", validation: emailValidation },
    { id: "userID", dataKey: "userID", validation: userValidation },
];

// Load data into form
inputs.forEach(function (input) {
    var inputElement = document.getElementById(input.id);
    var dataValue = getData(input.dataKey);
    if (dataValue !== null && dataValue !== "") {
        inputElement.value = dataValue;
                input.validation();
    }
    inputElement.addEventListener("input", function () {
        setData(input.dataKey, inputElement.value, 30);
        if (inputElement.value !== "" && input.validation !== undefined) {
            input.validation();
        }
        checkFlags();
    });
});

// Intro greeting
var firstName = getData("firstName");
if (firstName !== null && firstName !== "") {
    document.getElementById("greeting").innerHTML =
        "Hello, " +
        firstName +
        "! <br><a href='#' id='new-user'>Not " +
        firstName +
        "? Click here to start a new form.</a>";

    document.getElementById("new-user").addEventListener("click", function () {
        inputs.forEach(function (input) {
            setData(input.dataKey, "", -1);
        });
        location.reload();
    });
} else {
    document.getElementById("greeting").innerHTML = "Welcome, new user!";
}

// EXTRA CREDIT: Google reCAPTCHA
document.getElementById("signup").addEventListener("submit", function (evt) {
    var response = grecaptcha.getResponse();
    if (response.length == 0) {
        alert("Please verify you are human!");
        evt.preventDefault();
        return false;
    } else {
        displayData();
        alert("Thank you for submitting the form!");
        return true;
    }
});

// EXTRA CREDIT: Display data in a new tab
function displayData() {
    var formcontent = document.getElementById("signup");
    var formoutput;
    var datatype;
    var i;
    formoutput = "<table class='output'><th colspan='2'>Your Data</th>";
    for (i = 0; i < formcontent.length; i++) {
        if (formcontent.elements[i].value != "" && formcontent.elements[i].name !== "g-recaptcha-response") {
            datatype = formcontent.elements[i].type;
            switch (datatype) {
                case "checkbox":
                    if (formcontent.elements[i].checked) {
                        formoutput += "<tr><td class='outputName'>" + formcontent.elements[i].value + "</td>";
                        formoutput += "<td class='outputData'>&#x2713;</td></tr>";
                    }
                    break;
                case "radio":
                    if (formcontent.elements[i].checked) {
                        formoutput += "<tr><td class='outputName'>" + formcontent.elements[i].name + "</td>";
                        formoutput += "<td class='outputData'>" + formcontent.elements[i].value + "</td></tr>";
                    }
                    break;
                case "button":
                case "submit":
                case "reset":
                    break;
                default:
                    formoutput += "<tr><td class='outputName'>" + formcontent.elements[i].name + "</td>";
                    formoutput += "<td class='outputData'>" + formcontent.elements[i].value + "</td></tr>";
            }
        }
    }

    if (formoutput.length > 0) {
        formoutput += "</table>";
        localStorage.setItem("formOutput", formoutput);
        var newTab = window.open();
        if (newTab) {
            var outputHtml = localStorage.getItem("formOutput");
            var buttonHtml = "<button onclick='window.location.href=\"thankyou.html\"' class='button'>Submit</button>";
            var fullHtml = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><link rel='stylesheet' type='text/css' href='style.css'></head><body class='body2'>" + outputHtml + " " + buttonHtml + "</body></html>";
            
            newTab.document.open();
            newTab.document.write(fullHtml);
            newTab.document.close();
        }
    }
}