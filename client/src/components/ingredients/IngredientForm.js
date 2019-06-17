import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

class IngredientForm extends React.Component {

    renderInput = ({ input, label, meta }) => {
        return (
            <Form.Input {...input} autoComplete="off" fluid label={label} placeholder={label} />
        );
    }

    render() {
        return (
            <Form>
                <Field name="ingredientName" 
                    label="Ingredient Name" 
                    component={this.renderInput} type="text" />
                <Form.Group widths='equal'>
                    <Field name="servingSize" component={this.renderInput}
                            label="Serving Size" />
                    <Field name="measurementType" component={this.renderInput}
                            label="Measurement Type" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Field name="calories" component={this.renderInput}
                            label="Calories" />
                    <Field name="carbs" component={this.renderInput}
                            label="Carbohydrates" />
                    <Field name="protein" component={this.renderInput}
                            label="Protein" />
                    <Field name="fat" component={this.renderInput}
                            label="Fat" />
                </Form.Group>
                <Form.Button content='Submit' />
            </Form>
        );
    }

}

export default reduxForm({ form: 'ingredient' })(IngredientForm);