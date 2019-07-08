const express = require('express');
const router = express.Router();
const db = require('../../db');

// @route    GET api/users
// @desc     Get all users
// @access   Private (admin only)
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

    //Validation
    //Experimenting with async await syntax for validation
    //Ensure required fields exist
    if (!username) errors.push('Registration requires a valid e-mail');
    if (!email) errors.push('Registration requires a valid e-mail');
    if (!password) errors.push('Registration requires a password');
    if (!passwordConfirm) errors.push('Please confirm your password to register.');
    
    //Ensure that username does not exist

    //Ensure that e-mail is a valid format

    //Ensure that email does not already exist
    try {
        const res = await db.query('SELECT email FROM AppUser WHERE email=$1;', [email]);
        console.log(res.rows[0]);
        if (res.rows.length == 1) errors.push('This e-mail has already been registered.');
    } catch(err) {
        console.log(err);
        errors.push('There was a problem verifying the e-mail.');
    }

    //Ensure that password is at least 6 characters

    //Ensure that password contains at least one number

    //Ensure that password confirm matches password

    //Send Bad Request response if there are any (or multiple errors)
    if (errors.length > 0) {
        res.status(400).json({
            errors
        });
        return;
    }

    res.json({
        message: 'Registered new user'
    });
});



module.exports = router;