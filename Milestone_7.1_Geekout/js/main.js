const loader = document.getElementById('loader');
const loaderTimeline = document.getElementById('loaderTimeline');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alert = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
loader.classList.add('hide');
alert.classList.add('hide');
loaderTimeline.classList.add('show');
let re = /^\d+$/;

async function fibonacciSequence(x) {
    showLoader()
    if (x > 50) {
        showLoader()
        alert.innerText = "number can't be bigger than 50"
    } else {
        try {
            let response = await fetch('http://localhost:5050/fibonacci/' + x);
            if (response.status == 200) {
                let data = await response.json();
                setTimeout(() => {
                    answer.innerText = data.result;
                }, 900)
            } else {
                let text = await response.text();
                throw Error(text)
            }
        } catch (err) {
            if (x == 42) {
                setTimeout(() => {
                    answer.className = 'error';
                    answer.innerText = `Server Error: ${err.message}`;
                }, 1400)
            } else if (re.test(x) === false) {
                setTimeout(() => {
                    answer.innerText = 'Please enter a valid number';
                }, 1000);
            } else if (x < 1) {
                setTimeout(() => {
                    answer.innerText = `${err.message}`;
                }, 1000);
            }
        }
    }
}

async function fibonacciHistory() {
    try {
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
    } catch (err) {
        return null
    }
}

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

function validateInput() {
    if (inputField.value > 50) {
        setTimeout(() => {
            alert.classList.replace('hide', 'show');
            answer.className = 'hide';
            inputField.classList.add('invalid');
        }, 600)
    }
}

function validNumber() {
    if (inputField.value == "") {
        inputField.classList.remove("invalid");
        alert.classList.replace('show', 'hide');
        answer.classList.replace('show', 'hide');
        answer.classList.replace('error', 'hide');
    }
}

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

function fibonacciResult() {
    fibonacciSequence(inputField.value)
}

button.addEventListener('click', fibonacciResult);
button.addEventListener('click', refreshHistory);
inputField.addEventListener('keyup', validNumber);

setTimeout(() => {
    loaderTimeline.classList.replace('show', 'hide');
}, 2000)

window.onload = setTimeout(() => {
    fibonacciHistory()
}, 1300)