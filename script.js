const form = document.querySelector(".js-form");
const thankYouMessage = document.querySelector(".js-thank-you");

const cardNumber = document.querySelector(".js-card-number");
const cardName = document.querySelector(".js-card-name");
const cardMonth = document.querySelector(".js-card-month");
const cardYear = document.querySelector(".js-card-year");
const cardCVC = document.querySelector(".js-card-cvc");

const nameInput = document.querySelector(".js-name-input");
const numberInput = document.querySelector(".js-card-input");
const monthInput = document.querySelector(".js-month-input");
const yearInput = document.querySelector(".js-year-input");
const CVCInput = document.querySelector(".js-cvc-input");

const numberError = document.querySelector(".js-number-error");
const dateError = document.querySelector(".js-date-error");
const CVCError = document.querySelector(".js-cvc-error");

const confirmButton = document.querySelector(".js-confirm");
const continueButton = document.querySelector(".js-continue");

function cardNumberDisplay() {
    const card = numberInput.value.trim().replace(/\s/g, "").padEnd(16, "0").split("");
    let str = [];

    for (let i = 0; i <= 16; i++) {
        if (i % 4 === 0) {
            str.push(card.join("").slice(i - 4, i));
        }
    }

    return str.join(" ");
}

function cardCheck() {
    const number = numberInput.value.trim().replace(/\s/g, "").split("");

    for (let i = 0; i < number.length; i++) {
        number[i] = Number(number[i]);

        if (isNaN(number[i])) {
            return false;
        }
    }

    return true;
}

numberInput.addEventListener("keydown", (event) => {
    const len = numberInput.value.replace(/\s/g, "").length;

    if (len > 0 && len % 4 === 0 && len < 16 && !(event.key === "Backspace" || event.key === "Delete")) {
        numberInput.value += " ";
    }
});

numberInput.addEventListener("keyup", () => {
    cardNumber.innerHTML = cardNumberDisplay();
});

nameInput.addEventListener("keyup", () => {
    cardName.innerHTML = nameInput.value.trim() === "" ? "Jane Appleseed" : nameInput.value;
});

monthInput.addEventListener("keydown", (event) => {
    if (monthInput.value.length > 1 && !(event.key === "Backspace" || event.key === "Delete")) {
        monthInput.value = monthInput.value.slice(0, 1);
    }
});

monthInput.addEventListener("keyup", () => {
    cardMonth.innerHTML = monthInput.value.length > 2 ? monthInput.value.slice(0, 2) : monthInput.value.padStart(2, "0");
});

yearInput.addEventListener("keydown", (event) => {
    if (yearInput.value.length > 1 && !(event.key === "Backspace" || event.key === "Delete")) {
        yearInput.value = yearInput.value.slice(0, 1);
    }
});

yearInput.addEventListener("keyup", () => {
    cardYear.innerHTML = yearInput.value.length > 2 ? yearInput.value.slice(0, 2) : yearInput.value.padStart(2, "0");
});

CVCInput.addEventListener("keydown", (event) => {
    if (CVCInput.value.length > 2 && !(event.key === "Backspace" || event.key === "Delete")) {
        CVCInput.value = CVCInput.value.slice(0, 2);
    }
});

CVCInput.addEventListener("keyup", () => {
    cardCVC.innerHTML = CVCInput.value;
});

confirmButton.addEventListener("click", () => {
    let validNumber, validDate, validCVC;

    if (!cardCheck()) {
        numberError.style.display = "block";
        numberInput.style.borderColor = "hsl(0, 100%, 66%)";
        validNumber = false;
    } else {
        numberError.style.display = "none";
        numberInput.style.borderColor = "hsl(270, 3%, 87%)";
        validNumber = true;
    }

    if (monthInput.value === "" || yearInput.value === "") {
        dateError.style.display = "block";
        monthInput.style.borderColor = monthInput.value === "" ? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)";
        yearInput.style.borderColor = yearInput.value === "" ? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)";
        validDate = false;
    } else {
        dateError.style.display = "none";
        monthInput.style.borderColor = "hsl(270, 3%, 87%)";
        yearInput.style.borderColor = "hsl(270, 3%, 87%)";
        validDate = true;
    }

    if (CVCInput.value === "") {
        CVCError.style.display = "block";
        CVCInput.style.borderColor = "hsl(0, 100%, 66%)";
        validCVC = false;
    } else {
        CVCError.style.display = "none";
        CVCInput.style.borderColor = "hsl(270, 3%, 87%)";
        validCVC = true;
    }

    if (validNumber && validDate && validCVC) {
        form.style.display = "none";
        thankYouMessage.style.display = "flex";
    }
});

continueButton.addEventListener("click", () => {
    nameInput.value = "";
    cardName.innerHTML = "Jane Appleseed";
    numberInput.value = "";
    cardNumber.innerHTML = "0000 0000 0000 0000";
    monthInput.value = "";
    cardMonth.innerHTML = "00";
    yearInput.value = "";
    cardYear.innerHTML = "00";
    CVCInput.value = "";
    cardCVC.innerHTML = "000";
    
    form.style.display = "flex";
    thankYouMessage.style.display = "none";
});