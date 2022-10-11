const express = require("express");
const router = express.Router();
var fetchuser = require('../midleware/fetchuser')
const Notes = require('../models/Note')
const { body, validationResult } = require('express-validator');
// router no 1 to get all thenotes of user using api/api/auth/fetchnotes
router.get('/fetchnotes', fetchuser, async(req, res) => {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    })
    // router no 2 to add all the notes of user using POST api/api/auth/addnotes 
router.post('/addnotes', fetchuser, [
        body('title', 'Enter valid title').isLength({ min: 2 }),
        body('description', 'Description must be of 5 character').isLength({ min: 5 }),
    ],
    async(req, res) => {
        // catch error and return it 
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // this iss called distruction 
        const { title, description, tag } = await req.body;
        try {
            // create new object of Notes using contructor 
            const note = await new Notes({
                title,
                description,
                tag,
                user: req.user.id
            })
            const savednote = await note.save()
                // The res.json() function sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method.
                // Syntax: 


            // res.json( [body] )
            // Parameters: The body parameter is the body which is to be sent in the response.
            // Return Value: It returns an Object.
            res.json(savednote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")

        }
    })

// router no 3 to UPDATE alL the notes of user using api/api/auth/UPDATEnotes
// to update we use put
router.put('/updatenotes/:id', fetchuser, [
        body('title', 'Enter valid title').isLength({ min: 2 }),
        body('description', 'Description must be of 5 character').isLength({ min: 5 }),
    ], async(req, res) => {
        try {
            const errors = await validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = await req.body;
            // create a new object
            const newnote = await {};
            if (title) { newnote.title = title }
            if (description) { newnote.description = description }
            if (tag) { newnote.tag = tag }
            // find the note to be updated and update it
            let note = await Notes.findById(req.params.id)
            if (!note) { res.status(404).send("Not found") }
            // tostring to convert id into string for comparison
            // security purpose 
            if (note.user.toString() !== req.user.id) {
                res.status(401).send("Updating Notes is not allowed")
            }
            // New keyword in JavaScript is used to create an instance of an object that has a constructor function.

            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
            res.json({ note })

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")

        }
    })
    // router no 4 to delete alL the notes of user using api/api/auth/deletenotes
router.delete('/deletenotes/:id', fetchuser, async(req, res) => {
    try {
        // find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) { res.status(404).send("Not found") }
        // tostring to convert id into string for comparison
        // security purpose 
        // allow deletion
        if (note.user.toString() !== req.user.id) {
            res.status(401).send("Updating Notes is not allowed")
        }
        // New keyword in JavaScript is used to create an instance of an object that has a constructor function.
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "Notes has been deleted" })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }
})


module.exports = router;