import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class IngredientForm extends React.Component {

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    //Helper function to render validation errors at the bottom of the form
    renderValidationErrors = () => {
        if (!this.props.fieldInfo) {
            return null;
        }

        const formFields = ['name', 'servingsize', 'measurementtype', 'calories', 
                            'carbs', 'protein', 'fat'];
        const errors = [];

        //Loop through each form field, if it has been touched and has a corresponding error,
        //add it to the errors array to be shown

        formFields.forEach(field => {
            if (this.props.fieldInfo[field] && this.props.fieldInfo[field].touched &&
                this.props.formErrors && this.props.formErrors[field]) {
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

    //Renders each individual input on the form
    //The input is marked with error status if the user has accessed it at least once
    //and the resulting form value is not correct
    renderInput = ({ input, label, meta }) => {

        const errorStatus = meta.error && meta.touched ? true : false;

        return (
            <Form.Input {...input} required error={errorStatus}
                    autoComplete="off" fluid label={label} placeholder={label} />
        );
    }

    //render any errors returned from API calls
    renderApiErrors() {
        if (!this.props.apiErrors) return null;

        return (
            <Message negative 
                header={this.props.errorHeader} 
                content={this.props.apiErrors}
            />
        );
    }

    render() {
        return (
            <div>
            <Message
                attached
                header={this.props.headerTitle}
                content={this.props.headerContent}
            />
            <Form
                className="attached fluid segment" 
                onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" 
                    label="Ingredient Name" 
                    component={this.renderInput} type="text" />
                
                <Form.Group widths='equal'>
                    <Field name="servingsize" component={this.renderInput}
                            label="Serving Size" />
                    <Field name="measurementtype" component={this.renderInput}
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
                {this.renderValidationErrors()}
                {this.renderApiErrors()}
            </Form>
            </div>
        );
    }

}

const validate = values => {
    const errors = {};

    //Ingredient name validation
    if (!values.name) errors.name = "Please choose an ingredient name.";

    //Serving Size validation
    if (!values.servingsize){
        errors.servingsize = "Please choose a serving size.";
    } else if (isNaN(values.servingsize)) errors.servingsize = "Serving size must be numeric.";

    //Measurement validation
    if (!values.measurementtype) {
        errors.measurementtype = "Please specify a form of measurement.";
    } else if (!isNaN(values.measurementtype)) {
        errors.measurementtype = "Measurement types should be words (ie: cups, spoonful, etc.)";
    }

    //Validation for nutrient types
    const nutrients = ['calories', 'carbs', 'protein', 'fat']

    nutrients.forEach(nutrient => {
        if (!values[nutrient]) {
            errors[nutrient] = `Please specify the amount of ${nutrient} in the ingredient.`;
        } else if (isNaN(values[nutrient])){
            errors[nutrient] = `The amount entered in ${nutrient} should be a number.`;
        };
    });

    return errors;
}

const wrappedForm = reduxForm({ form: 'ingredient', validate })(IngredientForm);

const mapStateToProps = (state, ownProps) => {
    var syncErrors = {};
    var errorFields = {};
    if (state.form.ingredient) {
        syncErrors = state.form.ingredient.syncErrors;
        errorFields = state.form.ingredient.fields;
    }


    return { formErrors: syncErrors, 
            fieldInfo: errorFields,
            initialValues: ownProps.editIngredient
        };

};

export default connect(mapStateToProps)(wrappedForm);