import axios from 'axios';

import history from '../../history';
import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_ERROR,
    DISMISS_INGREDIENT_INFO,
    EDIT_INGREDIENT,
    EDIT_INGREDIENT_ERROR,
    FETCH_INGREDIENT,
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_ERROR,
    DELETE_INGREDIENT_ERROR,
    DELETE_INGREDIENT
} from '../types';


//Creates an action to add a new ingredient to the database
//The ingredient information to be added is found in the payload of the action
export const addIngredient = (newIngredient) => (dispatch, getState) => {
    
    axios.post('/api/ingredients/', {...newIngredient, userId: 1})
    .then(response => {
        dispatch({
            type: ADD_INGREDIENT,
            payload: response.data
        });

        //Route back to main ingredients page
        history.push('/ingredients');

    }).catch(error => {

        const error_text = error.response.data ? error.response.data : 'Could not contact the server.';

        dispatch({
            type: ADD_INGREDIENT_ERROR,
            payload: error_text
        });
    });
}

//Creates an action to fetch ingredients according to the specified query
//TODO: currently just performs a fetch of all, add code to implement the query
export const fetchIngredients = (query) => (dispatch, getState) => {

    axios.get('/api/ingredients/')
    .then(response => {
        dispatch({
            type: FETCH_INGREDIENTS,
            payload: response.data.ingredients
        });
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data : 'Could not fetch ingredients from the server';

        dispatch({
            type: FETCH_INGREDIENTS_ERROR,
            payload: error_text
        });
    });

}

//Fetches a single ingredient - used to ensure our component has the information required
//for editing
export const fetchIngredient = (ingredientId) => (dispatch, getState) => {

    axios.get(`/api/ingredients/${ingredientId}`)
    .then(response => {
        dispatch({
            type: FETCH_INGREDIENT,
            payload: response.data
        });
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data : 'There was a problem loading the ingredient.';
        dispatch({
            type: FETCH_INGREDIENTS_ERROR,
            payload: error_text
        });
    });

}

//Creates an action to delete an ingredient from the server
//TODO: add authentication so that only the user that created the ingredient can delete it
export const deleteIngredient = (ingredientId) => (dispatch, getState) => {

    axios.delete(`/api/ingredients/${ingredientId}`)
    .then(response => {
        dispatch({
            type: DELETE_INGREDIENT,
            payload: ingredientId
        })
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data.message : 'Could not delete ingredient from the server';
        
        dispatch({
            type: DELETE_INGREDIENT_ERROR,
            payload: error_text
        });
    });

}

//Action to edit ingredient
//TODO: add authentication so that only the user that created the ingredient can edit
export const editIngredient = (ingredientId, ingredientValues) => (dispatch, getState) => {

    axios.put(`/api/ingredients/${ingredientId}`, ingredientValues)
    .then(response => {
        dispatch({
            type: EDIT_INGREDIENT,
            payload: { ...ingredientValues, id: ingredientId}
        });

        //Route back to main ingredients page
        history.push('/ingredients');
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data.message : 'Could not connect to the server.';
        
        dispatch({
            type: EDIT_INGREDIENT_ERROR,
            payload: error_text
        });
    });


}


//Action to dismiss any notifications about successful ingredient additions
export const dismissIngredientInfo = () => {
    return { type: DISMISS_INGREDIENT_INFO };
}