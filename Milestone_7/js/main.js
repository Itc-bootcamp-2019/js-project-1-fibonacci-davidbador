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

function fibonacciSequence(x) {
    showLoader()
    fetch('http://localhost:5050/fibonacci/' + x)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw response
            }
        }).then((data) => {
            setTimeout(() => {
                answer.innerText = data.result;
            }, 900)
        }).catch(err => err.text()).then((errorMessage) => {
            if (x > 50) {
                showLoader()
            } else if (x == 42) {
                setTimeout(() => {
                    answer.className = 'error';
                    answer.innerText = `Server Error: ${errorMessage}`;
                }, 1400)
            } else if (x == 0 || x < 0) {
                setTimeout(() => {
                    answer.innerText = 'Please enter a valid number!';
                }, 1000);
            }
        })
}

function fibonacciHistory() {
    fetch('http://localhost:5050/getFibonacciResults').then(response => {
        return response.json()
    }).then(data => {
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
    alert.className = alert.className.replace('hide', 'show');
    answer.className = 'hide';
}

function validNumber() {
    if (inputField.value === "") {
        inputField.classList.remove("invalid");
        alert.className = 'hide';
    }
}

function showLoader() {
    inputField.classList.add('invalid');
    validateInput()
    if (inputField.value < 50) {
        inputField.classList.remove('invalid');
        alert.className = alert.className.replace('show', 'hide');
        loader.classList.replace('hide', 'show');
        answer.className = 'hide';
        setTimeout(() => {
            loader.classList.replace("show", "hide");
            answer.className = answer.className.replace("hide", "show");
        }, 2000);
    }
}

button.addEventListener('click', fibonacciResult);
button.addEventListener('click', refreshHistory);
inputField.addEventListener('keyup', validNumber);

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

setTimeout(() => {
    loaderTimeline.classList.replace('show', 'hide');
}, 2000)

window.onload = setTimeout(() => {
    fibonacciHistory()
}, 1300)