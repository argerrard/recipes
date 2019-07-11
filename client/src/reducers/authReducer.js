import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    isLoggedIn: false,
    id: null,
    username: "",
    token: null,
    errors: []
};

const authReducer = (state=INITIAL_STATE, action) => {

    switch(action.type) {
        //This action means that the user has been successfully authenticated
        //This can occur either by having a valid token in local storage
        //or by logging in with the correct credentials
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                userId: action.payload.id,
                username: action.payload.username,
                token: action.payload.token,
                errors: []
            };

        //This actions means that the user login action failed
        //This can occur if a token expires and is attempted to be used
        //or if a user logs in with incorrect credentials
        case LOGIN_FAILURE:
            return {
                isLoggedIn: false,
                userId: null,
                username: "",
                token: null,
                errors: action.payload
            }
            
        default:
            return state;

    }
}

export default authReducer;