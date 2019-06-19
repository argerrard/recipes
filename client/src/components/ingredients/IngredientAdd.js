import React from 'react';
import { connect } from 'react-redux';

import IngredientForm from './IngredientForm';
import { addIngredient } from '../../actions/ingredients';

class IngredientAdd extends React.Component {

    onSubmit = (formValues) => {
        this.props.addIngredient(formValues);
    }

    render() {
        return (
            <div>
                <IngredientForm onSubmit={this.onSubmit} />
            </div>
        );
    }

}

export default connect(null, {addIngredient})(IngredientAdd);