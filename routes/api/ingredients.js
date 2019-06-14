const express = require('express');
const router = express.Router();
const db = require('../../db');

// @route   GET api/ingredients
// @desc    Get all ingredients
// @access  Public
router.get('/', (req, res) => {
    res.json({
        status: 'It worked'
    });
});


//@route    POST api/ingredients
//@desc     Add a new ingredient to the app
//@access   Private
router.post('/', (req, res) => {

});

module.exports = router;