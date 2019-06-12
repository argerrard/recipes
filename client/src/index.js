import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import recipeApp from './reducers/combineReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';

const store = createStore(recipeApp, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root")
);
