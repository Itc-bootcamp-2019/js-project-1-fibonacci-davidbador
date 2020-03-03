function fibonacciSequence (x) {
    let firstNum = 0;
    let secondNum = 1;
    let y = 1;
    
    for (let i = 0; i < x; i++) {
        y = firstNum + secondNum
        secondNum = firstNum;
        firstNum = y;
    }
    return y
}

let re = /^\d+$/;
const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
button.addEventListener('click', fibonacciResult)

function fibonacciResult () {
    if (re.test(inputField.value) === true && inputField.value >= 1) {
        answer.innerText = fibonacciSequence(inputField.value);
    } else if (re.test(inputField.value) === true && inputField.value == 0)  {
        answer.innerText = 0;
    } else if (re.test(inputField.value) === false || inputField.value < 0) {
        answer.innerText = 'Please enter a valid number!';
    }
}