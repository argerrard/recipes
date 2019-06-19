import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_ERROR,
    DISMISS_INGREDIENT_INFO
} from '../actions/types';

const INITIAL_STATE = {
    uploadedIngredient: {
        success: false,
        errors: '',
        ingredient: null
    }
};

const ingredientReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_INGREDIENT:
            return { ...state, 
                uploadedIngredient: {
                    success: true,
                    errors: '',
                    ingredient: action.payload
                } };

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

        default:
            return state;

    }
};

export default ingredientReducer;