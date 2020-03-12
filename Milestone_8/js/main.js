// Global Variables
const loader = document.getElementById('loader');
const loaderTimeline = document.getElementById('loaderTimeline');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alertOver50 = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
const save = document.getElementById('saveCalculation');
const re = /^\d+$/;

// JS Class Modifiers
loader.classList.add('hide');
alertOver50.classList.add('hide');
loaderTimeline.classList.add('show');
answer.className = 'hide'

// Asynchronous Fibonacci Calculator Function
async function fibonacciSequence(x) {
    showLoader()
    if (save.checked === false) {
        if (x >= 0 && re.test(x) === true) {
            spinnerToResult()
            answer.innerText = fibonacciRecursion(inputField.value);
        } else if (x < 0 || re.test(x) === false) {
            spinnerToResult()
            answer.innerText = 'Please enter a valid number greater than or equal to 0'
        }
    } else if (save.checked === true && x > 50) {
        loader.classList.replace('show', 'hide')
        alertOver50.innerText = "number can't be bigger than 50"
    } else if (save.checked === true) {
        if (re.test(x) === false) {
            spinnerToResult()
            answer.innerText = 'Please enter a valid number';
        } else {
            let response = await fetch('http://localhost:5050/fibonacci/' + x);
            if (response.status == 200) {
                let data = await response.json();
                showLoader()
                spinnerToResult()
                answer.innerText = data.result;
            } else {
                let text = await response.text();
                if (x == 42) {
                    showLoader()
                    loader.classList.replace('show', 'hide')
                    answer.className = 'error';
                    answer.innerText = `Server Error: ${text}`;
                } else if (x < 1) {
                    showLoader()
                    spinnerToResult()
                    answer.className = 'error';
                    answer.innerText = `${text}`;
                }
            }

        }
    }
}

// Fibonacci Recursive Calculation Function
function fibonacciRecursion(x) {
    if (x > 1) {
        return fibonacciRecursion(x - 1) + fibonacciRecursion(x - 2);
    } else if (x == 1) {
        return 1;
    } else if (x == 0) {
        return 0;
    }
}

// Asynchronous Fibonacci Results History Function
async function fibonacciHistory() {
    let response = await fetch('http://localhost:5050/getFibonacciResults')
    let data = await response.json()
    data.results.sort(function (a, b) {
        return new Date(b.createdDate) - new Date(a.createdDate)
    })
    data.results.forEach(function (object) {
        let milliseconds = new Date(object.createdDate);
        let historyChild = document.createElement('div');
        history.appendChild(historyChild);
        history.classList.add('show')
        historyChild.className = 'childDiv'
        historyChild.id = 'childDiv'
        historyChild.innerHTML = "The Fibonacci of <strong>" + object.number + "</strong> is <strong>" + object.result + "</strong>. Calculated at: " + milliseconds.toString()
    })
    if (history.className === 'show') {
        loaderTimeline.classList.replace('show', 'hide');
    }
}

// Fibonacci Results History Refresh Function
function refreshHistory() {
    if (inputField.value > 50) {
        showLoader()
    } else if ((save.checked === false) || (save.checked === true && re.test(inputField.value) === false)) {
        loaderTimeline.classList.replace('show', 'hide');
        history.classList.replace('hide', 'show');
    } else {
        loaderTimeline.classList.replace('hide', 'show');
        let child = history.lastElementChild;
        while (child) {
            history.removeChild(child);
            child = history.lastElementChild;
        }
        fibonacciHistory();
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
    if (inputField.value == "") {
        inputField.classList.remove("invalid");
        alertOver50.classList.replace('show', 'hide');
        answer.classList.replace('show', 'hide');
        answer.classList.replace('error', 'hide');
    }
}

// Loader Display Function
function showLoader() {
    validateInput()
    if (re.test(inputField.value) === false) {
        inputField.classList.add('invalid');
    } else if (inputField.value < 50 && re.test(inputField.value) === true) {
        answer.className = 'hide'
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
    loader.classList.replace('show', 'hide')
    answer.className = 'show'
}

// Window Loaded Completely Function
function loadWindow() {
    fibonacciHistory()
}

// Event Listeners
window.addEventListener('load', loadWindow);
button.addEventListener('click', fibonacciResult);
button.addEventListener('click', refreshHistory);
inputField.addEventListener('keyup', validNumber);