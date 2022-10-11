const express = require("express");
const User = require("../models/User");
const fetchuser = require("../midleware/fetchuser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
// The express.Router() function is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
const router = express.Router();
// jwt_secret = 'CIHAANSIKANDAR'
const jwt_secret = `${process.env.TOKEN_SECRET}`
    // midleware is function that will be caled whenever someone login it

// create a user using  pos end point "/api/auth".
// "/" k baad ak array banana hai or usmai validation krni hai and only after validation request will be sent
// create user no login required 
// ROUTE 1 FOR CREATING USER
router.post('/createuser', [
    body('Email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('Password').isLength({ min: 8 }),
], async(req, res) => {
    // catch error and return it 
    let sucess = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check user with same email exist already
        let user = await User.findOne({ Email: req.body.Email });
        if (user) {
            return res.status(400).json({ sucess, error: "Account with this email is already existed" })
        }
        // create user
        var salt = await bcrypt.genSaltSync(10);
        const secure_password = await bcrypt.hash(req.body.Password, salt);
        user = await User.create({
            name: req.body.name,
            Password: secure_password,
            Email: req.body.Email,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const TOKEN = jwt.sign(data, jwt_secret)
        sucess = true
        res.json({ sucess, TOKEN })
            // .then(user => res.json(user)).catch(err => {
            //     console.log(err);
            //     res.json({ error: "this Email is already registered" })
            // });
            // catch unknown error
    } catch (error) {
        console.error(error.message);
        res.status(500).send(sucess, "Internal Server Error")

    }
});

// authenticate and logged in user who already has account. no login required 
// ROUTE 2 FOR LOGIN
router.post('/login', [
        body('Email').isEmail(),
        body('Password', "Password cannot be blank").exists(),
    ], async(req, res) => {
        let sucess = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, Password } = await req.body;
        try {
            const user = await User.findOne({ email })
            if (!user) {
                sucess = false
                return res.status(400).json({ sucess, error: "Try to login with correct credentials" })

            }
            const password_compare = await bcrypt.compare(Password, user.Password);
            if (password_compare) {
                sucess = false
                return res.status(400).json({ sucess, error: "Try to login with correct password" })
            }
            // user ka data ki id send kr rhe h to compare it with database
            const data = {
                user: {
                    id: user.id
                }
            }
            const TOKEN = jwt.sign(data, jwt_secret);
            sucess = true;
            res.json({ sucess, TOKEN });


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error")

        }


    })
    // 3RD ROUTER TO GET INFO OF OUR USER AFTER LOGIN
router.post('/getuserid', fetchuser, async(req, res) => {
    try {
        // we need to decode our user info from token and have to get user id
        const userID = req.user.id
            // i can select all field except the password that is why we use - password
        const userid = await User.findById(userID).select("-Password")
        res.send(userid)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")

    }
})

module.exports = router;