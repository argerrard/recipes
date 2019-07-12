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
            payload: {
                user: response.data.user,
                token
            }
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
export const loginUser = (username, password) => (dispatch, getState) => {
    //Send the entered username and password to the server to verify
    axios.post('/api/auth', { username, password })
    .then(response => {
        //Login Succeeded, store the token in local storage for persistent login
        localStorage.setItem('access-token', response.data.token);
        
        //Dispatch the login success action
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                user: response.data.user,
                token: response.data.token
            }
        });
    })
    .catch(error => {
        //Login Failed
        const errors = [];

        //Handle case where server did not response
        if (!error.response.data) {
            errors.push('Could not contact the server.');
        } 
        //Handle case were server responded with errors
        else {
            error.response.data.errors.forEach(error => {
                errors.push(error);
            });
        }

        //Dispatch action to notify failed login
        dispatch({
            type: LOGIN_FAIL,
            payload: errors
        });

    });
}

//Action Creator responsible for registering a new user
//REGISTER_SUCCESS is dispatched on success and REGISTER_FAIL is dispatched on fail
export const registerUser = () => {
    return;
}