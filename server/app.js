const express = require('express');
const app = express();
let array = [];
const cors = require('cors');

app.use(cors());

app.get('/fibonacci/:number', function (req, res) {
    let number = +req.params.number;
    let result = fibonacciRecursion(number);
    let object = { number, result, createdDate: Date.now() };
    array.push(object);
    res.send(array);
})

app.get('/getFibonacciResults', function (req, res) {
    res.send(array);
})

fibonacciRecursion = (number) => {
    if (number > 1) {
        return fibonacciRecursion(number - 1) + fibonacciRecursion(number - 2);
    } else if (number == 1) {
        return 1;
    } else if (number == 0) {
        return 0;
    }
}

let PORT = 5050;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})