// Global variables
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const re = /^\d+$/;

// JS Class Modifiers
answer.className = 'hide';

// Fibonacci Fetch API Function
function fibonacciSequence(x) {
    if (re.test(x) === false) {
        answer.innerText = 'Please enter a valid number';
    } else {
        fetch('http://localhost:5050/fibonacci/' + x).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                response.text().then(errorMessage => {
                    if (x < 1) {
                        answer.innerText = `${errorMessage}`;
                    }
                })
            }
        }).then(data => {
            answer.innerText = data.result;
        })
    }
}

// Fibonacci Calculation Result Function
function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

// Event Listeners
button.addEventListener('click', fibonacciResult);