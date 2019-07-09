const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json'); 
const jwtSecret = config.jwtSecret;

// @route    POST api/auth
// @desc     Authenticate a user and provide them with a token
// @access   Public
router.post('/', async (req, res) => {

    const { username, password } = req.body;
    const errors = [];

    //Validate provided username and password
    if (!username || !password) errors.push('Please provide a username and password.');

    //Confirm that username exists before attempting login
    try {
        const result = await db.query('SELECT username FROM appuser WHERE username=$1;', [username]);
        if (result.rowCount == 0) errors.push('Username does not exist.');
    } catch (err) {
        errors.push('There was a problem validating the login.');
    }

    //Send response indicating bad request if there are errors
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    //Get the password hash from the database to authenticate login
    var passwordHash = "";
    var id = "";
    try {
        const result = await db.query('SELECT id, password FROM appuser WHERE username=$1;', [username]);
        passwordHash = result.rows[0].password;
        id = result.rows[0].id;
    } catch (err) {
        errors.push('There was a problem validating user credentials.');
        return res.status(500).json({ errors });
    }

    //Compare the hash of the provided password to the hash in the database
    bcrypt.compare(password, passwordHash)
    .then(isMatch => {
        if (!isMatch) {
            errors.push('Invalid credentials.');
            return res.status(401).json({ errors });
        }

        //Password is valid, return a token to the user
        jwt.sign(
            { id, username }, 
            jwtSecret, 
            {expiresIn: 3600},
            (err, token) => {
                if (err) {
                    errors.push('There was a problem logging in.');
                    return res.status(500).json({errors});
                }
    
                res.json({
                    token,
                    user: { id, username },
                    message: 'Login successful!'
                });
            }
        );
    })
    //Error comparing passwords
    .catch(err => {
        errors.push('There was a problem validating user credentials.');
        res.status(500).json({ errors });
    });
});

module.exports = router;