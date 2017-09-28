// Import Actions
import { SET_USER_IS_WRITTING } from '../User/UserActions';
import { JOIN_ROOM, ADD_ROOM, UPDATE_ROOM, ADD_ROOMS } from './RoomActions';
import { ADD_MESSAGE, RECEIVE_MESSAGE } from '../Message/MessageActions';

// Initial State
const initialState = { data: [] };

const RoomReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_ROOM:
            return {
                data: [initRoom(action.room), ...state.data],
            };

        case ADD_ROOMS:
            let rooms = action.rooms.map(room => {
                return initRoom(room);
            })
            return {
                data: rooms,
            };

        case UPDATE_ROOM:
            return {
                ...state,
                data: state.data.map(room => room.cuid === action.room.cuid ?
                    // transform the one with a matching id
                    { ...room, [action.key]: action.room[action.key] } :
                    // otherwise return original todo
                    room
                )
            };

        case ADD_MESSAGE:
        case RECEIVE_MESSAGE:
            return {
                ...state,
                data: state.data.map(room => {
                        if(room && room.cuid === action.message.room.cuid) {
                            if(!room.messagesData) {
                                room.messagesData = [];
                            }
                            return { ...room, messagesData: [...room.messagesData, action.message] };
                        }
                        return room;
                    }
                )
            };

        case SET_USER_IS_WRITTING:
            return {
                ...state,
                data: state.data.map(room => {
                    if(room && room.cuid === action.user.activeRoom.cuid) {
                        return {
                            ...room,
                            participantsData: room.participantsData.map(user => {
                                if(user && user.cuid == action.user.cuid) {
                                    return {
                                        ...user,
                                        isWritting: action.isWritting
                                    }
                                }
                                return user;
                            })
                        }
                    }
                    return room;
                })
            }

        default:
            return state;
    }
};


// Redux Good Practice
function initRoom(room) {
    // if(!room.messagesData) {
    //     room.messagesData = [];
    // }
    // if(!room.participantsData) {
    //     room.participantsData = [];
    // }
    return room;
}


// Get all rooms
export const getRooms = state => {
    return state.rooms.data;
};

// Get room by cuid
export const getRoom = (state, cuid) => state.rooms ? state.rooms.data.filter(room => room.cuid === cuid)[0] : null;


// Export Reducer
export default RoomReducer;
