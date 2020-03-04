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
    if (x == 42) {
        fibonacci42(x)
    } else {
        fetch('http://localhost:5050/fibonacci/' + x).then(response => {
            return response.json()
        }).then(data => {
            setTimeout(() => {
                answer.innerText = data.result;
            }, 1000);
        }).catch(err => {
            setTimeout(() => {
                answer.innerText = 'Please enter a valid number!';
            }, 1000);
        })
    }
}

function fibonacci42(x) {
    showLoader()
    fetch('http://localhost:5050/fibonacci/' + x).then(response => response.text()).then((text) => {
        if (x == 42) {
            setTimeout(() => {
                answer.className = 'error';
                answer.innerText = `Server Error: ${text}`;
            }, 1380)
        }
    })
}

function fibonacciHistory () {
    fetch('http://localhost:5050/getFibonacciResults').then(response => {
        return response.json()
    }).then(data => {
        data.results.forEach(function(object) {
            let milliseconds = new Date(object.createdDate);
            let historyChild = document.createElement('div');
            history.appendChild(historyChild);
            historyChild.className = 'childDiv'
            historyChild.innerHTML += "The Fibonacci of <strong>" + object.number + "</strong> is <strong>" + object.result + "</strong>. Calculated at: " + milliseconds.toString()
        })
    })}

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
    if (inputField.value > 50) {
        inputField.classList.add('invalid');
        validateInput()
    } else {
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
inputField.addEventListener('keyup', validNumber);

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

setTimeout(() => {
    loaderTimeline.classList.replace('show', 'hide');
}, 2000)

document.onload = setTimeout(() => {
    fibonacciHistory()
}, 1300)