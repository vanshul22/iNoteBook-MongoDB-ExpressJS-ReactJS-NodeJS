const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using:POST "api/auth/createuser". No login required.
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
        // Creating new user here
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        res.json({ user });
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

module.exports = router;