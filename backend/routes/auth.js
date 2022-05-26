const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleWare/fetch_user");

const JWT_SECRET = "ThisisaJWTsecretkey";

// Route 1 : Create a User using:POST "api/auth/createuser". No login required.
router.post("/createuser", [
    body('name', "Please enter a valid Name...").isLength({ min: 3 }),
    body('email', "Please enter valid email in format 'name@example.com'...").isEmail(),
    body('password', "Password must be atleast 8 Characters...").isLength({ min: 8 }),
], async (req, res) => {
    // If there are errors return bad request and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Check with the user with this email exists already.
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json("Error!! User with this email already exists...")
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
        }
        // Generating authentication token here
        const authToken = jwt.sign(data, JWT_SECRET);
        // Sending authentication token to user.
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

// Route 2 : Authenticate a User using:POST "api/auth/login". No login required.
router.post("/login", [
    body('email', "Please enter valid email in format 'name@example.com'...").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
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
            return res.status(400).json({ error: "Please try to login with correct credentials..." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials..." })
        }
        // Taking id from creating user.
        const data = {
            user: { id: user.id }
        }
        // Generating authentication token here
        const authToken = jwt.sign(data, JWT_SECRET);
        res.send({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

// Route 3 : Get loggedin User details using:POST "api/auth/getuser". login required.
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured");
    }
});

module.exports = router;