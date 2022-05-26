// Importing modules
const connectToMongo = require("./db");
const express = require('express');

// Connecting from db.js MongoDB.
connectToMongo();

const app = express();
const port = 3000;

// Available Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


// Listening Port.
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});