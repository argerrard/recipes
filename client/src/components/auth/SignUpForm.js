import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { clearAuthErrors, registerUser } from '../../actions/auth';

//Experimenting not using redux form for this
class SignUpForm extends React.Component {

    state = { username: "", password: "", confirmPassword: "", email: "", formErrors: [] }

    //Make the form a controller component
    onChange = (e, {name, value}) => {
        this.setState({[name]: value});
    }

    componentWillUnmount = () => {
        //When component is closed, erase any errors
        this.props.clearAuthErrors();
    }

    onSubmit = () => {

        //Clear existing API errors if there are any
        if (this.props.apiErrors.length > 0) this.props.clearAuthErrors();

        const formErrors = this.validateForm();

        //Set validation errors if there are any
        if (formErrors.length > 0) {
            this.setState({ formErrors });
        } else {
            //Send the login request to the API, remove any form errors
            //Note that there could still be errors returned by the API but if we get here
            //there are no form errors
            this.props.registerUser(this.state.username, this.state.password, this.state.confirmPassword, this.state.email);

            //Erase any previous form errors
            this.setState({ formErrors: [] });
        }
    }

    //Perform basic client-side validation before sending the request to the server
    validateForm = () => {

        const errors = [];

        //Make sure that all fields are filled in
        if (!this.state.username) errors.push("Please choose a username to sign up with.");
        if (!this.state.password) errors.push("Please choose a password to sign up with.");
        if (!this.state.confirmPassword) errors.push("Please confirm your password.");
        if (!this.state.email) errors.push("Please choose an email to sign up with.");

        //Make sure that passwords are the same
        if (this.state.password !== this.state.confirmPassword) errors.push("Passwords do not match.");

        //Make sure that passwords are at least 6 characters
        if (this.state.password.length < 6) {
            errors.push("Passwords must be at least 6 characters long.");
        }

        //Make sure that passwords contain a number
        if (!/\d/.test(this.state.password)) {
            errors.push("Passwords must contain at least one number.");
        }

        //Perform very simple e-mail format validation
        var re = /\S+@\S+\.\S+/;
        if (!re.test(this.state.email)) errors.push("E-mail format is invalid.");

        return errors;
    }

    //Helper method to render any client or API errors
    renderErrors = () => {
        //Create a new array of errors made up of both form and API errors
        const errors = this.state.formErrors.concat(this.props.apiErrors);

        if (errors.length === 0) return null;

        return (
            <Message negative>
                <Message.Header>There was a problem.</Message.Header>
                {errors.map((error, index) => {
                    return <p key={index}>{error}</p>;
                })}
            </Message>
        );
    }

    render() {
        return (
            <div>
            <Message
                attached
                header="Sign Up"
                content="Please fill in the information below to sign up."
            />
            <Form
                className="attached fluid segment" 
                onSubmit={this.onSubmit}>
                <Form.Input required error={false} onChange={this.onChange} name='username'
                    value={this.state.name}
                    autoComplete="off" fluid label="Username" placeholder="Username" />
                <Form.Input required error={false} onChange={this.onChange} 
                    type="password" name='password'
                    value={this.state.password}
                    autoComplete="off" fluid label="Password" placeholder="Password" />
                <Form.Input required error={false} onChange={this.onChange} 
                    type="password" name='confirmPassword'
                    value={this.state.confirmPassword}
                    autoComplete="off" fluid label="Confirm Password" placeholder="Confirm Password" />
                <Form.Input required error={false} onChange={this.onChange} name='email'
                    value={this.state.email}
                    autoComplete="off" fluid label="Email" placeholder="Email" />
                <Form.Button primary content='Sign Up' />
                {this.renderErrors()}
            </Form>
            </div>
        );
    }
}  

const mapStateToProps = (state) => {
    return {
        apiErrors: state.auth.errors
    }
}

export default connect(mapStateToProps, { clearAuthErrors, registerUser })(SignUpForm);