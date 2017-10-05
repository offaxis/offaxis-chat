import callApi from '../../util/apiCaller';

import { browserHistory } from 'react-router';

import { sendSocket } from '../App/AppActions';
import { displayErrors } from '../Error/ErrorActions';

// Export Constants
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_JOINED_ROOMS = 'SET_USER_JOINED_ROOMS';
export const ADD_USER_JOINED_ROOM = 'ADD_USER_JOINED_ROOM';
export const REMOVE_USER_JOINED_ROOM = 'REMOVE_USER_JOINED_ROOM';
export const SET_READ_MESSAGES = 'SET_READ_MESSAGES';
export const CONNECTED_USER = 'CONNECTED_USER';
export const CONNECTED_USERS = 'CONNECTED_USERS';
export const DISCONNECTED_USER = 'DISCONNECTED_USER';
export const SET_USER_IS_WRITTING = 'SET_USER_IS_WRITTING';


// Export Actions
export function registerRequest(email, password, name) {
    return (dispatch) => {
        return callApi('user/register', 'post', {email: email, password: password, name: name}).then(res => {
            console.log(res);
            if(res.user) {
                // dispatch(registerUser(res.user, res.token));
                dispatch(loginUser(res.user, res.token));
                dispatch(isLoggedIn());
            }
        });
    };
}

export function loginRequest(email, password) {
    return (dispatch) => {
        return callApi('user/login', 'post', {email: email, password: password}).then(res => {
            if(res.user) {
                browserHistory.push('/');
                dispatch(loginUser(res.user, res.token));
                dispatch(isLoggedIn());
                displayErrors('success', `Bienvenue ${res.user.name}!`);
            } else {
                displayErrors('error', 'Veuillez vérifier vos identifiants de connexion !');
            }
        });
    }
}

export function isLoggedIn() {
    console.log('isLoggedIn');
    return (dispatch) => {
        return callApi('user/getloggeduser').then(res => {
            if(res.user) {
                dispatch(loginUser(res.user, res.token));
                dispatch(getUserJoinedRoomsRequest(res.user));
                dispatch(sendSocket({type: 'userConnection', data: res.user}));
            } else {
                dispatch(logoutUser());
            }
        });
    };
}

export function getUserJoinedRoomsRequest(user) {
    return (dispatch) => {
        return callApi(`user/getjoinedrooms`).then(res => {
            if(res.rooms) {
                dispatch(setUserJoinedRooms(res.rooms));
                for(var i in res.rooms) {
                    dispatch(sendSocket({type: 'joinRoom', data: res.rooms[i]}));
                }
            }
        });
    }
}


export function registerUser(user) {
    return {
        type: REGISTER_USER,
        user: user
    };
}


export function loginUser(user, token) {
    token = token.replace('JWT ', '');
    return {
        type: LOGIN_USER,
        user: user,
        token: token
    };
}

export function logoutUser() {
    browserHistory.push('/');
    return {
        type: LOGOUT_USER
    };
}

export function userConnected(user) {
    return {
        type: CONNECTED_USER,
        user: user
    }
}

export function usersConnected(users) {
    return {
        type: CONNECTED_USERS,
        users: users
    }
}

export function userDisconnected(user) {
    return {
        type: DISCONNECTED_USER,
        user: user
    }
}

export function setUserJoinedRooms(rooms) {
    return {
        type: SET_USER_JOINED_ROOMS,
        rooms: rooms
    }
}

export function addUserJoinedRoom(room) {
    return {
        type: ADD_USER_JOINED_ROOM,
        room: room
    }
}

export function removeUserJoinedRoom(room) {
    return {
        type: REMOVE_USER_JOINED_ROOM,
        room: room
    }
}

export function setReadMessages(room) {
    return {
        type: SET_READ_MESSAGES,
        room: room
    }
}

export function setUserIsWritting(user, isWritting) {
    return {
        type: SET_USER_IS_WRITTING,
        user: user,
        isWritting: isWritting
    }
}
