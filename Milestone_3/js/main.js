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

let htmlX = document.getElementById('firstNumber');
let htmlY = document.getElementById('secondNumber');
htmlX.innerText = 7;
htmlY.innerText = fibonacciSequence(htmlX.innerText);