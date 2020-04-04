const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

let dbo;

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db("mydb");
})

app.get('/fibonacci/:number', function (req, res) {
    let number = +req.params.number;
    let result = fibonacciRecursion(number);
    let object = { number, result, createdDate: Date.now() };
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
    console.log(`listening on port ${PORT}`);
})