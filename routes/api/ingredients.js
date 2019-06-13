const express = require('express');
const router = express.Router();

// @route    GET api/ingredients
// @desc     Get all ingredients
// @access   Public
router.get('/', (req, res) => {
    res.json({
        status: 'It worked'
    });
});

module.exports = router;