import React from 'react';
import { createStore } from 'redux';
import recipeApp from './reducers';

import Header from './Header';

const store = createStore(recipeApp);

const App = () => {

    return (
        <div>
            <Header />
            App
        </div>
    );

}

export default App;