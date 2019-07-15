import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginUser, clearAuthErrors } from '../../actions/auth';

//Experimenting with using controlled components instead of Redux Form for this form
//Redux form seems unnecessary for this one
class LoginForm extends React.Component {

    state = { username: "", password: "" , formErrors: []};

    componentWillUnmount = () => {
        //When component is closed, erase any errors
        this.props.clearAuthErrors();
    }

    //Make the form a controller component
    onChange = (e, {name, value}) => {
        this.setState({[name]: value});
    }

    onSubmit = () => {
        //Clear existing API errors if there are any
        if (this.props.apiErrors.length > 0) this.props.clearAuthErrors();

        //Ensure that both username and password are filled in
        if (this.state.username === "" || this.state.password === "") {
            this.setState({ formErrors: ["Please enter both a username and password."] });
        } else {
            //Send the login request to the API, remove any form errors
            //Note that there could still be errors returned by the API but if we get here
            //there are no form errors
            this.props.loginUser(this.state.username, this.state.password);
            this.setState({ formErrors: [] });
        }
    }

    //Helper method to render both API and form validation errors
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
                header="Login"
                content="Please enter the required information to log in."
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
                <Form.Button primary content='Log In' />
                {this.renderErrors()}
            </Form>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        apiErrors: state.auth.errors
    }; 
}

export default connect(mapStateToProps, { loginUser, clearAuthErrors })(LoginForm);