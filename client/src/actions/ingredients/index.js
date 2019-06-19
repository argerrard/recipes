import axios from 'axios';

import {
    ADD_INGREDIENT,
    EDIT_INGREDIENT,
    DELETE_INGREDIENT,
    ADD_INGREDIENT_ERROR
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
    }).catch(error => {
        dispatch({
            type: ADD_INGREDIENT_ERROR,
            payload: error.data
        });
    });


}