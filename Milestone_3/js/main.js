function fibonacciSequence (x) {
    let firstNum = 0;
    let secondNum = 1;
    let y = 1;
    
    if (x >= 1) {
        for (let i = 1; i < x; i++) {
            y = firstNum + secondNum;
            firstNum = secondNum;
            secondNum = y;
        }
    } else if (x == 0) {
        return 0;
    }
    return y
}

let htmlX = document.getElementById('firstNumber');
let htmlY = document.getElementById('secondNumber');
htmlX.innerText = 0;
htmlY.innerText = fibonacciSequence(htmlX.innerText);