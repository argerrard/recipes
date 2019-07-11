import axios from 'axios';

import {
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../types.js';

//Action Creator responsible for loading the user using the existing token
//in local storage
//TODO: Implement this action creator
export const getUser = (token) => (dispatch, getState) => {
    return;
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