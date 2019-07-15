import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_AUTH_ERRORS
} from '../actions/types';

const INITIAL_STATE = {
    isLoggedIn: false,
    id: null,
    user: {},
    token: null,
    errors: []
};

const authReducer = (state=INITIAL_STATE, action) => {

    switch(action.type) {
        //This action means that the user has been successfully authenticated
        //This can occur either by having a valid token in local storage
        //or by logging in with the correct credentials, or registering
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
                errors: []
            };

        //This actions means that the user login action failed
        //This can occur if a token expires and is attempted to be used
        //or if a user logs in with incorrect credentials
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return {
                isLoggedIn: false,
                user: {},
                token: null,
                errors: action.payload
            };
        
        //This action is created when a user chooses to log out
        case LOGOUT:
            return {
                isLoggedIn: false,
                user: {},
                token: null,
                errors: []
            };

        //This action is created to clear login errors (ie: if user closes the login screen)
        case CLEAR_AUTH_ERRORS:
            return {
                ...state,
                errors: []
            };

        default:
            return state;

    }
}

export default authReducer;