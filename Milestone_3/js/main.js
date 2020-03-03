function fibonacciSequence (x) {
    let firstNum = 0;
    let secondNum = 1;
    let y = 1;
    
    if (x >= 1) {
        for (let i = 0; i < x; i++) {
            y = firstNum + secondNum
            secondNum = firstNum;
            firstNum = y;
        }
    } else if (x == 0) {
        return 0;
    }
    return y
}

let htmlX = document.getElementById('firstNumber');
let htmlY = document.getElementById('secondNumber');
htmlX.innerText = 3;
htmlY.innerText = fibonacciSequence(htmlX.innerText);