import _ from 'lodash';

import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_ERROR,
    DISMISS_INGREDIENT_INFO,
    FETCH_INGREDIENTS,
    DELETE_INGREDIENT,
    FETCH_INGREDIENT,
    FETCH_INGREDIENTS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    uploadedIngredient: {
        success: false,
        errors: '',
        ingredient: null
    },
    ingredientList: {},
    errors: ''
};

const ingredientReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return { ...state, 
                uploadedIngredient: {
                    success: true,
                    errors: '',
                    ingredient: action.payload
                }
            };

        case ADD_INGREDIENT_ERROR:
            return {...state, uploadedIngredient: {
                success: false,
                errors: action.payload,
                ingredient: null
            }};

        case DISMISS_INGREDIENT_INFO:
            return { ...state, uploadedIngredient: {
                success: false,
                errors: '',
                ingredient: null
            }};
        
        case FETCH_INGREDIENT:

            return {
                ...state, 
                ingredientList: {...state.ingredientList, [action.payload.id]: action.payload},
                errors: ''
            }

        case FETCH_INGREDIENTS:
            return {
                ...state, ingredientList: _.mapKeys(action.payload, 'id'),
                errors: ''
            };

        case DELETE_INGREDIENT:

            return {
                ...state, 
                ingredientList: _.omit(state.ingredientList, action.payload),
                errors: ''
            };
        
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