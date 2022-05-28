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

// Route 3 : Update an existing note Note  using:POST "api/notes/updatenote". login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // Creating a new Note object.
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Finding the note to updated and update it.
        let note = await Note.findById(req.params.id);
        // If note id is not present then will show this.
        if (!note) { return res.status(404).send("Not Found...") };
        // Checking for fake users here.
        if (note.user.toString() !== req.user.id) { return res.status(401).json("Not Alowed") };
        // Here new will create new parameters of note if not available.
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        // Sending response as new note
        res.send(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    };
});

module.exports = router;