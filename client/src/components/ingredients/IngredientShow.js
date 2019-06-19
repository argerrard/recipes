import React from 'react';
import { Item, Grid, Icon, Container } from 'semantic-ui-react';

class IngredientShow extends React.Component {

    renderItem() {
        return (
                <Item>
                    <Item.Content>
                        <Item.Header>Orange</Item.Header>
                        <Item.Meta>Serving: 1 orange</Item.Meta>
                        <Item.Description>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        Calories: 100
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        Fat: 100g
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        Protein: 100g
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                        Carbs: 100g
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
                {this.renderItem()}
                {this.renderItem()}
                </Item.Group>
        );
    }

}

export default IngredientShow;