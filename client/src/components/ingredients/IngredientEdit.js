import React from 'react';

import {fetchIngredient} from '../../actions/ingredients';
import {connect} from 'react-redux';

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
            <div>
                {message}
            </div>
        );
    }

    render() {
        if (!this.props.ingredient) {
            return this.renderError();
        }

        return <div>IngredientEdit</div>;
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