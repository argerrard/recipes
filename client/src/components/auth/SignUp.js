import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';

class SignUp extends React.Component {

    renderSignUp() {
        return <SignUpForm />;
    }

    render() {
        if (this.props.isLoggedIn) {
            return <div>You have already signed up. Please log out to make a new account.</div>;
        } else {
            return (
                <div>
                    {this.renderSignUp()}
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

export default connect(mapStateToProps)(SignUp);