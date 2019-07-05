import _ from 'lodash';

import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_ERROR,
    DISMISS_INGREDIENT_INFO,
    EDIT_INGREDIENT,
    EDIT_INGREDIENT_ERROR,
    FETCH_INGREDIENTS,
    DELETE_INGREDIENT,
    FETCH_INGREDIENT,
    FETCH_INGREDIENTS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    uploadedIngredient: {
        success: false,
        errors: '',
        ingredient: null,
        type: ''
    },
    ingredientList: {},
    errors: ''
};

const ingredientReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        //When a new ingredient is added, update the uploadedIngredient info to accurately
        //portray the success message
        case ADD_INGREDIENT:
            return { ...state, 
                uploadedIngredient: {
                    success: true,
                    errors: '',
                    ingredient: action.payload,
                    type: 'add'
                }
            };

        //If there is an error adding, upload the error message based on the payload
        case ADD_INGREDIENT_ERROR:
            return {...state, uploadedIngredient: {
                success: false,
                errors: action.payload,
                ingredient: null,
                type: 'add'
            }};

        //Erase any outstanding messages shown to the user
        case DISMISS_INGREDIENT_INFO:
            return { ...state, uploadedIngredient: {
                success: false,
                errors: '',
                ingredient: null,
                type: ''
            }};
        
        //Fetch a single ingredient and add it to the state
        case FETCH_INGREDIENT:

            return {
                ...state, 
                ingredientList: {...state.ingredientList, [action.payload.id]: action.payload},
                errors: ''
            }

        //Add all fetched ingredients to the state
        case FETCH_INGREDIENTS:
            return {
                ...state, ingredientList: _.mapKeys(action.payload, 'id'),
                errors: ''
            };
        
        //Edit the ingredient in the ingredient list and update the uploaded ingredient info
        //so that the popup success message is displayed
        case EDIT_INGREDIENT:
            return {
                ...state, 
                ingredientList: {...state.ingredientList, [action.payload.id]: action.payload},
                uploadedIngredient: {
                    success: true,
                    errors: '',
                    ingredient: action.payload,
                    type: 'edit'
                }
            };
        
        //Update the error state so that the user can see the error returned by the api
        case EDIT_INGREDIENT_ERROR:
            return {
                ...state,
                uploadedIngredient: {
                    success: false,
                    errors: action.payload,
                    ingredient: null,
                    type: 'edit'
                }
            };

        //Remove the ingredient from state
        case DELETE_INGREDIENT:

            return {
                ...state, 
                ingredientList: _.omit(state.ingredientList, action.payload),
                errors: ''
            };
        
        //Update the error state so the user can see the error message relating to the fetch
        case FETCH_INGREDIENTS_ERROR:
            return {
                ...state,
                errors: action.payload
            };

        default:
            return state;

    }
};

export default ingredientReducer;