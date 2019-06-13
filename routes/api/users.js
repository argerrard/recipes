const express = require('express');
const router = express.Router();
const db = require('../../db');

// @route    GET api/users
// @desc     Get all users
// @access   Private
router.get('/', (req, res) => {
    db.query('SELECT * FROM AppUser;',[], (err, result) => {
        console.log(result);
        res.send({
            rows: result.rows
        });
    });
});



module.exports = router;