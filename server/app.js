const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

let dbo;

app.use(express.static('../public'));

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db("mydb");
})

app.get('/fibonacci/:number', function (req, res) {
    let number = +req.params.number;
    let result = fibonacciRecursion(number);
    let object = { number, result, createdDate: Date.now() };
    if (number === 42) {
        return res.status(400).send('42 is the meaning of life.');
    }
    if (number > 50) {
        return res.status(400).send("number can't be bigger than 50");
    }
    if (number < 1) {
        return res.status(400).send("number can't be smaller than 1");
    }
    dbo.collection("fibonacci").insertOne(object, (err) => {
        if (err) throw err;
        res.send(object);
    })
})

app.get('/getFibonacciResults', function (req, res) {
    dbo.collection("fibonacci").find({}).toArray((err, documents) => {
        if (err) throw err;
        res.send(documents);
    })
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
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
})