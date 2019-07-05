import React from 'react';
import { Item, Grid, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchIngredients, deleteIngredient } from '../../actions/ingredients';
import DefaultModal from '../DefaultModal';

class IngredientList extends React.Component {

    //Fetch the ingredients to be listed once mounted
    //TODO: allow a query to be passed in to specify different types of fetches
    componentDidMount() {
        this.props.fetchIngredients('test');
    }

    renderList = () => {
        return this.props.ingredientList.map(ingredient => {
            return this.renderItem(ingredient);
        });
    }

    //Action creator is called if the user clicks the red X button to delete
    deleteIngredient = (deleteId) => {
        this.props.deleteIngredient(deleteId);
    }

    renderItem = (ingredient) => {
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
                                        <Link to={`/ingredients/edit/${ingredient.id}`}>
                                            <Icon color='blue' name="edit" />
                                        </Link>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <DefaultModal 
                                            modalTrigger={
                                                <Icon color='red' name="delete"
                                                style={{ cursor: 'pointer' }} />
                                            }
                                            icon={'trash alternate'}
                                            headerMessage={`Ingredient Delete - ${ingredient.name}`}
                                            contentMessage={
                                                'Are you sure you want to delete this ingredient?'
                                            }
                                            size={'tiny'} button1Message={"No"} button2Message={"Delete"}
                                            button1Icon='remove' button2Icon='trash'
                                            button1Color='blue' button2Color='red'
                                            button2OnClick={() => this.deleteIngredient(ingredient.id)}
                                        />
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

// ingredientList: the list of ingredients to be displayed
const mapStateToProps = (state) => {
    return {
        ingredientList: Object.values(state.ingredient.ingredientList)
    };
}

export default connect(mapStateToProps, {fetchIngredients, deleteIngredient})(IngredientList);