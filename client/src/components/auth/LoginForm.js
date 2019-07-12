import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/auth';

//Experimenting with using controlled components instead of Redux Form for this form
//Redux form seems unnecessary for this one
class LoginForm extends React.Component {

    state = { username: "", password: "" };

    onChange = (e, {name, value}) => {
        this.setState({[name]: value});
    }

    onSubmit = () => {
        this.props.loginUser(this.state.username, this.state.password);
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
                <Form.Input required error={false} onChange={this.onChange} name='username'
                    value={this.state.name}
                    autoComplete="off" fluid label="Username" placeholder="Username" />
                <Form.Input required error={false} onChange={this.onChange} 
                    type="password" name='password'
                    value={this.state.password}
                    autoComplete="off" fluid label="Password" placeholder="Password" />
                <Form.Button primary content='Submit' />
            </Form>
            </div>
        );
    }

}

export default connect(null, { loginUser })(LoginForm);