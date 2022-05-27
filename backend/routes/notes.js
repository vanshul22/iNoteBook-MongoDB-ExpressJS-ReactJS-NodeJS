const express = require("express");
const router = express.Router();
const fetchuser = require("../middleWare/fetch_user");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");


// Route 1 : Get allnotes details using:GET "api/notes/fetchallnotes". login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2 : Add a new Note  using:POST "api/notes/addnote". login required.
router.post("/addnote", fetchuser, [
    body('title', "Please enter valid Title").isLength({ min: 3 }),
    body('description', "Description cannot be blank or less than 5 chars").isLength({ min: 5 })
], async (req, res) => {

    //
    try {
        // Destructuring here from the body of request.
        const { title, description, tag } = req.body;
        // If there are errors return bad request and errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;