import { combineReducers }  from 'redux';
import { reducer as formReducer } from 'redux-form';

import ingredientReducer from './ingredientReducer';
import authReducer from './authReducer';

const recipeApp = combineReducers({
    form: formReducer,
    ingredient: ingredientReducer,
    auth: authReducer
});

export default recipeApp;