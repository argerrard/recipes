const express = require('express');
const router = express.Router();
const db = require('../../db');
const auth = require('../../middleware/auth.js');

// @route    GET api/ingredients
// @desc     Get all ingredients
// @access   Public
router.get('/', (req, res) => {

    const getIngredientsText = 'SELECT * FROM Ingredient';

    //Experimenting with using promises
    db.query(getIngredientsText, [])
    .then(result => {
        return res.json({ ingredients: result.rows })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Unable to fetch ingredients." });
    });
    
});

//@route    GET api/ingredients/:id
//@desc     Get the ingredient with given id
//@access   Public
router.get('/:id', (req, res) => {
    
    const id = req.params.id;

    //ensure passed in ID is numeric
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be numeric." });
    }

    const getIngredientText = 'SELECT * FROM Ingredient WHERE id=$1;';
    const ingredientValues = [id];
    db.query(getIngredientText, ingredientValues)
    .then(result => {

        //Return not found if no ID is found
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ingredient was not found." });
        }

        //Ingredient is found
        return res.json(result.rows[0]);

    })
    .catch(err => {
        return res.status(500).json({ error: "There was a problem getting the ingredient." });
    });

});


// @route    POST api/ingredients
// @desc     Add a new ingredient to the app
// @access   Private
// TODO:     Validate that the user sending the request exists
// TODO:     Add support for optional nutrition fields (ie: saturated fat, etc.)
router.post('/', auth, async (req, res) => {

    const { name, servingsize, 
        measurementtype, calories, protein, fat, carbs } = req.body;

    //Get creating user from the web token
    const userId = req.user.id;

    // Validate that required parameters are present
    if (!name || !userId || !servingsize || !measurementtype || !calories ||
        !protein || !fat || !carbs) {
            return res.status(400).json({ error: "Required field is missing." });
    }

    // Validate that numeric fields are numbers
    if ([userId, servingsize, calories, protein, fat, carbs].map((field) => {
        if (isNaN(field)) return true;
        return false;
    }).includes(true)) {
        return res.status(400).json({ error: "A numeric field was supplied as not a number." });
    } 

    //Validate that the user sending the request exists
    try {
        const result = await db.query('SELECT id FROM AppUser WHERE id=$1;', [userId]);
        if (result.rows.length == 0) {
            return res.status(404).json({ error: "User does not exist." });
        };
    } catch (err) {
        return res.status(500).json({ error: "There was a problem adding the ingredient." });
    }

    // User request passed validation, add to the database
    const insertIngredientText = 'INSERT INTO Ingredient (name, uploaderId, servingsize, measurementtype, '+
    'calories, protein, fat, carbs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;';
    const ingredientValues = [name, userId, servingsize, measurementtype, calories, protein, fat, carbs];
    
    db.query(insertIngredientText, ingredientValues, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "There was a problem adding the ingredient." });
        }

        //Record was added successfully
        console.log(`User ${userId} created ingredient: ${name}`);
        return res.status(201).json({ id: result.rows[0].id, name, userId, servingsize, measurementtype, 
            calories, protein, fat, carbs });
    });
});


//@route    DELETE api/ingredients/:id
//@desc     Delete an ingredient (only the user that owns can delete)
//@access   Private
//TODO:     Authenticate the user sending the delete request
//TODO:     Confirm the user deleting the request owns the ingredient
router.delete('/:id', (req, res) => {
    
    const id = req.params.id;

    //ensure passed in ID is numeric
    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be numeric." });
    }

    const deleteText = 'DELETE FROM Ingredient WHERE id=$1';
    const deleteValues = [id];
    
    //Delete entry from database
    db.query(deleteText, deleteValues)
    .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ error: 'Ingredient could not be found for deletion.' });

        //Successful deletion
        console.log(`Ingredient ID ${id} has been deleted`);
        return res.json({ message: 'Ingredient successfully deleted.' });
    })
    .catch(err=> {
        console.log(err);
        return res.status(500).json({ error: 'There was a problem deleting the ingredient.' });
    });


});


//@route    PUT api/ingredients/:id
//@desc     Update an ingredient's information (only by the owned user)
//@access   Private
//TODO:     Authenticate the user sending the request
//TODO:     Confirm the user updating the request owns the ingredient
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, servingsize, 
        measurementtype, calories, protein, fat, carbs } = req.body;

    //Ensure ingredient id is numeric
    if (isNaN(id)) return res.status(400).json({ error: 'Ingredient id must be numeric.' });

    //Ensure the required parameters of the ingredient have been entered
    if (!name || !servingsize || !measurementtype || !calories ||
        !protein || !fat || !carbs) {
            return res.status(400).json({ error: "Required field is missing." });
    }

    //Update the ingredient record
    const updateText = 'UPDATE Ingredient SET name = $1, servingsize = $2, measurementtype = $3,' +
    'calories = $4, protein = $5, fat = $6, carbs = $7 WHERE id = $8;';
    const updateValues = [name, servingsize, measurementtype, calories, protein, fat, carbs, id];

    db.query(updateText, updateValues)
    .then(result => {
        if (result.rowCount === 1) {
            return res.status(200).json({ message: 'The ingredient was successfully updated.' });
        } else {
            return res.status(404).json({ error: 'The ingredient could not be found for updating.'});
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: 'There was a problem updating the ingredient.' });
    });


});

module.exports = router;