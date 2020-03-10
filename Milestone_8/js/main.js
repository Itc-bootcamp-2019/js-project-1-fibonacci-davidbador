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

// Asynchronous Fibonacci Calculator Function
async function fibonacciSequence(x) {
    showLoader()
    if (save.checked === false) {
        if (x >= 0 && re.test(x) === true) {
            answer.innerText = fibonacciRecursion(inputField.value);
        } else if (x < 0 || re.test(x) === false) {
            answer.innerText = 'Please enter a valid number greater than or equal to 0'
        }
    } else if (save.checked === true && x > 50) {
        showLoader()
        alertOver50.innerText = "number can't be bigger than 50"
    } else if (save.checked === true) {
        if (re.test(x) === false) {
            setTimeout(() => {
                answer.innerText = 'Please enter a valid number';
            }, 1000);
        } else {
            let response = await fetch('http://localhost:5050/fibonacci/' + x);
            if (response.status == 200) {
                let data = await response.json();
                setTimeout(() => {
                    answer.innerText = data.result;
                }, 900)
            } else {
                let text = await response.text();
                if (x == 42) {
                    setTimeout(() => {
                        answer.className = 'error';
                        answer.innerText = `Server Error: ${text}`;
                    }, 1400)
                } else if (x < 1) {
                    setTimeout(() => {
                        answer.innerText = `${text}`;
                    }, 1000);
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
}

// Fibonacci Results History Refresh Function
function refreshHistory() {
    if (inputField.value > 50) {
        showLoader()
    } else if (save.checked === false) {
        loaderTimeline.classList.replace('show', 'hide');
        history.classList.replace('hide', 'show');
    } else {
        loaderTimeline.classList.replace('hide', 'show');
        history.classList.replace('show', 'hide');
        let child = history.lastElementChild;
        while (child) {
            history.removeChild(child);
            child = history.lastElementChild;
        }
        setTimeout(() => {
            loaderTimeline.classList.replace('show', 'hide');
            history.classList.replace('hide', 'show');
            fibonacciHistory();
        }, 900)
    }
}

// Input Field Invalid Validation Function
function validateInput() {
    if (inputField.value > 50) {
        setTimeout(() => {
            alertOver50.classList.replace('hide', 'show');
            answer.className = 'hide';
            inputField.classList.add('invalid');
        }, 600)
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
    if (inputField.value < 50) {
        inputField.classList.remove('invalid');
        alertOver50.classList.replace('show', 'hide');
        loader.classList.replace('hide', 'show');
        answer.className = 'hide';
        setTimeout(() => {
            loader.classList.replace("show", "hide");
            answer.className = answer.className.replace("hide", "show");
        }, 2000);
    }
}

// Fibonacci Result Function
function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

// Window Loaded Completely Function
function loadWindow() {
    setTimeout(() => {
        loaderTimeline.classList.replace('show', 'hide');
    }, 2000)
    setTimeout(() => {
        fibonacciHistory()
    }, 1300)
}

// Event Listeners
window.addEventListener('load', loadWindow);
button.addEventListener('click', fibonacciResult);
button.addEventListener('click', refreshHistory);
inputField.addEventListener('keyup', validNumber);