import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../types.js';

//Action Creator responsible for loading the user using the existing token
//in local storage
export const getUser = (token) => (dispatch, getState) => {
    //Check with the auth api if the token is valid
    axios.get('/api/auth/user', { 
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": token
        }
    }).then(response => {
        //Token was valid, log the user in
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.user
        });
    }).catch(error => {
        //Token was invalid
        //Delete invalid token from local storage
        localStorage.removeItem('access-token');
        
        //Add the error message returned by the API (or default message)
        const errors = [];
        if (error.response.data) {
            error.response.data.errors.forEach(error => {
                errors.push(error);
            });
        } else {
            errors.push('There was a problem contacting the server.');
        }

        //Dispatch failed login action
        dispatch({
            type: LOGIN_FAIL,
            payload: errors
        })

    });

}

//Action Creator responsible for logging in the user
//LOGIN_SUCCESS is dispatched on success and LOGIN_FAIL is dispatched on fail
//TODO: Implement this action creator
export const loginUser = () => {
    return;
}

//Action Creator responsible for registering a new user
//REGISTER_SUCCESS is dispatched on success and REGISTER_FAIL is dispatched on fail
export const registerUser = () => {
    return;
}