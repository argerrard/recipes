import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import history from '../history';
import RecipeHome from './RecipeHome';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import IngredientAdd from './ingredients/IngredientAdd';
import IngredientList from './ingredients/IngredientList';


const App = () => {

    return (
        <div>
            <Router history={history}>
                <div>
                    <Header />
                    <Container>
                    <Switch>
                        <Route path="/" exact component={RecipeHome} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={SignUp} />
                        <Route path="/ingredients" exact component={IngredientList} />
                        <Route path="/ingredients/add" exact component={IngredientAdd} />
                    </Switch>
                    </Container>
                </div>
            </Router>
        </div>
    );

}

export default App;