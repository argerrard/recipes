import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    isLoggedIn: false,
    userId: null,
    username: "",
    token: null,
    errors: []
};

const authReducer = (state=INITIAL_STATE, action) => {

    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                userId: action.payload.userId,
                username: action.payload.username,
                token: action.payload.token
            };

        default:
            return state;

    }
}

export default authReducer;