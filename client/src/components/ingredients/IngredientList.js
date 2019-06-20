import React from 'react';
import { Button, Message, Grid, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import IngredientShow from './IngredientShow';
import { dismissIngredientInfo, fetchIngredients } from '../../actions/ingredients';


class IngredientList extends React.Component {

    componentDidMount() {
        this.props.fetchIngredients('test');
    }

    componentWillUnmount() {
        this.props.dismissIngredientInfo();
    }

    renderSuccess() {

        if (this.props.uploadSuccess) {
            return (
                <Grid>
                    <Grid.Column width={4} />
                    <Grid.Column width={8}>
                        <Message positive onDismiss={this.props.dismissIngredientInfo}>
                            <Message.Header>Success!</Message.Header>
                            <p>{this.props.uploadedIngredient.name} was successfully added to our list of ingredients.</p>
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
                <IngredientShow />
            </Container>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        uploadSuccess: state.ingredient.uploadedIngredient.success,
        uploadedIngredient: state.ingredient.uploadedIngredient.ingredient
    };
};

export default connect(mapStateToProps, 
    {dismissIngredientInfo, fetchIngredients})(IngredientList);