/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import users from './modules/User/UserReducer';
import rooms from './modules/Room/RoomReducer';
import messages from './modules/Message/MessageReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  users,
  rooms,
  messages,
  intl,
});
