import { browserHistory } from 'react-router';
import callApi from '../../util/apiCaller';

import { displayErrors } from '../Error/ErrorActions';

import { addUserJoinedRoom, removeUserJoinedRoom } from '../User/UserActions';
import { sendSocket } from '../App/AppActions';

// Export Constants
export const ADD_ROOMS  = 'ADD_ROOMS';
export const ADD_ROOM   = 'ADD_ROOM';
export const UPDATE_ROOM   = 'UPDATE_ROOM';
export const JOIN_ROOM   = 'JOIN_ROOM';
export const UNJOIN_ROOM = 'UNJOIN_ROOM';
export const SET_ACTIVE_ROOM = 'SET_ACTIVE_ROOM';

// Export Actions

// API CALLS
export function fetchRooms() {
    return (dispatch) => {
        return callApi('rooms').then(res => {
            dispatch(addRooms(res.rooms));
        });
    };
}

export function fetchRoom(cuid) {
    return (dispatch) => {
        return callApi(`rooms/${cuid}`).then(res => {
            dispatch(addRoom(res.room));
        });
    };
}

export function fetchParticipants(room) {
    return (dispatch) => {
        return callApi(`rooms/${room.cuid}/getparticipants`).then(res => {
            if(res.users) {
                room.participantsData = res.users;
                dispatch(updateRoom(room, 'participantsData'));
            }
        })
    };
}

export function fetchMessages(room) {
    return (dispatch) => {
        return callApi(`rooms/${room.cuid}/getmessages`).then(res => {
            if(res.messages) {
                room.messagesData = res.messages;
                dispatch(updateRoom(room, 'messagesData'));
            }
        })
    };
}


export function addRoomRequest(title) {
    return (dispatch) => {
        return callApi('rooms/add', 'post', {room: {title: title}}).then(res => {
            if(res.room) {
                dispatch(addRoom(res.room));
                dispatch(sendSocket({type: 'addRoom', data: res.room}));
                dispatch(joinRoomRequest(res.room));
                displayErrors('success', 'Discussion créée !');
            } else {
                displayErrors('error', 'Impossible d\'ajouter une discussion ! Veuillez recommencer...');
            }
        });
    };
}

export function joinRoomRequest(room) {
    return (dispatch) => {
        return callApi('rooms/join', 'post', {room: room.cuid}).then(res => {
            if(res.room) {
                dispatch(joinRoom(res.room));
                dispatch(updateRoom(res.room, 'participants'));
                dispatch(addUserJoinedRoom(res.room));
                dispatch(sendSocket({type: 'joinRoom', data: res.room}));
                browserHistory.push('/rooms/'+res.room.cuid);
            }
            // dispatch(displayErrors(res));
        })
    };
}

export function unJoinRoomRequest(room) {
    return (dispatch) => {
        return callApi('rooms/unjoin', 'post', {room: room.cuid}).then(res => {
            if(res.room) {
                dispatch(unJoinRoom(res.room));
                dispatch(updateRoom(res.room, 'participants'))
                dispatch(removeUserJoinedRoom(res.room));
                dispatch(sendSocket({type: 'unJoinRoom', data: res.room}));
                displayErrors('warning', `Bye Bye ${res.room.title} !`);
                browserHistory.push('/');
            } else {
                displayErrors('error', 'Impossible de quitter la discussion ! Veuillez recommencer...');
            }
        })
    };
}



// REDUCERS ACTIONS
export function addRooms(rooms) {
    return {
        type: ADD_ROOMS,
        rooms: rooms,
    };
}

export function addRoom(room) {
    return {
        type: ADD_ROOM,
        room: room
    };
}

export function updateRoom(room, key) {
    return {
        type: UPDATE_ROOM,
        room: room,
        key: key
    }
}

export function joinRoom(room) {
    return {
        type: JOIN_ROOM,
        room: room
    };
}

export function unJoinRoom(room) {
    return {
        type: UNJOIN_ROOM,
        room: room
    };
}

export function setActiveRoom(room) {
    return {
        type: SET_ACTIVE_ROOM,
        room: room
    }
}
