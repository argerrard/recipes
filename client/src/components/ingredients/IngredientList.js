import React from 'react';
import { Item, Grid, Icon, Container } from 'semantic-ui-react';
import {connect} from 'react-redux';

import { fetchIngredients } from '../../actions/ingredients';

class IngredientList extends React.Component {

    componentDidMount() {
        this.props.fetchIngredients('test');
    }

    renderList = () => {
        return this.props.ingredientList.map(ingredient => {
            return this.renderItem(ingredient);
        });
    }

    renderItem = (ingredient) => {
        console.log(ingredient);
        return (
                <Item key={ingredient.id}>
                    <Item.Content>
                        <Item.Header>{ingredient.name}</Item.Header>
                        <Item.Meta>
                            Serving: {ingredient.servingsize} {ingredient.measurementtype}
                        </Item.Meta>
                        <Item.Description>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        Calories: {Math.round(ingredient.calories)}
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        Fat: {Math.round(ingredient.fat*10)/10} g
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        Protein: {Math.round(ingredient.protein*10)/10} g
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        Carbs: {Math.round(ingredient.carbs * 10)/10} g
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <Icon color='blue' name="edit" />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <Icon color='red' name="delete" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Item.Description>
                    </Item.Content>
                </Item>
        );
    } 

    render() {
        return (
                <Item.Group divided>
                    {this.renderList()}
                </Item.Group>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ingredientList: state.ingredient.ingredientList
    };
}

export default connect(mapStateToProps, {fetchIngredients})(IngredientList);