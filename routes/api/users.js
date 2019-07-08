const express = require('express');
const router = express.Router();
const db = require('../../db');

// @route    GET api/users
// @desc     Get all users
// @access   Private (admin only)
router.get('/', (req, res) => {
    db.query('SELECT * FROM AppUser;',[], (err, result) => {
        console.log(result);
        res.send({
            rows: result.rows
        });
    });
});

// @route    POST api/users
// @desc     Create a new user
// @access   Public
router.post('/', (req, res) => {

    const { username, email, password, passwordConfirm } = req.body;
    const errors = [];

    //Validation
    //Ensure required fields exist
    if (!username) errors.push('Registration requires a username.');
    if (!email) errors.push('Registration requires a valid e-mail');
    if (!password) errors.push('Registration requires a password');
    if (!passwordConfirm) errors.push('Please confirm your password to register.');

    if (errors) {
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