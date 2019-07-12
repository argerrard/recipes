import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class LoginForm extends React.Component {

    onSubmit = () => {

    }

    //Renders each individual input on the form
    //The input is marked with error status if the user has accessed it at least once
    //and the resulting form value is not correct
    renderInput = ({ input, label, meta }) => {

        const errorStatus = meta.error && meta.touched ? true : false;
        const inputType = label === 'Username' ? 'text' : 'password';

        return (
            <Form.Input {...input} required error={errorStatus}
                    autoComplete="off" fluid label={label} placeholder={label} 
                    type={inputType}
            />
        );
    }

    render() {
        return (
            <div>
            <Message
                attached
                header="Login"
                content="Please enter the required information to log in."
            />
            <Form
                className="attached fluid segment" 
                onSubmit={this.onSubmit}>
                <Field name="username" 
                    label="Username" 
                    component={this.renderInput} type="text" />
                <Field name="password" 
                    label="Password" 
                    component={this.renderInput} type="password" />

                <Form.Button primary content='Submit' />
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

const wrappedForm = reduxForm({ form: 'login', validate })(LoginForm);

const mapStateToProps = (state, ownProps) => {
    
    return {

    };

};

export default connect(mapStateToProps)(wrappedForm);