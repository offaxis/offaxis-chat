import callApi from '../../util/apiCaller';

import { sendSocket } from '../App/AppActions';

// Export Constants
export const SENDING_MESSAGE = 'SENDING_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';


// API Calls
export function addMessageRequest(user, room, content) {
    return (dispatch) => {
        return callApi(`rooms/${room.cuid}/addmessage`, 'post', {user: user, content: content}).then(res => {
            if(res.message) {
                dispatch(addMessage(res.message));
                dispatch(sendSocket({type: 'addMessage', data: res.message}));
            }
        })
    }
}


// Export Actions
export function sendMessage() {
    return {
        type: SENDING_MESSAGE
    }
}

export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        message: message
    }
}

export function receiveMessage(message) {
    return {
        type: RECEIVE_MESSAGE,
        message: message
    }
}
