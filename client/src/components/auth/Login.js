import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';


class Login extends React.Component {

    renderLogin() {
        return <LoginForm />;
    }

    render() {
        if (this.props.isLoggedIn) {
            return <div>You are currently logged in already.</div>;
        } else {
            return (
                <div>
                    {this.renderLogin()}
                </div>
            );
        }
    }

}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
};

export default connect(mapStateToProps)(Login);