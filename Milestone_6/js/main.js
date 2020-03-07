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
                alert.innerText = `${errorMessage}`
            } else if (x == 42) {
                setTimeout(() => {
                    answer.className = 'error';
                    answer.innerText = `Server Error: ${errorMessage}`;
                }, 1400)
            } else if (x < 1) {
                setTimeout(() => {
                    answer.innerText = `${errorMessage}`;
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
    setTimeout(() => {
        inputField.className = 'invalid'
        validateInput()
    }, 600)
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
inputField.addEventListener('keyup', validNumber);

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}