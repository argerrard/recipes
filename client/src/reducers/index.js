import { combineReducers }  from 'redux';
import { reducer as formReducer } from 'redux-form';

const recipeApp = combineReducers({
    form: formReducer
});

export default recipeApp;