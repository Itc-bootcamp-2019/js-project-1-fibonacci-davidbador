const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
let re = /^\d+$/;

function fibonacciSequence(x) {
    fetch('http://localhost:5050/fibonacci/' + x).then(response => {
        return response.json()
    }).then(data => {
        answer.innerText = data.result;
    }).catch(err => err.text()).then((errorMessage) => {
        if (re.test(x) === false) {
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

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}

button.addEventListener('click', fibonacciResult)