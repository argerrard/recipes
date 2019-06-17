import React from 'react';

import IngredientForm from './IngredientForm';

class IngredientAdd extends React.Component {

    onSubmit = (formValues) => {
        console.log(formValues);
    }

    render() {
        return (
            <div>
                <IngredientForm onSubmit={this.onSubmit} />
            </div>
        );
    }

}

export default IngredientAdd;