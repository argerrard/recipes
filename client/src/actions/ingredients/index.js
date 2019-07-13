import axios from 'axios';

import history from '../../history';
import { logoutUser } from '../auth';
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
    DELETE_INGREDIENT,
} from '../types';


//Creates an action to add a new ingredient to the database
//The ingredient information to be added is found in the payload of the action
export const addIngredient = (newIngredient) => (dispatch, getState) => {
    axios.post('/api/ingredients/', {...newIngredient, userId: 1}, 
        { 
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": getState().auth.token
            }
        })
    .then(response => {
        dispatch({
            type: ADD_INGREDIENT,
            payload: response.data
        });

        //Route back to main ingredients page
        history.push('/ingredients');

    }).catch(error => {

        const error_text = error.response.data ? error.response.data.errors[0] : 'Could not contact the server.';

        dispatch({
            type: ADD_INGREDIENT_ERROR,
            payload: error_text
        });

        //If the user's token is expired then log them out
        if (error_text === 'Invalid token.') {
            logoutUser()(dispatch);
        }
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
        const error_text = error.response.data ? error.response.data.errors[0] : 'Could not fetch ingredients from the server';

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
        const error_text = error.response.data ? error.response.data.errors[0] : 'There was a problem loading the ingredient.';
        dispatch({
            type: FETCH_INGREDIENTS_ERROR,
            payload: error_text
        });
    });

}

//Creates an action to delete an ingredient from the server
export const deleteIngredient = (ingredientId) => (dispatch, getState) => {

    axios.delete(`/api/ingredients/${ingredientId}`,  { 
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": getState().auth.token
        }
    })
    .then(response => {
        dispatch({
            type: DELETE_INGREDIENT,
            payload: ingredientId
        })
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data.errors[0] : 'Could not delete ingredient from the server';
        
        dispatch({
            type: DELETE_INGREDIENT_ERROR,
            payload: error_text
        });

        //If the user's token is expired then log them out
        if (error_text === 'Invalid token.') {
            logoutUser()(dispatch);
        }
    });

}

//Action to edit ingredient
export const editIngredient = (ingredientId, ingredientValues) => (dispatch, getState) => {

    axios.put(`/api/ingredients/${ingredientId}`, ingredientValues,  { 
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": getState().auth.token
        }
    })
    .then(response => {
        dispatch({
            type: EDIT_INGREDIENT,
            payload: { ...ingredientValues, id: ingredientId}
        });

        //Route back to main ingredients page
        history.push('/ingredients');
    })
    .catch(error => {
        const error_text = error.response.data ? error.response.data.errors[0] : 'Could not connect to the server.';
        
        dispatch({
            type: EDIT_INGREDIENT_ERROR,
            payload: error_text
        });

        //If the user's token is expired then log them out
        if (error_text === 'Invalid token.') {
            logoutUser()(dispatch);
        }

    });


}


//Action to dismiss any notifications about successful ingredient additions
export const dismissIngredientInfo = () => {
    return { type: DISMISS_INGREDIENT_INFO };
}