import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class IngredientForm extends React.Component {

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    renderErrors = () => {
        if (!this.props.fieldInfo) {
            return null;
        }

        const formFields = ['ingredientName', 'servingSize', 'measurementType', 'calories', 
                            'carbs', 'protein', 'fat'];
        const errors = [];

        //Loop through each form field, if it has been touched and has a corresponding error,
        //add it to the errors array to be shown
        formFields.forEach(field => {
            if (this.props.fieldInfo[field] && this.props.fieldInfo[field].touched
                && this.props.formErrors[field]) {
                errors.push(this.props.formErrors[field]);
            }
        });

        if (errors.length === 0) return null;

        //Render all errors in a message
        return (
            <Message negative>
                <Message.Header>Careful!</Message.Header>
                {errors.map((error, index) => {
                    return <p key={index}>{error}</p>;
                })}
            </Message>
        );
    }

    renderInput = ({ input, label, meta }) => {

        const errorStatus = meta.error && meta.touched ? true : false;

        return (
            <Form.Input {...input} required error={errorStatus}
                    autoComplete="off" fluid label={label} placeholder={label} />
        );
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
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
                            label="Calories (kcal)" />
                    <Field name="carbs" component={this.renderInput}
                            label="Carbohydrates (g)" />
                    <Field name="protein" component={this.renderInput}
                            label="Protein (g)" />
                    <Field name="fat" component={this.renderInput}
                            label="Fat (g)" />
                </Form.Group>
                <Form.Button primary content='Submit' />
                {this.renderErrors()}
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};

    if (!values.ingredientName) errors.ingredientName = "Please choose an ingredient name.";

    return errors;
}

const wrappedForm = reduxForm({ form: 'ingredient', validate })(IngredientForm);

const mapStateToProps = (state) => {
    var syncErrors = {};
    var errorFields = {};
    if (state.form.ingredient) {
        syncErrors = state.form.ingredient.syncErrors;
        errorFields = state.form.ingredient.fields;
    }
    return { formErrors: syncErrors, fieldInfo: errorFields };

};

export default connect(mapStateToProps)(wrappedForm);