import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import history from '../history';
import RecipeHome from './RecipeHome';
import Login from './user-management/Login';
import SignUp from './user-management/SignUp';

const App = () => {

    return (
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={RecipeHome} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                    </Switch>
                </div>
            </Router>
        </div>
    );

}

export default App;