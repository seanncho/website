// Configuration object for form validation
const validationConfig = {
    firstName: {
        pattern: /^[a-zA-Z](?:[ '\-a-zA-Z]?[a-zA-Z])*$/,
        errorMsg: "Letters, apostrophes, and dashes only",
        required: true,
        transform: null
    },
    middleInitial: {
        pattern: /^[A-Z]?$/,
        errorMsg: "One capital letter only",
        required: false,
        transform: (val) => val.toUpperCase()
    },
    lastName: {
        pattern: /^[a-zA-Z](?:[ '\-a-zA-Z2-5]?[a-zA-Z2-5])*$/,
        errorMsg: "Letters, apostrophes, numbers 2-5, and dashes only",
        required: true,
        transform: null
    },
    addressLine1: {
        pattern: /^[a-zA-Z0-9\s,"-]*$/,
        errorMsg: "Address must be valid",
        required: true,
        transform: null
    },
    addressLine2: {
        pattern: /^[a-zA-Z0-9\s]*$/,
        errorMsg: "Address must be valid",
        required: false,
        transform: null
    },
    city: {
        pattern: /^[a-zA-Z\s]*$/,
        errorMsg: "City must be valid",
        required: true,
        transform: null
    },
    state: {
        pattern: null,
        errorMsg: "State is required",
        required: true,
        transform: null
    },
    zip: {
        pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
        errorMsg: "Format: xxxxx or xxxxx-xxxx",
        required: true,
        transform: (val) => {
            const digits = val.replace(/\D/g, "");
            if (digits.length > 5) {
                return digits.slice(0, 5) + "-" + digits.slice(5, 9);
            }
            return digits;
        },
        maxLength: 10
    },
    phone: {
        pattern: /^\d{3}-\d{3}-\d{4}$/,
        errorMsg: "Format: xxx-xxx-xxxx",
        required: true,
        transform: (val) => {
            const digits = val.replace(/\D/g, "");
            if (digits.length === 0) return "";
            let formatted = digits.slice(0, 3);
            if (digits.length > 3) formatted += "-" + digits.slice(3, 6);
            if (digits.length > 6) formatted += "-" + digits.slice(6, 10);
            return formatted;
        },
        maxLength: 12
    },
    email: {
        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        errorMsg: "Email must be valid",
        required: true,
        transform: (val) => val.toLowerCase()
    },
    EIN: {
        pattern: /^\d{2}-\d{7}$/,
        errorMsg: "Format: xx-xxxxxxx",
        required: true,
        transform: (val) => {
            const digits = val.replace(/\D/g, "");
            if (digits.length > 2) {
                return digits.slice(0, 2) + "-" + digits.slice(2, 9);
            }
            return digits;
        },
        maxLength: 10
    },
    userID: {
        pattern: /^[A-Za-z][A-Za-z0-9-_]{7,}$/,
        errorMsg: "User ID must start with a letter and be at least 8 characters long",
        required: true,
        transform: null,
        customValidation: (val) => {
            if (val.length < 8) return "Username must contain at least 8 characters";
            if (val.length > 30) return "Username must not exceed 30 characters";
            if (!/^[A-Za-z]/.test(val)) return "Username must start with a letter";
            return null;
        }
    }
};

// Error flags for form validation
const errorFlags = {
    firstName: false,
    middleInitial: true,
    lastName: false,
    addressLine1: false,
    addressLine2: true,
    city: false,
    state: false,
    zip: false,
    phone: false,
    email: false,
    EIN: false,
    userID: false,
    password: false,
    passwordCheck: false,
    dateOfBirth: false
};

// Generic validation function
function validateField(fieldId, config) {
    const input = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + "Error");
    let value = input.value;

    // Apply transform if exists
    if (config.transform && value) {
        value = config.transform(value);
        input.value = value;
    }

    // Check max length
    if (config.maxLength && value.length > config.maxLength) {
        value = value.slice(0, config.maxLength);
        input.value = value;
    }

    // Required field check
    if (config.required && !value) {
        errorElement.textContent = `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} must not be empty`;
        errorFlags[fieldId] = false;
        checkFlags();
        return false;
    }

    // Optional field - empty is valid
    if (!config.required && !value) {
        errorElement.textContent = "";
        errorFlags[fieldId] = true;
        checkFlags();
        return true;
    }

    // Custom validation
    if (config.customValidation) {
        const customError = config.customValidation(value);
        if (customError) {
            errorElement.textContent = customError;
            errorFlags[fieldId] = false;
            checkFlags();
            return false;
        }
    }

    // Pattern validation
    if (config.pattern && !config.pattern.test(value)) {
        errorElement.textContent = config.errorMsg;
        errorFlags[fieldId] = false;
        checkFlags();
        return false;
    }

    // Valid
    errorElement.textContent = "";
    errorFlags[fieldId] = true;
    checkFlags();
    return true;
}

// Password validation
function validatePassword() {
    const password = document.getElementById("password").value;
    const userID = document.getElementById("userID").value;
    const error = document.getElementById("passwordError");
    const messages = {
        msg1: "Enter at least one lowercase letter",
        msg2: "Enter at least one uppercase letter",
        msg3: "Enter at least one number",
        msg4: "Enter at least one special character",
        msg5: "Password must contain at least 8 characters",
        msg6: "Password must not contain username"
    };

    let isValid = true;

    if (!password) {
        error.textContent = "Password must not be empty";
        Object.keys(messages).forEach(msgId => {
            document.getElementById(msgId).textContent = "";
        });
        errorFlags.password = false;
        checkFlags();
        return;
    }

    // Check each requirement
    if (!/[a-z]/.test(password)) {
        document.getElementById("msg1").textContent = messages.msg1;
        isValid = false;
    } else {
        document.getElementById("msg1").textContent = "";
    }

    if (!/[A-Z]/.test(password)) {
        document.getElementById("msg2").textContent = messages.msg2;
        isValid = false;
    } else {
        document.getElementById("msg2").textContent = "";
    }

    if (!/[0-9]/.test(password)) {
        document.getElementById("msg3").textContent = messages.msg3;
        isValid = false;
    } else {
        document.getElementById("msg3").textContent = "";
    }

    if (!/[!\@#\$%&*\-_\\.+\(\)]/.test(password)) {
        document.getElementById("msg4").textContent = messages.msg4;
        isValid = false;
    } else {
        document.getElementById("msg4").textContent = "";
    }

    if (password.length < 8) {
        document.getElementById("msg5").textContent = messages.msg5;
        isValid = false;
    } else {
        document.getElementById("msg5").textContent = "";
    }

    if (userID && (password === userID || password.toLowerCase().includes(userID.toLowerCase()))) {
        document.getElementById("msg6").textContent = messages.msg6;
        isValid = false;
    } else {
        document.getElementById("msg6").textContent = "";
    }

    if (isValid) {
        error.textContent = "";
        errorFlags.password = true;
    } else {
        error.textContent = "Password must meet the following requirements";
        errorFlags.password = false;
    }
    checkFlags();
}

// Password check validation
function validatePasswordCheck() {
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("passwordCheck").value;
    const error = document.getElementById("passwordCheckError");

    if (!password1 || !password2) {
        error.textContent = "Passwords must not be empty";
        errorFlags.passwordCheck = false;
    } else if (password1 !== password2) {
        error.textContent = "Passwords do not match";
        errorFlags.passwordCheck = false;
    } else {
        error.textContent = "";
        errorFlags.passwordCheck = true;
    }
    checkFlags();
}

// Date of birth validation
function validateDateOfBirth() {
    const input = document.getElementById("dateOfBirth");
    const error = document.getElementById("dateOfBirthError");
    const date = new Date(input.value);
    const today = new Date();
    const maxAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

    if (!input.value) {
        error.textContent = "Date of birth must not be empty";
        errorFlags.dateOfBirth = false;
    } else if (date > today || date < maxAge) {
        error.textContent = "Please enter a date that is not in the future or more than 120 years ago";
        input.value = "";
        errorFlags.dateOfBirth = false;
    } else {
        error.textContent = "";
        errorFlags.dateOfBirth = true;
    }
    checkFlags();
}

// Check all flags and enable/disable submit button
function checkFlags() {
    const submitButton = document.getElementById("submit");
    const allFlagsValid = Object.values(errorFlags).every(flag => flag === true);
    submitButton.disabled = !allFlagsValid;
}

// Storage utilities
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

function setCookie(name, value, expiryDays) {
    const date = new Date();
    date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length);
        }
    }
    return "";
}

function setData(key, value, expiryDays) {
    if (isLocalStorageSupported()) {
        localStorage.setItem(key, value);
    } else {
        setCookie(key, value, expiryDays);
    }
}

function getData(key) {
    if (isLocalStorageSupported()) {
        return localStorage.getItem(key);
    } else {
        return getCookie(key);
    }
}

// Initialize date display
function initDate() {
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dateElement = document.getElementById("todaysDate");
    if (dateElement) {
        dateElement.textContent = `Today's Date is: ${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
    }
}

// Slider validation
function updateSliderValue(value) {
    const sliderValue = document.getElementById("sliderValue");
    if (sliderValue) {
        sliderValue.textContent = "$" + parseInt(value).toLocaleString();
    }
}

// Initialize form
function initForm() {
    // Set up event listeners for all configured fields
    Object.keys(validationConfig).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        if (input) {
            // Load saved data
            const savedValue = getData(fieldId);
            if (savedValue) {
                input.value = savedValue;
                validateField(fieldId, validationConfig[fieldId]);
            }

            // Add event listeners
            input.addEventListener("input", () => {
                setData(fieldId, input.value, 30);
                validateField(fieldId, validationConfig[fieldId]);
            });

            input.addEventListener("blur", () => {
                validateField(fieldId, validationConfig[fieldId]);
            });
        }
    });

    // Password fields
    const passwordInput = document.getElementById("password");
    const passwordCheckInput = document.getElementById("passwordCheck");
    
    if (passwordInput) {
        passwordInput.addEventListener("input", () => {
            validatePassword();
            validatePasswordCheck();
        });
    }

    if (passwordCheckInput) {
        passwordCheckInput.addEventListener("input", () => {
            validatePasswordCheck();
        });
    }

    // Date of birth
    const dateOfBirthInput = document.getElementById("dateOfBirth");
    if (dateOfBirthInput) {
        dateOfBirthInput.addEventListener("blur", validateDateOfBirth);
    }

    // Slider
    const slider = document.getElementById("desiredSalarySlider");
    if (slider) {
        slider.addEventListener("input", (e) => {
            updateSliderValue(e.target.value);
        });
    }

    // Form submission
    const form = document.getElementById("signup");
    if (form) {
        form.addEventListener("submit", (e) => {
            const response = grecaptcha?.getResponse();
            if (!response || response.length === 0) {
                alert("Please verify you are human!");
                e.preventDefault();
                return false;
            }
            displayData();
            alert("Thank you for submitting the form!");
        });

        form.addEventListener("reset", () => {
            Object.keys(validationConfig).forEach(fieldId => {
                setData(fieldId, "", -1);
            });
            setData("firstName", "", -1);
            setTimeout(() => location.reload(), 100);
        });
    }

    // Greeting
    const firstName = getData("firstName");
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        if (firstName) {
            greetingElement.innerHTML = `Hello, ${firstName}! <br><a href='#' id='new-user'>Not ${firstName}? Click here to start a new form.</a>`;
            const newUserLink = document.getElementById("new-user");
            if (newUserLink) {
                newUserLink.addEventListener("click", (e) => {
                    e.preventDefault();
                    Object.keys(validationConfig).forEach(fieldId => {
                        setData(fieldId, "", -1);
                    });
                    location.reload();
                });
            }
        } else {
            greetingElement.textContent = "Welcome, new user!";
        }
    }
}

// Display form data in new tab
function displayData() {
    const form = document.getElementById("signup");
    if (!form) return;

    let formOutput = "<table class='output'><th colspan='2'>Your Data</th>";
    
    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.value && element.name !== "g-recaptcha-response") {
            switch (element.type) {
                case "checkbox":
                    if (element.checked) {
                        formOutput += `<tr><td class='outputName'>${element.value}</td><td class='outputData'>&#x2713;</td></tr>`;
                    }
                    break;
                case "radio":
                    if (element.checked) {
                        formOutput += `<tr><td class='outputName'>${element.name}</td><td class='outputData'>${element.value}</td></tr>`;
                    }
                    break;
                case "button":
                case "submit":
                case "reset":
                    break;
                default:
                    formOutput += `<tr><td class='outputName'>${element.name}</td><td class='outputData'>${element.value}</td></tr>`;
            }
        }
    }

    formOutput += "</table>";
    localStorage.setItem("formOutput", formOutput);
    
    const newTab = window.open();
    newTab.document.write("<!DOCTYPE html><html><head><link rel='stylesheet' type='text/css' href='style.css'></head><body class='body2'>");
    newTab.document.write(localStorage.getItem("formOutput"));
    newTab.document.write("<button onclick='window.location.href=\"thankyou.html\"' class='button'>Submit</button>");
    newTab.document.write("</body></html>");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    initDate();
    initForm();
});
