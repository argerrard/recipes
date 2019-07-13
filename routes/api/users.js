const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json'); 
const jwtSecret = config.jwtSecret;

const AUTH_TOKEN_LENGTH = 3600;

// @route    GET api/users
// @desc     Get all users
// @access   Private (admin only)
// TODO: make this route a private route only accessible to admin, it is currently public
router.get('/', (req, res) => {
    db.query('SELECT * FROM AppUser;',[], (err, result) => {
        res.send({
            rows: result.rows
        });
    });
});

// @route    POST api/users
// @desc     Create a new user
// @access   Public
router.post('/', async (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;
    const errors = [];

    //Server Side Validation
    //Experimenting with async await syntax for validation
    //Ensure required fields exist
    if (!username) errors.push('Registration requires a username to be chosen.');
    if (!email) errors.push('Registration requires a valid e-mail.');
    if (!password) errors.push('Registration requires a password.');
    if (!passwordConfirm) errors.push('Please confirm your password to register.');
    
    //Ensure that username does not exist
    try {
        const res = await db.query('SELECT username FROM AppUser WHERE username=$1;', [username]);
        if (res.rows.length == 1) errors.push('That username is already taken.');
    } catch(err) {
        errors.push('There was a problem verifying the username.');
    }

    //Ensure that e-mail is a valid format
    if (!validateEmail(email)) errors.push('Email must be a valid format.');

    //Ensure that email does not already exist
    try {
        const result = await db.query('SELECT email FROM AppUser WHERE email=$1;', [email]);
        if (result.rows.length == 1) errors.push('This e-mail has already been registered.');
    } catch(err) {
        errors.push('There was a problem verifying the e-mail.');
    }

    //Ensure that password is at least 6 characters
    if (password.length < 6) errors.push('Password must be at least 6 characters long.');

    //Ensure that password contains at least one number
    if (!containsNumber(password)) errors.push('Password must contain at least 1 number.');

    //Ensure that password confirm matches password
    if (password != passwordConfirm) errors.push('Passwords entered do not match.');

    //Send Bad Request response if there are any (or multiple errors)
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    //If we get to this point, the request has passed all required validation
    
    //Generate salt and hash for the password
    var pwHash = "";

    try{
        const salt = await bcrypt.genSalt(10);
        pwHash = await bcrypt.hash(password, salt);
    }
    catch(err){
        errors.push('There was a problem registering the account');
        return res.status(500).json({errors});
    }

    //Register the user using the salted password
    const registerText = 'INSERT INTO AppUser (username, email, password) VALUES ($1, $2, $3) RETURNING id;';

    var id = "";

    try {
        const result = await db.query(registerText, [username, email, pwHash]);
        id = result.rows[0].id;
    } catch (err) {
        errors.push('There was a problem registering the account');
        return res.status(500).json({errors});
    }
    
    //Sign the token and send response to user
    jwt.sign(
        { id, username }, 
        jwtSecret, 
        {expiresIn: AUTH_TOKEN_LENGTH},
        (err, token) => {
            if (err) {
                errors.push('There was a problem registering the account');
                return res.status(500).json({errors});
            }

            res.json({
                token,
                user: { id, username, email },
                message: 'Registration successful!'
            });
        }
    );
});


// Helper methods used by different routes:

//Regex to validate e-mail inputs
//Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Regex to validate if string contains a number
function containsNumber(myString) {
    return /\d/.test(myString);
}

module.exports = router;