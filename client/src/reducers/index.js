import { combineReducers }  from 'redux';
import { reducer as formReducer } from 'redux-form';

import ingredientReducer from './ingredientReducer';

const recipeApp = combineReducers({
    form: formReducer,
    ingredient: ingredientReducer
});

export default recipeApp;