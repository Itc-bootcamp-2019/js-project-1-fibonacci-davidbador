let re = /^\d+$/;
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');

function fibonacciSequence(x) {
    if (x > 1) {
        return fibonacciSequence(x - 1) + fibonacciSequence(x - 2);
    } else if (x == 1) {
        return 1;
    } else if (x == 0) {
        return 0;
    }
}

function fibonacciResult() {
    if (re.test(inputField.value) === true && inputField.value >= 0) {
        answer.innerText = fibonacciSequence(inputField.value);
    } else if (re.test(inputField.value) === false || inputField.value < 0) {
        answer.innerText = 'Please enter a valid number that is equal to or greater than 0!';
    }
}

button.addEventListener('click', fibonacciResult);