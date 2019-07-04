import React from 'react';
import { Message } from 'semantic-ui-react';
import {connect} from 'react-redux';

import {fetchIngredient} from '../../actions/ingredients';
import IngredientForm from './IngredientForm';

class IngredientEdit extends React.Component {

    //On component mount, fetch the ingredient to be displayed
    componentDidMount() {
        this.props.fetchIngredient(this.props.match.params.id);
    }

    //This method is called when an ingredient is not loaded for editing
    //This can occur if the user does not own the ingredient or if the
    //the fetch to the API returns an error.
    renderError() {
        //Default error message if one isn't in state
        const message = this.props.errorMessage ? this.props.errorMessage : 'There was a problem loading the ingredient.';

        return (
            <Message negative>
                <Message.Header>
                    Unfortunately, you can't edit this ingredient right now.
                </Message.Header>
                <p>{message}</p>
            </Message>
        );
    }

    onSubmit = () => {

    }

    render() {
        if (!this.props.ingredient && this.props.errorMessage) {
            return this.renderError();
        } else if (!this.props.ingredient) return null;

        return (
            <div>
                <IngredientForm 
                    headerTitle={`Editing Ingredient: ${this.props.ingredient.name}`}
                    onSubmit={this.onSubmit} 
                    errorHeader='There was a problem editing the ingredient.'
                    apiErrors={this.props.uploadError}
                    editIngredient={this.props.ingredient}
                />
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const ingredientId = ownProps.match.params.id

    return {
        ingredient: state.ingredient.ingredientList[ingredientId],
        errorMessage: state.ingredient.errors
    }
}

export default connect(mapStateToProps, {fetchIngredient})(IngredientEdit);