function fibonacciSequence(x) {
    fetch('http://localhost:5050/fibonacci/' + x).then(response => {
        return response.json()
    }).then(data => {
        answer.innerText = data.result;
    }).catch(err => {
        answer.innerText = 'Please enter a valid number!'
    })
}

const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
button.addEventListener('click', fibonacciResult)

function fibonacciResult() {
    fibonacciSequence(inputField.value);
}