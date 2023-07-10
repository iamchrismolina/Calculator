const clear = document.querySelector("#clearBtn");

const digits = document.querySelectorAll(".calc__btn-digits");
const operators = document.querySelectorAll(".calc__btn-operators");
const decimal = document.querySelector(".calc__body-decimal");
const equals = document.querySelector(".calc__body-equals");

const buttons = document.querySelectorAll(".calc__btn");

const previousOutput = document.querySelector("#previousOutput");
const currentOutput = document.querySelector("#currentOutput");

let operatorValue = "";
let previousValue = "";
let currentValue = "";

let intervalId;

// Visibility Effect
document.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(toggleVisibility, 1000);
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleVisibilityHide();
  });
});

digits.forEach((digit) => {
  digit.addEventListener("click", function (event) {
    handleDigit(event.target.textContent);
    currentOutput.textContent = currentValue;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function (event) {
    handleOperator(event.target.textContent);
    previousOutput.textContent = previousValue + " " + operatorValue;
    currentOutput.textContent = currentValue;
  });
});

decimal.addEventListener("click", () => {
  handleDecimal();
});

equals.addEventListener("click", () => {
  handleEquals();
});

clear.addEventListener("click", () => {
  handleClear();
  handleVisibilityShow();
});

function handleDigit(number) {
  let cleanNumber = number.trim();
  let tempCurrentOutput = currentOutput.textContent;
  let withDecimal = currentOutput.textContent + cleanNumber;

  // Ignore leading zeroes & trailing zeroes
  if (
    cleanNumber === "0" &&
    !currentValue.includes(".") &&
    currentValue.length === 1 &&
    tempCurrentOutput === "0" &&
    withDecimal !== "0."
  ) {
    return;
  } else if (
    withDecimal !== "0." &&
    currentValue.length === 1 &&
    tempCurrentOutput === "0"
  ) {
    return;
  } else if (currentValue.length < 9) {
    currentValue += cleanNumber;
  }
}

function handleOperator(operator) {
  let cleanOperator = operator.trim();

  if (operatorValue === "" && currentValue.length > 0) {
    operatorValue = cleanOperator;
    previousValue = currentValue;
    currentValue = "";
  } else if (
    cleanOperator === "+" ||
    cleanOperator === "-" ||
    cleanOperator === "/" ||
    cleanOperator === "*"
  ) {
    handleEquals();
    handleOperator(cleanOperator);
  }
}

function handleEquals() {
  let result = 0;
  let finalResult = 0;

  switch (operatorValue) {
    case "+":
      result = Number(previousValue) + Number(currentValue);
      break;
    case "-":
      result = Number(previousValue) - Number(currentValue);
      break;
    case "/":
      if (currentValue == "0") {
        currentValue = "";
        currentOutput.textContent = "";
        return alert("Not Divisible by Zero");
      }
      result = Number(previousValue) / Number(currentValue);
      break;
    case "*":
      result = Number(previousValue) * Number(currentValue);
      break;
    default:
      return;
  }

  finalResult = Math.round(result); // Still Numeric

  operatorValue = "";
  previousValue = "";
  currentValue = finalResult.toString(); // Converted to String
  previousOutput.textContent = "";

  if (currentValue.length > 9) {
    currentOutput.textContent = currentValue.slice(0, 6) + "...";
  } else {
    currentOutput.textContent = currentValue;
  }
}

function handleDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentOutput.textContent = currentValue;
  }
}

function handleClear() {
  operatorValue = "";
  previousValue = "";
  currentValue = "";
  previousOutput.textContent = "Result";
  currentOutput.textContent = "0";
}

// Active Screen Output Show/Hide
function toggleVisibility() {
  previousOutput.style.display =
    previousOutput.style.display === "none" ? "block" : "none";
  currentOutput.style.display =
    currentOutput.style.display === "none" ? "block" : "none";
}

function handleVisibilityShow() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(toggleVisibility, 1000);
}

function handleVisibilityHide() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  previousOutput.style.display = "block";
  currentOutput.style.display = "block";
}
