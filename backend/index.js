// Importing modules
const connectToMongo = require("./db");
const express = require('express');
const cors = require("cors");

// Connecting from db.js MongoDB.
connectToMongo();

const app = express();
const port = 5000;

// It allows us to relax the security applied to an API.
app.use(cors());

// Using Middle Ware here to use content of body to send request.
app.use(express.json())

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Listening Port.
app.listen(port, () => {
    console.log(`iNoteBook Backend app listening at http://localhost:${port}`);
});