// Importing modules
const connectToMongo = require("./db");
const express = require('express');

// Connecting from db.js MongoDB.
connectToMongo();

const app = express();
const port = 3000;

// To listen request in / end point.
app.get('/', (req, res) => {
    res.send('Backend App');
});

// Listening Port.
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});