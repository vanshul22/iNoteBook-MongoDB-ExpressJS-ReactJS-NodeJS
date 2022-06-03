require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require("../middleWare/fetch_user");


// Route 1 : Create a User using:POST "api/auth/createuser". No login required.
router.post("/createuser", [
    body('name', "Please enter a valid Name...").isLength({ min: 3 }),
    body('email', "Please enter valid email in format 'name@example.com'...").isEmail(),
    body('password', "Password must be atleast 8 Characters...").isLength({ min: 8 }),
], async (req, res) => {
    let success = false;
    // If there are errors return bad request and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };

    try {
        // Check with the user with this email exists already.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Error!! User with this email already exists..." });
        }
        // Generating salt here
        const salt = await bcrypt.genSalt(10);
        // Creating hash of password here from password.
        const securedPassword = await bcrypt.hash(req.body.password, salt);
        // Creating new user here
        user = await User.create({
            name: req.body.name,
            password: securedPassword,
            email: req.body.email
        });
        // Taking id from creating user.
        const data = {
            user: { id: user.id }
        };
        // Generating authentication token here
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        // Sending authentication token to user.
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success, error: "Internal Server Error" });
    }
});

// Route 2 : Authenticate a User using:POST "api/auth/login". No login required.
router.post("/login", [
    body('email', "Please enter valid email in format 'name@example.com'...").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    let success = false;
    // If there are errors return bad request and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        // Checking user from mail from DB
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials..." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials..." });
        }
        // Taking id from creating user.
        const data = {
            user: { id: user.id }
        }
        // Generating authentication token here
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3 : Get loggedin User details using:POST "api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        // Apart from password take everything.
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    };
});

module.exports = router;