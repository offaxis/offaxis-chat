// Import Actions
import { INIT_SOCKET, SEND_SOCKET, RECEIVE_SOCKET } from './AppActions';
import { ADD_MESSAGE } from '../Message/MessageActions';

// Initial State
const initialState = {
    socket: null
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case INIT_SOCKET:
            return {
                ...state,
                socket: action.socket
            }

        case SEND_SOCKET:
            state.socket.emit(action.data.type, action.data.data);

        case RECEIVE_SOCKET:

        default:
            return state;
    }
};

/* Selectors */

// Export Reducer
export default AppReducer;
