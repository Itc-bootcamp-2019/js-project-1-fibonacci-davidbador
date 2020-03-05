const loader = document.getElementById('loader');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alert = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
loader.classList.add('hide');
alert.classList.add('hide');

function fibonacciSequence(x) {
    showLoader()
    fetch('http://localhost:5050/fibonacci/' + x).then(response => {
        return response.json()
    }).then(data => {
        setTimeout(() => {
            answer.innerText = data.result;
        }, 1000);
    }).catch(err => {
        if (x > 50) {
            showLoader()
        } else if (x == 42) {
            fibonacci42(x)
        } else {
            setTimeout(() => {
                answer.innerText = 'Please enter a valid number!';
            }, 1000);
        }
    })
}

function fibonacci42(x) {
    showLoader()
    fetch('http://localhost:5050/fibonacci/' + x).then(response => response.text()).then((text) => {
        if (x == 42) {
            setTimeout(() => {
                answer.className = 'error';
                answer.innerText = `Server Error: ${text}`;
            }, 780)
        }
    })
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
    if (inputField.value > 50) {
        inputField.className = 'invalid'
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