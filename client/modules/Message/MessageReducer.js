// Import Actions
import { ADD_MESSAGE, SENDING_MESSAGE } from './MessageActions';

// Initial State
const initialState = {
    isSending: false
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
 
        case SENDING_MESSAGE:
            return {
                ...state,
                isSending: true
            }

        case ADD_MESSAGE:
            return {
                ...state,
                isSending: false
            }

        default:
            return state;
    }
};

export default MessageReducer;
