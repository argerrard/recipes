import React from 'react';
import { Button, Message, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import IngredientList from './IngredientList';
import { dismissIngredientInfo } from '../../actions/ingredients';

//Component representing the main page when a user is looking at ingredients
//TO DO: add search functionality to the ingredient home
class IngredientHome extends React.Component {

    //Once the user leaves the ingredient home page, any outstanding message boxes are dismissed
    componentWillUnmount() {
        this.props.dismissIngredientInfo();
    }

    //Helper function to render the success message displayed on the home page from added/edited 
    //ingredients
    renderSuccess() {
        var successMessage= '';

        if (this.props.uploadSuccess) {
            if (this.props.uploadType === 'add') {
                successMessage = `${this.props.uploadedIngredient.name} was successfully added to our list of ingredients.`;
            } else if (this.props.uploadType === 'edit') {
                successMessage = `${this.props.uploadedIngredient.name} was successfully updated.`;
            }

            return (
                <Grid>
                    <Grid.Column width={4} />
                    <Grid.Column width={8}>
                        <Message positive onDismiss={this.props.dismissIngredientInfo}>
                            <Message.Header>Success!</Message.Header>
                            <p>{successMessage}</p>
                        </Message>
                    </Grid.Column>
                    <Grid.Column width={4} />
                </Grid>
            );
        }

        return null;
    }

    render() {
        return (
            <Container>
                {this.renderSuccess()}
                <Button className='right floated' 
                        as={Link} to="/ingredients/add"
                        primary
                        >Create New Ingredient</Button>
                <IngredientList />
            </Container>
        );
    }

}

// uploadSuccess: boolean to determine if the success notification should be displayed at the top
// uploadedIngredient: if a success message should be displayed, this is the ingredient it relates to
// uploadType: the type of message to be displayed (edit message, add message, etc.)
const mapStateToProps = (state) => {
    return {
        uploadSuccess: state.ingredient.uploadedIngredient.success,
        uploadedIngredient: state.ingredient.uploadedIngredient.ingredient,
        uploadType: state.ingredient.uploadedIngredient.type
    };
};

export default connect(mapStateToProps, 
    {dismissIngredientInfo})(IngredientHome);