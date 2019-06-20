import axios from 'axios';

import history from '../../history';
import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_ERROR,
    DISMISS_INGREDIENT_INFO,
    FETCH_INGREDIENTS,
    FETCH_INGREDIENTS_ERROR
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

        const error_text = error.data ? error.data : 'Could not contact the server.';

        dispatch({
            type: ADD_INGREDIENT_ERROR,
            payload: error_text
        });
    });
}

export const fetchIngredients = (query) => (dispatch, getState) => {

    axios.get('/api/ingredients/')
    .then(response => {
        dispatch({
            type: FETCH_INGREDIENTS,
            payload: response.data.ingredients
        });
    })
    .catch(error => {
        const error_text = error.data ? error.data : 'Could not fetch ingredients from the server';

        dispatch({
            type: FETCH_INGREDIENTS_ERROR,
            payload: error_text
        });
    });

}

//Action to dismiss any notifications about successful ingredient additions
export const dismissIngredientInfo = () => {
    return { type: DISMISS_INGREDIENT_INFO };
}