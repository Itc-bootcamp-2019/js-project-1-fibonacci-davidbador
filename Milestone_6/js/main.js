const loader = document.getElementById('loader');
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
const alert = document.getElementById('alert');
const history = document.getElementById('resultsHistory');
loader.className = 'hide';
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
        if (x == 42) {
            setTimeout(() => {
                answer.className = 'error';
                answer.innerText = 'Server Error: 42 is the meaning of life';
            }, 1380);
        } else {
            setTimeout(() => {
                answer.innerText = 'Please enter a valid number!';
            }, 1000);
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
        loader.className = 'show';
        answer.className = 'hide';
        setTimeout(() => {
            loader.className = loader.className.replace("show", "hide");
            answer.className = answer.className.replace("hide", "show");
        }, 2000);
    }
}

button.addEventListener('click', fibonacciResult);
inputField.addEventListener('keyup', validNumber);

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}