import React from 'react';
import { Item, Grid, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';

import { fetchIngredients } from '../../actions/ingredients';
import DefaultModal from '../DefaultModal';

class IngredientList extends React.Component {

    state = {  }

    componentDidMount() {
        this.props.fetchIngredients('test');
    }

    renderList = () => {
        return this.props.ingredientList.map(ingredient => {
            return this.renderItem(ingredient);
        });
    }

    deleteIngredient = (deleteId) => {
        
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
                                        <Icon color='blue' name="edit" />
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                        <DefaultModal 
                                            modalTrigger={
                                                <Icon color='red' name="delete"
                                                onClick={() => this.deleteIngredient(ingredient.id)} 
                                                style={{ cursor: 'pointer' }} />
                                            }
                                            icon={'trash alternate'}
                                            headerMessage={'Ingredient Delete'}
                                            contentMessage={
                                                'Are you sure you want to delete this ingredient?'
                                            }
                                            size={'tiny'} button1Message={"No"} button2Message={"Delete"}
                                            button1Icon='remove' button2Icon='trash'
                                            button1Color='blue' button2Color='red'
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

const mapStateToProps = (state) => {
    return {
        ingredientList: Object.values(state.ingredient.ingredientList)
    };
}

export default connect(mapStateToProps, {fetchIngredients})(IngredientList);