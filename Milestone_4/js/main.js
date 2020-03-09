// Global Variables
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const re = /^\d+$/;

// Fibonacci Calculation Function
function fibonacciSequence(x) {
    let firstNum = 0;
    let secondNum = 1;
    let y = 1;

    if (x >= 1) {
        for (let i = 0; i < x; i++) {
            y = firstNum + secondNum
            secondNum = firstNum;
            firstNum = y;
        }
    } else if (x == 0) {
        return 0;
    }
    return y
}

// Fibonacci Calculation Result Function
function fibonacciResult() {
    if (re.test(inputField.value) === true && inputField.value >= 1) {
        answer.innerText = fibonacciSequence(inputField.value);
    } else if (re.test(inputField.value) === true && inputField.value == 0) {
        answer.innerText = 0;
    } else if (re.test(inputField.value) === false || inputField.value < 0) {
        answer.innerText = 'Please enter a valid number that is equal to or greater than 0!';
    }
}

// Event Listeners
button.addEventListener('click', fibonacciResult)