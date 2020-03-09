// Global Variables
const loader = document.getElementById('loader');
const loaderTimeline = document.getElementById('loaderTimeline');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alert = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
const re = /^\d+$/;

// JS Class Modifiers
loader.classList.add('hide');
alert.classList.add('hide');
loaderTimeline.classList.add('show');

// Fibonacci Fetch API Function
function fibonacciSequence(x) {
    showLoader()
    if (x > 50) {
        showLoader()
        alert.innerText = "number can't be bigger than 50"
    } else {
        fetch('http://localhost:5050/fibonacci/' + x)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    response.text().then(errorMessage => {
                        if (x == 42) {
                            setTimeout(() => {
                                answer.className = 'error';
                                answer.innerText = `Server Error: ${errorMessage}`;
                            }, 1400)
                        } else if (re.test(x) === false) {
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
            }).then((data) => {
                setTimeout(() => {
                    answer.innerText = data.result;
                }, 900)
            })
    }
}

// Fibonacci Results History Fetch API Function
function fibonacciHistory() {
    fetch('http://localhost:5050/getFibonacciResults').then(response => {
        return response.json()
    }).then(data => {
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
    })
}

// Fibonacci Results History Refresh Function
function refreshHistory() {
    if (inputField.value > 50) {
        showLoader()
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
            alert.classList.replace('hide', 'show');
            answer.className = 'hide';
            inputField.classList.add('invalid');
        }, 600)
    }
}

// Input Field Valid Validation Function
function validNumber() {
    if (inputField.value == "") {
        inputField.classList.remove("invalid");
        alert.classList.replace('show', 'hide');
        answer.classList.replace('show', 'hide');
        answer.classList.replace('error', 'hide');
    }
}

// Loader Display Function
function showLoader() {
    validateInput()
    if (inputField.value < 50) {
        inputField.classList.remove('invalid');
        alert.classList.replace('show', 'hide');
        loader.classList.replace('hide', 'show');
        answer.className = 'hide';
        setTimeout(() => {
            loader.classList.replace("show", "hide");
            answer.className = answer.className.replace("hide", "show");
        }, 2000);
    }
}

// Fibonacci Results Function
function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

// Event Listeners
button.addEventListener('click', fibonacciResult);
button.addEventListener('click', refreshHistory);
inputField.addEventListener('keyup', validNumber);

// Window Loaded Completely Functions
setTimeout(() => {
    loaderTimeline.classList.replace('show', 'hide');
}, 2000)

window.onload = setTimeout(() => {
    fibonacciHistory()
}, 1300)