// Global Variables
const loader = document.getElementById('loader');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alertOver50 = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
const re = /^\d+$/;

// JS Class Modifiers
loader.classList.add('hide');
answer.className = 'hide';
alertOver50.classList.add('hide');

// Fibonacci Fetch API Function
function fibonacciSequence(x) {
    showLoader();
    if (x > 50) {
        loader.classList.replace('show', 'hide');
        alertOver50.innerText = "number can't be bigger than 50";
    } else if (re.test(x) === false) {
        spinnerToResult();
        answer.innerText = 'Please enter a valid number';
    } else {
        fetch('http://localhost:5050/fibonacci/' + x)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    response.text().then(errorMessage => {
                        if (x == 42) {
                            showLoader();
                            loader.classList.replace('show', 'hide');
                            answer.className = 'error';
                            answer.innerText = `Server Error: ${errorMessage}`;
                        } else if (x < 1) {
                            showLoader();
                            spinnerToResult();
                            answer.className = 'error';
                            answer.innerText = `${errorMessage}`;
                        }
                    })
                }
            }).then((data) => {
                showLoader();
                spinnerToResult();
                answer.innerText = data.result;
            })
    }
}

// Input Field Invalid Validation Function
function validateInput() {
    if (inputField.value > 50) {
        alertOver50.classList.replace('hide', 'show');
        answer.className = 'hide';
        inputField.classList.add('invalid');
    }
}

// Input Field Valid Validation Function
function validNumber() {
    if (inputField.value === "") {
        inputField.classList.remove("invalid");
        alertOver50.classList.replace('show', 'hide');
        answer.classList.replace('show', 'hide');
        answer.classList.replace('error', 'hide');
    }
}

// Loader Display Function
function showLoader() {
    validateInput();
    if (re.test(inputField.value) === false) {
        inputField.classList.add('invalid');
    } else if (inputField.value < 50 && re.test(inputField.value) === true) {
        answer.className = 'hide';
        inputField.classList.remove('invalid');
        alertOver50.classList.replace('show', 'hide');
        loader.classList.replace('hide', 'show');
    }
}

// Fibonacci Result Function
function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

// Class Changing for Spinner and Result Function
function spinnerToResult() {
    loader.classList.replace('show', 'hide');
    answer.className = 'show';
}

// Event Listeners
button.addEventListener('click', fibonacciResult);
inputField.addEventListener('keyup', validNumber);