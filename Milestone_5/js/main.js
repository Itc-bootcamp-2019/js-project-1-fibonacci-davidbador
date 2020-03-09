// Global variables
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const re = /^\d+$/;

// Fibonacci Fetch API Function
function fibonacciSequence(x) {
    fetch('http://localhost:5050/fibonacci/' + x).then(response => {
        return response.json()
    }).then(data => {
        answer.innerText = data.result;
    }).catch(err => err.text()).then((errorMessage) => {
        if (re.test(x) === false) {
            setTimeout(() => {
                answer.innerText = 'Please enter a valid number';
            }, 1000);
        } else if (x < 1) {
            setTimeout(() => {
                answer.innerText = `${errorMessage}`;
            }, 1000);
        }
    })
}

// Fibonacci Calculation Result Function
function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

// Event Listeners
button.addEventListener('click', fibonacciResult)