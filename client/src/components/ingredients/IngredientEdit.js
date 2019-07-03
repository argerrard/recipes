import React from 'react';

import {fetchIngredient} from '../../actions/ingredients';
import {connect} from 'react-redux';

class IngredientEdit extends React.Component {

    //On component mount, fetch the ingredient to be displayed
    componentDidMount() {
        this.props.fetchIngredient(this.props.match.params.id);
    }

    render() {
        if (!this.props.ingredient) return null;

        return <div>IngredientEdit</div>;
    }

}

const mapStateToProps = (state, ownProps) => {
    const ingredientId = ownProps.match.params.id

    return {
        ingredient: state.ingredient.ingredientList[ingredientId]
    }
}

export default connect(mapStateToProps, {fetchIngredient})(IngredientEdit);