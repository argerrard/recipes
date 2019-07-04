import React from 'react';
import { connect } from 'react-redux';

import IngredientForm from './IngredientForm';
import { addIngredient, dismissIngredientInfo } from '../../actions/ingredients';

class IngredientAdd extends React.Component {

    componentDidMount() {
        this.props.dismissIngredientInfo();
    }

    onSubmit = (formValues) => {
        this.props.addIngredient(formValues);
    }

    render() {
        return (
            <div>
                <IngredientForm 
                    headerTitle='Add an Ingredient'
                    onSubmit={this.onSubmit} 
                    errorHeader='There was a problem adding the ingredient.'
                    apiErrors={this.props.uploadError}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        uploadError: state.ingredient.uploadedIngredient.errors
    };
};

export default connect(mapStateToProps, {addIngredient, dismissIngredientInfo})(IngredientAdd);