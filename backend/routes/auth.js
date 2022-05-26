const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a User using:POST "api/auth/". Dous not require Authentication.
router.post("/", (req, res) => {
    console.log(req.body);
    res.send(req.body);
    const user = User(req.body);
    // Saving data into MongoDB
    user.save();
});

module.exports = router;