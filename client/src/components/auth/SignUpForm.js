import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { clearAuthErrors } from '../../actions/auth';

//Experimenting not using redux form for this
class SignUpForm extends React.Component {

    state = { username: "", password: "", confirmPassword: "", email: "", formErrors: [] }

    componentWillUnmount = () => {
        //When component is closed, erase any errors
        this.props.clearAuthErrors();
    }

    onSubmit = () => {

    }

    //Perform basic client-side validation before sending the request to the server
    validateForm = () => {
        //Make sure that all fields are filled in

        //Make sure that passwords are the same

        //Make sure that passwords are at least 6 characters

        //Make sure that passwords contain a number

        //Make sure that e-mail is a valid format
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
                <Form.Input error={false} required onChange={this.onChange} name='username'
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
                <Form.Input error={false} required onChange={this.onChange} name='email'
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

export default connect(mapStateToProps, {clearAuthErrors})(SignUpForm);