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
        case ADD_INGREDIENT:
            return { ...state, 
                uploadedIngredient: {
                    success: true,
                    errors: '',
                    ingredient: action.payload,
                    type: 'add'
                }
            };

        case ADD_INGREDIENT_ERROR:
            return {...state, uploadedIngredient: {
                success: false,
                errors: action.payload,
                ingredient: null,
                type: 'add'
            }};

        case DISMISS_INGREDIENT_INFO:
            return { ...state, uploadedIngredient: {
                success: false,
                errors: '',
                ingredient: null,
                type: ''
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
        
        case EDIT_INGREDIENT_ERROR:
            return {
                ...state,
                errors: action.payload
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