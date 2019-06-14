const express = require('express');
const router = express.Router();
const db = require('../../db');

// @route    GET api/ingredients
// @desc     Get all ingredients
// @access   Public
router.get('/', (req, res) => {

    const getIngredientsText = 'SELECT * FROM Ingredient';

    //Experimenting with using promises
    db.query(getIngredientsText, [])
    .then(result => {
        res.json({ ingredients: result.rows })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Unable to fetch ingredients." });
    });
    
});


// @route    POST api/ingredients
// @desc     Add a new ingredient to the app
// @access   Private
// TODO:     Validate that the user sending the request exists
// TODO:     Validate the user sending the request is logged in
// TODO:     Add support for optional nutrition fields (ie: saturated fat, etc.)
router.post('/', (req, res) => {
    const { name, userId, servingSize, 
        measurementType, calories, protein, fat, carbs } = req.body;

    // Validate that required parameters are present
    if (!name || !userId || !servingSize || !measurementType || !calories ||
        !protein || !fat || !carbs) {
            res.status(400).json({ error: "Required field is missing." });
            return;
    }

    // Validate that numeric fields are numbers
    if ([userId, servingSize, calories, protein, fat, carbs].map((field) => {
        if (isNaN(field)) return true;
        return false;
    }).includes(true)) {
        res.status(400).json({ error: "A numeric field was supplied as not a number." });
        return;
    } 

    // User request passed validation, add to the database
    const insertIngredientText = 'INSERT INTO Ingredient (name, uploader_id, serving_size, measurement_type, '+
    'calories, protein, fat, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
    const ingredientValues = [name, userId, servingSize, measurementType, calories, protein, fat, carbs];
    
    db.query(insertIngredientText, ingredientValues, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "There was a problem adding the ingredient." });
            return;
        }

        //Record was added successfully
        console.log(`User ${userId} created ingredient: ${name}`);
        res.status(201).json({ name, userId, servingSize, measurementType, 
            calories, protein, fat, carbs });
    });
});


//@route    DELETE api/ingredients/:id
//@desc     Delete an ingredient (only the user that owns can delete)
//@access   Private
//TODO:     Authenticate the user sending the delete request
router.delete('/:id', (req, res) => {
    res.send("Hit delete route");
});


//@route    PUT api/ingredients/:id
//@desc     Update an ingredient's information (only by the owned user)
//@access   Private
//TODO:     Authenticate the user sending the request
router.put('/:id', (req, res) => {
    res.send("Hit update route");
});

module.exports = router;