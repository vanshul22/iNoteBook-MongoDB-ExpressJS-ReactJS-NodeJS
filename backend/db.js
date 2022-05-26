// Importing Modules here
const mongoose = require('mongoose');

// Connection String of MongoDB Compass:
// const mongoURI = `mongodb://localhost:27017`;
const mongoURI = `mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
// Connecting to MongoDB from this function.
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => { console.log("Connected to Mongo Successfully...") })
};

module.exports = connectToMongo;