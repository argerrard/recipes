import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

class IngredientForm extends React.Component {

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    renderErrors = () => {
        var ingredientName, servingSize = null;
        if (this.props.fieldInfo) {
            ingredientName = this.props.fieldInfo.ingredientName;
            servingSize = this.props.fieldInfo.servingSize;
        }

        if (ingredientName && ingredientName.touched) {
            return <div>{this.props.formErrors.ingredientName}</div>;
        }

        if (servingSize && servingSize.touched) {
            return <div>{this.props.formErrors.servingSize}</div>;
        }
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
                <Form.Button content='Submit' />
                {this.renderErrors()}
            </Form>
        );
    }

}

const validate = values => {
    const errors = {};
    const requiredFields = ['ingredientName', 'servingSize', 'measurementType', 'calories', 'carbs', 'protein', 'fat'];

    requiredFields.forEach(field => {
        if (!values[field]) errors[field] = 'Please fill out this field.';
    });

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