const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Create a User using:POST "api/auth/". Dous not require Authentication.
router.post("/", [
    body('name', "Please enter a valid Name...").isLength({ min: 3 }),
    body('email', "Please enter valid email in format 'name@example.com'...").isEmail(),
    body('password', "Password must be atleast 8 Characters...").isLength({ min: 8 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user)).catch(err => {
        console.log(err);
        res.json({ error: "Please enter a unique value for email..." });
    });
});

module.exports = router;