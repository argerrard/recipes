import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './Header';
import history from '../history';
import RecipeHome from './RecipeHome';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import IngredientAdd from './ingredients/IngredientAdd';
import IngredientHome from './ingredients/IngredientHome';
import IngredientEdit from './ingredients/IngredientEdit';
import {connect} from 'react-redux';

import { getUser } from '../actions/auth';


class App extends React.Component {
    
    componentDidMount() {
        
        //Check local storage to see if there is a token
        //If there is a token, attempt to login the user (token may be expired)
        const token = localStorage.getItem('access-token');
        if (token) this.props.getUser(token);

    }

    render() {
        return (
            <div>
                <Router history={history}>
                        <Header />
                        <Container>
                        <Switch>
                            <Route path="/" exact component={RecipeHome} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/signup" exact component={SignUp} />
                            <Route path="/ingredients" exact component={IngredientHome} />
                            <Route path="/ingredients/add" exact component={IngredientAdd} />
                            <Route path="/ingredients/edit/:id" exact component={IngredientEdit} />
                        </Switch>
                        </Container>
                </Router>
            </div>
        );
    }
    
}

export default connect(null, { getUser })(App);