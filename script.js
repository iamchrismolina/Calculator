const clear = document.querySelector("#clearBtn");

const digits = document.querySelectorAll(".calc__btn-digits");
const operators = document.querySelectorAll(".calc__btn-operators");
const decimal = document.querySelector(".calc__body-decimal");
const equals = document.querySelector(".calc__body-equals");

const previousOutput = document.querySelector("#previousOutput");
const currentOutput = document.querySelector("#currentOutput");

let operatorValue = "";
let previousValue = "";
let currentValue = "";

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

clear.addEventListener("click", function () {
  handleClear();
});

function handleDigit(number) {
  let cleanNumber = number.trim();

  if (
    cleanNumber === "0" &&
    !currentValue.includes(".") &&
    currentValue.length === 1
  ) {
    return; // Ignore leading zero
  }

  if (currentValue.length < 9) {
    currentValue += cleanNumber;
  }
}

function handleOperator(operator) {
  if (operatorValue === "" && currentValue.length > 0) {
    operatorValue = operator;
    previousValue = currentValue;
    currentValue = "";
  }
}

function handleEquals() {
  let result = 0;
  let finalResult = 0;
  let cleanOperator = operatorValue.trim();
  operatorValue = cleanOperator;

  switch (operatorValue) {
    case "+":
      result = Number(previousValue) + Number(currentValue);
      break;
    case "-":
      result = Number(previousValue) - Number(currentValue);
      break;
    case "/":
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
  previousOutput.textContent = "";
  currentOutput.textContent = "";
}
