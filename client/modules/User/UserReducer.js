// Import Actions
import { LOGIN_USER, LOGOUT_USER, CONNECTED_USER, CONNECTED_USERS, DISCONNECTED_USER, REGISTER_USER, SET_USER_JOINED_ROOMS, ADD_USER_JOINED_ROOM, REMOVE_USER_JOINED_ROOM, SET_READ_MESSAGES } from './UserActions';
import { SET_ACTIVE_ROOM } from '../Room/RoomActions';
import { RECEIVE_MESSAGE } from '../Message/MessageActions';

import storage from '../../util/storage';

// Initial State
const initialState = {
    user: {
        token: null,
        joinedRoomsData: [],
        activeRoom: null,
        unreadMessages: []
    },
    data: []
};

const UserReducer = (state = initialState, action) => {
    let unreadMessages = [];
    if(state.user && state.user.unreadMessages) {
        unreadMessages = state.user.unreadMessages.slice();
    }

    switch (action.type) {

        case LOGIN_USER:
            if( storage ) {
                // Save token in local storage
                storage.setItem('jwtToken', action.token);
            }
            action.user.token = action.token;
            action.user.connected = 1;
            return {
                ...state,
                user: Object.assign({}, state.user, action.user)
            };

        case LOGOUT_USER:
            if( storage ) {
                storage.removeItem('jwtToken');
            }
            return {
                ...state,
                user: null
            };

        case CONNECTED_USER:
            return {
                ...state,
                data: [...state.data, action.user]
            };

        case CONNECTED_USERS:
            return {
                ...state,
                data: action.users
            }

        case DISCONNECTED_USER:
            const newData = state.data.filter(user => user.cuid != action.user.cuid);
            return {
                ...state,
                data: newData
            };

        case SET_USER_JOINED_ROOMS:
            return {
                ...state,
                user: {
                    ...state.user,
                    joinedRoomsData: action.rooms
                }
            }

        case ADD_USER_JOINED_ROOM:
            return {
                ...state,
                user: {
                    ...state.user,
                    joinedRoomsData: [
                        ...state.user.joinedRoomsData,
                        action.room
                    ]
                }
            }

        case REMOVE_USER_JOINED_ROOM:
            return {
                ...state,
                user: {
                    ...state.user,
                    joinedRoomsData : state.user.joinedRoomsData.filter(room => room.cuid !== action.room.cuid)
                }
            }

        case SET_ACTIVE_ROOM:
            return {
                ...state,
                user: {
                    ...state.user,
                    activeRoom: action.room
                }
            }

        case RECEIVE_MESSAGE:

            if((!state.user.activeRoom) || (action.message.room && action.message.room.cuid != state.user.activeRoom.cuid)) {
                unreadMessages.push(action.message);
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    unreadMessages: unreadMessages
                }
            }

        case SET_READ_MESSAGES:
            return {
                ...state,
                user: {
                    ...state.user,
                    unreadMessages: unreadMessages.filter(message => message.room.cuid != action.room.cuid)
                }
            }

        default:
            return state;
    }
};



export default UserReducer;
