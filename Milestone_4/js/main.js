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

const inputField = document.getElementById('chosenNumber');
const button = document.getElementById('buttonForResult');
const answer = document.getElementById('resultArea');
button.addEventListener('click', fibonacciResult)

function fibonacciResult () {
    if (inputField.value !== NaN) {
        answer.innerText = fibonacciSequence(inputField.value);
    }
}