import React from 'react';
import { connect } from 'react-redux';

import IngredientForm from './IngredientForm';
import { addIngredient, dismissIngredientInfo } from '../../actions/ingredients';

class IngredientAdd extends React.Component {

    //On mounting, dismiss any previous ingredient success messages so they no longer appear
    componentDidMount() {
        this.props.dismissIngredientInfo();
    }

    //Calls the action creator to create the ingredient on submit
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

// uploadError: errors provided by the server if the ingredient add is not successful
const mapStateToProps = (state) => {
    return {
        uploadError: state.ingredient.uploadedIngredient.errors
    };
};

export default connect(mapStateToProps, {addIngredient, dismissIngredientInfo})(IngredientAdd);