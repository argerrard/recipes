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
        res.status(400).json({ errors });
        return;
    }

    //Authenticate user based on provided password
    try {
        const result = await db.query('SELECT password FROM appuser WHERE username=$1;', [username]);
        const passwordHash = result.rows[0].password;
        console.log(passwordHash);
    } catch (err) {
        errors.push('There was a problem validating user credentials.');
        res.status(500).json({ errors });
        return;
    }

    res.json({
        message: 'successfully logged in'
    });
});

module.exports = router;