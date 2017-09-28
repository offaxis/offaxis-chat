/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("reactstrap");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-redux");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-intl");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("prop-types");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SET_ACTIVE_ROOM = exports.UNJOIN_ROOM = exports.JOIN_ROOM = exports.UPDATE_ROOM = exports.ADD_ROOM = exports.ADD_ROOMS = undefined;
	exports.fetchRooms = fetchRooms;
	exports.fetchRoom = fetchRoom;
	exports.fetchParticipants = fetchParticipants;
	exports.fetchMessages = fetchMessages;
	exports.addRoomRequest = addRoomRequest;
	exports.joinRoomRequest = joinRoomRequest;
	exports.unJoinRoomRequest = unJoinRoomRequest;
	exports.addRooms = addRooms;
	exports.addRoom = addRoom;
	exports.updateRoom = updateRoom;
	exports.joinRoom = joinRoom;
	exports.unJoinRoom = unJoinRoom;
	exports.setActiveRoom = setActiveRoom;
	
	var _reactRouter = __webpack_require__(4);
	
	var _apiCaller = __webpack_require__(17);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _ErrorActions = __webpack_require__(67);
	
	var _UserActions = __webpack_require__(7);
	
	var _AppActions = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var ADD_ROOMS = exports.ADD_ROOMS = 'ADD_ROOMS';
	var ADD_ROOM = exports.ADD_ROOM = 'ADD_ROOM';
	var UPDATE_ROOM = exports.UPDATE_ROOM = 'UPDATE_ROOM';
	var JOIN_ROOM = exports.JOIN_ROOM = 'JOIN_ROOM';
	var UNJOIN_ROOM = exports.UNJOIN_ROOM = 'UNJOIN_ROOM';
	var SET_ACTIVE_ROOM = exports.SET_ACTIVE_ROOM = 'SET_ACTIVE_ROOM';
	
	// Export Actions
	
	// API CALLS
	function fetchRooms() {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms').then(function (res) {
	            dispatch(addRooms(res.rooms));
	        });
	    };
	}
	
	function fetchRoom(cuid) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/' + cuid).then(function (res) {
	            dispatch(addRoom(res.room));
	        });
	    };
	}
	
	function fetchParticipants(room) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/' + room.cuid + '/getparticipants').then(function (res) {
	            if (res.users) {
	                room.participantsData = res.users;
	                dispatch(updateRoom(room, 'participantsData'));
	            }
	        });
	    };
	}
	
	function fetchMessages(room) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/' + room.cuid + '/getmessages').then(function (res) {
	            if (res.messages) {
	                room.messagesData = res.messages;
	                dispatch(updateRoom(room, 'messagesData'));
	            }
	        });
	    };
	}
	
	function addRoomRequest(title) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/add', 'post', { room: { title: title } }).then(function (res) {
	            dispatch(addRoom(res.room));
	            dispatch((0, _AppActions.sendSocket)({ type: 'addRoom', data: res.room }));
	            dispatch(joinRoomRequest(res.room));
	        });
	    };
	}
	
	function joinRoomRequest(room) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/join', 'post', { room: room.cuid }).then(function (res) {
	            if (res.room) {
	                dispatch(joinRoom(res.room));
	                dispatch(updateRoom(res.room, 'participants'));
	                dispatch((0, _UserActions.addUserJoinedRoom)(res.room));
	                dispatch((0, _AppActions.sendSocket)({ type: 'joinRoom', data: res.room }));
	                _reactRouter.browserHistory.push('/rooms/' + res.room.cuid);
	            }
	            // dispatch(displayErrors(res));
	        });
	    };
	}
	
	function unJoinRoomRequest(room) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/unjoin', 'post', { room: room.cuid }).then(function (res) {
	            if (res.room) {
	                dispatch(unJoinRoom(res.room));
	                dispatch(updateRoom(res.room, 'participants'));
	                dispatch((0, _UserActions.removeUserJoinedRoom)(res.room));
	                dispatch((0, _AppActions.sendSocket)({ type: 'unJoinRoom', data: res.room }));
	                _reactRouter.browserHistory.push('/');
	            } else {}
	            dispatch((0, _ErrorActions.displayErrors)(res));
	        });
	    };
	}
	
	// REDUCERS ACTIONS
	function addRooms(rooms) {
	    return {
	        type: ADD_ROOMS,
	        rooms: rooms
	    };
	}
	
	function addRoom(room) {
	    return {
	        type: ADD_ROOM,
	        room: room
	    };
	}
	
	function updateRoom(room, key) {
	    return {
	        type: UPDATE_ROOM,
	        room: room,
	        key: key
	    };
	}
	
	function joinRoom(room) {
	    return {
	        type: JOIN_ROOM,
	        room: room
	    };
	}
	
	function unJoinRoom(room) {
	    return {
	        type: UNJOIN_ROOM,
	        room: room
	    };
	}
	
	function setActiveRoom(room) {
	    return {
	        type: SET_ACTIVE_ROOM,
	        room: room
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SET_USER_IS_WRITTING = exports.DISCONNECTED_USER = exports.CONNECTED_USERS = exports.CONNECTED_USER = exports.SET_READ_MESSAGES = exports.REMOVE_USER_JOINED_ROOM = exports.ADD_USER_JOINED_ROOM = exports.SET_USER_JOINED_ROOMS = exports.LOGOUT_USER = exports.LOGIN_USER = exports.REGISTER_USER = undefined;
	exports.registerRequest = registerRequest;
	exports.loginRequest = loginRequest;
	exports.isLoggedIn = isLoggedIn;
	exports.getUserJoinedRoomsRequest = getUserJoinedRoomsRequest;
	exports.registerUser = registerUser;
	exports.loginUser = loginUser;
	exports.logoutUser = logoutUser;
	exports.userConnected = userConnected;
	exports.usersConnected = usersConnected;
	exports.userDisconnected = userDisconnected;
	exports.setUserJoinedRooms = setUserJoinedRooms;
	exports.addUserJoinedRoom = addUserJoinedRoom;
	exports.removeUserJoinedRoom = removeUserJoinedRoom;
	exports.setReadMessages = setReadMessages;
	exports.setUserIsWritting = setUserIsWritting;
	
	var _apiCaller = __webpack_require__(17);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _reactRouter = __webpack_require__(4);
	
	var _AppActions = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var REGISTER_USER = exports.REGISTER_USER = 'REGISTER_USER';
	var LOGIN_USER = exports.LOGIN_USER = 'LOGIN_USER';
	var LOGOUT_USER = exports.LOGOUT_USER = 'LOGOUT_USER';
	var SET_USER_JOINED_ROOMS = exports.SET_USER_JOINED_ROOMS = 'SET_USER_JOINED_ROOMS';
	var ADD_USER_JOINED_ROOM = exports.ADD_USER_JOINED_ROOM = 'ADD_USER_JOINED_ROOM';
	var REMOVE_USER_JOINED_ROOM = exports.REMOVE_USER_JOINED_ROOM = 'REMOVE_USER_JOINED_ROOM';
	var SET_READ_MESSAGES = exports.SET_READ_MESSAGES = 'SET_READ_MESSAGES';
	var CONNECTED_USER = exports.CONNECTED_USER = 'CONNECTED_USER';
	var CONNECTED_USERS = exports.CONNECTED_USERS = 'CONNECTED_USERS';
	var DISCONNECTED_USER = exports.DISCONNECTED_USER = 'DISCONNECTED_USER';
	var SET_USER_IS_WRITTING = exports.SET_USER_IS_WRITTING = 'SET_USER_IS_WRITTING';
	
	// Export Actions
	function registerRequest(email, password, name) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('user/register', 'post', { email: email, password: password, name: name }).then(function (res) {
	            if (res.user) {
	                dispatch(registerUser(res.user));
	                loginRequest(res.user.email, res.user.password);
	            }
	        });
	    };
	}
	
	function loginRequest(email, password) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('user/login', 'post', { email: email, password: password }).then(function (res) {
	            dispatch(loginUser(res.user, res.token));
	            dispatch((0, _AppActions.sendSocket)({ type: 'userConnection', data: res.user }));
	        });
	    };
	}
	
	function isLoggedIn() {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('user/getloggeduser').then(function (res) {
	            if (res.user) {
	                dispatch(loginUser(res.user, res.token));
	                dispatch(getUserJoinedRoomsRequest(res.user));
	                dispatch((0, _AppActions.sendSocket)({ type: 'userConnection', data: res.user }));
	            } else {
	                dispatch(logoutUser());
	            }
	        });
	    };
	}
	
	function getUserJoinedRoomsRequest(user) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('user/getjoinedrooms').then(function (res) {
	            if (res.rooms) {
	                dispatch(setUserJoinedRooms(res.rooms));
	                for (var i in res.rooms) {
	                    dispatch((0, _AppActions.sendSocket)({ type: 'joinRoom', data: res.rooms[i] }));
	                }
	            }
	        });
	    };
	}
	
	function registerUser(user) {
	    return {
	        type: REGISTER_USER,
	        user: user
	    };
	}
	
	function loginUser(user, token) {
	    token = token.replace('JWT ', '');
	    return {
	        type: LOGIN_USER,
	        user: user,
	        token: token
	    };
	}
	
	function logoutUser() {
	    _reactRouter.browserHistory.push('/');
	    return {
	        type: LOGOUT_USER
	    };
	}
	
	function userConnected(user) {
	    return {
	        type: CONNECTED_USER,
	        user: user
	    };
	}
	
	function usersConnected(users) {
	    return {
	        type: CONNECTED_USERS,
	        users: users
	    };
	}
	
	function userDisconnected(user) {
	    return {
	        type: DISCONNECTED_USER,
	        user: user
	    };
	}
	
	function setUserJoinedRooms(rooms) {
	    return {
	        type: SET_USER_JOINED_ROOMS,
	        rooms: rooms
	    };
	}
	
	function addUserJoinedRoom(room) {
	    return {
	        type: ADD_USER_JOINED_ROOM,
	        room: room
	    };
	}
	
	function removeUserJoinedRoom(room) {
	    return {
	        type: REMOVE_USER_JOINED_ROOM,
	        room: room
	    };
	}
	
	function setReadMessages(room) {
	    return {
	        type: SET_READ_MESSAGES,
	        room: room
	    };
	}
	
	function setUserIsWritting(user, isWritting) {
	    return {
	        type: SET_USER_IS_WRITTING,
	        user: user,
	        isWritting: isWritting
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initSocket = initSocket;
	exports.sendSocket = sendSocket;
	exports.receiveSocket = receiveSocket;
	// Export Constants
	var INIT_SOCKET = exports.INIT_SOCKET = 'INIT_SOCKET';
	var SEND_SOCKET = exports.SEND_SOCKET = 'SEND_SOCKET';
	var RECEIVE_SOCKET = exports.RECEIVE_SOCKET = 'RECEIVE_SOCKET';
	
	// Export Actions
	function initSocket(socket) {
	    return {
	        type: INIT_SOCKET,
	        socket: socket
	    };
	}
	
	function sendSocket(datas) {
	    return {
	        type: SEND_SOCKET,
	        data: datas
	    };
	}
	
	function receiveSocket(datas) {
	    return {
	        type: RECEIVE_SOCKET,
	        data: datas
	    };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RECEIVE_MESSAGE = exports.ADD_MESSAGE = exports.SENDING_MESSAGE = undefined;
	exports.addMessageRequest = addMessageRequest;
	exports.sendMessage = sendMessage;
	exports.addMessage = addMessage;
	exports.receiveMessage = receiveMessage;
	
	var _apiCaller = __webpack_require__(17);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _AppActions = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Export Constants
	var SENDING_MESSAGE = exports.SENDING_MESSAGE = 'SENDING_MESSAGE';
	var ADD_MESSAGE = exports.ADD_MESSAGE = 'ADD_MESSAGE';
	var RECEIVE_MESSAGE = exports.RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
	
	// API Calls
	function addMessageRequest(user, room, content) {
	    return function (dispatch) {
	        return (0, _apiCaller2.default)('rooms/' + room.cuid + '/addmessage', 'post', { user: user, content: content }).then(function (res) {
	            if (res.message) {
	                dispatch(addMessage(res.message));
	                dispatch((0, _AppActions.sendSocket)({ type: 'addMessage', data: res.message }));
	            }
	        });
	    };
	}
	
	// Export Actions
	function sendMessage() {
	    return {
	        type: SENDING_MESSAGE
	    };
	}
	
	function addMessage(message) {
	    return {
	        type: ADD_MESSAGE,
	        message: message
	    };
	}
	
	function receiveMessage(message) {
	    return {
	        type: RECEIVE_MESSAGE,
	        message: message
	    };
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getRoom = exports.getRooms = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _UserActions = __webpack_require__(7);
	
	var _RoomActions = __webpack_require__(6);
	
	var _MessageActions = __webpack_require__(9);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Import Actions
	
	
	// Initial State
	var initialState = { data: [] };
	
	var RoomReducer = function RoomReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	
	    switch (action.type) {
	
	        case _RoomActions.ADD_ROOM:
	            return {
	                data: [initRoom(action.room)].concat(_toConsumableArray(state.data))
	            };
	
	        case _RoomActions.ADD_ROOMS:
	            var rooms = action.rooms.map(function (room) {
	                return initRoom(room);
	            });
	            return {
	                data: rooms
	            };
	
	        case _RoomActions.UPDATE_ROOM:
	            return _extends({}, state, {
	                data: state.data.map(function (room) {
	                    return room.cuid === action.room.cuid ?
	                    // transform the one with a matching id
	                    _extends({}, room, _defineProperty({}, action.key, action.room[action.key])) :
	                    // otherwise return original todo
	                    room;
	                })
	            });
	
	        case _MessageActions.ADD_MESSAGE:
	        case _MessageActions.RECEIVE_MESSAGE:
	            return _extends({}, state, {
	                data: state.data.map(function (room) {
	                    if (room && room.cuid === action.message.room.cuid) {
	                        if (!room.messagesData) {
	                            room.messagesData = [];
	                        }
	                        return _extends({}, room, { messagesData: [].concat(_toConsumableArray(room.messagesData), [action.message]) });
	                    }
	                    return room;
	                })
	            });
	
	        case _UserActions.SET_USER_IS_WRITTING:
	            return _extends({}, state, {
	                data: state.data.map(function (room) {
	                    if (room && room.cuid === action.user.activeRoom.cuid) {
	                        return _extends({}, room, {
	                            participantsData: room.participantsData.map(function (user) {
	                                if (user && user.cuid == action.user.cuid) {
	                                    return _extends({}, user, {
	                                        isWritting: action.isWritting
	                                    });
	                                }
	                                return user;
	                            })
	                        });
	                    }
	                    return room;
	                })
	            });
	
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
	var getRooms = exports.getRooms = function getRooms(state) {
	    return state.rooms.data;
	};
	
	// Get room by cuid
	var getRoom = exports.getRoom = function getRoom(state, cuid) {
	    return state.rooms ? state.rooms.data.filter(function (room) {
	        return room.cuid === cuid;
	    })[0] : null;
	};
	
	// Export Reducer
	exports.default = RoomReducer;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var config = {
	    mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/offaxis-chat',
	    port: process.env.PORT || 8000,
	    secret: 'OffAxis/Chat secret'
	};
	
	exports.default = config;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mongoose = __webpack_require__(11);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	var bcrypt = __webpack_require__(90);
	
	var userSchema = new Schema({
	    name: { type: 'String', required: true },
	    email: { type: 'String', required: true },
	    password: { type: 'String', required: true },
	    cuid: { type: 'String', required: true },
	    role: {
	        type: String,
	        enum: ['user', 'manager', 'admin'],
	        default: 'user'
	    },
	    resetPasswordToken: { type: String },
	    resetPasswordExpires: { type: Date }
	});
	
	// Pre-save of user to database, hash password if password is modified or new
	userSchema.pre('save', function (next) {
	    var user = this;
	    var SALT_FACTOR = 5;
	
	    if (!user.isModified('password')) {
	        return next();
	    }
	
	    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
	        if (err) {
	            return next(err);
	        }
	
	        bcrypt.hash(user.password, salt, null, function (err, hash) {
	            if (err) {
	                return next(err);
	            }
	            user.password = hash;
	            next();
	        });
	    });
	});
	
	// Method to compare password for login
	userSchema.methods.comparePassword = function (candidatePassword, cb) {
	    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
	        if (err) {
	            return cb(err);
	        }
	        cb(null, isMatch);
	    });
	};
	
	// Static Methods
	userSchema.statics.findByCuid = function (cuid, cb) {
	    return this.find({ cuid: cuid }, cb);
	};
	
	exports.default = _mongoose2.default.model('User', userSchema);

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("react-fontawesome");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactstrap = __webpack_require__(1);
	
	var _UserHelpers = __webpack_require__(77);
	
	var _UserProfileImage = {
	    "userProfileImage": "GzZ_2SLFH93IHn_y9el1W"
	};
	
	var _UserProfileImage2 = _interopRequireDefault(_UserProfileImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserProfileImage = function (_Component) {
	    _inherits(UserProfileImage, _Component);
	
	    function UserProfileImage(props) {
	        _classCallCheck(this, UserProfileImage);
	
	        var _this = _possibleConstructorReturn(this, (UserProfileImage.__proto__ || Object.getPrototypeOf(UserProfileImage)).call(this, props));
	
	        _this.toggle = _this.toggle.bind(_this);
	        _this.state = {
	            tooltipOpen: false
	        };
	        return _this;
	    }
	
	    _createClass(UserProfileImage, [{
	        key: 'toggle',
	        value: function toggle() {
	            this.setState({
	                tooltipOpen: !this.state.tooltipOpen
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var userStyle = {
	                background: (0, _UserHelpers.stringToColour)(this.props.user.name),
	                visibility: this.props.isHidden ? 'hidden' : 'visible'
	            };
	            return _jsx('span', {
	                id: 'tooltip-' + this.props.id,
	                className: _UserProfileImage2.default.userProfileImage,
	                style: userStyle
	            }, void 0, this.props.user.name.charAt(0), _jsx(_reactstrap.Tooltip, {
	                placement: 'bottom',
	                isOpen: this.state.tooltipOpen,
	                target: 'tooltip-' + this.props.id,
	                toggle: this.toggle
	            }, void 0, this.props.user.name));
	        }
	    }]);
	
	    return UserProfileImage;
	}(_react.Component);
	
	exports.default = UserProfileImage;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.API_URL = undefined;
	exports.default = callApi;
	
	var _isomorphicFetch = __webpack_require__(96);
	
	var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);
	
	var _config = __webpack_require__(13);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _storage = __webpack_require__(18);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var API_URL = exports.API_URL = typeof window === 'undefined' || process.env.NODE_ENV === 'test' ? process.env.BASE_URL || 'http://localhost:' + (process.env.PORT || _config2.default.port) + '/api' : '/api';
	
	function callApi(endpoint) {
	    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
	    var body = arguments[2];
	
	    var headers = {
	        'content-type': 'application/json'
	    };
	    if (_storage2.default && _storage2.default.getItem('jwtToken')) {
	        headers.Authorization = 'Bearer ' + _storage2.default.getItem('jwtToken');
	    }
	
	    return (0, _isomorphicFetch2.default)(API_URL + '/' + endpoint, {
	        headers: headers,
	        method: method,
	        body: JSON.stringify(body)
	    }).then(function (response) {
	        return response.json().then(function (json) {
	            return { json: json, response: response };
	        });
	    }).then(function (_ref) {
	        var json = _ref.json,
	            response = _ref.response;
	
	        if (!response.ok) {
	            return Promise.reject(json);
	        }
	        return json;
	    }).then(function (response) {
	        return response;
	    }, function (error) {
	        return error;
	    });
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	var storage = null;
	
	if (typeof sessionStorage !== "undefined") {
	   //use the local storage
	   storage = sessionStorage;
	}
	
	exports.default = storage;

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("cuid");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("react-helmet");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.localizationData = exports.enabledLanguages = undefined;
	
	var _reactIntl = __webpack_require__(3);
	
	var _intl = __webpack_require__(92);
	
	var _intl2 = _interopRequireDefault(_intl);
	
	var _intlLocalesSupported = __webpack_require__(93);
	
	var _intlLocalesSupported2 = _interopRequireDefault(_intlLocalesSupported);
	
	__webpack_require__(94);
	
	var _en = __webpack_require__(103);
	
	var _en2 = _interopRequireDefault(_en);
	
	var _en3 = __webpack_require__(61);
	
	var _en4 = _interopRequireDefault(_en3);
	
	__webpack_require__(95);
	
	var _fr = __webpack_require__(104);
	
	var _fr2 = _interopRequireDefault(_fr);
	
	var _fr3 = __webpack_require__(62);
	
	var _fr4 = _interopRequireDefault(_fr3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// list of available languages
	var enabledLanguages = exports.enabledLanguages = ['en', 'fr'];
	
	// this object will have language-specific data added to it which will be placed in the state when that language is active
	// if localization data get to big, stop importing in all languages and switch to using API requests to load upon switching languages
	var localizationData = exports.localizationData = {};
	
	// here you bring in 'intl' browser polyfill and language-specific polyfills
	// (needed as safari doesn't have native intl: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
	// as well as react-intl's language-specific data
	// be sure to use static imports for language or else every language will be included in your build (adds ~800 kb)
	
	
	// need Intl polyfill, Intl not supported in Safari
	
	
	if (global.Intl) {
	  // Determine if the built-in `Intl` has the locale data we need.
	  if (!(0, _intlLocalesSupported2.default)(enabledLanguages)) {
	    // `Intl` exists, but it doesn't have the data we need, so load the
	    // polyfill and patch the constructors we need with the polyfill's.
	    global.Intl.NumberFormat = _intl2.default.NumberFormat;
	    global.Intl.DateTimeFormat = _intl2.default.DateTimeFormat;
	  }
	} else {
	  // No `Intl`, so use and load the polyfill.
	  global.Intl = _intl2.default;
	}
	
	// use this to allow nested messages, taken from docs:
	// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
	function flattenMessages() {
	  var nestedMessages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  return Object.keys(nestedMessages).reduce(function (messages, key) {
	    var value = nestedMessages[key];
	    var prefixedKey = prefix ? prefix + '.' + key : key;
	
	    if (typeof value === 'string') {
	      messages[prefixedKey] = value; // eslint-disable-line no-param-reassign
	    } else {
	      Object.assign(messages, flattenMessages(value, prefixedKey));
	    }
	
	    return messages;
	  }, {});
	}
	
	// bring in intl polyfill, react-intl, and app-specific language data
	
	(0, _reactIntl.addLocaleData)(_en2.default);
	localizationData.en = _en4.default;
	localizationData.en.messages = flattenMessages(localizationData.en.messages);
	
	(0, _reactIntl.addLocaleData)(_fr2.default);
	localizationData.fr = _fr4.default;
	localizationData.fr.messages = flattenMessages(localizationData.fr.messages);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reduxDevtools = __webpack_require__(105);
	
	var _reduxDevtoolsLogMonitor = __webpack_require__(107);
	
	var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);
	
	var _reduxDevtoolsDockMonitor = __webpack_require__(106);
	
	var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reduxDevtools.createDevTools)(_jsx(_reduxDevtoolsDockMonitor2.default, {
	  toggleVisibilityKey: 'ctrl-h',
	  changePositionKey: 'ctrl-w'
	}, void 0, _jsx(_reduxDevtoolsLogMonitor2.default, {})));

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HomePage = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactstrap = __webpack_require__(1);
	
	var _UserLoginForm = __webpack_require__(32);
	
	var _UserLoginForm2 = _interopRequireDefault(_UserLoginForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.Jumbotron, {
	    className: 'text-center'
	}, void 0, _jsx('h1', {
	    className: 'display-3'
	}, void 0, 'Let\'s Rock !'), _jsx(_reactstrap.Alert, {
	    color: 'info',
	    className: 'text-center'
	}, void 0, 'Join a room and start the experience !'));
	
	var _ref2 = _jsx('div', {}, void 0, _jsx(_reactstrap.Jumbotron, {
	    className: 'text-center'
	}, void 0, _jsx('h1', {
	    className: 'display-3'
	}, void 0, 'Hello, world!'), _jsx('p', {
	    className: 'lead'
	}, void 0, 'This is a live chat example made with React, Redux, ExpressJs & MongoDb with real time interactions !'), _jsx('hr', {
	    className: 'my-2'
	}), _jsx('p', {}, void 0, 'Let\'s start by creating your account simply !'), _jsx('div', {
	    className: 'lead'
	}, void 0, _jsx(_reactstrap.ButtonGroup, {}, void 0, _jsx(_reactstrap.Button, {
	    color: 'primary',
	    outline: true,
	    tag: _reactRouter.Link,
	    to: '/login'
	}, void 0, 'Login'), _jsx(_reactstrap.Button, {
	    color: 'success',
	    outline: true,
	    tag: _reactRouter.Link,
	    to: '/user/register'
	}, void 0, 'Register')))));
	
	var HomePage = exports.HomePage = function (_Component) {
	    _inherits(HomePage, _Component);
	
	    function HomePage(props) {
	        _classCallCheck(this, HomePage);
	
	        return _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));
	    }
	
	    _createClass(HomePage, [{
	        key: 'render',
	        value: function render() {
	
	            return _jsx('div', {}, void 0, this.props.user ? _ref : _ref2);
	        }
	    }]);
	
	    return HomePage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(store) {
	    return {
	        intl: store.intl,
	        user: store.users.user
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(HomePage);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SWITCH_LANGUAGE = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.switchLanguage = switchLanguage;
	
	var _setup = __webpack_require__(24);
	
	// Export Constants
	var SWITCH_LANGUAGE = exports.SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';
	
	function switchLanguage(newLang) {
	  return _extends({
	    type: SWITCH_LANGUAGE
	  }, _setup.localizationData[newLang]);
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isUserParticipating = isUserParticipating;
	
	var _lodash = __webpack_require__(20);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isUserParticipating(room, user) {
	    return _lodash2.default.includes(room.participants, user.cuid);
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(2);
	
	var _RoomActions = __webpack_require__(6);
	
	var _RoomAddForm = __webpack_require__(72);
	
	var _RoomAddForm2 = _interopRequireDefault(_RoomAddForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var RoomAddPage = function (_Component) {
	    _inherits(RoomAddPage, _Component);
	
	    function RoomAddPage(props) {
	        _classCallCheck(this, RoomAddPage);
	
	        var _this = _possibleConstructorReturn(this, (RoomAddPage.__proto__ || Object.getPrototypeOf(RoomAddPage)).call(this, props));
	
	        _this.handleAddRoom = _this.handleAddRoom.bind(_this);
	        return _this;
	    }
	
	    _createClass(RoomAddPage, [{
	        key: 'handleAddRoom',
	        value: function handleAddRoom(title) {
	            this.props.dispatch((0, _RoomActions.addRoomRequest)(title));
	            this.props.history.push('/');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_RoomAddForm2.default, {
	                addRoom: this.handleAddRoom
	            }));
	        }
	    }]);
	
	    return RoomAddPage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	    return {};
	}
	
	// RoomListPage.propTypes = {
	//   rooms: PropTypes.arrayOf(PropTypes.shape({
	//     title: PropTypes.string.isRequired,
	//     slug: PropTypes.string.isRequired,
	//     cuid: PropTypes.string.isRequired,
	//     participants: PropTypes.array,
	//   })).isRequired,
	//   dispatch: PropTypes.func.isRequired,
	// };
	//
	// RoomListPage.contextTypes = {
	//   router: React.PropTypes.object,
	// };
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RoomAddPage);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _RoomList = __webpack_require__(73);
	
	var _RoomList2 = _interopRequireDefault(_RoomList);
	
	var _UserConnected = __webpack_require__(79);
	
	var _UserConnected2 = _interopRequireDefault(_UserConnected);
	
	var _RoomActions = __webpack_require__(6);
	
	var _UserActions = __webpack_require__(7);
	
	var _RoomHelpers = __webpack_require__(28);
	
	var _RoomReducer = __webpack_require__(12);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Actions
	
	
	// Import Selectors
	// import { getShowAddPost } from '../../../App/AppReducer';
	
	
	var _ref = _jsx(_reactstrap.Button, {
	    tag: _reactRouter.Link,
	    to: '/rooms/add',
	    color: 'success',
	    size: 'sm',
	    outline: true,
	    action: true,
	    className: 'pull-right'
	}, void 0, _jsx(_reactFontawesome2.default, {
	    name: 'plus'
	}), ' ', _jsx(_reactIntl.FormattedMessage, {
	    id: 'createroom'
	}));
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	    id: 'Rooms'
	});
	
	var _ref3 = _jsx(_reactstrap.Card, {
	    className: 'mt-2'
	}, void 0, _jsx(_reactstrap.CardHeader, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userConnected'
	})), _jsx(_reactstrap.CardBlock, {}, void 0, _jsx(_UserConnected2.default, {})));
	
	var RoomListPage = function (_Component) {
	    _inherits(RoomListPage, _Component);
	
	    function RoomListPage() {
	        _classCallCheck(this, RoomListPage);
	
	        return _possibleConstructorReturn(this, (RoomListPage.__proto__ || Object.getPrototypeOf(RoomListPage)).apply(this, arguments));
	    }
	
	    _createClass(RoomListPage, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            if (!this.props.rooms.length) {
	                this.props.dispatch((0, _RoomActions.fetchRooms)());
	            }
	        }
	    }, {
	        key: 'handleJoinRoom',
	        value: function handleJoinRoom(room) {
	            if ((0, _RoomHelpers.isUserParticipating)(room, this.props.user)) {
	                this.props.dispatch((0, _RoomActions.setActiveRoom)(room));
	                this.props.dispatch((0, _UserActions.setReadMessages)(room));
	            } else {
	                this.props.dispatch((0, _RoomActions.joinRoomRequest)(room));
	            }
	        }
	    }, {
	        key: 'handleUnJoinRoom',
	        value: function handleUnJoinRoom(room) {
	            if ((0, _RoomHelpers.isUserParticipating)(room, this.props.user)) {
	                this.props.dispatch((0, _RoomActions.unJoinRoomRequest)(room));
	            } else {
	                this.props.dispatch((0, _RoomActions.setActiveRoom)(null));
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.Card, {}, void 0, _jsx(_reactstrap.CardHeader, {}, void 0, this.props.user ? _ref : null, _ref2), _jsx(_reactstrap.CardBlock, {}, void 0, _jsx(_RoomList2.default, {
	                rooms: this.props.rooms,
	                joinRoom: function joinRoom(room) {
	                    return _this2.handleJoinRoom(room);
	                },
	                unJoinRoom: function unJoinRoom(room) {
	                    return _this2.handleUnJoinRoom(room);
	                },
	                user: this.props.user
	            }))), _ref3);
	        }
	    }]);
	
	    return RoomListPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RoomListPage.need = [function () {
	    return (0, _RoomActions.fetchRooms)();
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state) {
	    return {
	        rooms: (0, _RoomReducer.getRooms)(state),
	        user: state.users.user,
	        socket: state.app.socket
	    };
	}
	
	// RoomListPage.propTypes = {
	//   rooms: PropTypes.arrayOf(PropTypes.shape({
	//     title: PropTypes.string.isRequired,
	//     slug: PropTypes.string.isRequired,
	//     cuid: PropTypes.string.isRequired,
	//     participants: PropTypes.array,
	//   })).isRequired,
	//   dispatch: PropTypes.func.isRequired,
	// };
	//
	// RoomListPage.contextTypes = {
	//   router: React.PropTypes.object,
	// };
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RoomListPage);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _ParticipantsList = __webpack_require__(76);
	
	var _ParticipantsList2 = _interopRequireDefault(_ParticipantsList);
	
	var _MessagesList = __webpack_require__(75);
	
	var _MessagesList2 = _interopRequireDefault(_MessagesList);
	
	var _MessageAddForm = __webpack_require__(70);
	
	var _MessageAddForm2 = _interopRequireDefault(_MessageAddForm);
	
	var _RoomActions = __webpack_require__(6);
	
	var _RoomReducer = __webpack_require__(12);
	
	var _UserActions = __webpack_require__(7);
	
	var _RoomHelpers = __webpack_require__(28);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	// Import Selectors
	
	// Import Actions
	
	
	var _ref = _jsx(_reactstrap.Button, {
	    color: 'secondary',
	    tag: _reactRouter.Link,
	    to: '/'
	}, void 0, _jsx(_reactFontawesome2.default, {
	    name: 'chevron-left'
	}));
	
	var _ref2 = _jsx(_reactFontawesome2.default, {
	    name: 'times-circle'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	    id: 'roomUnJoin'
	});
	
	var RoomViewPage = function (_Component) {
	    _inherits(RoomViewPage, _Component);
	
	    function RoomViewPage(props) {
	        _classCallCheck(this, RoomViewPage);
	
	        return _possibleConstructorReturn(this, (RoomViewPage.__proto__ || Object.getPrototypeOf(RoomViewPage)).call(this, props));
	    }
	
	    _createClass(RoomViewPage, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.props.dispatch((0, _UserActions.setReadMessages)(this.props.room));
	            this.props.dispatch((0, _RoomActions.setActiveRoom)(this.props.room));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.props.dispatch((0, _RoomActions.setActiveRoom)(null));
	        }
	    }, {
	        key: 'handleUnJoinRoom',
	        value: function handleUnJoinRoom(room) {
	            this.props.dispatch((0, _RoomActions.unJoinRoomRequest)(room));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var messageWrapperStyle = {
	                // height: '300px',
	                overflowX: 'scroll'
	            };
	
	            var writtingUsers = this.props.room.participantsData ? this.props.room.participantsData.filter(function (user) {
	                return user.isWritting;
	            }) : [];
	
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.Card, {}, void 0, _jsx(_reactstrap.CardHeader, {}, void 0, _jsx(_reactstrap.Row, {}, void 0, _jsx(_reactstrap.Col, {
	                xs: '6'
	            }, void 0, _jsx('h1', {}, void 0, this.props.room.title)), _jsx(_reactstrap.Col, {
	                xs: '6',
	                className: 'text-right'
	            }, void 0, _jsx(_reactstrap.ButtonGroup, {}, void 0, _ref, (0, _RoomHelpers.isUserParticipating)(this.props.room, this.props.user) ? _jsx(_reactstrap.Button, {
	                outline: true,
	                color: 'danger',
	                onClick: function onClick() {
	                    _this2.handleUnJoinRoom(_this2.props.room);
	                }
	            }, void 0, _ref2, ' ', _ref3) : null))), _jsx(_ParticipantsList2.default, {
	                room: this.props.room
	            })), _jsx(_reactstrap.CardBlock, {
	                style: messageWrapperStyle
	            }, void 0, _jsx(_MessagesList2.default, {
	                room: this.props.room
	            }), writtingUsers.map(function (user, i) {
	                return _jsx('div', {}, i, _jsx('em', {}, void 0, user.name, ' is writting...'));
	            }), _jsx(_MessageAddForm2.default, {
	                room: this.props.room
	            }))));
	        }
	    }]);
	
	    return RoomViewPage;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	RoomViewPage.need = [function (params) {
	    return (0, _RoomActions.fetchRoom)(params.cuid);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	    var room = (0, _RoomReducer.getRoom)(state, props.params.cuid);
	    return {
	        room: room,
	        user: state.users.user
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(RoomViewPage);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UserLoginForm = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.CardHeader, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userLogin'
	}));
	
	var _ref2 = _jsx(_reactstrap.Label, {
	    'for': 'emailField'
	}, void 0, 'Email');
	
	var _ref3 = _jsx(_reactstrap.Label, {
	    'for': 'passwordField'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userPassword'
	}));
	
	var _ref4 = _jsx(_reactstrap.FormGroup, {}, void 0, _jsx(_reactstrap.Button, {
	    color: 'success',
	    block: true
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'submit'
	})));
	
	var _ref5 = _jsx(_reactstrap.Alert, {
	    color: 'danger'
	}, void 0, 'this.state.message');
	
	var UserLoginForm = exports.UserLoginForm = function (_Component) {
	    _inherits(UserLoginForm, _Component);
	
	    function UserLoginForm(props) {
	        _classCallCheck(this, UserLoginForm);
	
	        var _this = _possibleConstructorReturn(this, (UserLoginForm.__proto__ || Object.getPrototypeOf(UserLoginForm)).call(this, props));
	
	        _this.state = {
	            email: '',
	            password: '',
	            error: false,
	            message: ''
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }
	
	    _createClass(UserLoginForm, [{
	        key: 'handleChange',
	        value: function handleChange(event) {
	            var target = event.target;
	            var value = target.type === 'checkbox' ? target.checked : target.value;
	            var name = target.name;
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.state.email && this.state.password) {
	                this.props.login(this.state.email, this.state.password);
	            } else {
	                this.setState({
	                    error: true,
	                    message: 'Please fill all fields !'
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.Card, {}, void 0, _ref, _jsx(_reactstrap.CardBlock, {}, void 0, _jsx(_reactstrap.Form, {
	                onSubmit: this.handleSubmit
	            }, void 0, _jsx(_reactstrap.FormGroup, {}, void 0, _jsx(_reactstrap.Row, {}, void 0, _jsx(_reactstrap.Col, {
	                sm: '6'
	            }, void 0, _ref2, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'email',
	                id: 'emailField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.userEmail,
	                value: this.state.email
	            })), _jsx(_reactstrap.Col, {
	                sm: '6'
	            }, void 0, _ref3, _jsx(_reactstrap.Input, {
	                type: 'password',
	                name: 'password',
	                id: 'passwordField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.userPassword,
	                value: this.state.password
	            })))), _ref4), this.state.error ? _ref5 : '')));
	        }
	    }]);
	
	    return UserLoginForm;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(UserLoginForm);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _UserActions = __webpack_require__(7);
	
	var _UserLoginForm = __webpack_require__(32);
	
	var _UserLoginForm2 = _interopRequireDefault(_UserLoginForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var UserLoginPage = function (_Component) {
	    _inherits(UserLoginPage, _Component);
	
	    function UserLoginPage(props) {
	        _classCallCheck(this, UserLoginPage);
	
	        var _this = _possibleConstructorReturn(this, (UserLoginPage.__proto__ || Object.getPrototypeOf(UserLoginPage)).call(this, props));
	
	        _this.handleLogin = _this.handleLogin.bind(_this);
	        return _this;
	    }
	
	    _createClass(UserLoginPage, [{
	        key: 'handleLogin',
	        value: function handleLogin(email, password) {
	            this.props.dispatch((0, _UserActions.loginRequest)(email, password));
	            this.props.history.push('/');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_UserLoginForm2.default, {
	                login: this.handleLogin
	            }));
	        }
	    }]);
	
	    return UserLoginPage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	    return { user: state.user };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserLoginPage);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactstrap = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var _ref = _jsx('br', {});
	
	var UserProfilePage = function (_Component) {
	    _inherits(UserProfilePage, _Component);
	
	    function UserProfilePage(props) {
	        _classCallCheck(this, UserProfilePage);
	
	        return _possibleConstructorReturn(this, (UserProfilePage.__proto__ || Object.getPrototypeOf(UserProfilePage)).call(this, props));
	    }
	
	    _createClass(UserProfilePage, [{
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, this.props.user ? _jsx(_reactstrap.Card, {}, void 0, _jsx(_reactstrap.CardHeader, {}, void 0, _jsx('h1', {}, void 0, this.props.user.name)), _jsx(_reactstrap.CardBlock, {}, void 0, 'Email : ', this.props.user.email, _ref, 'Role : ', this.props.user.role)) : null);
	        }
	    }]);
	
	    return UserProfilePage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	    return { user: state.users.user };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserProfilePage);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _UserActions = __webpack_require__(7);
	
	var _UserRegisterForm = __webpack_require__(80);
	
	var _UserRegisterForm2 = _interopRequireDefault(_UserRegisterForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var UserRegisterPage = function (_Component) {
	    _inherits(UserRegisterPage, _Component);
	
	    function UserRegisterPage(props) {
	        _classCallCheck(this, UserRegisterPage);
	
	        var _this = _possibleConstructorReturn(this, (UserRegisterPage.__proto__ || Object.getPrototypeOf(UserRegisterPage)).call(this, props));
	
	        _this.handleRegister = _this.handleRegister.bind(_this);
	        return _this;
	    }
	
	    _createClass(UserRegisterPage, [{
	        key: 'handleRegister',
	        value: function handleRegister(email, password, name) {
	            this.props.dispatch((0, _UserActions.registerRequest)(email, password, name));
	            this.props.history.push('/');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_UserRegisterForm2.default, {
	                register: this.handleRegister
	            }));
	        }
	    }]);
	
	    return UserRegisterPage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	    return { user: state.users.user };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserRegisterPage);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mongoose = __webpack_require__(11);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var messageUserSchema = new _mongoose2.default.Schema({
	    cuid: { type: 'String', required: true },
	    name: { type: 'String', required: true }
	});
	
	var messageRoomSchema = new _mongoose2.default.Schema({
	    cuid: { type: 'String', required: true },
	    title: { type: 'String', required: true }
	});
	
	var messageSchema = new Schema({
	    cuid: { type: 'String', required: true },
	    user: { type: messageUserSchema, required: true },
	    room: { type: messageRoomSchema, required: true },
	    content: { type: 'String', required: true },
	    dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Message', messageSchema);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(11);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var postSchema = new Schema({
	  name: { type: 'String', required: true },
	  title: { type: 'String', required: true },
	  content: { type: 'String', required: true },
	  slug: { type: 'String', required: true },
	  cuid: { type: 'String', required: true },
	  dateAdded: { type: 'Date', default: Date.now, required: true }
	});
	
	exports.default = _mongoose2.default.model('Post', postSchema);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mongoose = __webpack_require__(11);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _lodash = __webpack_require__(20);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Schema = _mongoose2.default.Schema;
	
	var roomSchema = new Schema({
	    title: { type: 'String', required: true },
	    slug: { type: 'String', required: true },
	    cuid: { type: 'String', required: true },
	    participants: [{ type: 'String', required: false }]
	});
	
	// Instance Methods
	roomSchema.methods.isUserParticipating = function (cuid) {
	    return _lodash2.default.includes(this.participants, cuid);
	};
	
	// Static Methods
	roomSchema.statics.findBySlug = function (slug, cb) {
	    return this.find({ slug: slug }, cb);
	};
	
	exports.default = _mongoose2.default.model('Room', roomSchema);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	var _passport = __webpack_require__(21);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _user = __webpack_require__(14);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _passportJwt = __webpack_require__(98);
	
	var _passportJwt2 = _interopRequireDefault(_passportJwt);
	
	var _passportLocal = __webpack_require__(99);
	
	var _passportLocal2 = _interopRequireDefault(_passportLocal);
	
	var _config = __webpack_require__(13);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var JwtStrategy = _passportJwt2.default.Strategy; // Importing Passport, strategies, and config
	
	var ExtractJwt = _passportJwt2.default.ExtractJwt;
	
	// Setting up local login strategy
	var localOptions = { usernameField: 'email' };
	var localLogin = new _passportLocal2.default(localOptions, function (email, password, done) {
	    _user2.default.findOne({ email: email }, function (err, user) {
	        if (err) {
	            return done(err);
	        }
	        if (!user) {
	            return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
	        }
	
	        user.comparePassword(password, function (err, isMatch) {
	            if (err) {
	                return done(err);
	            }
	            if (!isMatch) {
	                return done(null, false, { error: "Your login details could not be verified. Please try again." });
	            }
	            return done(null, user);
	        });
	    });
	});
	
	// Setting up JWT login strategy
	var jwtOptions = {
	    // Telling Passport to check authorization headers for JWT
	    // fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
	    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
	    // Telling Passport where to find the secret
	    secretOrKey: _config2.default.secret
	};
	var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	    _user2.default.findOne({ cuid: payload.cuid }, function (err, user) {
	        if (err) {
	            return done(err, false);
	        }
	
	        if (user) {
	            done(null, user);
	        } else {
	            done(null, false);
	        }
	    });
	});
	
	_passport2.default.use(jwtLogin);
	_passport2.default.use(localLogin);

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("limax");

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("redux");

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = require("sanitize-html");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.IntlWrapper = IntlWrapper;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactRedux = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function IntlWrapper(props) {
	  return _react2.default.createElement(
	    _reactIntl.IntlProvider,
	    props.intl,
	    props.children
	  );
	}
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	  return {
	    intl: store.intl
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(IntlWrapper);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /* eslint-disable global-require */
	
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(4);
	
	var _App = __webpack_require__(63);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _storage = __webpack_require__(18);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	    require.ensure = function requireModule(deps, callback) {
	        callback(require);
	    };
	}
	
	/* Workaround for async react routes to work with react-hot-reloader till
	  https://github.com/reactjs/react-router/issues/2182 and
	  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	    // Require async routes only in development for react-hot-reloader to work.
	    __webpack_require__(26);
	
	    __webpack_require__(30);
	    __webpack_require__(29);
	    __webpack_require__(31);
	
	    __webpack_require__(35);
	    __webpack_require__(33);
	    __webpack_require__(34);
	}
	
	function requireAuth(nextState, replace, callback) {
	    if (!_storage2.default || !_storage2.default.getItem('jwtToken')) {
	        replace('/');
	    }
	    return callback();
	}
	
	// react-router setup with code-splitting
	// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
	exports.default = _jsx(_reactRouter.Route, {
	    path: '/',
	    component: _App2.default
	}, void 0, _jsx(_reactRouter.IndexRoute, {
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(26).default);
	        }).bind(null, __webpack_require__));
	    }
	}), _jsx(_reactRouter.Route, {
	    path: 'rooms/add',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(29).default);
	        }).bind(null, __webpack_require__));
	    },
	    onEnter: requireAuth
	}), _jsx(_reactRouter.Route, {
	    path: 'rooms/:cuid',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(31).default);
	        }).bind(null, __webpack_require__));
	    },
	    onEnter: requireAuth
	}), _jsx(_reactRouter.Route, {
	    path: '/profile',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(34).default);
	        }).bind(null, __webpack_require__));
	    },
	    onEnter: requireAuth
	}), _jsx(_reactRouter.Route, {
	    path: 'user/register',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(35).default);
	        }).bind(null, __webpack_require__));
	    }
	}), _jsx(_reactRouter.Route, {
	    path: 'login',
	    getComponent: function getComponent(nextState, cb) {
	        Promise.resolve().catch(function(err) { __webpack_require__.oe(err); }).then((function (require) {
	            cb(null, __webpack_require__(33).default);
	        }).bind(null, __webpack_require__));
	    }
	}));
	// <Route
	//   path="rooms/:cuid"
	//   getComponent={(nextState, cb) => {
	//     require.ensure([], require => {
	//       cb(null, require('./modules/Room/pages/RoomViewPage/RoomViewPage').default);
	//     });
	//   }}
	// />
	// <Route
	//   path="/posts/:slug-:cuid"
	//   getComponent={(nextState, cb) => {
	//     require.ensure([], require => {
	//       cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
	//     });
	//   }}
	// />

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.configureStore = configureStore;
	
	var _redux = __webpack_require__(41);
	
	var _reduxThunk = __webpack_require__(108);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _DevTools = __webpack_require__(25);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _reducers = __webpack_require__(81);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Main store function
	 */
	function configureStore() {
	  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  // Middleware and store enhancers
	  var enhancers = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];
	
	  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
	    // Enable DevTools only when rendering on client and during development.
	    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : _DevTools2.default.instrument());
	  }
	
	  var store = (0, _redux.createStore)(_reducers2.default, initialState, _redux.compose.apply(undefined, enhancers));
	
	  // For hot reloading reducers
	  if (false) {
	    // Enable Webpack hot module replacement for reducers
	    module.hot.accept('./reducers', function () {
	      var nextReducer = require('./reducers').default; // eslint-disable-line global-require
	      store.replaceReducer(nextReducer);
	    });
	  }
	
	  return store;
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  _post2.default.count().exec(function (err, count) {
	    if (count > 0) {
	      return;
	    }
	
	    var content1 = 'Sed ut perspiciatis unde omnis iste natus error\n      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,\n      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos\n      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem\n      ipsum quia dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi\n      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\n      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n      est laborum';
	
	    var content2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut\n      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi\n      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit\n      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint\n      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id\n      est laborum. Sed ut perspiciatis unde omnis iste natus error\n      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,\n      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae\n      vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit\n      aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos\n      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem\n      ipsum quia dolor sit amet.';
	
	    var post1 = new _post2.default({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
	    var post2 = new _post2.default({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });
	
	    _post2.default.create([post1, post2], function (error) {
	      if (!error) {
	        // console.log('ready to go....');
	      }
	    });
	  });
	};
	
	var _post = __webpack_require__(37);
	
	var _post2 = _interopRequireDefault(_post);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _message = __webpack_require__(84);
	
	var MessageController = _interopRequireWildcard(_message);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	exports.default = router;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _post = __webpack_require__(85);
	
	var PostController = _interopRequireWildcard(_post);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Get all Posts
	router.route('/posts').get(PostController.getPosts);
	
	// Get one post by cuid
	router.route('/posts/:cuid').get(PostController.getPost);
	
	// Add a new Post
	router.route('/posts').post(PostController.addPost);
	
	// Delete a post by cuid
	router.route('/posts/:cuid').delete(PostController.deletePost);
	
	exports.default = router;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _room = __webpack_require__(86);
	
	var RoomController = _interopRequireWildcard(_room);
	
	var _passport = __webpack_require__(21);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _passport3 = __webpack_require__(39);
	
	var _passport4 = _interopRequireDefault(_passport3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Middleware to require login/auth
	var requireAuth = _passport2.default.authenticate('jwt', { session: false });
	// const requireLogin = passport.authenticate('local', { session: false });
	
	router.route('/rooms').get(RoomController.getRooms);
	
	router.post('/rooms/add', requireAuth, RoomController.addRoom);
	
	router.get('/rooms/:cuid', requireAuth, RoomController.getRoom);
	
	router.post('/rooms/join', requireAuth, RoomController.joinRoom);
	
	router.post('/rooms/unjoin', requireAuth, RoomController.unJoinRoom);
	
	router.get('/rooms/:cuid/getparticipants', requireAuth, RoomController.getParticipants);
	
	router.get('/rooms/:cuid/getmessages', requireAuth, RoomController.getMessages);
	
	router.post('/rooms/:cuid/addmessage', requireAuth, RoomController.addMessage);
	
	exports.default = router;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(10);
	
	var _user = __webpack_require__(87);
	
	var UserController = _interopRequireWildcard(_user);
	
	var _auth = __webpack_require__(83);
	
	var AuthController = _interopRequireWildcard(_auth);
	
	var _passport = __webpack_require__(21);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _passport3 = __webpack_require__(39);
	
	var _passport4 = _interopRequireDefault(_passport3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var router = new _express.Router();
	
	// Middleware to require login/auth
	var requireAuth = _passport2.default.authenticate('jwt', { session: false });
	var requireLogin = _passport2.default.authenticate('local', { session: false });
	
	router.get('/users', requireAuth, UserController.getUsers);
	
	router.get('/user/getjoinedrooms', requireAuth, UserController.getJoinedRooms);
	
	router.get('/user/getloggeduser', requireAuth, AuthController.isLoggedIn);
	
	router.post('/user/login', requireLogin, AuthController.login);
	
	router.route('/user/register').post(AuthController.register);
	
	exports.default = router;

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	exports = module.exports = function (io) {
	
	    var connected_users = [];
	
	    io.on('connection', function (socket) {
	
	        socket.on('disconnect', function (reason) {
	            console.log(reason);
	            var i = connected_users.indexOf(socket.user);
	            if (i >= 0) {
	                socket.broadcast.emit('userDisconnected', socket.user);
	                connected_users.splice(i, 1);
	            }
	        });
	
	        socket.on('userDisconnection', function () {
	            var i = connected_users.indexOf(socket.user);
	            if (i >= 0) {
	                socket.broadcast.emit('userDisconnected', socket.user);
	                connected_users.splice(i, 1);
	            }
	        });
	
	        socket.on('userConnection', function (user) {
	            socket.user = user;
	            connected_users.push(user);
	            socket.emit('connectedUsers', connected_users);
	            socket.broadcast.emit('connectedUsers', connected_users);
	        });
	
	        socket.on('joinRoom', function (room) {
	            if (room && room.cuid) {
	                socket.join(room.cuid);
	            }
	        });
	
	        socket.on('unJoinRoom', function (room) {
	            if (room && room.cuid) {
	                socket.leave(room.cuid);
	            }
	        });
	
	        socket.on('addRoom', function (room) {
	            socket.broadcast.emit('roomAdded', room);
	        });
	
	        socket.on('addMessage', function (message) {
	            if (message && message.cuid) {
	                socket.broadcast.to(message.room.cuid).emit('receiveMessage', message);
	            }
	        });
	
	        socket.on('userIsWritting', function (user) {
	            if (user && user.activeRoom) {
	                socket.broadcast.to(user.activeRoom.cuid).emit('userIsWritting', user);
	            }
	        });
	
	        socket.on('userStopWritting', function (user) {
	            if (user && user.activeRoom) {
	                socket.broadcast.to(user.activeRoom.cuid).emit('userStopWritting', user);
	            }
	        });
	
	        // socket.on('chat mounted', function(user) {
	        //     // TODO: Does the server need to know the user?
	        //     socket.emit('receive socket', socket.id)
	        // });
	        //
	        // socket.on('join channel', function(channel) {
	        //     socket.join(channel.name)
	        // });
	        //
	        //
	        // socket.on('new channel', function(channel) {
	        //     socket.broadcast.emit('new channel', channel)
	        // });
	        //
	        // socket.on('typing', function (data) {
	        //     socket.broadcast.to(data.channel).emit('typing bc', data.user);
	        // });
	        //
	        // socket.on('stop typing', function (data) {
	        //     socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
	        // });
	        //
	        // socket.on('new private channel', function(socketID, channel) {
	        //     socket.broadcast.to(socketID).emit('receive private channel', channel);
	        // });
	    });
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchComponentData = fetchComponentData;
	
	var _promiseUtils = __webpack_require__(89);
	
	function fetchComponentData(store, components, params) {
	  var needs = components.reduce(function (prev, current) {
	    return (current.need || []).concat((current.WrappedComponent && current.WrappedComponent.need !== current.need ? current.WrappedComponent.need : []) || []).concat(prev);
	  }, []);
	
	  return (0, _promiseUtils.sequence)(needs, function (need) {
	    return store.dispatch(need(params, store.getState()));
	  });
	} /*
	  Utility function to fetch required data for component to render in server side.
	  This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
	  */

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var webpack = __webpack_require__(23);
	var cssnext = __webpack_require__(100);
	var postcssFocus = __webpack_require__(101);
	var postcssReporter = __webpack_require__(102);
	
	module.exports = {
	  devtool: 'cheap-module-eval-source-map',
	
	  entry: {
	    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'],
	    vendor: ['react', 'react-dom']
	  },
	
	  output: {
	    path: __dirname,
	    filename: 'app.js',
	    publicPath: 'http://127.0.0.1:8000/'
	  },
	
	  resolve: {
	    extensions: ['', '.js', '.jsx'],
	    modules: ['client', 'node_modules']
	  },
	
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader'
	    }, {
	      test: /\.css$/,
	      include: /node_modules/,
	      loaders: ['style-loader', 'css-loader']
	    }, {
	      test: /\.jsx*$/,
	      exclude: [/node_modules/, /.+\.config.js/],
	      loader: 'babel'
	    }, {
	      test: /\.(jpe?g|gif|png|svg|eot|ttf|woff|woff2)$/i,
	      loader: 'url-loader?limit=10000'
	    }, {
	      test: /\.json$/,
	      loader: 'json-loader'
	    }],
	    noParse: /node_modules\/reactstrap-tether\/dist\/js\/tether.js/
	  },
	
	  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.optimize.CommonsChunkPlugin({
	    name: 'vendor',
	    minChunks: Infinity,
	    filename: 'vendor.js'
	  }), new webpack.DefinePlugin({
	    'process.env': {
	      CLIENT: JSON.stringify(true),
	      'NODE_ENV': JSON.stringify('development')
	    }
	  })],
	
	  postcss: function postcss() {
	    return [postcssFocus(), cssnext({
	      browsers: ['last 2 versions', 'IE > 10']
	    }), postcssReporter({
	      clearMessages: true
	    })];
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'en',
	  messages: {
	    siteTitle: 'OffAxis/Chat',
	    addPost: 'Add Post',
	    switchLanguage: 'Switch Language',
	    twitterMessage: 'We are on Twitter',
	    by: 'By',
	    deletePost: 'Delete Post',
	    createNewPost: 'Create new post',
	    authorName: 'Author\'s Name',
	    postTitle: 'Post Title',
	    postContent: 'Post Content',
	    submit: 'Submit',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t}',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t}',
	    nestedDateComment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} as of {date}',
	
	    createroom: 'Add a room',
	
	    messageSend: 'Send',
	
	    norooms: 'No rooms opened',
	    roomJoin: 'Join the room',
	    roomTitle: 'Room\'s title',
	    roomNoMessages: 'No messages',
	    roomNoParticipants: 'No participants',
	    roomParticipants: 'participant(s)',
	    roomUnJoin: 'Quit the room',
	
	    userEmail: 'Email',
	    userLogin: 'Login',
	    userLogout: 'Logout',
	    userPassword: 'Password',
	    userRegister: 'Register'
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  locale: 'fr',
	  messages: {
	    siteTitle: 'OffAxis/Chat',
	    switchLanguage: 'Changer de langue',
	    by: 'Par',
	    createNewRoom: 'Créer une nouvelle salle de discussion',
	    submit: 'Soumettre',
	    comment: 'user {name} {value, plural,\n    \t  =0 {does not have any comments}\n    \t  =1 {has # comment}\n    \t  other {has # comments}\n    \t} (in real app this would be translated to French)',
	    HTMLComment: 'user <b style=\'font-weight: bold\'>{name} </b> {value, plural,\n    \t  =0 {does not have <i style=\'font-style: italic\'>any</i> comments}\n    \t  =1 {has <i style=\'font-style: italic\'>#</i> comment}\n    \t  other {has <i style=\'font-style: italic\'>#</i> comments}\n    \t} (in real app this would be translated to French)',
	    nestedDateComment: 'user {name} {value, plural,\n  \t\t  =0 {does not have any comments}\n  \t\t  =1 {has # comment}\n  \t\t  other {has # comments}\n  \t\t} as of {date} (in real app this would be translated to French)',
	
	    createroom: 'Ajouter une discussion',
	
	    messageSend: 'Envoyer',
	
	    norooms: 'Aucune discussion ouverte',
	    roomJoin: 'Rejoindre la discussion',
	    roomTitle: 'Titre de la discussion',
	    roomNoMessages: 'Aucun message',
	    roomNoParticipants: 'Aucun participant',
	    roomParticipants: 'participant(s)',
	    roomUnJoin: 'Quitter la discussion',
	
	    userEmail: 'Email',
	    userLogin: 'Connexion',
	    userLogout: 'Déconnexion',
	    userPassword: 'Mot de passe',
	    userRegister: 'Inscription'
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRedux = __webpack_require__(2);
	
	var _socket = __webpack_require__(109);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _reactstrap = __webpack_require__(1);
	
	({
	    "navbar": "_3x6_5FK5lbdu6VxgFAiR3E",
	    "badge": "_2rtHet1KkNpyKTbdf8fTqa",
	    "table": "_1wH_XJqOqjF-mPkJW4GDl4",
	    "table-bordered": "_39M1_abDdW5oB4ZQwz3EVg",
	    "h1": "_1Hh_V-9nM1UodMkIVTM_za",
	    "h2": "_2HMtw1qCouQrHPlwIJnXpy",
	    "h3": "_2t1IDlEDHM2ZzuM8nCnQG3",
	    "h4": "_3sI8WWxI66ECOcIyDv4n_G",
	    "h5": "gb_lObQxtACAZyJh2p8MH",
	    "h6": "_1WXk9-rTXDwMj2TR0nr1hF",
	    "lead": "ihEsAV0v-7DRdzlhwmO7q",
	    "display-1": "_34YoChIWMvXEhdOTRdLMbQ",
	    "display-2": "_1J46m5zJWYsIkMGswIB4pq",
	    "display-3": "_3RfsmGDXsTnsY4Qxv6YbK2",
	    "display-4": "_1g_8QYcKKtWSmCnIoNK45r",
	    "small": "_3FumA9H10FGH9Xx6FNWf-B",
	    "mark": "_24tR6KOdoNNibUQg4ZoY-V",
	    "list-unstyled": "mAcWUWZOVNXI0sLpykUJ5",
	    "list-inline": "_3jhGZAxaTfc8KB9MqTEwJy",
	    "list-inline-item": "_3RgQGorU9VEyN6MFswq7Gk",
	    "initialism": "_1omBLfT0Xq2CNk9z1jsL6e",
	    "blockquote": "DbHiRE_BHAMD18PMZ-yS1",
	    "blockquote-footer": "_3ZfzSE68gNeD0lz9SqHLs0",
	    "blockquote-reverse": "_2z49KoB68PcRugiLwj4evr",
	    "img-fluid": "jIiXm_xR92qm7ILi3XYg-",
	    "img-thumbnail": "_1oDb1xumUCoR497LvPrphc",
	    "figure": "_3EI3TvCtz_PQ7d3AkrxZOi",
	    "figure-img": "YOQjmn2TV268JaoMS2tLx",
	    "figure-caption": "_34eF3ZJFUEykTCW6ox1GK5",
	    "pre-scrollable": "_1FldxLEdHBW5He4I2Ohpa1",
	    "container": "_3I9U-QOfxTwGRQ8oV0tl5I",
	    "container-fluid": "_2HvnRsXB8V3P_A1mMEy3Ip",
	    "row": "_3FuqBUNyflWhf5QXWBfA7n",
	    "no-gutters": "_39RBdC1HMLxaxZZ6CwoNFT",
	    "col": "_3Y4QX2a9-G7XKnOpDYCdBV",
	    "col-1": "_2jv0Yr_kD_v-guQVSebNAf",
	    "col-2": "ZxwWUGdWJCOStv46HJX3s",
	    "col-3": "_3Rs5uAod4l8nj3AqHkDkO_",
	    "col-4": "_3G8lFoEKwg6E4M9vEZLVqL",
	    "col-5": "_3efe7bo3YdhI8jKqwllJ6R",
	    "col-6": "_27Y6jSO-VUp2w-G6aq_YaD",
	    "col-7": "_25Pe3bEdRJwzgAKTIzv2KE",
	    "col-8": "_3yHe0zzkBlVOkerxENrRLp",
	    "col-9": "_1JNwi_cFXgzz2nJdfX92oo",
	    "col-10": "_3Elija3mdTw_W9uqz9h1-L",
	    "col-11": "_2P9L08e1APOXwFuufhhW73",
	    "col-12": "e9W-jQ-Kbunu-hxY0BJPb",
	    "col-sm-1": "_1no6qdPqAR1A2w2vpd_grn",
	    "col-sm-2": "_3C5uP8pF8u71m9HFoE8wGP",
	    "col-sm-3": "_1ZEQoPKGkLRcpTf4iwZfOM",
	    "col-sm-4": "-Pz8b_rjqCCPZVOlvsJmv",
	    "col-sm-5": "_1N1XTJmofb-mwoAnGXkQYF",
	    "col-sm-6": "_3FT7Oeg1-cjjWviIWjpQ9K",
	    "col-sm-7": "_15bQyg4zJEpkblEAF1TCB8",
	    "col-sm-8": "_112_bFw40g_Os-_ie_lMbi",
	    "col-sm-9": "SGnmOUvDBIuSfiUSSda2l",
	    "col-sm-10": "_3mOP3qb4uC9VNlyo9Cj6js",
	    "col-sm-11": "_2T7_YIBnRoGZb0EQBUtPir",
	    "col-sm-12": "_1NCi1G51eWVpDHcg8P2LaP",
	    "col-sm": "OSnvWP17qMjy5xlw5h8pK",
	    "col-md-1": "qZcYlRKZ8EpK2m5koKs2E",
	    "col-md-2": "_1vdEQiCeuz1jx_U0rog8X4",
	    "col-md-3": "_1589fIZU8fLqa-sTPy9tGY",
	    "col-md-4": "_13KrPhjMWApL1drLnzSkcd",
	    "col-md-5": "_3hkM4fQIBOavT0OwvPqEbQ",
	    "col-md-6": "_2aUDvdD1IswR5vw3yuHACw",
	    "col-md-7": "_3NBlX7UmopjgYUSzgo6ydH",
	    "col-md-8": "fMvUFNZWGOqQC5rQ7CgXk",
	    "col-md-9": "_12M9urs-ypBeuZuhtVXz7k",
	    "col-md-10": "TlXiuVkhOPj5-zEVeYVgZ",
	    "col-md-11": "_1xv8GbRKErLkQ2I-37_0cg",
	    "col-md-12": "_1kdHz5wCG48Wj8VjsshT7K",
	    "col-md": "_3geCfdN_P2wqgDukf7MDFJ",
	    "col-lg-1": "_1NIiSHCaY7QeIb5ECWrH-s",
	    "col-lg-2": "_3DuYtg4oWTQJXsnnqfFKYf",
	    "col-lg-3": "_3dCT1qm3kVnMr9PQ45X2ts",
	    "col-lg-4": "_3dHFBj6YJt_P0zI1D21YZx",
	    "col-lg-5": "v7LkNm_fSI9OM1SSsO1qU",
	    "col-lg-6": "_2t-ahWZMFoSai3kP1V3QZO",
	    "col-lg-7": "O82A19UR7vlsic7xyGaWu",
	    "col-lg-8": "_1WAzSnco5M4aDPbPqav9-Z",
	    "col-lg-9": "_2L9b_ReVc3uOBF9AyJafyo",
	    "col-lg-10": "_2sDHIB9flS5UdZ3N9xM2zf",
	    "col-lg-11": "_1fHYmtWkLp7E0ghbU23LBg",
	    "col-lg-12": "_2cJO3RNE8y0k3dmu-KyJP1",
	    "col-lg": "_2gTd1x5XorFGgUGwvHhQra",
	    "col-xl-1": "_7k07w1N5SrLwoXVB6dLtf",
	    "col-xl-2": "_3KWIgUSW6PWT7m8Hw2g0MX",
	    "col-xl-3": "th5l0P6JT5i2vkLvOzrdq",
	    "col-xl-4": "_1I8dUyDEfmMB8hMLimCAAU",
	    "col-xl-5": "_4vue8cYajou-ND6lryueV",
	    "col-xl-6": "_1PFQl0ZSQidLkFMBFx-ycs",
	    "col-xl-7": "_1yyiWalqqLEP5vD19RoCK1",
	    "col-xl-8": "_1KD1FRJz1pG8AZx-ssZQcA",
	    "col-xl-9": "_2T1Ea7g7z_lOKrQPUVzXNU",
	    "col-xl-10": "_1jQCe5IQsvrB0jtpGs0Obz",
	    "col-xl-11": "_1HpC9tIRLNdJXTynG-FxJz",
	    "col-xl-12": "_2iQV-v27t5TYONDg8q7a4T",
	    "col-xl": "_1DFmocP0aAfe-FDFsZ1-JR",
	    "col-auto": "_2D-nmUdRV7PJlORrUdmSz5",
	    "pull-0": "_8epVxZUwl_BhmdJmrJwIc",
	    "pull-1": "_3SLEC57A7MooBK8VnP2Rcs",
	    "pull-2": "_2749W0kB453pTexwPoos8s",
	    "pull-3": "_1zJUIjiZEhmep9TaUOcJgc",
	    "pull-4": "_2IZ9A3_99g9cPwVIM2IstK",
	    "pull-5": "_1PbAzNHzJuQskwLFm7joLJ",
	    "pull-6": "_1CcIIRjeczBuphEWPjrddI",
	    "pull-7": "_15CUORNuUUbeMHDzQiA4JF",
	    "pull-8": "_30y3rYcfwKM4Nq-_cZwSP-",
	    "pull-9": "_3c9QTxS6R-vnuduKNyrbwO",
	    "pull-10": "_2CavRSP59b1ap56BiNq9-_",
	    "pull-11": "Isx2-cTEsBt-zs4bmfB_0",
	    "pull-12": "_1ch-_RjVy-fs9AC-KAErDQ",
	    "push-0": "_2NB6w3QmzaFg3D_7nVXigc",
	    "push-1": "rAVZ-kTiki1ESZGtMg-gG",
	    "push-2": "nNK1DvVjbIhV3kX6wFkFL",
	    "push-3": "ilLePUi7EBE-2oDjG9Bfx",
	    "push-4": "_3j_e_EXfGuv6mlR-y0EcWy",
	    "push-5": "_14F4NOKfv5yG5C0hKOVT5N",
	    "push-6": "_3YeYEDawlPeZq8gEWmz2YE",
	    "push-7": "_1KJD_6HTreF4t1QLgjXs8H",
	    "push-8": "_1GTz3smoOfT579wtmNlekV",
	    "push-9": "_1Ez3ZJtZqY8cfKUAmLvKsN",
	    "push-10": "KgL3haapdEqcD1XHq7O2N",
	    "push-11": "_3Hojfy8eEFyUQZzxMACGfW",
	    "push-12": "DM-udZLypbMdx3eegzXq8",
	    "offset-1": "_4oUu98WsqiKljF05fBgE6",
	    "offset-2": "_3Vg_orzF2S0sNEtYRPtQmz",
	    "offset-3": "vobh2LFS3H3Ot5EewVmi3",
	    "offset-4": "_2sV-7vVL9U0Hu9FfFVyd0F",
	    "offset-5": "X4plXx6VbXgmAYOYOwNaf",
	    "offset-6": "_1zckRowMgwXd-gX1_Nm_L2",
	    "offset-7": "_2V4QprcDnUbImyJd1H9FDH",
	    "offset-8": "_1NLbwJMe7nKiMaXyyBkUHh",
	    "offset-9": "_2bJklf9CVc3-MCFRfeeLXr",
	    "offset-10": "_2TmnDTAF2yOwTBPXYZUc2u",
	    "offset-11": "_39zSSsNOoRVubWRlalrmIr",
	    "col-sm-auto": "_26SUQmXdwQ7SZ50aFD0EVy",
	    "pull-sm-0": "_1ZRKm0DpyWhDNaA6vWXufI",
	    "pull-sm-1": "fashYLpEHG9_iD4tN2kH2",
	    "pull-sm-2": "_2SUaBffDuV2KE56Lhyln4M",
	    "pull-sm-3": "_2fQEx9VM6hIcAaSbWW62pO",
	    "pull-sm-4": "_2keEx4mN7Fz13ej_C_l6NS",
	    "pull-sm-5": "_1UaSVnbjVE9ly9NEiN5w4l",
	    "pull-sm-6": "_2vSr-PtlGfYhlgbWAfCLtW",
	    "pull-sm-7": "KvwmvbGCBJkq6aDw1d5_m",
	    "pull-sm-8": "_35hMflN283G6sd2g3wNPMM",
	    "pull-sm-9": "MoPSuPEKcvTzU51zGQ6U2",
	    "pull-sm-10": "_3DnRtSLkuNX5oCK0exXevu",
	    "pull-sm-11": "_29MyzaYVbf57JaS_ShxUcp",
	    "pull-sm-12": "DyOH2yxa9G-WLzl3qgT2T",
	    "push-sm-0": "_3cMXR9w6D8Of_P7xrUhRKL",
	    "push-sm-1": "_1yCCbb2khkce6drT4Blret",
	    "push-sm-2": "_27P6io1MQTOBSdjZJfuAfc",
	    "push-sm-3": "_2aH9NVONvd7EIn-Y8CiBXZ",
	    "push-sm-4": "_1e6tZP8rAyHQ5b5vgOUM3Q",
	    "push-sm-5": "_3qUOW1EXtbZeJkn3_kzC5_",
	    "push-sm-6": "_3gpdTC45BrjC-5H9AnBznC",
	    "push-sm-7": "_2-7AQbEQBoVCzfmiSpAxlW",
	    "push-sm-8": "_3tnQyEylccxeUtXZfOYBWx",
	    "push-sm-9": "_3ah6OUXxAPv4T7pH3i6gNm",
	    "push-sm-10": "_35S_dN-i0QB4r8V_X_r6c6",
	    "push-sm-11": "_1kqmvSSFTH5kh38xYHdrx4",
	    "push-sm-12": "_1PqvY61qJatIj597rxJjV5",
	    "offset-sm-0": "_3jBpwKj7PAVysavr4aoow1",
	    "offset-sm-1": "_1IlkYNNE_16djSwXVYPE2I",
	    "offset-sm-2": "hNINN6gI4L5EpB0EieSdF",
	    "offset-sm-3": "_2F47LcVU4lNEOZRFE86NwY",
	    "offset-sm-4": "uNDVzi1MUZpCI3RkaJwvq",
	    "offset-sm-5": "_1ZG0Me3gN8_KGMyzcudwID",
	    "offset-sm-6": "_3hKRgYVnR7BONR0D8TX1RR",
	    "offset-sm-7": "_1RUQT6uCXb6-HubuNEZVwN",
	    "offset-sm-8": "_15juZM8RXXkqeixsNuIEYv",
	    "offset-sm-9": "TTs6beFm4rxObkc71B50O",
	    "offset-sm-10": "_1AAfsCbZHCGRLrHTbWdTes",
	    "offset-sm-11": "_3s9LwilhzfVZKA8xWcH6OO",
	    "col-md-auto": "_2rBppEd9wytkhk9-UBYagW",
	    "pull-md-0": "_2gFCmcfXO9Ho_g4Lpv8Tu1",
	    "pull-md-1": "_3d2nPfeDOjyATEUVAeZtve",
	    "pull-md-2": "_2jgrsNdWrktLqkm7IRi0QS",
	    "pull-md-3": "_-7VhlCLRQ_9LTIPlDw_FI",
	    "pull-md-4": "_1c5zlnafZVpVXFgP0T1axp",
	    "pull-md-5": "_8R4qXIryJeZsXqV5wkeJO",
	    "pull-md-6": "_3-xiGaHt00NFaugjAUDJtf",
	    "pull-md-7": "_9HH__JzAFurZ916LtI1Rw",
	    "pull-md-8": "_3HjbO-2HJU-fegt3RQOqx-",
	    "pull-md-9": "_3RMiJXbxK1tQrOJbhFFqTI",
	    "pull-md-10": "byQ9ODSzducoCA3ZWFegM",
	    "pull-md-11": "_3YLoTISWP1h9wvEO8x-u9B",
	    "pull-md-12": "_1LL69pOPz89xBKhaZEAjc9",
	    "push-md-0": "_3Cy1AVtX-qymME2y2faQuO",
	    "push-md-1": "DKcJ3cURQxAsepcBbBCDl",
	    "push-md-2": "_2n1za69TqqCKhu9bexhPWV",
	    "push-md-3": "_1laBSBFoi6wfbDpe5X7era",
	    "push-md-4": "_3jSmhlXXnFb0zS-2EPEbUu",
	    "push-md-5": "_1yUU_5KKcQUgYqLAk_P9ch",
	    "push-md-6": "WHFGQ7iQdqLzAd_qH1pvq",
	    "push-md-7": "_22E7e8LW9ZtoiaYL_Z4ZGS",
	    "push-md-8": "WoVqpTEUgneh45uJcdvxO",
	    "push-md-9": "_285aJfon5kH_GOqYifnV09",
	    "push-md-10": "_3w89O5t7naQUgsRDH9XrBz",
	    "push-md-11": "_2rrUUsnMO6NL8R8ZQLzVoF",
	    "push-md-12": "NtodE67AVjGQ8TWWToVg3",
	    "offset-md-0": "_3gmWPwSaft6MysqLzPXhbI",
	    "offset-md-1": "_1Vmmx-ZSDJxEADj1_mFAm7",
	    "offset-md-2": "_3Jf0CHaRRnEqYgKuZAnl05",
	    "offset-md-3": "RjmuyVH1vCOv4v-_tQtU5",
	    "offset-md-4": "_1zlCYqj4OASat26pDq_75k",
	    "offset-md-5": "_3WVupwMjqK1_s1ceWpE_UE",
	    "offset-md-6": "_1uoaTOVFFTrn0Hrv5_AZ8c",
	    "offset-md-7": "_19T3-YGw4oq0BKRZpHNAL9",
	    "offset-md-8": "_1wbpe7yN1vajXkV4X-GhmD",
	    "offset-md-9": "_3WufddNlAmrbyMUHy0p3qY",
	    "offset-md-10": "_2UtauJJrskjiuyLeYqcHC_",
	    "offset-md-11": "cH6knQYNMaIUjPS8UVhit",
	    "col-lg-auto": "_3B3s6jonL9yEAKjNC__vBX",
	    "pull-lg-0": "_3hP54c1JO5hboe0A_sWmbG",
	    "pull-lg-1": "_326lMGsySAK4XBlPh6cEie",
	    "pull-lg-2": "_3ssK2YgUSw0dUoE4hEheDW",
	    "pull-lg-3": "_15ig8N38dm554eI-pgcrsn",
	    "pull-lg-4": "_3uOjjJaob4iCXRoyOFXzrU",
	    "pull-lg-5": "_28iBtEQFN2-4E4zq-x7GSc",
	    "pull-lg-6": "_3_kNtdn8923oPS08UREk8Y",
	    "pull-lg-7": "_3LCRP9ybjRrBV4LRfFFLCk",
	    "pull-lg-8": "_2gcS2vQpEehhNq0OafNHOI",
	    "pull-lg-9": "_1ppbEoM7INMEzCgOscDBxt",
	    "pull-lg-10": "_2bWBA-VDFHYbbbqWa2iKrv",
	    "pull-lg-11": "Jn2GsMz_Ow6t2KAsriJl-",
	    "pull-lg-12": "_3D4YlQT9lwUKqyP_wYc8cN",
	    "push-lg-0": "_26IQ_wjUc2dvwG63coutis",
	    "push-lg-1": "hmlgAZSHQZegOa6efrj4u",
	    "push-lg-2": "_2W9s8KqDroFm75wu8io0_Z",
	    "push-lg-3": "_2csh3jibNSN2kgGr6fyyMd",
	    "push-lg-4": "_3HNflvE2RQOokgmfz5EkSu",
	    "push-lg-5": "_1BPnCzPIotFrRs3iXr5raV",
	    "push-lg-6": "V4ULI2vRfDBQUw9xIXSFF",
	    "push-lg-7": "_13vjGUpOT8_TIe5mq2ScCw",
	    "push-lg-8": "_3gvuWregyElfi2uAe3frb5",
	    "push-lg-9": "_13rgsaCImvEJg3p1Xosuvk",
	    "push-lg-10": "MGr-yRCofM8HioEeytOr0",
	    "push-lg-11": "_38uEdXUdG9PmkH6EjFuWaY",
	    "push-lg-12": "_1y9SmWo9FgUBTGKVWkMUVh",
	    "offset-lg-0": "bdY2zDsH6JvBqAEBzn7an",
	    "offset-lg-1": "_2CYQ0QZMRBzOKeDvL-_lOQ",
	    "offset-lg-2": "_27SLTcTyIN4sYeiYBVxvwx",
	    "offset-lg-3": "_2BGZxQTvIVBBP_aVK0l81i",
	    "offset-lg-4": "_1QgtyWbqX3cHEiI4hTgcow",
	    "offset-lg-5": "_2iLnjeH_iXiecP7fOjB41u",
	    "offset-lg-6": "CrAhQ95tjy2pfYLSnPFkT",
	    "offset-lg-7": "G7Znu5z5osPvTmNPehoCJ",
	    "offset-lg-8": "_17NDYcGEbnX0cRjZcKlKT5",
	    "offset-lg-9": "_27LryqPCBvJQQKzgjlrPCA",
	    "offset-lg-10": "_3W5njK3P_7tqjwuaTfR1q8",
	    "offset-lg-11": "_3aH3F9Yq3uVf8OR5X6yznF",
	    "col-xl-auto": "_31tzBOyfHGUYQ4a73yn5H2",
	    "pull-xl-0": "_2x0ycQIorAUbRiHYXvZyzG",
	    "pull-xl-1": "_1RFwjCwIcJapQ17UEVuxBZ",
	    "pull-xl-2": "f646WrjOtL0wDyrb_RM-K",
	    "pull-xl-3": "_3J2nCmoURulMZTgbH-yBAt",
	    "pull-xl-4": "_2ca8YBG14moYmBAP9mS8Y1",
	    "pull-xl-5": "W2k30to5difSy-Rp9xSBu",
	    "pull-xl-6": "_2CfuEcuDlfx1UUvc4kxvs",
	    "pull-xl-7": "_1MGS7tweVwEonzCxpU4vcL",
	    "pull-xl-8": "_1pwJ6vIGI1ttr29DWh85lz",
	    "pull-xl-9": "DU4gS4fZyHCpbWassv3jN",
	    "pull-xl-10": "_1mA23luX8G5YL8MS65BFgT",
	    "pull-xl-11": "_2XSNLVGuVJ9tCIoQ1Ze5jX",
	    "pull-xl-12": "xjDTc9f5krNkIJdBngAku",
	    "push-xl-0": "_1uhbZ21RWKDq5oSpRC862L",
	    "push-xl-1": "xnuA6KgjsupPY61GCnPs8",
	    "push-xl-2": "GI19cTk8AOfiv5q-3c-Pz",
	    "push-xl-3": "_32IJC4PYM7O8uSjn8UnAhY",
	    "push-xl-4": "_3U3AZUUOGno7Gfq2Av1ODI",
	    "push-xl-5": "_2oag3bUj6nn6FD04BVb-kH",
	    "push-xl-6": "_1X451FHwDmodUxQOrFDP4H",
	    "push-xl-7": "_3bSJvsLsVKcJXGoU-MZ1Pw",
	    "push-xl-8": "_33pY0_ajEQRNQDqzuOBkGn",
	    "push-xl-9": "_3VgqLztsrc9NTiX2I4Wnod",
	    "push-xl-10": "_1uLeD4UJB-XobLFmYekjRR",
	    "push-xl-11": "_1eF4aOTYhMMod5NpLDbaBv",
	    "push-xl-12": "_24alDRrYR0Dbd-Wy7tb-3b",
	    "offset-xl-0": "_1B_jROB2TnaxAs7IQ__upT",
	    "offset-xl-1": "_3VFaQwJWNjMHssedsmQo1h",
	    "offset-xl-2": "_3H5PrYIgdDQmMsi8qsv1nr",
	    "offset-xl-3": "_1PeV3ZZkoDOS9hypNSNhs0",
	    "offset-xl-4": "_3juQ3A-lsRqnUqQHdVVAzu",
	    "offset-xl-5": "_1XUrbbPN5jlEuq6qc-7Gfm",
	    "offset-xl-6": "_1Z9IRrVdXTCS1tTA046MSN",
	    "offset-xl-7": "qWeP95t9KlVxWUNYJtUMt",
	    "offset-xl-8": "_5_N4uB2e7nI9t2eBD7mfY",
	    "offset-xl-9": "_2FYj0EJFaigv4bmCNYantp",
	    "offset-xl-10": "_19IRjaARJgtUBN1ywVdCEL",
	    "offset-xl-11": "_1arjKQ20Xxsl4KmZ-qjI6P",
	    "table-sm": "_1CDaFJm96iMfPqaeisDern",
	    "table-striped": "_2Hhb1gXcLa8uUbXBdPpoMA",
	    "table-hover": "_2H97V3yS7x2jn_MPqlfMRq",
	    "table-active": "_1y_aQ__Sc0662sodfDPnyn",
	    "table-success": "_2pxs5BeGgdXhGxX34qzY3G",
	    "table-info": "_3oBz9LXHGbGBHKPosN4igs",
	    "table-warning": "_34TBXzEMbm-grh7wJf_zco",
	    "table-danger": "GrYmwPxUjj1s3bBxXfCkj",
	    "thead-inverse": "_3KQ1RolTwU2Qu5tPtLrTCT",
	    "thead-default": "_2aYshI_Fky87OLxd-SN--6",
	    "table-inverse": "_39MymGv9qY29f5MJ4GRxlU",
	    "table-responsive": "_3mrXfbD6e3L8HstGOCyW-a",
	    "form-control": "OCDtxiPOowfaIWhIPy7lz",
	    "form-control-file": "_7j2iROU9-3AH66kL1SZXH",
	    "form-control-range": "IprFRxxn2IETwD7xnSriz",
	    "col-form-label": "_1rqHYIzutqmWszZVOFmZgr",
	    "col-form-label-lg": "Ozr2IYLm1qH6TzxOlmjQ2",
	    "col-form-label-sm": "_13socL2MP0_t6uMXsTl33t",
	    "col-form-legend": "_3wB3fqMzOIJUyGn6-bw4VL",
	    "form-control-static": "_27F1FY6RFi9-GHv1R5I2Gd",
	    "form-control-sm": "_2TGsOWAAKAXyBHWIsNHz6r",
	    "input-group-sm": "_2ce__VJ-pwzPT3h3V3tyVl",
	    "input-group-addon": "_3vp1foAyBmrG6r_6Ts1gQM",
	    "input-group-btn": "_2fyZGLJL3Xv16JQqIq2C9I",
	    "btn": "_3DxqEXJ69DrH6kwmBRoBET",
	    "form-control-lg": "_3hIaq6rjaTHtssyEc4_Fkd",
	    "input-group-lg": "pwBlSTVg8TQaxiLz4jtVp",
	    "form-group": "_3kfP0GRhFC13Xo6DM720sI",
	    "form-text": "_1HeGLuStZOERa5psf5uXh9",
	    "form-check": "Ru55T7XR5EJyahxJZj8kZ",
	    "disabled": "_2N-nG3RY4eYTEmEq6pK0eG",
	    "form-check-label": "_21ECNPsESeJWBl6NIxfVyX",
	    "form-check-input": "hwe8qrPLqGsa4VMXY-SdO",
	    "form-check-inline": "_2hAVx_2_59L9cgTnrfdou_",
	    "form-control-feedback": "iNGGDlfSN_Dmej8xalaeg",
	    "form-control-success": "idd7hzb2ND_tH6kmfZIVG",
	    "form-control-warning": "_28rp3tIjptQkpo80bf8o8N",
	    "form-control-danger": "_157acM1z2h1ie-6ESqdO5O",
	    "has-success": "_282OH9oN-PvrfBuAHIHDae",
	    "form-control-label": "_1XHKSyR5lhnV6qHqu59J2j",
	    "custom-control": "_2mb69p40UfZm4pW5iL-oAH",
	    "has-warning": "jwsSAeFAwv0In1-Er_N3Q",
	    "has-danger": "_38jmUPmIc_aiD03x-x4Xlj",
	    "form-inline": "_2zTSpro8MSEbws44y3jfai",
	    "input-group": "sl34-921TGL_U11sva8Mt",
	    "custom-control-indicator": "_28pTy503DUTJGjaxUzpxnQ",
	    "has-feedback": "_2aqZiiN25_1rdD7Q6_c1lw",
	    "focus": "blrOiEPin5T0QTmy4Hy2e",
	    "active": "_364alC-s-ixBFd-cRq59o-",
	    "btn-primary": "_1J98J4luqy6X6jfLmD_YHH",
	    "show": "_3ff8eq9IMAQVrzzwGFP960",
	    "dropdown-toggle": "_3XCn51MaNClNWy4GkNSp5F",
	    "btn-secondary": "_3uehLOLwvbt85ml-dxPsRq",
	    "btn-info": "YSrvXa-HZqv5vv0RUTAMN",
	    "btn-success": "H5usAc7RC39BEPe3rN2Ie",
	    "btn-warning": "_3z7e1aiyQGPo5Yzr5XQx9c",
	    "btn-danger": "_2Bdy9l_999IKxKnEmm6uCr",
	    "btn-outline-primary": "_32Cwwu_d0s6rkkNZWk_NN2",
	    "btn-outline-secondary": "_2UJh1qewY1F53PqRU4CULV",
	    "btn-outline-info": "_3IvmD-QSfFQuzqO5YF_RwV",
	    "btn-outline-success": "_2IxBcPvStQWGtIhPHZrwWY",
	    "btn-outline-warning": "_20uVGd3bsbihSAi2nduWUt",
	    "btn-outline-danger": "_2aMUSSZLBAtmROyg_MmrrQ",
	    "btn-link": "_3VNaWQrDgebJn5EA_BtAhu",
	    "btn-lg": "_2iL-t3WR0fp9OxXvUXjRYR",
	    "btn-group-lg": "_3h24qgJgy1QlyCoVjqkSyu",
	    "btn-sm": "_2ZV5S2KD-eedQKRPoWlkad",
	    "btn-group-sm": "_14KBN0DnZ5ma_GZt4smJ9M",
	    "btn-block": "_1go5hobGYlkSYW-kCahM6d",
	    "fade": "_2ZYTMwtPDP6zb0sOBt4lA4",
	    "collapse": "_3JqyNvs1gjqKwMeRaKi3P7",
	    "collapsing": "i_C5XMbEbsnfHoI2DE8HB",
	    "dropup": "_3vFcA4sMGKI9V564UyfIfG",
	    "dropdown": "_11326BpIKjBAixcvG9mKEv",
	    "dropdown-menu": "sl_AI84DAF_YGvQ13O8tn",
	    "dropdown-divider": "_2LzEEMskMsWWowoDZ3MQ4F",
	    "dropdown-item": "_2pGWlHR2m8guj-X0NPcrTm",
	    "dropdown-menu-right": "_3LU3C_TBm-_1_NwsIMTGL-",
	    "dropdown-menu-left": "QMxjUGvdEVuUGvftNWbxH",
	    "dropdown-header": "_2mFrAVozsLC72uPNZlUI1b",
	    "dropdown-backdrop": "KaH4PpkL33SEGv51m7ffL",
	    "btn-group": "_220GV15b1-dFf4cx809N_e",
	    "btn-group-vertical": "_2JS-o7vIHr0cAaCHP0XSwP",
	    "btn-toolbar": "_3X77r1q17UehE_O8w1nbrR",
	    "open": "CRCSFN0L_2Cq8KfgfCsAL",
	    "dropdown-toggle-split": "RP0xtqGkMcQ22AJcOIwW-",
	    "custom-control-input": "RmaLuzZSnvF5-9VLfP6ty",
	    "custom-control-description": "_23afa9BM2bW41h2yCaE9TW",
	    "custom-checkbox": "RgSHm95ckpruEnU2XZAmX",
	    "custom-radio": "_22-35FibyS7BLS6RXZIBXh",
	    "custom-controls-stacked": "_Lo4jyh9gcdnQtg60DS6i",
	    "custom-select": "_3FzqYvhiLguyIcN3uJ3gjE",
	    "custom-select-sm": "a4vsyuw0dilucgsGwJw1W",
	    "custom-file": "_3EEndCQwkHJupA0EZh80RJ",
	    "custom-file-input": "_3mpzSpa_zcb2ae09n7Wjt",
	    "custom-file-control": "_3kVymBOQJdCoPN4PVGUM9s",
	    "nav": "_3zpu6ESpyg3RFvKZSrIO53",
	    "nav-link": "_1MbK_MlJOgExuoLPO1jLfn",
	    "nav-tabs": "LHsOr1fAfbzrImzEQC4kP",
	    "nav-item": "_3P2SOs5wVxskNmoD1AZADg",
	    "nav-pills": "_30sbarXeTXp5dZOSSGj3qI",
	    "nav-fill": "_1QC4LiOSZvO5yksACV5V-v",
	    "nav-justified": "_203DeRV3THLrmD6VyB9aTS",
	    "tab-content": "_1RJZTUxh9wK_hbdnotD3ka",
	    "tab-pane": "T27babQi91C-BnQ41AN2l",
	    "navbar-brand": "_1bCJTvRxUDDX_d37CjrXR6",
	    "navbar-nav": "_1PwgHtvKsxj3buwmasJQfN",
	    "navbar-text": "RIrTqvtIpp5zCDg1bOhO",
	    "navbar-toggler": "_3MqFZjQMAE73q2Y_9XrXZr",
	    "navbar-toggler-icon": "_229QFb7jwruIIymQ_YoJQF",
	    "navbar-toggler-left": "_1HnifrFSymsMJ1g7SlUEdo",
	    "navbar-toggler-right": "_3nz8OXIzEjpW-UuGiXqNJl",
	    "navbar-toggleable": "_2S21LxTa0fhDOTNyGc3wuU",
	    "navbar-collapse": "_2eyGoEmYak1MiwK048jitN",
	    "navbar-toggleable-sm": "_3YX2FMVcrAEV49yvCBB-k_",
	    "navbar-toggleable-md": "_12gpHBQjCnP6WJJ425CYg2",
	    "navbar-toggleable-lg": "_3nzyHhq00f3bXX5k6_NHQy",
	    "navbar-toggleable-xl": "_3jZrlyRfqRWj3K_G9cMfWr",
	    "navbar-light": "_1i6gT_CddvhvuxDG5Ht-B1",
	    "navbar-inverse": "_3re9g3tY46rNcmDKkq20sT",
	    "card": "_2neDNl3DQGLd71YfWCL334",
	    "card-block": "Z9NhixmsekC29GWDgV-YE",
	    "card-title": "_1tQWLOUoXeXTtDsx99xvOr",
	    "card-subtitle": "_2XKdKaEhnvBi0kmQlIFv0W",
	    "card-text": "vkxkbUrz_SrDXtxkp49xV",
	    "card-link": "_38FdDExV22f987rIerfL2t",
	    "list-group": "_1O3hfTnQAOvWhHCZuaf6Ak",
	    "list-group-item": "_1vb2D-RQz3AFKA5INTUd9-",
	    "card-header": "_1bpEcQ7KERyZTdqj_Ajmhp",
	    "card-footer": "_2AlA0QfK6gUyX2-O-aQYcf",
	    "card-header-tabs": "_1NVPggX2vhVxAvY3tCZb58",
	    "card-header-pills": "KNCTonuXL8gp8fRGZse0a",
	    "card-primary": "_18Tf0ysKt4twltJ6jIsOaA",
	    "card-success": "_2B5HMJ2GmMdYSszcvjFqt2",
	    "card-info": "_1TrIcxj2C_ZWwnDkgGT3od",
	    "card-warning": "_2TGP7kSgFyIZ_CUlYqS-nY",
	    "card-danger": "_2RNcr455gwk4dp8wjQeRHG",
	    "card-outline-primary": "_1l09FmmbWpFq4Fj1wtx-o-",
	    "card-outline-secondary": "_2uPE7_nAt_ueM5tcl75O7Q",
	    "card-outline-info": "W267xNico1ZiQq6QcZqYb",
	    "card-outline-success": "_3-XQBnpzLXoO9r7wkSGTQD",
	    "card-outline-warning": "_2tJyrqmDUP7CKEDENdgs_S",
	    "card-outline-danger": "_33C8Awmqfr-5A-8jzgvejB",
	    "card-inverse": "_3_QYxSCzspdK_B2k_nvLYR",
	    "card-blockquote": "uBtsY0z2nPpXfbH5VWNpm",
	    "card-img": "_1r4uZQprjNpyPJZ9C7GFEK",
	    "card-img-overlay": "_1Zgr1mDcRwjdDvPTsvw-X-",
	    "card-img-top": "_3z7nrCqBsF_4oli0_00Okc",
	    "card-img-bottom": "tCayQaPipbwWW5s2PN3fF",
	    "card-deck": "_31Nnrm7oP9JbB46sA_4ut_",
	    "card-group": "_2SYHbkkS1CRZ_bscBSIptW",
	    "card-columns": "_12_tt8ot3dDnsiGOeusAJB",
	    "breadcrumb": "_1oSI0OUhvXincVYwmtdWQB",
	    "breadcrumb-item": "ep8c7lZeV_feoDX4oJAPW",
	    "pagination": "_27IpByDRVBGzK14kKZov1R",
	    "page-item": "_2u8EmWGJmEpmFXg5ZYFoi0",
	    "page-link": "-Y9YNOqu3uNyYpFPHj7Hq",
	    "pagination-lg": "DsmDs5xWgobLD0VOGujiF",
	    "pagination-sm": "_1Dh-ztbiKkvZIIu-k_vqOs",
	    "badge-pill": "peXgtkDxFegpSqcw2Ap4y",
	    "badge-default": "dRpgtykQNhZOL6O0cW4UC",
	    "badge-primary": "_2gfTtLQYuaq_dd4VAvKBAq",
	    "badge-success": "_2uMs_1G52wAfopjs6IT029",
	    "badge-info": "_16LtuxjFGzmRjcpHJfxRND",
	    "badge-warning": "_2ZbVKk2kxkOpzU5R84x6jO",
	    "badge-danger": "_2isugfJ7mProIl_mTRU0Y_",
	    "jumbotron": "_36fRb1GmzU41TFYTnNWVSE",
	    "jumbotron-hr": "_14TffNn9XODqQOmF1kRQTT",
	    "jumbotron-fluid": "JpN-bzx5nJgYxo3fN9eFC",
	    "alert": "_1d0Yaejvd2Klg2s72W1fkY",
	    "alert-heading": "_1fcYs5iCC4ummNpz4sOojG",
	    "alert-link": "_1RTqeLlI8AhtGqwEmUqvDq",
	    "alert-dismissible": "_2amL3JDTGgmK3ze9kB9HZq",
	    "close": "_1CDrZ5jEd-ZeqgOrvEisOS",
	    "alert-success": "_21GGM4UrKw7NSxYCuSbx9y",
	    "alert-info": "_3jvdSLkTR5Dz2WbApLLL11",
	    "alert-warning": "_3iwK9Pi1nhXjmPaYdmwZrX",
	    "alert-danger": "_1zWZskrHVD5J45qqhWvSlh",
	    "progress": "_2zaJgRNZJdDyI7ERx4Ted6",
	    "progress-bar": "_2BMaGSrl999fUYq_1x0hlz",
	    "progress-bar-striped": "_3_hghQ3uMw03e0BfXkhXwV",
	    "progress-bar-animated": "_3JERoR5CUDaLc77h1bhCb8",
	    "progress-bar-stripes": "_2DkghYA3g6o-myTLPjrNdh",
	    "media": "_3mcFcHabwJlgDRnGuS-f8w",
	    "media-body": "_2Q6gq-YvSWdcwaK7mJzZ0X",
	    "list-group-item-action": "_3E1773qyWN3riciRniTA7H",
	    "list-group-item-heading": "_2jDfqXQeiUJjXAsSLSNdS-",
	    "list-group-item-text": "_1XDjyyNaxLhYyt_Qvpuzd3",
	    "list-group-flush": "_17F9E6k2KklVjW4mGpe3SO",
	    "list-group-item-success": "_1Z2SdTnhgCRHRXSd6IzRGY",
	    "list-group-item-info": "_3tZbJQHdKrNcrNYiGAs_7c",
	    "list-group-item-warning": "_3h7mtyIKZnePHxhgjLU1Eq",
	    "list-group-item-danger": "_1-YUZuiduBRapbS-o-UuLI",
	    "embed-responsive": "_2ReVT1JUkc6v5RPIF6OmTj",
	    "embed-responsive-item": "_1ziKxBvWOLWeSGHOXYD9tl",
	    "embed-responsive-21by9": "W5Z5v8zDzQ-5p36lQkxKB",
	    "embed-responsive-16by9": "_3FVy5kzKN8oYyrluC9eg7-",
	    "embed-responsive-4by3": "RVlzNPH-Fht-urzimy0_P",
	    "embed-responsive-1by1": "_2Wq5qN5dJHLLHyRHrIgv8z",
	    "modal-open": "B7mLGjkaz1Own8ucFkzmN",
	    "modal": "_1GpR3Wt9nS3KLusDaCs-YO",
	    "modal-dialog": "iu5Jf1odBwOheCwdhsBHq",
	    "modal-content": "_1NmrFrTdQq9TrbAmqEKyeJ",
	    "modal-backdrop": "_22zKAPfW9xH9uK9W7x_aGI",
	    "modal-header": "_3zxdUoXvqzTGVch69LyHQ_",
	    "modal-title": "_6hl9K9RIayTsf2Q1hWB5d",
	    "modal-body": "_3TFs48zEyTRVteXdBmPaEf",
	    "modal-footer": "atVv8d3L6TZLJCOFgadPc",
	    "modal-scrollbar-measure": "_27JcNd2hEOMDFO44kXjD_-",
	    "modal-sm": "_3XJSJOH-WkNLSkPIHGS64S",
	    "modal-lg": "_9oXhb0QDeLWkMy27n61xm",
	    "tooltip": "_345OwXRdFHdmDDIftRVEDH",
	    "tooltip-top": "_2_1lNg1mplZc28fsCZ-78s",
	    "bs-tether-element-attached-bottom": "_3rqGLDKQWY0b8pFp7VwlAp",
	    "tooltip-inner": "_3nAlB-ESKhPwkCBNJJOWPM",
	    "tooltip-right": "_2YrwdhZp_ACfMWsRoOZmTt",
	    "bs-tether-element-attached-left": "_3Ep_K_bc9CIjgJfi4IibwM",
	    "tooltip-bottom": "_2nJ39IZ945ljHIcoSM6ahS",
	    "bs-tether-element-attached-top": "_8TQkYyZe9lM6O9wHZpsga",
	    "tooltip-left": "_35jhvpuzDAb8uveGPkABDa",
	    "bs-tether-element-attached-right": "_39pcNtAaFM3vgdIxWlbXxb",
	    "popover": "_3MCfo4qdl3NCJaOavA59Bm",
	    "popover-top": "_200oxiA3gD8tscx6JUAdyo",
	    "popover-right": "cIvgBIfMZjWRLN1BPpI1M",
	    "popover-bottom": "_2uPrFDArYV7QXJEWODFB9t",
	    "popover-title": "_3_2xk2ysQKa-zyybnAzhjb",
	    "popover-left": "_16pRdchkoI_f46dJDtpITk",
	    "popover-content": "_1rwt6Q5qEO_4AIg6L-Ipya",
	    "carousel": "_2jVCx1rOjuCPXb9hPxGz5n",
	    "carousel-inner": "_1-LhAdwMVd_dvfCnbbCilw",
	    "carousel-item": "_1Oz6kEuLgTewe7jlmcu0sl",
	    "carousel-item-next": "JBCBgN6UUdeStaOlR2wu_",
	    "carousel-item-prev": "_2uSNsGykjsQOVXP2rX3BYK",
	    "carousel-item-left": "Yy5X4me2F16CfBQ-BPkQ5",
	    "carousel-item-right": "S5ctJexsKNFxmlfEuXKFr",
	    "carousel-control-prev": "yAc5iFv6ixsZxqKHVTOgy",
	    "carousel-control-next": "_19_xsgUhFCmwDJAz7fqPFL",
	    "carousel-control-prev-icon": "_1IBywYxTtMHYw-FgcNxAD",
	    "carousel-control-next-icon": "_30OS471YWM6LwXyqiDdeTU",
	    "carousel-indicators": "_6-_zQOVd_5mb0jdOmjp5r",
	    "carousel-caption": "_22AQiefjD107XlpiYVDbAh",
	    "align-baseline": "_3L5wJkB2eEZVKEpIYee7e5",
	    "align-top": "_2kk5QVmK4-Cvm4WEIMOCQ8",
	    "align-middle": "_3Z9lMN1OG2l1YfFMhZUnOL",
	    "align-bottom": "_1yyip-w7lrLkzzxbwv7j7c",
	    "align-text-bottom": "_1oz8NFe9Pij6BWfWu9xFoc",
	    "align-text-top": "_1npT1VYLIG8-CeRQ2AzoMk",
	    "bg-faded": "m3BAQje4yglYcobz90B0f",
	    "bg-primary": "_392MW8sWeHDQjUnKNHL-G2",
	    "bg-success": "_1wT1rBoy2TXfuKUNbGqcKW",
	    "bg-info": "_3xanm8rqoy5hoY63eWRmuu",
	    "bg-warning": "_2W93yM8ACWIQKa-pqCpYs_",
	    "bg-danger": "_3lrPqBOlYjH1pYW5p9G6ZW",
	    "bg-inverse": "xCtQJ4nDFH9uOpbD-DmBw",
	    "border-0": "_1SFyWseO5b75VgdskGnut1",
	    "border-top-0": "_1mDpgWDqwc-t_I9KHK9yK4",
	    "border-right-0": "_2WrIqPB9eWkgPHc5vQLz2Q",
	    "border-bottom-0": "_33nNU1Tqxs9MtcQHy5D-gO",
	    "border-left-0": "_2C4ADV3hmDpbIr5r0l-HgQ",
	    "rounded": "_3qZ81jLdjHykCU5B7Ktny-",
	    "rounded-top": "_23BZ942QH2lnYXyoLjdqbT",
	    "rounded-right": "_3w0fym-esEgP7ZKJsiq5l-",
	    "rounded-bottom": "_2DLDZ23d1K9UXjUgJSwQjP",
	    "rounded-left": "_3_sTiYcZMMiI3TK2B7ENm",
	    "rounded-circle": "_2HaBnCcMAg5_CQXSFHic5R",
	    "rounded-0": "_1_hBH7kc1zZevgkVqAlQRv",
	    "clearfix": "_10_iXka1ExTtYYOiED5OZY",
	    "d-none": "_18oDl4DjTICAabRy2TpvaQ",
	    "d-inline": "_8wxdeWTWw0dyyWnpCzO2c",
	    "d-inline-block": "Nst7tDGRpo5hDxRsJVgMJ",
	    "d-block": "_3lr7TksaUkoVTql0J7XAIn",
	    "d-table": "_1dQdH4NSJ7i6L8CSQP2cIS",
	    "d-table-cell": "_2626QK5DG06sIVcQTSeFVy",
	    "d-flex": "_2HNZCt-CnR3IQrO4t3ExeV",
	    "d-inline-flex": "ZD_dsXyYur95ws7wUQOTL",
	    "d-sm-none": "_3WTPPmmzbbRzAYz2sDNHuh",
	    "d-sm-inline": "_2MwILjkGoAndMvJ5N4lgnG",
	    "d-sm-inline-block": "_2gsxIcGLTvHt8WDWKHxTMR",
	    "d-sm-block": "_2wcnCY5cUAYQh-ufP3OuiT",
	    "d-sm-table": "_2Vsc4qB4Lp57zRrvjhBnDD",
	    "d-sm-table-cell": "_1TU1RqgkavDUudDBRInhDC",
	    "d-sm-flex": "_34o2gNy7_2kJ3WWxgW1spV",
	    "d-sm-inline-flex": "AgBm_ez9asShOAnPxv4-g",
	    "d-md-none": "_2TXGjbuZ34TzO4WHPirWVo",
	    "d-md-inline": "_2FaBDkLarC4XGju42aiiFF",
	    "d-md-inline-block": "_32XvKWe9wW9efqQoClUxIJ",
	    "d-md-block": "_3xNuRR39YScUGTeFawEiRa",
	    "d-md-table": "_1NMPn6w_UxVWJRSpu1LkEj",
	    "d-md-table-cell": "_2VOdgvhU53KamxYh-iLI2m",
	    "d-md-flex": "_9ARqyyjifm_w1S_uExukk",
	    "d-md-inline-flex": "_1tBXOiw8C-yhc1F0rNeQhz",
	    "d-lg-none": "_2oj8KIC665rib2vV5q-bc-",
	    "d-lg-inline": "lZH2w7T3XXV1R72a2wXmZ",
	    "d-lg-inline-block": "_2ZhRcIA0Ji_LGbHNH99ml2",
	    "d-lg-block": "MhhrmYid6bvpCYb-ZvoiM",
	    "d-lg-table": "_1K8WdjqW7x7RtygDLGayXC",
	    "d-lg-table-cell": "_1suqAHpCEq22jxIDgJjYl1",
	    "d-lg-flex": "_2Ot3wp5CmxFxs-PGtoYJYD",
	    "d-lg-inline-flex": "_2iMW_I9t0GLxLiI5J2ZYtL",
	    "d-xl-none": "LkMZOuDLcZWKt9plOjk-y",
	    "d-xl-inline": "_7XVjYZEiimLUlbNGu-Y35",
	    "d-xl-inline-block": "_2_VSMd_7AEvYgWqsACqnVE",
	    "d-xl-block": "_1p-NZYdLbmYUP0gMeyAlLm",
	    "d-xl-table": "B-v9HrmrhXppelO9oY_G-",
	    "d-xl-table-cell": "BTG6NSw4Pz9XvaD1wYN6Y",
	    "d-xl-flex": "_2IlbWqyeGVuWr_fsFqhdP0",
	    "d-xl-inline-flex": "_33abwrZvo3ffXMVsWZpvWP",
	    "flex-first": "_3x3TT-L7CTgaL9pnD0CeLP",
	    "flex-last": "_3ygJjTm-6RAu0xGzAnawAu",
	    "flex-unordered": "_3PVhNOkR2aWnNUgcXeRODT",
	    "flex-row": "I4h4nZJXJc8k90vEuBMH7",
	    "flex-column": "_2Y-hEit5M1iHsNdMM4OTJO",
	    "flex-row-reverse": "f-gb60i8gzhvnltVOYuuy",
	    "flex-column-reverse": "_2-MR9QqL-El89_vBXQZSHX",
	    "flex-wrap": "_3RuJDM2UjnNGaCPMj00E85",
	    "flex-nowrap": "_2RQOcGWU7zsey0gsp5vqj1",
	    "flex-wrap-reverse": "_1RclcafEQPQhfBeqtklk1t",
	    "justify-content-start": "_3sQvSpefGT9plhJhA8KLJR",
	    "justify-content-end": "cCsHKHmdUcPIvoNONq4eE",
	    "justify-content-center": "_1mKRsi8ZUVPaZzSgpUS6Sq",
	    "justify-content-between": "_3KWlalWEq6Gp1o3L5S3GNz",
	    "justify-content-around": "AGgEDpGzl1hW6PHam0NIp",
	    "align-items-start": "_3w4qtO6RgITR-AYMBdXU_O",
	    "align-items-end": "_2XcfifSRWQOvn07cJL3w9W",
	    "align-items-center": "_2OcIu0aVtwlQzhIOzbNgRU",
	    "align-items-baseline": "_2e8E42Q8RCw3I3ZCtaEPhA",
	    "align-items-stretch": "_1sQnRgtnjM1LmuUjiXERIH",
	    "align-content-start": "_1eIdwozrZ-dEWREGWVvmgI",
	    "align-content-end": "_3t_8tLzFyUGUKYLG1eDAv4",
	    "align-content-center": "TEbmF6TRqfkfMz8OnvN2",
	    "align-content-between": "_3f-73x2-LfxEk7VLdp8_3b",
	    "align-content-around": "_37jAYYktFsqDvR-xT7XHbD",
	    "align-content-stretch": "_1-xUKxmvO9gBVJVqlsX59L",
	    "align-self-auto": "MI-bw-ZkmodobNrCOxuUA",
	    "align-self-start": "_1MjDPUI_qBnIg-K_iUUyA3",
	    "align-self-end": "_30ON6Tn_1I3tOkgIq3AJ8z",
	    "align-self-center": "_2lJhZYSlH1cupQlpmafvug",
	    "align-self-baseline": "_24nxHqh5YyNoOKzS1k-Qnu",
	    "align-self-stretch": "A5o33PJW3eq07lm-c-ogP",
	    "flex-sm-first": "_22_cFS1T4IEdIQxsgRG0gY",
	    "flex-sm-last": "_2qg-84dTE2cJd3a8R8HtGp",
	    "flex-sm-unordered": "w_KQ0AMhhKfWvDD3NI5RI",
	    "flex-sm-row": "_3iBq2ld_fFLih5vfnGm8Si",
	    "flex-sm-column": "_3Z3-cj_eizUbWZMoeK3574",
	    "flex-sm-row-reverse": "_6KXHFv2JBbsXFQJJ_n68K",
	    "flex-sm-column-reverse": "h_8ASBhpDteSKpfSeL9ap",
	    "flex-sm-wrap": "_1DUlkNs-7BGGLFii5sRyjF",
	    "flex-sm-nowrap": "_26L8lsxvOut4cFFgXSKIqX",
	    "flex-sm-wrap-reverse": "_3MhnCbFCxvIYABeM6hLiir",
	    "justify-content-sm-start": "_P3gnS7VWK5TKMRtpF0CA",
	    "justify-content-sm-end": "_2XNWAo79Y63SyUKqgbC0ir",
	    "justify-content-sm-center": "_1HyImXp3YAWpv9HUPLpljE",
	    "justify-content-sm-between": "_1PM2ocoM4npe7S_qlAjQ6Y",
	    "justify-content-sm-around": "_3TiLSe_lLualTYk4RsLrJe",
	    "align-items-sm-start": "_3xHtwFKMddnvaGdv2N0Pke",
	    "align-items-sm-end": "_1CHM6FJrbYeebEDs-Of0nr",
	    "align-items-sm-center": "ZimsgqXssvZQJqf_nQTES",
	    "align-items-sm-baseline": "_2nT8aJYo7LVJFB2Rix1oz8",
	    "align-items-sm-stretch": "_1WJ-RwlQYCZzJVOr6ttlw8",
	    "align-content-sm-start": "_2AbZVvjNgaigZ1XrC5jHeH",
	    "align-content-sm-end": "uUQ0I9nCwQW3FA1Cd0_05",
	    "align-content-sm-center": "_1vIJJPL87cXgXXbvJroN_v",
	    "align-content-sm-between": "_3PqixCo5-bcdgsQjft_S1q",
	    "align-content-sm-around": "rVcWxCJRa2hEimFD4KImU",
	    "align-content-sm-stretch": "KjjtOUsjO8G2bKGQhMyxV",
	    "align-self-sm-auto": "_3R2v2sxH1UOYKBRo7ou4tO",
	    "align-self-sm-start": "_3IlD7BoNXrgXV4udrzmCG6",
	    "align-self-sm-end": "_26voclopvu8EV39WyrQg0z",
	    "align-self-sm-center": "_2mVwORZVWTw508NPuq0Qw_",
	    "align-self-sm-baseline": "_2Gr9HE9Wa3gW39kjOEh2Zi",
	    "align-self-sm-stretch": "_2GQ_TwywR0JYgx2Nvntd_x",
	    "flex-md-first": "_3JtdWviX9hskXbemthDxNv",
	    "flex-md-last": "D1g8eWdsdfuW_Q7hgkqbs",
	    "flex-md-unordered": "_2E_SZmiU42a26Sq6z5_nHB",
	    "flex-md-row": "AWmDDTeePYYPWncjy9Bl1",
	    "flex-md-column": "_3Se9rPnIHpXMST3B6EK8Da",
	    "flex-md-row-reverse": "_3f9m86O26WxEPu17Pf39GA",
	    "flex-md-column-reverse": "JLnU436t6JrcWRM-e6WE8",
	    "flex-md-wrap": "_2F-Nrx2aAjNdLLrkoWrnDE",
	    "flex-md-nowrap": "_2xjYx1a-4BR7NdYtNqm4S3",
	    "flex-md-wrap-reverse": "_9-2VRPg0RFSG9NsPz1A-",
	    "justify-content-md-start": "_3wxHU3UINj2q4JBJK5oZvH",
	    "justify-content-md-end": "_10To69F3dz1CRGmP4-7OjR",
	    "justify-content-md-center": "_3qBOhYR5GOGxWgRu1CBFcB",
	    "justify-content-md-between": "_87xNNWahUBn2au5iE-rSr",
	    "justify-content-md-around": "_280D-cZOcu7WRWxiSeuDF7",
	    "align-items-md-start": "_1Lew8Tv0rl8qoICdS3I5kb",
	    "align-items-md-end": "mb7Gpmk7sw9PDmxYiOflU",
	    "align-items-md-center": "_271MJ_SAxS4Ehj7E7hZuJq",
	    "align-items-md-baseline": "_2Z8RC7B9uwaTRe6zWbslMI",
	    "align-items-md-stretch": "_1RzbSKICoDmIzeoCUDWRRO",
	    "align-content-md-start": "_2VbOBd4JfcA246jnMXJ8ZP",
	    "align-content-md-end": "_4sUcMp6z-EgD4WM4OmVdD",
	    "align-content-md-center": "_2mMJT_OdDodTD3YD9Z9Q69",
	    "align-content-md-between": "_26uT-Vl7LyrZ0kCpwexYAG",
	    "align-content-md-around": "_1FZujsB9ax0730WiW0QTDi",
	    "align-content-md-stretch": "_2gjEJtfBScQSFNpPjFNuPR",
	    "align-self-md-auto": "_2KGejAeB7c2ZkSOWTe--ZW",
	    "align-self-md-start": "_3TY_hFBRsW7E5CUjylAjOZ",
	    "align-self-md-end": "_2janfShcGwPqBkXr002vBj",
	    "align-self-md-center": "_2jGNAbfveUEa1EY7bVNVuI",
	    "align-self-md-baseline": "_1Tz3DH3ZBg7oRIFDitXGq_",
	    "align-self-md-stretch": "_1miVC018MUokam7f3GXnqT",
	    "flex-lg-first": "_2EabjLkmqZR1aK0qr7P3J4",
	    "flex-lg-last": "_2ioJZj3ZCgcgpXVFtLWodP",
	    "flex-lg-unordered": "_1F99Xq4Oj21UKdYHdyh6Aw",
	    "flex-lg-row": "_1t1cwck4wmXeuDEvZjQYYY",
	    "flex-lg-column": "OOUI4kpKZt-SzZHgKdXWw",
	    "flex-lg-row-reverse": "_2TOVvvBbnjXoGVtODHlcFD",
	    "flex-lg-column-reverse": "_2L-zkRRGO_8W7VeuFJqUbB",
	    "flex-lg-wrap": "_10lT3UIOT0g4wdGoQ51BbV",
	    "flex-lg-nowrap": "_1NN5PPdmoT8I4KZqQSbAX5",
	    "flex-lg-wrap-reverse": "_2DJf4K_IbEaxbzpRHbjnro",
	    "justify-content-lg-start": "_37eFK127fIxdRXohJAaLIl",
	    "justify-content-lg-end": "FMCHTSNEQuYC566iKxvaf",
	    "justify-content-lg-center": "_1ZWRQf7_qzYm4d-adSV0X8",
	    "justify-content-lg-between": "_3TymN1tw1fpoR11sYggSSz",
	    "justify-content-lg-around": "_1gaho5ToL3Y11phGph0205",
	    "align-items-lg-start": "_3yyCTDSEFJM4NV200GUqTe",
	    "align-items-lg-end": "_1V49A177qHtACG45l1Nrfs",
	    "align-items-lg-center": "_1axhLh1Xb2zOkrCk6b_8Mz",
	    "align-items-lg-baseline": "_225hzzIYnPMnf7OtLhMwE-",
	    "align-items-lg-stretch": "_3wzVAO6mgjMuLxSPLjXkOK",
	    "align-content-lg-start": "_3axGZRPIQ6fO98scivVsxx",
	    "align-content-lg-end": "_3Guo3NiDXP8osURQ2KDIDM",
	    "align-content-lg-center": "_2i7s3Ptjq2YMva-D8FG3IV",
	    "align-content-lg-between": "RX_U1SrmKuhuggk46kh3y",
	    "align-content-lg-around": "hzk2xvn26FC6keFEvkGsO",
	    "align-content-lg-stretch": "_3w8SMCiR-4YRP6pUrCyR1F",
	    "align-self-lg-auto": "FYIhTqz-jKphD2HkufJ-Y",
	    "align-self-lg-start": "_1D9YwNwtKpTsMPTAKlNAen",
	    "align-self-lg-end": "_31P_PE-VyVZU8d5cJm4vMi",
	    "align-self-lg-center": "oVR1L44NxejL4O9dSfRzl",
	    "align-self-lg-baseline": "_2GRs38U47zPuuy58-1yUsy",
	    "align-self-lg-stretch": "_1oAxvMp0k5uLNMOscYAdx7",
	    "flex-xl-first": "_2IGXZ8tMdBApUJLejsWYyX",
	    "flex-xl-last": "_2Nv5b8raWzevWpBrHaM9i",
	    "flex-xl-unordered": "_2L80XVaC9fMOc-1cLZpAIR",
	    "flex-xl-row": "_1xyGQReYoMVj1Oou0MCI2u",
	    "flex-xl-column": "_1EJZIZUb6LYMbftL1uSw0t",
	    "flex-xl-row-reverse": "_1toQLGZH6AQsUHGtciMM3A",
	    "flex-xl-column-reverse": "_2GSUIsSWZm_TmyIoKGeoX3",
	    "flex-xl-wrap": "_3gI1B04-PLy_9zZ5qsFYNC",
	    "flex-xl-nowrap": "KwoilFso3GgMpvZ65vuEF",
	    "flex-xl-wrap-reverse": "_1O5w96KJSsadKSDgTTNf90",
	    "justify-content-xl-start": "_1_zyPBAm4XGb-uWEJhi38q",
	    "justify-content-xl-end": "_10e5muRJhIILxuxBqpryvo",
	    "justify-content-xl-center": "_2JmN18tjKKMN7CXAwZhCX_",
	    "justify-content-xl-between": "_3bve53K0dlsq4jbWyrmEFA",
	    "justify-content-xl-around": "HFLVstwuXpcZjnJoMuVA1",
	    "align-items-xl-start": "_1YWNnX4MFld7WeBG53Ir4G",
	    "align-items-xl-end": "_3LuyZ3Tk9QgXUZY2VBxAT4",
	    "align-items-xl-center": "_6a5WNelrRhMZXIrAFMbTp",
	    "align-items-xl-baseline": "_2g-RboXnzWd6kI16vuAPjk",
	    "align-items-xl-stretch": "_2lyRjywel32-XWr9o-AT9E",
	    "align-content-xl-start": "_3Epfrlgj9PcFeyinarkD3c",
	    "align-content-xl-end": "GJIZ5eVgYg0bnKPH3EIbe",
	    "align-content-xl-center": "_2xwZTnyDpxNT2rN2BazZkQ",
	    "align-content-xl-between": "XLpUoN3pb8PBxUa1Zuien",
	    "align-content-xl-around": "kRHRaZmCr0pQ0cyUYqGyY",
	    "align-content-xl-stretch": "_2Bdr6Q62WdPBUX-Yzm0Uwn",
	    "align-self-xl-auto": "_3nhv1BEqIONw2vMk9dMrmO",
	    "align-self-xl-start": "_272LpfKs-O_ClapcMvOkJm",
	    "align-self-xl-end": "iLKdVDjRDf-DOAIuTNRZ-",
	    "align-self-xl-center": "_1bAJP_hca81E3aI-s_NRmW",
	    "align-self-xl-baseline": "_1ohiE6698BwYLgFjz8Nd7Y",
	    "align-self-xl-stretch": "_3p9SBtWoSQYCrGrCiJorua",
	    "float-left": "_1M7O-YHg3qhvwo4Dd_09PZ",
	    "float-right": "_1iCtdWX5MjG-hZRtXmD-wE",
	    "float-none": "_3DUWow2aceIfgEczt2f_Qw",
	    "float-sm-left": "_3Shb-vqjReZ7t8eJARL3IY",
	    "float-sm-right": "_2lvO-Yev9ipblRA_liW3lc",
	    "float-sm-none": "_324onPyofeGWHS578nOjBT",
	    "float-md-left": "_2Lw2qBtraReOwGs7o9arX0",
	    "float-md-right": "sz_OppAl8mWfrK6sNC_F8",
	    "float-md-none": "_2fqgqE1o80AVyizQPMX91C",
	    "float-lg-left": "_18cgDrjvHvRrFnHX2jdX1t",
	    "float-lg-right": "_2mftlOwEdDUv7xL8YNPYt0",
	    "float-lg-none": "_25xi3Yv6224GIdsh2AFVvi",
	    "float-xl-left": "_1gguSxZVwaz1xhnStujX0G",
	    "float-xl-right": "_2XdbYILt7Lq2yAdwsnphKI",
	    "float-xl-none": "_1j5e1G2dKq7dnSIm7JsLgI",
	    "fixed-top": "_17xidm3p6c28rRagdDHlEr",
	    "fixed-bottom": "_2-rSCW8ZBm8y54W7uXAAyb",
	    "sticky-top": "_3PSmDC6iin8t7UomC7dZhg",
	    "sr-only": "GOH-nUpWvvh-acGY7rKgX",
	    "sr-only-focusable": "_2WXp5OmzJ_5eqmiV0kdyWF",
	    "w-25": "_3GRWnKkbW-CkMuu0Fb-7kk",
	    "w-50": "_3i3_i3yKQagT0pTILxtdMz",
	    "w-75": "X4mhdvzVczcEskS_QeXlQ",
	    "w-100": "_2iaS9VMMCUJXml43pXA3_i",
	    "h-25": "_1s9pasipo5vymDNs0_0Fcq",
	    "h-50": "TtZucQtkKB4c9PhNf0FoP",
	    "h-75": "_1epYjTF2cigN7HvLpYItCe",
	    "h-100": "_1oEACB1r455cvjZ3xlrgp5",
	    "mw-100": "_2Dd_KQIE5dWCTnZc_1xSeq",
	    "mh-100": "_23Y5iqS6GRCUVW2p9vy98q",
	    "m-0": "_17u7Zq19vvhqfMCkoN-K6k",
	    "mt-0": "_2VdZxsiYDADSz_UYv0xXm3",
	    "mr-0": "_3b-jzNKJPAyA4IyOUdzVwx",
	    "mb-0": "_2vaiUak3gMGGJY01YP9nMA",
	    "ml-0": "_332jTLfsLDdxFMew2LcE2Z",
	    "mx-0": "_3Zke_2QHvpGRgIIAz0bna2",
	    "my-0": "_2TH-nKochmCPs8Xnm_VjNg",
	    "m-1": "_2J6VWVcaG9JH2ChedO9haX",
	    "mt-1": "_2i3epWnGNy52qO7e94gzY6",
	    "mr-1": "_2wK4tKA0yNy_aFDB9zahot",
	    "mb-1": "o_nn23NykSSzrp9dkhoPb",
	    "ml-1": "_1z3bJ9JXLmvfeZG01bT_WC",
	    "mx-1": "_1OuoAHd-K27r0A9PuSRv6H",
	    "my-1": "_2NRyNl0Y6f2eKhID8xXhZw",
	    "m-2": "_2iT8cOj4bAilVamNgGldCA",
	    "mt-2": "_3ENGeu3KYdfKdFQSyMbLsx",
	    "mr-2": "_3hD8JdZwQZXxb0msitjy1C",
	    "mb-2": "_3l2JFarjOppREwufM3E4Oz",
	    "ml-2": "x_X8flm54SN15R0F4mPqD",
	    "mx-2": "_2mKl69vz6NnUCL0m_Ld4qD",
	    "my-2": "_16HYVCDJJqFWJcnwm-OE1n",
	    "m-3": "qL2ka-KcD18dhCAyKEUyN",
	    "mt-3": "_1C-WR6lHgxkv7hU98vXGbK",
	    "mr-3": "_2ski-vjz2ab1HOWkdX1ex6",
	    "mb-3": "_3zaBJVJSlWUJCCfX0j-fJQ",
	    "ml-3": "_242_7YGMYbQXeyCrlJvpX8",
	    "mx-3": "rAHZOO5oYaNDaR61Fkk4d",
	    "my-3": "Y8_8m99MRNWWMPrGsXBgY",
	    "m-4": "_1ve0Rw1c5At5QjvXPRrF6o",
	    "mt-4": "bk_cLPEHgyLGx35gBEMUP",
	    "mr-4": "xUL_Lmf74Zw1z_4qN_zjd",
	    "mb-4": "_2eVys5t4TlGRiGeIU5JzZJ",
	    "ml-4": "_1Q6QtHUCXmDh1NoD7qKHPK",
	    "mx-4": "_1kYdPuEd_B7WlAw9tabemX",
	    "my-4": "zS_y3ODnkvVh93cFMeuYV",
	    "m-5": "_3XvZrAxXEpbDxI3UQkv4HC",
	    "mt-5": "_3IV6xBktZFrtoeLPQhS43q",
	    "mr-5": "_1udKPcTCOM2MqQC6qsBTam",
	    "mb-5": "_34M-TIsjCY9XSh6Sniepyq",
	    "ml-5": "_1x4wE7b6es2Rn1e2WQ343Y",
	    "mx-5": "_29mv6XVBaArelgu7h2VyS5",
	    "my-5": "bUEJbnvaZc3g1mZixK0fT",
	    "p-0": "_3YcSo7yiYZHoD_9Ht3p10I",
	    "pt-0": "LSEgQLh3Okahavo8BLTqR",
	    "pr-0": "DZTY3pmV2PwQYwLr-ruLn",
	    "pb-0": "_1Uxjc-DoTwyzcSxV6iViJy",
	    "pl-0": "_1MOERbZNd1QB5YJlE_E5Ka",
	    "px-0": "_3NrHpdxmu4eI8VDKYGgqMf",
	    "py-0": "_7VTDpMNtFGViYNik8UhgR",
	    "p-1": "_2ejbBvoNU6xCBaU3y1-EHG",
	    "pt-1": "_2W0y41Cta9BtrfxewSrFig",
	    "pr-1": "_3eQtzUKhLMZiRLkrT3agMP",
	    "pb-1": "_15DGpAozl0nd1P7vD_Vrwx",
	    "pl-1": "_3InV1lylqBeqctArX0pWiI",
	    "px-1": "_3W23n5KZzCStGOmKzRh3dH",
	    "py-1": "_2PELdkNHCyrWNulVQAhhcP",
	    "p-2": "_2ig3Gyvq18QcjTEs-kl1iJ",
	    "pt-2": "_1MDgTwhWJK0vkaFpzDXtzY",
	    "pr-2": "_1HE-jF8b4flMEB_CYo65kF",
	    "pb-2": "_2oHQ00kaL5F_gFitL4zVZv",
	    "pl-2": "_1naYKeDUk4VM1Lp9v_ufBo",
	    "px-2": "_2-RjGDdpR2O_HHun1goW9k",
	    "py-2": "YGAIBC-P04kPbz4lIC-BS",
	    "p-3": "_2HBzvURg6knl14QarbHCII",
	    "pt-3": "_2_V1IL21H6L88vkW_k0A7H",
	    "pr-3": "_3G4zjke24XMmeb2aOTcPD2",
	    "pb-3": "_2kZuXl7_ZwZwTJN9Ugl6ks",
	    "pl-3": "_3tDZf55FzL4-zNZFZ3y-i_",
	    "px-3": "_1OpewdYZJQa1bmMeyEgb_6",
	    "py-3": "_2uQ9n43cjllAmippsqltke",
	    "p-4": "_1OYex6elyPzPCz6qH45kQT",
	    "pt-4": "_1Y2DBqYJd4IyT2uzWfsvjK",
	    "pr-4": "_19mc8rRCVGVXrjaW03R2y1",
	    "pb-4": "Spke4FEsrom-0zOR_hCSJ",
	    "pl-4": "_2GKedtxi_XGTrY-rF-BO3l",
	    "px-4": "_1cR8P6jEtj3Ki7iBjzTUV",
	    "py-4": "_1dqY3j4AYxHCit4i44QWhU",
	    "p-5": "NcZGwXoS2Bfz5BgUdxC7V",
	    "pt-5": "_6UoWE_w_SZwbW9YQ3A3Y4",
	    "pr-5": "_147Qx1szQ3lAdufqyslIaR",
	    "pb-5": "_294zDl8hLdWmjq65C7geVi",
	    "pl-5": "_3nEz_nBGkoNUm6pHCkl6kf",
	    "px-5": "_1zQWZX4ZL_gK7W7tGdPTxz",
	    "py-5": "_3udIBUk7o9X4luK_ktIhcw",
	    "m-auto": "_3I3kkB4ZVLdUZ4QqpxDdyf",
	    "mt-auto": "_1x7mbC0Y2vFo6jzgpJBzqN",
	    "mr-auto": "_2JuEzzryUIAuty_Hmz4n89",
	    "mb-auto": "_1T1ETBCIrYz4d023boVUq9",
	    "ml-auto": "_2-7zPgrM36lHcVDI9CCKyp",
	    "mx-auto": "_1cS7L9KPCPrC4BViWj-4Uv",
	    "my-auto": "_2VFm1wQ3y2BlvYj62k3D_j",
	    "m-sm-0": "_2xeKjKnyYg3BwKaQqo1jZE",
	    "mt-sm-0": "Sv4xw7nwHmd5q0CY1yVtr",
	    "mr-sm-0": "_1InEW5-HWhAvtGpaTQQvgN",
	    "mb-sm-0": "_2dLtnLAe9YFKcGUtVRFVpn",
	    "ml-sm-0": "_2DIBaqHze5RcY3kZuW_lsX",
	    "mx-sm-0": "_2VWp1_VoEGoFB3E0DpbIUy",
	    "my-sm-0": "_2IDiwxCEPQJrqF4AlEJo-D",
	    "m-sm-1": "Gk2L7yhCO8jG1tXb6-QXy",
	    "mt-sm-1": "_1q2JV4-uZJ0bMAAVgQhQrH",
	    "mr-sm-1": "_3lVnVYxKtdbkKoWlG6aEwT",
	    "mb-sm-1": "_3m7ZX6umvOVYCBEXLub23Q",
	    "ml-sm-1": "_1-vpRduC8NcnHWDKjGOIfK",
	    "mx-sm-1": "_1xcWnR1-b6ZPlY62aSknfA",
	    "my-sm-1": "_2J9AM1FW8SJhbSfYl2a3b8",
	    "m-sm-2": "_1veoZ3XygqmWMMq7_54BP1",
	    "mt-sm-2": "_2eL1qY4A_WHkAhxSgLvfGc",
	    "mr-sm-2": "_3UKEzVL1v0FJQr5D8bYsI_",
	    "mb-sm-2": "_23SzwFYLq2AEYuPu-yGbvy",
	    "ml-sm-2": "_5h6zN5-Uw-u8MEJVIVsFV",
	    "mx-sm-2": "_qiT0wHYqA8W2hh3zO4_G",
	    "my-sm-2": "Gi1F95S107kgct_BkNXrl",
	    "m-sm-3": "_1wWn3c4jr2P2wHeeiLzc3U",
	    "mt-sm-3": "_18Wn8rGKo8lpMqlhtGnpTG",
	    "mr-sm-3": "-u0WkvnKV5aO7kLDWh8sL",
	    "mb-sm-3": "_1-Nn3YIt3wEoQM12TriqLc",
	    "ml-sm-3": "_1u0fkNPag-g9xCavYrjmPl",
	    "mx-sm-3": "_3ywAjJhLyIrwvJ8DjyEDRU",
	    "my-sm-3": "_1U47Ji_l-1y1xQceSFYIga",
	    "m-sm-4": "_3qiyTOx9CpR5xKBDGIhlVk",
	    "mt-sm-4": "_3aU-cQZEbifYhzX7rlVFE7",
	    "mr-sm-4": "_3aTCNrj6pNAnxOicLHeELa",
	    "mb-sm-4": "_340KDAWBKCrgoh6TMbbAC8",
	    "ml-sm-4": "_2j2ID8xCkAKWI6z6VZK54R",
	    "mx-sm-4": "_3kl0Lou7omSZ9sTsU_5eaA",
	    "my-sm-4": "_1mGsPn1IE_Y1Nm9bRLUPNV",
	    "m-sm-5": "_2ICaELvQDIuzQsOkKwF7F4",
	    "mt-sm-5": "_2TgMfFKUBmEpUH0puwRZLY",
	    "mr-sm-5": "_1xDXZfGSCpegLSqY8Tnzj8",
	    "mb-sm-5": "_3Trn8D8ii_tSbKJbzm7erH",
	    "ml-sm-5": "_2fqayd0brKvDqZABQV96OP",
	    "mx-sm-5": "_2HqhdD4Xzm1QEKntUf_Xdq",
	    "my-sm-5": "_3EVGRfMga-DA1-rGx1gr-F",
	    "p-sm-0": "_12WqZCSfKiAp-pUgdJMdfC",
	    "pt-sm-0": "_2S1vnZco74W2_vIYuEa2Hu",
	    "pr-sm-0": "nhGnA5MAchZ_BDAanacv9",
	    "pb-sm-0": "GFDpk5LPhz5dV-7Yofhj7",
	    "pl-sm-0": "_3jUKaVGnilORBjX4pVenrs",
	    "px-sm-0": "_3KH5GqabfAj66AxFfSJwyp",
	    "py-sm-0": "_39t3Ed54nwctF4R769JKnb",
	    "p-sm-1": "_2T8BWTjuiqjLmqhmvIdiZ_",
	    "pt-sm-1": "_2yXhuLouTPut6jNZQ8QhK",
	    "pr-sm-1": "_1sP8LoCwmTBxq-Nna-_qTM",
	    "pb-sm-1": "aWLCRlMEQBveGwZjFGH4J",
	    "pl-sm-1": "_2nrjteIH6robI2wWq9-aQO",
	    "px-sm-1": "_1UJqB_yfV7f9VSI7dZ3GOv",
	    "py-sm-1": "_1u_zyePuOcVrWXsWBLGYR6",
	    "p-sm-2": "_2Dy8nkFgBqwaqz1MlsQn8k",
	    "pt-sm-2": "_1_BJPclC0gRixebICeJ2KJ",
	    "pr-sm-2": "_8-x73kyfEIaffpaSasOnZ",
	    "pb-sm-2": "fRTuT1O_2_7Q3DeLaKa_h",
	    "pl-sm-2": "_1YYmVfThKPiQfW8tH1Dgg5",
	    "px-sm-2": "_3GT6Ug1-j93f0q9UauSEH7",
	    "py-sm-2": "_1u9yUCi6cgSi15If9zVGav",
	    "p-sm-3": "A5_os6Z33x1CeFDED4ITN",
	    "pt-sm-3": "_2CNBh9NSKvf42IbTtUV0Ro",
	    "pr-sm-3": "yp4tDIfeYukRNx7c11sR2",
	    "pb-sm-3": "_2LUph5Ccq4ThRgSEAOG9Fq",
	    "pl-sm-3": "_2UECxXrqK3YPf5lhkTy2gj",
	    "px-sm-3": "_3AFALE1eI3ycEW165Y2HEI",
	    "py-sm-3": "iE7L-K2tk-JQSqPWcB8YC",
	    "p-sm-4": "_2ovT8MVUFuSgjkCtM8Z3EO",
	    "pt-sm-4": "_2iJhxrKy1yOUr8_mDb-7Vl",
	    "pr-sm-4": "_3DPiECBpmuowRkW-K_yDb",
	    "pb-sm-4": "_3KH4O2A3JijWzEutGO84G7",
	    "pl-sm-4": "_1BuDX56YB1IiqI-yqWiKnU",
	    "px-sm-4": "_2K1jyZP4UeDhXGpyxksAjT",
	    "py-sm-4": "_1sSVxyypSAwjkE3oX4jYpc",
	    "p-sm-5": "YFTISUwHqzG72p5QDM6pg",
	    "pt-sm-5": "_2JBB0FIsW8d2Ypjn_NLxM",
	    "pr-sm-5": "_3iJWdLbwOgbpO8U7S2sV4W",
	    "pb-sm-5": "_3PxbXlGfhVNgth4CHRWFX7",
	    "pl-sm-5": "_3vPJv13Egc8l7Y_aLcvY_s",
	    "px-sm-5": "piCyZnHGhzfMujbV0-Onm",
	    "py-sm-5": "_2oe0Qg_atMBbyWJm7IxEv7",
	    "m-sm-auto": "_3BaLPKzjAB7MGxeu9GR5kj",
	    "mt-sm-auto": "_2Xes8fdvIsdEQqjru_7Tb7",
	    "mr-sm-auto": "_1gyWkwrh6Aun_g_0kaO1z2",
	    "mb-sm-auto": "_3qVzPG_J3pMRfJID7GZU9Y",
	    "ml-sm-auto": "_3vAKKxYZF399Xlq0MeNjrA",
	    "mx-sm-auto": "_2Zde_9jJW7pKRcG5OofMXK",
	    "my-sm-auto": "_2nE-PaQ5K7H_935FQhpKiN",
	    "m-md-0": "_1_pTxDznLbYfkXprqZNEAC",
	    "mt-md-0": "_3m5POcYSWTJrQ95djvmVcx",
	    "mr-md-0": "_4spQOyq89fTZPGtkUm7Gg",
	    "mb-md-0": "_2tc2vnlY271gFUbbv2gv5g",
	    "ml-md-0": "_2ZwWoTSx32lAR3q7L3dgMT",
	    "mx-md-0": "_3fjIhNDc67x2atdIiO_TXP",
	    "my-md-0": "wTBYtDJtS72DSsWIoafQ5",
	    "m-md-1": "gEQsS5yw3rqCzN0Hct5Eb",
	    "mt-md-1": "_39p4JJkXCX6CE3Am9ldyGu",
	    "mr-md-1": "_3MUqfgqTL_0UQzYozmO49w",
	    "mb-md-1": "_2hyJHb7ls9L7ViqVotoksK",
	    "ml-md-1": "_3mZq0myrxjmtnQfUyMMKRO",
	    "mx-md-1": "_3f4YHKMGTaj9aVOAQnklRe",
	    "my-md-1": "_1qxbqLq50H1qIjgZaK4lsz",
	    "m-md-2": "_9bzmvv_nFMAdnpEz-jgF4",
	    "mt-md-2": "_2AxyRccWw5eH0Gavnr9Fgs",
	    "mr-md-2": "_3-BErYjNEvkJVdIpWIbDAc",
	    "mb-md-2": "_3LZkzCwKfh4LrtxeOvrvJJ",
	    "ml-md-2": "_35W9VedteE2Py_ttbed84Z",
	    "mx-md-2": "SCmsbcgOdcD-DlWhdx16O",
	    "my-md-2": "_2vr9kau3zdXoMt3pfEBb0J",
	    "m-md-3": "_3-upFutFRVP0sMbJsuGSUn",
	    "mt-md-3": "_1FWo4C4S5ux_FC8cFCom9U",
	    "mr-md-3": "_2xuhpIbUHqTa49mB2xq4s7",
	    "mb-md-3": "_2O7tXPsuRzC3Jk3gw8Hqqs",
	    "ml-md-3": "_330tnqzW7lu1chLro5Qrun",
	    "mx-md-3": "_21676n8WYbBWmP1iIzBRs4",
	    "my-md-3": "ZRhqWUx7iBY40cTiwfwL3",
	    "m-md-4": "_2QwhfYef_CHuKI9cysoPt2",
	    "mt-md-4": "_1xFb4LhLTrgToWjiOcefbi",
	    "mr-md-4": "GWpy6B1T0BQPbwDcA1F_x",
	    "mb-md-4": "_2nlIo6sRkCuWCet2CwT_Bx",
	    "ml-md-4": "_3cafSRdOlm90tj50qH0Kei",
	    "mx-md-4": "_1AI11vaA-v5g_OswUifxxM",
	    "my-md-4": "_36kj5xdgroS6MxEx4Ejv4W",
	    "m-md-5": "_2qgNy773b7DPw2dhFTtQmS",
	    "mt-md-5": "_1KsPpLQQM9873cRKDHyRbs",
	    "mr-md-5": "_2P_fkpFZQihNCUAdq0XdIS",
	    "mb-md-5": "_2m1-3XB2w6_9uBbLCpFDHD",
	    "ml-md-5": "YOXbjWuSNz-R09FuPPgOL",
	    "mx-md-5": "_1LFvtRDbkRzn2wI6fpvLgu",
	    "my-md-5": "_3_sCw4SjxMWr4pc-jSlDRY",
	    "p-md-0": "_2OaF5dEdBDjwc96HeVgkYU",
	    "pt-md-0": "_353ePjY_fFcbefx9Nxwokz",
	    "pr-md-0": "_10trSDWfpm-I3Koi7M4gsD",
	    "pb-md-0": "_3fkp9aY9vJGCakubUR1RBv",
	    "pl-md-0": "_3Tj3-bsh6p9vktoYDxaOGl",
	    "px-md-0": "EJmi3XxH-rDEM-jq2eoL6",
	    "py-md-0": "_30k0Z6uyo116GvGfW212zT",
	    "p-md-1": "_1zaBIKKBHdHCXCFMMH3ZeL",
	    "pt-md-1": "OlmD0JsD1swkH2rYVp4vF",
	    "pr-md-1": "FGkUACrL2lg2Op7Uy5gT2",
	    "pb-md-1": "F8O_8zsYfQeXE_4ZjH41k",
	    "pl-md-1": "_3kqxssar2LFNW0fjegQxke",
	    "px-md-1": "_2OP28oERhKDQkKjYsxTbqy",
	    "py-md-1": "_2Td0ZiQYPO8IBKc_uQZgCs",
	    "p-md-2": "_2uQ02dmvMsBl6h-tD4z5Yy",
	    "pt-md-2": "Tj8ZOTJOT8dan8v7nbtPM",
	    "pr-md-2": "dIYkmiMwTLOPVCgbAcXG6",
	    "pb-md-2": "yPokcNBtRbm2Pq9ictucf",
	    "pl-md-2": "_1iVzcS4btQRF5uVj_Hk6cO",
	    "px-md-2": "_2FdhltTnPvz8OnltjP-1Fj",
	    "py-md-2": "_1m_rDL-T0YnVzws53JLWqt",
	    "p-md-3": "ui0gKmSCH5dIFyxHmon3H",
	    "pt-md-3": "_1h91Lz_uuZhtHymMDQUgCP",
	    "pr-md-3": "_3ZVPsH71daf9TyAe1G5y1G",
	    "pb-md-3": "gaHCbUnsYJjI2Ol5-TKEn",
	    "pl-md-3": "_2yKvTeU8aHjUoc3SV8aLJ-",
	    "px-md-3": "_3bXZHolVOoaGBqcnxsZ826",
	    "py-md-3": "_1UtMl0xrQOGB3aGHbZ8pYW",
	    "p-md-4": "_1c8V89zY_jrS708cWWVYp2",
	    "pt-md-4": "_3F9Ms1SC6jg8FsiOCTSBz-",
	    "pr-md-4": "XDJjL_tnbQOLQ-dVG4l1h",
	    "pb-md-4": "_3AaDjoCCmcwZ3EeC84Qtne",
	    "pl-md-4": "j2DipO1PbP350txT3E7Mo",
	    "px-md-4": "_2-ewCuGHFPSJsHSruPHynM",
	    "py-md-4": "_1DxOio0KmewOmQRq1h-LaM",
	    "p-md-5": "_1bNENxaiM41OPdmncDDzIt",
	    "pt-md-5": "_1cSB-m9lOPQ5zjPGzDfVsX",
	    "pr-md-5": "_3XMo9OAxRySwEPYu84Tzg9",
	    "pb-md-5": "_1tUsGX_wZx4qMwyl9LlAUd",
	    "pl-md-5": "_2PzPujUlcVSxrQjUws38rA",
	    "px-md-5": "_2p0_gjoUpQgRAFOSSvpK4H",
	    "py-md-5": "_2uH3E6ch_ECytCKdtEQwTA",
	    "m-md-auto": "_11m0VhaHYA18PmasMZZ7nT",
	    "mt-md-auto": "_3trcdH8B6O7k62zN5cJKM4",
	    "mr-md-auto": "_3PgPOZ6aYQXOWtk-Jx4Fj3",
	    "mb-md-auto": "_2EvfkYng-U0hFPr6a_98h7",
	    "ml-md-auto": "_3Rtx71DUCQgFsxb0yXgb3O",
	    "mx-md-auto": "_7_e0Nma7RvwmtUT1WEijP",
	    "my-md-auto": "_3kXNEjzFdd6vxV5gN75BEC",
	    "m-lg-0": "_3DMej-NcAeZUCVGW8ZNJdd",
	    "mt-lg-0": "eYkgwq2MBwZRGByfKD3_7",
	    "mr-lg-0": "_3MbYrKmOmB61KkOuYms30o",
	    "mb-lg-0": "_2whoZx6mOZ277NeS4x6Kt0",
	    "ml-lg-0": "_lUOC0JcKcUP1Me89WJLF",
	    "mx-lg-0": "_1XKWDRSuYMnIYAUfMZVjwE",
	    "my-lg-0": "_1n2j35eThQUrUKRQNCtlQ4",
	    "m-lg-1": "_11RC9kHQ5DwS2rhKp-gWvl",
	    "mt-lg-1": "_3dUcvXCkTApQbRVyalt_Pv",
	    "mr-lg-1": "_1ATaAnAy-3T2AxtQt8LWzX",
	    "mb-lg-1": "Bdk1WVjTYd0-lYSOBjzsE",
	    "ml-lg-1": "_2pd2ep9joErhJkVE0t3Lne",
	    "mx-lg-1": "_5mv0ZJCnQzQe3TDNZ6jOJ",
	    "my-lg-1": "m2c2wBEJr3D-YK7nY1ml3",
	    "m-lg-2": "_1TOi0q09Lwb-HG8yuSyYZv",
	    "mt-lg-2": "_21g82P6zcWrEsOK5AMJiSv",
	    "mr-lg-2": "_2GNwoDfr3V0L6Yc6JDnAZC",
	    "mb-lg-2": "_5UzENj2mLrNKlceW941Ce",
	    "ml-lg-2": "_1xNZ0wF5QcW7dG0eApdoy9",
	    "mx-lg-2": "_1ORFjmRWUFhXZQ1HfjNRvQ",
	    "my-lg-2": "_1PWXox5U3qByey9g7v1ooN",
	    "m-lg-3": "_3kaH-CGC6KNRBDXn8fimX5",
	    "mt-lg-3": "_2bZXq4J20ot58oE_T07G06",
	    "mr-lg-3": "_1QO6-kJRPDVcewgsw6ngid",
	    "mb-lg-3": "ah5m0AQJrec0P4e0ZLYwk",
	    "ml-lg-3": "_30dj0oYjoMpfeJ2sqMRoFZ",
	    "mx-lg-3": "oWkptsDlt20XJdVKZ6lhi",
	    "my-lg-3": "_3VAJqHT46MCLAvL_KN78lB",
	    "m-lg-4": "_2PCD6xBMTR61kw7iJd-n3V",
	    "mt-lg-4": "P09D-V7xpo5LGD2FfIaKb",
	    "mr-lg-4": "_3LgdNHBSFb3YZJ8Gf-n0rb",
	    "mb-lg-4": "_1P7wwffZo95Jh2GsyDApvs",
	    "ml-lg-4": "R3D3tstH0gK4g5Ghh8TJ6",
	    "mx-lg-4": "_3yz3BCIC17p60gaPkk3Qc9",
	    "my-lg-4": "_2i4JOubXaO8RYiEcIgjcxF",
	    "m-lg-5": "_2n8_zDw9UDFkzjv19E62T0",
	    "mt-lg-5": "_2Tjtkyl7byK9KgUb3JXXUL",
	    "mr-lg-5": "_3DWRAYqn6rmbOyg3WhLhrD",
	    "mb-lg-5": "Z0wZXNIuZzMkeuPVhieb8",
	    "ml-lg-5": "_2e-_LWHelZhcfb9M9jlxgh",
	    "mx-lg-5": "_3rE9fpHutcfxpr7Cpg09vY",
	    "my-lg-5": "_3-hVOnDrekJge8OdSD8qI",
	    "p-lg-0": "_2SW4rLH7sp4G2r7FVEQNHp",
	    "pt-lg-0": "_3qeOqDzoNkp3CMzvMlvyyY",
	    "pr-lg-0": "_2O0HJEO4Y4-dQbpN-3j3pD",
	    "pb-lg-0": "CIEtpcSgbvLJrhwyRgmrx",
	    "pl-lg-0": "_3Ih0ePo6WcIKD-cPQRWaOQ",
	    "px-lg-0": "_3Tg-ax91BXL6ze0-kUL94j",
	    "py-lg-0": "nnkCTzkBuA5923d3uJ5uE",
	    "p-lg-1": "wmeELtNcZaf2xqyVQZlHH",
	    "pt-lg-1": "_3eXrLWTEzdpKlnOr6PlX3I",
	    "pr-lg-1": "_2xZLnN5p8X0CztESQxXLmA",
	    "pb-lg-1": "_2vyb__5hu_RcEMPRE3LLKN",
	    "pl-lg-1": "_6Bu10tT6B3h167J4fKpze",
	    "px-lg-1": "_3y7CUDT3wN7syvS7FmSMeR",
	    "py-lg-1": "_2mxI-GFlpR5ZLtXtXQuUlx",
	    "p-lg-2": "_2seWR9jgiFy1JNGAeNF5kN",
	    "pt-lg-2": "_16d1G3R0SuuDMWUhf9hnYt",
	    "pr-lg-2": "_2WrfQrnqpi8mltosWXKjib",
	    "pb-lg-2": "_3Hwo43LqG-ylvqzgTTMxZz",
	    "pl-lg-2": "ToE_1W4aklCGZn5IPkBIR",
	    "px-lg-2": "wLpGlBzuZNmXbHwYMVs5C",
	    "py-lg-2": "_1-MnOqP0nbv5XpiLjy_ug_",
	    "p-lg-3": "_3-gIzqLBMTaoo0RyPtMp8t",
	    "pt-lg-3": "_21NmogYavZ9ccVcq7qynvX",
	    "pr-lg-3": "PnutpMHSVTMfNyZCSn_hW",
	    "pb-lg-3": "_1I0n5czwNp6Jo_0sxCvzJK",
	    "pl-lg-3": "_9WBrMumBE3ZJoufH6wY2a",
	    "px-lg-3": "_2XC4TERcNPt_Ba-oH2f7CL",
	    "py-lg-3": "_1E75MJy4dzFTRgcQMs5AND",
	    "p-lg-4": "_1f9lykffQMPQA5PqBYc8_j",
	    "pt-lg-4": "_2em0URt18BOYYUslf8LbSh",
	    "pr-lg-4": "_3pa7DtWiWtaW8qPBNMagj9",
	    "pb-lg-4": "vg7PYx6p00foudlrAt-7e",
	    "pl-lg-4": "_1zwoHS4ZLf10i4piM3QVOc",
	    "px-lg-4": "_1QxdddImLZhYwS9ie7jljF",
	    "py-lg-4": "_1cSxcPiMhN7UAknfNbX_b7",
	    "p-lg-5": "_3tIo3oFQs9tT4tp9ao72_R",
	    "pt-lg-5": "sH3SpYq9PzgGolEOYcfin",
	    "pr-lg-5": "_2PqrM-ktiKlA1qdm3kVtG4",
	    "pb-lg-5": "YeOiH3vZkoBcnlJx-Sl7e",
	    "pl-lg-5": "_2n8VJYdOsVW1FhxYYnkwAO",
	    "px-lg-5": "_3l0VR5Fuq2cQCUEJrlSChA",
	    "py-lg-5": "_36YLNO5PUopzB4mblNZtCm",
	    "m-lg-auto": "_3Xfd5S3_L_Y0VbMp3XQy1a",
	    "mt-lg-auto": "_3jlgyDwv5FCSAn39cZjiGm",
	    "mr-lg-auto": "_3NoWRbCRYwJqAuMdexcGcv",
	    "mb-lg-auto": "_1BAOUYLcRQpGpmmqpUsmLv",
	    "ml-lg-auto": "_2Gn7P7l27TQWbQq4Q8ZLEZ",
	    "mx-lg-auto": "_2hDTvlB-mKe2ntqccsYgBn",
	    "my-lg-auto": "_3e0EXAGue1_S2P9RkkrDDR",
	    "m-xl-0": "SqOZ--02hNxIKXJZHZ8Lc",
	    "mt-xl-0": "_21Me7NEIMSRS96iTB1fqGb",
	    "mr-xl-0": "_2PKLMjUlsdf9pjjKhvbGLe",
	    "mb-xl-0": "_3Y_jHFa2zXbzGPZJkGLC12",
	    "ml-xl-0": "_1aKc_s_nmfYPiY_Jr6bE4l",
	    "mx-xl-0": "_2Pl9GHznmjHtCgmMGGkJbV",
	    "my-xl-0": "_2VzSJz201hzrtI61g7W2sP",
	    "m-xl-1": "MumkiH1GFV-yvUTo4ShTO",
	    "mt-xl-1": "_1H0qDI9cwDFYmH-07mw9At",
	    "mr-xl-1": "_12vhBRPuvwGdxC1ckgyAT0",
	    "mb-xl-1": "_3eFkgjFkNUnumDnuY2iRkU",
	    "ml-xl-1": "_39MypQ23gs9pAg4q1trG-w",
	    "mx-xl-1": "_2p0tVSC7r84OfSLQWG0MWQ",
	    "my-xl-1": "_1I8A-FGbe50GbqvrzZpWnr",
	    "m-xl-2": "_3ZFrfNdZ-fMMXboMIyBKS_",
	    "mt-xl-2": "_3I-7g1BhTG70pWyftaVTDI",
	    "mr-xl-2": "aFRq6VeCi3_0eWn6n5TTc",
	    "mb-xl-2": "_2FDBqIX_7wvOisry3dEtQN",
	    "ml-xl-2": "_1Ln2-_yxYumNeoAkUVNz2U",
	    "mx-xl-2": "_3_1r8AmoefMHO55BRpVulL",
	    "my-xl-2": "tXropCInKTH-zBcEVdSG_",
	    "m-xl-3": "_2R3kWd0aoCUaQPEQd0EZcb",
	    "mt-xl-3": "rCy6HF5IbKE9yOwrjcYOX",
	    "mr-xl-3": "_33eKiO3cMdIn5lzFVAVCjp",
	    "mb-xl-3": "_1TcUvmiPPat_zj8-chBkNO",
	    "ml-xl-3": "_1xO37MSzmE8DZKKsf9y7di",
	    "mx-xl-3": "zsxXFupnGEBGbk4h9bB0F",
	    "my-xl-3": "_3qXn5kYxtAl5pEJTVizqd9",
	    "m-xl-4": "_1BXfDybc9C7X2m6DEbFtlP",
	    "mt-xl-4": "_25H2L3aB2nDkZIb0g9DDyA",
	    "mr-xl-4": "_1EcUildRueptx3f-GFWaGL",
	    "mb-xl-4": "_2VPJEWF_kdiEwPGkBVMSf3",
	    "ml-xl-4": "_1zQArgutJHL17N5IMB5KTr",
	    "mx-xl-4": "_10-6depFEz9CXryPfLwKlh",
	    "my-xl-4": "d-pu6wtAySOq2aQX5M_g2",
	    "m-xl-5": "_1xQIgPbaESGsJJALc9NT06",
	    "mt-xl-5": "_2KEDH-w24IEYJ663q2tKo7",
	    "mr-xl-5": "coTETbScdsWegbzjV7KMu",
	    "mb-xl-5": "_2hFavuiVvOJ-Z38BvWmTte",
	    "ml-xl-5": "_3SAwUSVVGkLuWjQhMUU89e",
	    "mx-xl-5": "SPa8f6LoQEbWFruA5k3a4",
	    "my-xl-5": "xJy3K7zAyyKbyflSCm0Ds",
	    "p-xl-0": "OWnheY4NxpdTY46cGuM0M",
	    "pt-xl-0": "_1T54uifwhDCg3wtR9xcGB9",
	    "pr-xl-0": "_2ZKu5ggWxEYR4zgGPc0akh",
	    "pb-xl-0": "_29DChuKTedtmRuR2ADLdyj",
	    "pl-xl-0": "fn088FV0Hor6Iuz_LG5WN",
	    "px-xl-0": "_3s_8qPtTbTNRN1qEFzHx0V",
	    "py-xl-0": "_1zpcGeDeQ7tIG-AWvUevNL",
	    "p-xl-1": "_1TQRzXEhYxeresING_nEMX",
	    "pt-xl-1": "_3wMii58sughtnbJQibI9ec",
	    "pr-xl-1": "_1FrjuRD77zp3DVaQ69cI-6",
	    "pb-xl-1": "LTn3qnGBiqy7TNa0iwSKo",
	    "pl-xl-1": "_37J_LI2ZOv-ljlqQgTBuT6",
	    "px-xl-1": "_3p8hsM2pGxm1GYwrVJFYaH",
	    "py-xl-1": "_2T2J3lw_R11oQtIFOD2mav",
	    "p-xl-2": "_1NiSyXnvihHpGzNKd9Vbe7",
	    "pt-xl-2": "pz-syt3Euc9SMvnP4QSUR",
	    "pr-xl-2": "JWCDM9ys21SUbdjvdztYK",
	    "pb-xl-2": "_3Sec9j4RC39U-Lwg1c1Bo_",
	    "pl-xl-2": "_3rrngYVz8M0P46W3oY0p2m",
	    "px-xl-2": "_1y7KjM3lLE1fUsKiDPQktz",
	    "py-xl-2": "_3Agi-QCxrhhXKcJCiKn4N7",
	    "p-xl-3": "_2w0fBGYu0HncuvgXRnDZCz",
	    "pt-xl-3": "_2HWaVYwKddvRA15Rgd8wER",
	    "pr-xl-3": "HzG95MQexGVEEDLV7EUjY",
	    "pb-xl-3": "_2MnQbbMNXh9fqUVCUbCi1R",
	    "pl-xl-3": "_2UR7KrSrej1O_zXQlATASL",
	    "px-xl-3": "OKMWW5MW-apQRO7GsJla7",
	    "py-xl-3": "_38gviHAEPjhOKRBA8XQ9NI",
	    "p-xl-4": "_1Ee8tUuACIG-EZhVu8o9lC",
	    "pt-xl-4": "p4Qsw0MSH96c4JdZwazgE",
	    "pr-xl-4": "j8RsOqO26SqD3w_scTw7C",
	    "pb-xl-4": "_2EMTtINEWrADoEwEx1YH3f",
	    "pl-xl-4": "_24ZO7kLuim4XhATyRwHvJt",
	    "px-xl-4": "_2ILO_2QcAWTWDXtFcmw5ya",
	    "py-xl-4": "QK3k5gRFpjI9Sp5ARQjK-",
	    "p-xl-5": "_3ZywqiqC3vtmVL-YeW1PBg",
	    "pt-xl-5": "_1g6SoRHLfR6qh7qNaJOLUV",
	    "pr-xl-5": "_1m3v90c2jsK5mOa6oII2iS",
	    "pb-xl-5": "_2P67OCic1mEDQKn2hkFm1R",
	    "pl-xl-5": "_1IXgyHivGGH5MEyteGEb2Q",
	    "px-xl-5": "-PLPVc7NzKXUaGAhEh1ZS",
	    "py-xl-5": "_2ipdK_EPcDeTuIxg1WZY6h",
	    "m-xl-auto": "_963pL_4-IqY6spqyaGYbk",
	    "mt-xl-auto": "_3wJZl_EYNmRiq7rwgXHU7C",
	    "mr-xl-auto": "_3aZGf01hecVyNd1fduIxjU",
	    "mb-xl-auto": "_3jk_ox3UPRNGCsr-zyj7kO",
	    "ml-xl-auto": "wDbygOcmKOYoethnAzt02",
	    "mx-xl-auto": "cgK2V6sZSj9i6DcBbKzc5",
	    "my-xl-auto": "tur5huz_WW4N-MoBcupqj",
	    "text-justify": "_c_l0mxilJFDu05XuLKto",
	    "text-nowrap": "_1WWavjsGsw7K_kZBYEb13I",
	    "text-truncate": "_1-FZJGeVjwUwmq4uacgFRp",
	    "text-left": "_1zcv0TMYS-QClDXy5ez4K0",
	    "text-right": "_2jb9-EsdPfZJ4wF61htcIh",
	    "text-center": "_3DK9QMrN5ZdZO99jOzMvbl",
	    "text-sm-left": "_2SfJ80Xk19j-U44zwZdusC",
	    "text-sm-right": "_3rRaVNGAayB-jmaI95miGB",
	    "text-sm-center": "PbTSc-pbacL2QPMHOVQ-g",
	    "text-md-left": "_1Mj78bcSY0F2O6Z0LXGZ6T",
	    "text-md-right": "_2qUOTRp5F2nf3C6aTjsTKN",
	    "text-md-center": "_1zVknTlQJm0-exKLxa-8lh",
	    "text-lg-left": "_26yP7xQnlkStBYVznzsjH4",
	    "text-lg-right": "_29XdAMmvTLyf2BW3W4-yXI",
	    "text-lg-center": "_287bEhVeKnFo5RFBFaLGBx",
	    "text-xl-left": "_2_kx6h7KNVYedsjmPx0D8h",
	    "text-xl-right": "_3Od28t6o1GF8kyoobW7KtM",
	    "text-xl-center": "hPgZOEy4qND8ohq1ChAOS",
	    "text-lowercase": "_1Olp-zfp3qVUgIiXur3NxR",
	    "text-uppercase": "rykzmaODm1thzh-E7yz8H",
	    "text-capitalize": "_2YqwHf8AInZ1tdl2IyuFpQ",
	    "font-weight-normal": "swcRUfWBQMveZQTA-rJ3X",
	    "font-weight-bold": "l4yip9MS8U8VNUt18g02h",
	    "font-italic": "_1wZTxPmiiST8Q-qQmLfVyo",
	    "text-white": "_1_YjX6X35B2jCBx_Mno9QY",
	    "text-muted": "_1Ytvgarwu66ruNyAoj_Kme",
	    "text-primary": "rOZIsZcE5Uo6qolXIn6kp",
	    "text-success": "_4rWi81JLyWCF04Lc7UEfa",
	    "text-info": "_3dxfU_EOipupqx3grvxmLi",
	    "text-warning": "_1gii59IRUIQ7I7QfwFnHC4",
	    "text-danger": "_2sOez-rMCcqs8M0yTQqEld",
	    "text-gray-dark": "_37MzOS07hAtwYJDlcHHyy2",
	    "text-hide": "_1fO7UO6OhUKUBNtlgmU9i2",
	    "invisible": "UNfoGdRhGShv-0ngWjHb-",
	    "hidden-xs-up": "_27IqjkrOeinEbdzj9mSz8j",
	    "hidden-xs-down": "_1MhoG-bSn50__PFJSC8vsT",
	    "hidden-sm-up": "_22j-XSNRYE4kFxIthZOY93",
	    "hidden-sm-down": "_1u5dwXCpMs42gF4m7eerm2",
	    "hidden-md-up": "_2hYxK95zXJk9KE_gv5ZDTI",
	    "hidden-md-down": "tscomr7gxdocyhAh_XTuL",
	    "hidden-lg-up": "_2BuGG7sAX-XBufRe0FLOBJ",
	    "hidden-lg-down": "_1WDqfY27D5IH_MfmL3AIqs",
	    "hidden-xl-up": "_2eGg9o7eZzdessP7gOEFz0",
	    "hidden-xl-down": "_3XWdEcLQT1w-rKJzMElCDQ",
	    "visible-print-block": "_1L7Al3X1wtrdPLdGydsrwV",
	    "visible-print-inline": "_3yTwvZaHvlfI9tBngmuV5J",
	    "visible-print-inline-block": "_1bqTKxcXpMjKDz6muHHttC",
	    "hidden-print": "_36T2dMhVZF-VysV4q9qAoJ"
	});
	var _App = {
	    "container": "_4uEyKcd5WHob5qPzotT7"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactHelmet = __webpack_require__(22);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _DevTools = __webpack_require__(25);
	
	var _DevTools2 = _interopRequireDefault(_DevTools);
	
	var _Header = __webpack_require__(66);
	
	var _Header2 = _interopRequireDefault(_Header);
	
	var _Footer = __webpack_require__(65);
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	var _RoomListPage = __webpack_require__(30);
	
	var _RoomListPage2 = _interopRequireDefault(_RoomListPage);
	
	var _AppActions = __webpack_require__(8);
	
	var _IntlActions = __webpack_require__(27);
	
	var _UserActions = __webpack_require__(7);
	
	var _RoomActions = __webpack_require__(6);
	
	var _MessageActions = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	// Import Components
	
	
	// Import Actions
	
	
	var socket = (0, _socket2.default)('');
	
	var _ref = _jsx(_DevTools2.default, {});
	
	var _ref2 = _jsx(_reactstrap.Col, {
	    sm: '4'
	}, void 0, _jsx(_RoomListPage2.default, {}));
	
	var _ref3 = _jsx(_Footer2.default, {});
	
	var App = exports.App = function (_Component) {
	    _inherits(App, _Component);
	
	    function App(props) {
	        _classCallCheck(this, App);
	
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	
	        _this.state = {
	            isMounted: false
	            // isUserInit: false
	        };
	        _this.handleLogout = _this.handleLogout.bind(_this);
	        return _this;
	    }
	
	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;
	
	            this.setState({
	                isMounted: true
	            });
	            this.props.dispatch((0, _UserActions.isLoggedIn)());
	            this.props.dispatch((0, _AppActions.initSocket)(socket));
	
	            // this.props.dispatch(subscribeUser(this.props.user));
	
	            socket.on('receiveMessage', function (message) {
	                _this2.props.dispatch((0, _MessageActions.receiveMessage)(message));
	            });
	
	            socket.on('connectedUsers', function (users) {
	                _this2.props.dispatch((0, _UserActions.usersConnected)(users));
	            });
	
	            socket.on('userDisconnected', function (user) {
	                _this2.props.dispatch((0, _UserActions.userDisconnected)(user));
	            });
	
	            socket.on('roomAdded', function (room) {
	                _this2.props.dispatch((0, _RoomActions.addRoom)(room));
	            });
	
	            socket.on('userIsWritting', function (user) {
	                _this2.props.dispatch((0, _UserActions.setUserIsWritting)(user, 1));
	            });
	
	            socket.on('userStopWritting', function (user) {
	                _this2.props.dispatch((0, _UserActions.setUserIsWritting)(user, 0));
	            });
	        }
	    }, {
	        key: 'handleLogout',
	        value: function handleLogout() {
	            socket.emit('userDisconnection');
	            this.props.dispatch((0, _UserActions.logoutUser)());
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            return _jsx('div', {}, void 0, this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && _ref, this.state.isMounted ? _jsx('div', {}, void 0, _jsx(_Header2.default, {
	                switchLanguage: function switchLanguage(lang) {
	                    return _this3.props.dispatch((0, _IntlActions.switchLanguage)(lang));
	                },
	                intl: this.props.intl,
	                user: this.props.user,
	                logout: function logout() {
	                    return _this3.handleLogout();
	                }
	            }), _jsx(_reactstrap.Container, {
	                fluid: true,
	                className: 'mb-3 mt-3'
	            }, void 0, this.props.user ? _jsx(_reactstrap.Row, {}, void 0, _ref2, _jsx(_reactstrap.Col, {
	                sm: '8'
	            }, void 0, this.props.children)) : this.props.children), _ref3) : null);
	        }
	    }]);
	
	    return App;
	}(_react.Component);
	
	// Retrieve data from store as props
	function mapStateToProps(store) {
	    return {
	        intl: store.intl,
	        user: store.users.user,
	        connectedUsers: store.users.data
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Import Actions
	
	
	var _AppActions = __webpack_require__(8);
	
	var _MessageActions = __webpack_require__(9);
	
	// Initial State
	var initialState = {
	    socket: null
	};
	
	var AppReducer = function AppReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    switch (action.type) {
	
	        case _AppActions.INIT_SOCKET:
	            return _extends({}, state, {
	                socket: action.socket
	            });
	
	        case _AppActions.SEND_SOCKET:
	            state.socket.emit(action.data.type, action.data.data);
	
	        case _AppActions.RECEIVE_SOCKET:
	
	        default:
	            return state;
	    }
	};
	
	/* Selectors */
	
	// Export Reducer
	exports.default = AppReducer;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Style
	
	
	exports.Footer = Footer;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(3);
	
	var _Footer = {
	  "footer": "_3vPEi87A1wyh1iLR3bsBGf"
	};
	
	var _Footer2 = _interopRequireDefault(_Footer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import Images
	
	var _ref = _jsx('p', {}, void 0, '\xA9 2017 \xB7 OffAxis');
	
	function Footer() {
	  return _jsx('div', {
	    style: { background: '#333' },
	    className: _Footer2.default.footer
	  }, void 0, _ref);
	}
	
	exports.default = Footer;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _Header = {
	    "header": "_2sEZYfHlvDy9uXqVIXG1aM",
	    "content": "_1eavAvnySzoZc5rld6Q4pa",
	    "site-title": "UfFn6muOcOBjkVI5_yltp",
	    "language-switcher": "_3bviQya5ZWCvWr6lGdfO9h",
	    "selected": "_3IRlmCpgSZBcTGVIGHvgaI"
	};
	
	var _Header2 = _interopRequireDefault(_Header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref = _jsx(_reactstrap.DropdownItem, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'notificationNo'
	}));
	
	var _ref2 = _jsx(_reactstrap.NavbarBrand, {
	    tag: _reactRouter.Link,
	    to: '/'
	}, void 0, 'OffAxis/Chat');
	
	var _ref3 = _jsx(_reactstrap.DropdownToggle, {
	    caret: true
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'switchLanguage'
	}));
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	    id: 'userLogout'
	});
	
	var _ref5 = _jsx(_reactstrap.NavItem, {}, void 0, _jsx(_reactstrap.NavLink, {
	    tag: _reactRouter.Link,
	    to: '/user/register'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userRegister'
	})));
	
	var _ref6 = _jsx(_reactstrap.NavItem, {}, void 0, _jsx(_reactstrap.NavLink, {
	    tag: _reactRouter.Link,
	    to: '/login'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userLogin'
	})));
	
	var Header = function (_Component) {
	    _inherits(Header, _Component);
	
	    function Header(props) {
	        _classCallCheck(this, Header);
	
	        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
	
	        _this.toggle = _this.toggle.bind(_this);
	        _this.toggleDropdownLanguage = _this.toggleDropdownLanguage.bind(_this);
	        _this.toggleDropdownNotifications = _this.toggleDropdownNotifications.bind(_this);
	
	        _this.state = {
	            isOpen: false,
	            dropdownLanguageOpen: false,
	            dropdownNotificationsOpen: false
	        };
	        return _this;
	    }
	
	    _createClass(Header, [{
	        key: 'toggle',
	        value: function toggle() {
	            this.setState({
	                isOpen: !this.state.isOpen
	            });
	        }
	    }, {
	        key: 'toggleDropdownLanguage',
	        value: function toggleDropdownLanguage() {
	            this.setState({
	                dropdownLanguageOpen: !this.state.dropdownLanguageOpen
	            });
	        }
	    }, {
	        key: 'toggleDropdownNotifications',
	        value: function toggleDropdownNotifications() {
	            this.setState({
	                dropdownNotificationsOpen: !this.state.dropdownNotificationsOpen
	            });
	        }
	    }, {
	        key: 'getLanguageNodes',
	        value: function getLanguageNodes() {
	            var _this2 = this;
	
	            var languageNodes = this.props.intl.enabledLanguages.map(function (lang) {
	                return _jsx(_reactstrap.DropdownItem, {}, lang, _jsx(_reactstrap.NavLink, {
	                    onClick: function onClick() {
	                        return _this2.props.switchLanguage(lang);
	                    },
	                    className: lang === _this2.props.intl.locale ? _Header2.default.selected : ''
	                }, void 0, lang));
	            });
	            return languageNodes;
	        }
	    }, {
	        key: 'renderNotifications',
	        value: function renderNotifications() {
	            var distinctRooms = [];
	            var notificationsList = '';
	            if (this.props.user.unreadMessages) {
	                notificationsList = this.props.user.unreadMessages.map(function (message) {
	                    if (distinctRooms.indexOf(message.room) == -1) {
	                        distinctRooms.push(message.room);
	                        return _jsx(_reactstrap.DropdownItem, {}, message.room.cuid, _jsx(_reactstrap.NavLink, {
	                            tag: _reactRouter.Link,
	                            to: '/rooms/' + message.room.cuid
	                        }, void 0, message.room.title));
	                    }
	                });
	            } else {
	                notificationsList = _ref;
	            }
	            return _jsx(_reactstrap.NavDropdown, {
	                isOpen: this.state.dropdownNotificationsOpen,
	                toggle: this.toggleDropdownNotifications
	            }, void 0, _jsx(_reactstrap.DropdownToggle, {
	                caret: true
	            }, void 0, _jsx(_reactstrap.Badge, {
	                color: 'primary',
	                pill: true
	            }, void 0, this.props.user.unreadMessages ? this.props.user.unreadMessages.length : 0)), _jsx(_reactstrap.DropdownMenu, {}, void 0, notificationsList));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.Navbar, {
	                color: 'faded',
	                light: true,
	                toggleable: true
	            }, void 0, _jsx(_reactstrap.NavbarToggler, {
	                right: true,
	                onClick: this.toggle
	            }), _ref2, _jsx(_reactstrap.Collapse, {
	                isOpen: this.state.isOpen,
	                navbar: true
	            }, void 0, _jsx(_reactstrap.Nav, {
	                className: 'ml-auto',
	                navbar: true
	            }, void 0, _jsx(_reactstrap.NavDropdown, {
	                isOpen: this.state.dropdownLanguageOpen,
	                toggle: this.toggleDropdownLanguage
	            }, void 0, _ref3, _jsx(_reactstrap.DropdownMenu, {}, void 0, this.getLanguageNodes())), this.props.user ? this.renderNotifications() : null, this.props.user ? _jsx(_reactstrap.NavItem, {}, void 0, _jsx(_reactstrap.NavLink, {
	                tag: _reactRouter.Link,
	                to: '/profile'
	            }, void 0, this.props.user.name)) : '', this.props.user ? _jsx(_reactstrap.NavItem, {}, void 0, _jsx(_reactstrap.NavLink, {
	                href: '#',
	                onClick: function onClick() {
	                    return _this3.props.logout();
	                }
	            }, void 0, _ref4)) : '', !this.props.user ? _ref5 : '', !this.props.user ? _ref6 : ''))));
	        }
	    }]);
	
	    return Header;
	}(_react.Component);
	
	exports.default = Header;
	
	
	Header.contextTypes = {
	    router: _react2.default.PropTypes.object
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.displayErrors = displayErrors;
	function displayErrors(response) {
	    if (response.errors) {
	        for (var i in response.errors) {
	            var error = response.errors[i];
	            alert(error.type + ' : ' + error.message);
	        }
	    }
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _setup = __webpack_require__(24);
	
	var _IntlActions = __webpack_require__(27);
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var initLocale = global.navigator && global.navigator.language || 'en';
	
	var initialState = _extends({
	  locale: initLocale,
	  enabledLanguages: _setup.enabledLanguages
	}, _setup.localizationData[initLocale] || {});
	
	var IntlReducer = function IntlReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case _IntlActions.SWITCH_LANGUAGE:
	      {
	        var type = action.type,
	            actionWithoutType = _objectWithoutProperties(action, ['type']); // eslint-disable-line
	
	
	        return _extends({}, state, actionWithoutType);
	      }
	
	    default:
	      return state;
	  }
	};
	
	exports.default = IntlReducer;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Import Actions
	
	
	var _MessageActions = __webpack_require__(9);
	
	// Initial State
	var initialState = {
	    isSending: false
	};
	
	var MessageReducer = function MessageReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    switch (action.type) {
	
	        case _MessageActions.SENDING_MESSAGE:
	            return _extends({}, state, {
	                isSending: true
	            });
	
	        case _MessageActions.ADD_MESSAGE:
	            return _extends({}, state, {
	                isSending: false
	            });
	
	        default:
	            return state;
	    }
	};
	
	exports.default = MessageReducer;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactstrap = __webpack_require__(1);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _MessageActions = __webpack_require__(9);
	
	var _AppActions = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Impor Actions
	
	
	var _ref = _jsx(_reactFontawesome2.default, {
	    name: 'spinner',
	    spin: true
	});
	
	var _ref2 = _jsx(_reactFontawesome2.default, {
	    name: 'paper-plane-o'
	});
	
	var MessageAddForm = function (_Component) {
	    _inherits(MessageAddForm, _Component);
	
	    function MessageAddForm(props) {
	        _classCallCheck(this, MessageAddForm);
	
	        var _this = _possibleConstructorReturn(this, (MessageAddForm.__proto__ || Object.getPrototypeOf(MessageAddForm)).call(this, props));
	
	        _this.state = {
	            content: ''
	        };
	
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }
	
	    _createClass(MessageAddForm, [{
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            if (this.state.content == '' && nextState.content != '') {
	                this.props.dispatch((0, _AppActions.sendSocket)({ type: 'userIsWritting', data: this.props.user }));
	            } else if (this.state.content != '' && nextState.content == '') {
	                this.props.dispatch((0, _AppActions.sendSocket)({ type: 'userStopWritting', data: this.props.user }));
	            }
	        }
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event) {
	            this.setState({
	                content: event.target.value
	            });
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            this.props.dispatch((0, _MessageActions.sendMessage)());
	            this.props.dispatch((0, _MessageActions.addMessageRequest)(this.props.user, this.props.room, this.state.content));
	            this.setState({ content: '' });
	            return false;
	        }
	    }, {
	        key: 'isSending',
	        value: function isSending() {
	            return this.props.isSending;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {
	                className: 'mt-3'
	            }, void 0, _jsx(_reactstrap.Form, {
	                onSubmit: this.handleSubmit
	            }, void 0, _jsx(_reactstrap.InputGroup, {}, void 0, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'content',
	                value: this.state.content,
	                placeholder: 'Type your message here...',
	                onChange: this.handleChange,
	                disabled: this.isSending(),
	                autoFocus: true
	            }), _jsx(_reactstrap.InputGroupButton, {}, void 0, _jsx(_reactstrap.Button, {
	                color: 'success',
	                disabled: this.isSending()
	            }, void 0, this.isSending() ? _ref : _ref2)))));
	        }
	    }]);
	
	    return MessageAddForm;
	}(_react.Component);
	
	function mapStateToProps(state, props) {
	    return {
	        user: state.users.user,
	        isSending: state.messages.isSending
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageAddForm);

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactstrap = __webpack_require__(1);
	
	var _UserProfileImage = __webpack_require__(16);
	
	var _UserProfileImage2 = _interopRequireDefault(_UserProfileImage);
	
	var _date = __webpack_require__(82);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MessageView = function (_Component) {
	    _inherits(MessageView, _Component);
	
	    function MessageView(props) {
	        _classCallCheck(this, MessageView);
	
	        var _this = _possibleConstructorReturn(this, (MessageView.__proto__ || Object.getPrototypeOf(MessageView)).call(this, props));
	
	        _this.toggle = _this.toggle.bind(_this);
	        _this.getFormattedDate = _this.getFormattedDate.bind(_this);
	        _this.state = { collapse: false };
	        return _this;
	    }
	
	    _createClass(MessageView, [{
	        key: 'toggle',
	        value: function toggle() {
	            this.setState({ collapse: !this.state.collapse });
	        }
	    }, {
	        key: 'isWriter',
	        value: function isWriter() {
	            return this.props.message.user.cuid == this.props.user.cuid;
	        }
	    }, {
	        key: 'getFormattedDate',
	        value: function getFormattedDate() {
	            return (0, _date.dateFormat)(this.props.message.dateAdded);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, this.isWriter() ? _jsx('div', {
	                className: 'text-right'
	            }, void 0, _jsx('a', {
	                onClick: this.toggle,
	                style: { marginBottom: '1rem' }
	            }, void 0, this.props.message.content, ' ', _jsx(_UserProfileImage2.default, {
	                user: this.props.message.user,
	                isHidden: this.props.isSameWriter
	            }, this.props.message.cuid)), _jsx(_reactstrap.Collapse, {
	                isOpen: this.state.collapse
	            }, void 0, _jsx('small', {}, void 0, this.getFormattedDate()))) : _jsx('div', {}, void 0, _jsx('a', {
	                onClick: this.toggle,
	                style: { marginBottom: '1rem' }
	            }, void 0, _jsx(_UserProfileImage2.default, {
	                id: this.props.message.cuid,
	                user: this.props.message.user,
	                isHidden: this.props.isSameWriter
	            }, this.props.message.cuid), ' ', this.props.message.content), _jsx(_reactstrap.Collapse, {
	                isOpen: this.state.collapse
	            }, void 0, _jsx('small', {}, void 0, this.getFormattedDate()))));
	        }
	    }]);
	
	    return MessageView;
	}(_react.Component);
	
	function mapStateToProps(state, props) {
	    return {
	        user: state.users.user
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageView);

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RoomAddForm = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.CardHeader, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'roomCreate'
	}));
	
	var _ref2 = _jsx(_reactstrap.Label, {
	    'for': 'titleField'
	}, void 0, 'Title');
	
	var _ref3 = _jsx(_reactstrap.FormGroup, {}, void 0, _jsx(_reactstrap.Button, {
	    color: 'success'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'submit'
	})));
	
	var RoomAddForm = exports.RoomAddForm = function (_Component) {
	    _inherits(RoomAddForm, _Component);
	
	    function RoomAddForm(props) {
	        _classCallCheck(this, RoomAddForm);
	
	        var _this = _possibleConstructorReturn(this, (RoomAddForm.__proto__ || Object.getPrototypeOf(RoomAddForm)).call(this, props));
	
	        _this.state = {
	            title: ''
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }
	
	    _createClass(RoomAddForm, [{
	        key: 'handleChange',
	        value: function handleChange(event) {
	            var target = event.target;
	            var value = target.type === 'checkbox' ? target.checked : target.value;
	            var name = target.name;
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.state.title) {
	                this.props.addRoom(this.state.title);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx(_reactstrap.Card, {}, void 0, _ref, _jsx(_reactstrap.CardBlock, {}, void 0, _jsx(_reactstrap.Form, {
	                onSubmit: this.handleSubmit
	            }, void 0, _jsx(_reactstrap.FormGroup, {}, void 0, _ref2, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'title',
	                id: 'titleField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.roomTitle,
	                value: this.state.title
	            })), _ref3)));
	        }
	    }]);
	
	    return RoomAddForm;
	}(_react.Component);
	
	//
	// RoomList.propTypes = {
	//   rooms: PropTypes.arrayOf(PropTypes.shape({
	//     title: PropTypes.string.isRequired,
	//     slug: PropTypes.string.isRequired,
	//     cuid: PropTypes.string.isRequired,
	//     participants: PropTypes.array,
	//   })).isRequired,
	//   handleJoinRoom: PropTypes.func.isRequired,
	// };
	
	exports.default = (0, _reactIntl.injectIntl)(RoomAddForm);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _RoomListItem = __webpack_require__(74);
	
	var _RoomListItem2 = _interopRequireDefault(_RoomListItem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Components
	
	
	var _ref = _jsx(_reactFontawesome2.default, {
	    name: 'times-circle'
	});
	
	var RoomList = function (_Component) {
	    _inherits(RoomList, _Component);
	
	    function RoomList(props) {
	        _classCallCheck(this, RoomList);
	
	        var _this = _possibleConstructorReturn(this, (RoomList.__proto__ || Object.getPrototypeOf(RoomList)).call(this, props));
	
	        _this.state = {
	            searchText: '',
	            pagesSize: 5,
	            pagesCount: 0,
	            activePage: 1,
	            roomsCount: props.rooms ? props.rooms.length : 0,
	            roomsSearch: props.rooms ? props.rooms.length : []
	        };
	
	        _this.handleSearch = _this.handleSearch.bind(_this);
	        _this.handleClearSearch = _this.handleClearSearch.bind(_this);
	        _this.getRoomsSearch = _this.getRoomsSearch.bind(_this);
	        _this.setActivePage = _this.setActivePage.bind(_this);
	        return _this;
	    }
	
	    // componentWillUpdate(nextProps, nextState) {
	    //     if(nextProps != this.props) {
	    //         this.setRoomsSearch();
	    //     }
	    // }
	
	    _createClass(RoomList, [{
	        key: 'handleSearch',
	        value: function handleSearch(event) {
	            this.setState({
	                searchText: event.target.value,
	                activePage: 1
	            });
	        }
	    }, {
	        key: 'handleClearSearch',
	        value: function handleClearSearch() {
	            this.setState({
	                searchText: ''
	            });
	        }
	    }, {
	        key: 'getRoomsSearch',
	        value: function getRoomsSearch() {
	            var _this2 = this;
	
	            var roomsSearch = [];
	            if (this.props.rooms && this.props.rooms.length) {
	
	                roomsSearch = this.state.searchText != '' ? this.props.rooms.filter(function (room) {
	                    return room.title.toLowerCase().indexOf(_this2.state.searchText.toLowerCase()) !== -1;
	                }) : this.props.rooms;
	
	                // this.setState({
	                //     roomsSearch: roomsSearch,
	                //     roomsCount: roomsSearch.length
	                // });
	            }
	            return roomsSearch;
	        }
	    }, {
	        key: 'getUnReadMessagesCount',
	        value: function getUnReadMessagesCount(room) {
	            if (this.props.user && this.props.user.unreadMessages) {
	                var unReadMessagesOfRoom = this.props.user.unreadMessages.filter(function (message) {
	                    return message.room.cuid == room.cuid;
	                });
	                return unReadMessagesOfRoom.length;
	            }
	            return 0;
	        }
	    }, {
	        key: 'setActivePage',
	        value: function setActivePage(nextPage) {
	            this.setState({
	                activePage: nextPage
	            });
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;
	
	            var roomsSearch = this.getRoomsSearch();
	            var pagesCount = Math.ceil(roomsSearch.length / this.state.pagesSize);
	
	            var pages = [];
	            for (var i = 1; i <= pagesCount; i++) {
	                pages.push(i);
	            }
	
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.ListGroup, {}, void 0, _jsx(_reactstrap.ListGroupItem, {}, void 0, _jsx(_reactstrap.InputGroup, {}, void 0, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'search',
	                value: this.state.searchText,
	                onChange: this.handleSearch,
	                placeholder: 'Search a room'
	            }), this.state.searchText !== '' ? _jsx(_reactstrap.InputGroupButton, {}, void 0, _jsx(_reactstrap.Button, {
	                color: 'danger',
	                onClick: this.handleClearSearch
	            }, void 0, _ref)) : null)), roomsSearch.length && this.state.searchText ? _jsx(_reactstrap.ListGroupItem, {}, void 0, roomsSearch.length, ' rooms') : null, roomsSearch.length ? roomsSearch.map(function (room, i) {
	                if (_this3.state.pagesSize * (_this3.state.activePage - 1) <= i && i <= _this3.state.pagesSize * _this3.state.activePage) {
	                    return _react2.default.createElement(_RoomListItem2.default, _extends({
	                        room: room,
	                        key: room.cuid,
	                        joinRoom: function joinRoom(room) {
	                            _this3.props.joinRoom(room);
	                        },
	                        unJoinRoom: function unJoinRoom(room) {
	                            _this3.props.unJoinRoom(room);
	                        },
	                        unReadMessagesCount: _this3.getUnReadMessagesCount(room)
	                    }, _this3.props));
	                }
	            }) : null), pages.length ? _jsx(_reactstrap.Pagination, {
	                className: 'justify-content-center'
	            }, void 0, pages.map(function (pageNumber) {
	                return _jsx(_reactstrap.PaginationItem, {
	                    active: _this3.state.activePage == pageNumber
	                }, pageNumber, _jsx(_reactstrap.PaginationLink, {
	                    href: '#',
	                    onClick: function onClick() {
	                        return _this3.setActivePage(pageNumber);
	                    }
	                }, void 0, pageNumber));
	            })) : null);
	        }
	    }]);
	
	    return RoomList;
	}(_react.Component);
	
	//
	// RoomList.propTypes = {
	//   rooms: PropTypes.arrayOf(PropTypes.shape({
	//     title: PropTypes.string.isRequired,
	//     slug: PropTypes.string.isRequired,
	//     cuid: PropTypes.string.isRequired,
	//     participants: PropTypes.array,
	//   })).isRequired,
	//   handleJoinRoom: PropTypes.func.isRequired,
	// };
	
	exports.default = RoomList;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(5);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Import Style
	// import styles from './RoomListItem.css';
	
	function RoomListItem(props) {
	    return _jsx(_reactstrap.ListGroupItem, {
	        className: 'justify-content-between'
	    }, void 0, _jsx(_reactRouter.Link, {
	        to: '/rooms/' + props.room.cuid,
	        onClick: function onClick() {
	            props.joinRoom(props.room);
	        }
	    }, void 0, props.room.title), props.unReadMessagesCount ? _jsx(_reactstrap.Badge, {
	        pill: true
	    }, void 0, props.unReadMessagesCount) : null);
	}
	// {
	//     props.user && props.user.cuid
	//     ? (
	//          <p>
	//             {
	//                 isUserParticipating(props.room, props.user)
	//                 ? <Button outline color="warning" block onClick={() => {props.unJoinRoom(props.room)}}><FormattedMessage id="roomUnJoin" /></Button>
	//                 : <Button outline color="primary" block ><FormattedMessage id="roomJoin" /></Button>
	//             }
	//         </p>
	//     )
	//     : null
	// }
	//
	// RoomListItem.propTypes = {
	//   post: PropTypes.shape({
	//       title: PropTypes.string.isRequired,
	//       slug: PropTypes.string.isRequired,
	//       cuid: PropTypes.string.isRequired,
	//       participants: PropTypes.array,
	//   }).isRequired,
	//   onDelete: PropTypes.func.isRequired,
	// };
	
	exports.default = RoomListItem;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _MessageView = __webpack_require__(71);
	
	var _MessageView2 = _interopRequireDefault(_MessageView);
	
	var _RoomReducer = __webpack_require__(12);
	
	var _RoomActions = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.Alert, {
	    color: 'warning'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'roomNoMessages'
	}));
	
	var MessagesList = function (_Component) {
	    _inherits(MessagesList, _Component);
	
	    function MessagesList(props) {
	        _classCallCheck(this, MessagesList);
	
	        return _possibleConstructorReturn(this, (MessagesList.__proto__ || Object.getPrototypeOf(MessagesList)).call(this, props));
	    }
	
	    _createClass(MessagesList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.init();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            this.init();
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            if (this.props.room && !this.props.room.messagesData) {
	                this.props.dispatch((0, _RoomActions.fetchMessages)(this.props.room));
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var previousWriter = null;
	            return _jsx('div', {}, void 0, this.props.room.messagesData ? this.props.room.messagesData.length ? _jsx('div', {}, void 0, this.props.room.messagesData.map(function (message) {
	                var isSameWriter = false;
	                if (previousWriter == message.user.cuid) {
	                    isSameWriter = true;
	                }
	                previousWriter = message.user.cuid;
	                return _jsx(_MessageView2.default, {
	                    message: message,
	                    isSameWriter: isSameWriter
	                }, message.cuid);
	            })) : _ref : null);
	        }
	    }]);
	
	    return MessagesList;
	}(_react.Component);
	
	function mapStateToProps(state, props) {
	    return {
	        room: (0, _RoomReducer.getRoom)(state, props.room.cuid)
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessagesList);

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _UserProfileImage = __webpack_require__(16);
	
	var _UserProfileImage2 = _interopRequireDefault(_UserProfileImage);
	
	var _RoomReducer = __webpack_require__(12);
	
	var _RoomActions = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.Alert, {
	    color: 'warning'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'roomNoParticipants'
	}));
	
	var ParticipantsList = function (_Component) {
	    _inherits(ParticipantsList, _Component);
	
	    function ParticipantsList(props) {
	        _classCallCheck(this, ParticipantsList);
	
	        return _possibleConstructorReturn(this, (ParticipantsList.__proto__ || Object.getPrototypeOf(ParticipantsList)).call(this, props));
	    }
	
	    _createClass(ParticipantsList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.init();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            this.init();
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            if (this.props.room && !this.props.room.participantsData) {
	                this.props.dispatch((0, _RoomActions.fetchParticipants)(this.props.room));
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	
	            return _jsx('div', {}, void 0, this.props.room.participantsData ? this.props.room.participantsData.length ? _jsx('div', {}, void 0, this.props.room.participantsData.map(function (user) {
	                return _jsx(_UserProfileImage2.default, {
	                    id: user.cuid,
	                    user: user
	                }, user.cuid);
	            })) : _ref : null);
	        }
	    }]);
	
	    return ParticipantsList;
	}(_react.Component);
	
	function mapStateToProps(state, props) {
	    return {
	        room: (0, _RoomReducer.getRoom)(state, props.room.cuid)
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ParticipantsList);

/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.stringToColour = stringToColour;
	function stringToColour(str) {
	    var hash = 0;
	    for (var i = 0; i < str.length; i++) {
	        hash = str.charCodeAt(i) + ((hash << 5) - hash);
	    }
	    var colour = '#';
	    for (var i = 0; i < 3; i++) {
	        var value = hash >> i * 8 & 0xFF;
	        colour += ('00' + value.toString(16)).substr(-2);
	    }
	    return colour;
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Import Actions
	
	
	var _UserActions = __webpack_require__(7);
	
	var _RoomActions = __webpack_require__(6);
	
	var _MessageActions = __webpack_require__(9);
	
	var _storage = __webpack_require__(18);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Initial State
	var initialState = {
	    user: {
	        token: null,
	        joinedRoomsData: [],
	        activeRoom: null,
	        unreadMessages: []
	    },
	    data: []
	};
	
	var UserReducer = function UserReducer() {
	    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	    var action = arguments[1];
	
	    var unreadMessages = [];
	    if (state.user && state.user.unreadMessages) {
	        unreadMessages = state.user.unreadMessages.slice();
	    }
	
	    switch (action.type) {
	
	        case _UserActions.LOGIN_USER:
	            if (_storage2.default) {
	                // Save token in local storage
	                _storage2.default.setItem('jwtToken', action.token);
	            }
	            action.user.token = action.token;
	            action.user.connected = 1;
	            return _extends({}, state, {
	                user: Object.assign({}, state.user, action.user)
	            });
	
	        case _UserActions.LOGOUT_USER:
	            if (_storage2.default) {
	                _storage2.default.removeItem('jwtToken');
	            }
	            return _extends({}, state, {
	                user: null
	            });
	
	        case _UserActions.CONNECTED_USER:
	            return _extends({}, state, {
	                data: [].concat(_toConsumableArray(state.data), [action.user])
	            });
	
	        case _UserActions.CONNECTED_USERS:
	            return _extends({}, state, {
	                data: action.users
	            });
	
	        case _UserActions.DISCONNECTED_USER:
	            var newData = state.data.filter(function (user) {
	                return user.cuid != action.user.cuid;
	            });
	            return _extends({}, state, {
	                data: newData
	            });
	
	        case _UserActions.SET_USER_JOINED_ROOMS:
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    joinedRoomsData: action.rooms
	                })
	            });
	
	        case _UserActions.ADD_USER_JOINED_ROOM:
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    joinedRoomsData: [].concat(_toConsumableArray(state.user.joinedRoomsData), [action.room])
	                })
	            });
	
	        case _UserActions.REMOVE_USER_JOINED_ROOM:
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    joinedRoomsData: state.user.joinedRoomsData.filter(function (room) {
	                        return room.cuid !== action.room.cuid;
	                    })
	                })
	            });
	
	        case _RoomActions.SET_ACTIVE_ROOM:
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    activeRoom: action.room
	                })
	            });
	
	        case _MessageActions.RECEIVE_MESSAGE:
	
	            if (!state.user.activeRoom || action.message.room && action.message.room.cuid != state.user.activeRoom.cuid) {
	                unreadMessages.push(action.message);
	            }
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    unreadMessages: unreadMessages
	                })
	            });
	
	        case _UserActions.SET_READ_MESSAGES:
	            return _extends({}, state, {
	                user: _extends({}, state.user, {
	                    unreadMessages: unreadMessages.filter(function (message) {
	                        return message.room.cuid != action.room.cuid;
	                    })
	                })
	            });
	
	        default:
	            return state;
	    }
	};
	
	exports.default = UserReducer;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UserConnected = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	var _UserProfileImage = __webpack_require__(16);
	
	var _UserProfileImage2 = _interopRequireDefault(_UserProfileImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.Alert, {
	    color: 'warning'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userNoConnected'
	}));
	
	var UserConnected = exports.UserConnected = function (_Component) {
	    _inherits(UserConnected, _Component);
	
	    function UserConnected(props) {
	        _classCallCheck(this, UserConnected);
	
	        return _possibleConstructorReturn(this, (UserConnected.__proto__ || Object.getPrototypeOf(UserConnected)).call(this, props));
	    }
	
	    _createClass(UserConnected, [{
	        key: 'getConnectedUsers',
	        value: function getConnectedUsers() {
	            return this.props.users.filter(function (user) {
	                return user.connected;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, this.getConnectedUsers().length ? this.getConnectedUsers().map(function (user, index) {
	                return _jsx(_UserProfileImage2.default, {
	                    id: 'connected-user-' + user.cuid,
	                    user: user
	                }, index);
	            }) : _ref);
	        }
	    }]);
	
	    return UserConnected;
	}(_react.Component);
	
	function mapStateToProps(state, props) {
	    return {
	        users: state.users.data
	    };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(UserConnected);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UserRegisterForm = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(3);
	
	var _reactstrap = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactstrap.CardHeader, {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userRegister'
	}));
	
	var _ref2 = _jsx(_reactstrap.Label, {
	    'for': 'nameField'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userName'
	}));
	
	var _ref3 = _jsx(_reactstrap.Label, {
	    'for': 'emailField'
	}, void 0, 'Email');
	
	var _ref4 = _jsx(_reactstrap.Label, {
	    'for': 'passwordField'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'userPassword'
	}));
	
	var _ref5 = _jsx(_reactstrap.FormGroup, {}, void 0, _jsx(_reactstrap.Button, {
	    color: 'success',
	    block: true
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	    id: 'submit'
	})));
	
	var _ref6 = _jsx(Alert, {
	    color: 'danger'
	}, void 0, 'this.state.message');
	
	var UserRegisterForm = exports.UserRegisterForm = function (_Component) {
	    _inherits(UserRegisterForm, _Component);
	
	    function UserRegisterForm(props) {
	        _classCallCheck(this, UserRegisterForm);
	
	        var _this = _possibleConstructorReturn(this, (UserRegisterForm.__proto__ || Object.getPrototypeOf(UserRegisterForm)).call(this, props));
	
	        _this.state = {
	            email: '',
	            password: '',
	            name: '',
	            error: false,
	            message: ''
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }
	
	    _createClass(UserRegisterForm, [{
	        key: 'handleChange',
	        value: function handleChange(event) {
	            var target = event.target;
	            var value = target.type === 'checkbox' ? target.checked : target.value;
	            var name = target.name;
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.state.email && this.state.password && this.state.name) {
	                this.props.register(this.state.email, this.state.password, this.state.name);
	            } else {
	                this.setState({
	                    error: true,
	                    message: 'Please fill all fields !'
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _jsx('div', {}, void 0, _jsx(_reactstrap.Card, {}, void 0, _ref, _jsx(_reactstrap.CardBlock, {}, void 0, _jsx(_reactstrap.Form, {
	                onSubmit: this.handleSubmit
	            }, void 0, _jsx(_reactstrap.FormGroup, {}, void 0, _ref2, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'name',
	                id: 'nameField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.userName,
	                value: this.state.name
	            })), _jsx(_reactstrap.FormGroup, {}, void 0, _jsx(_reactstrap.Row, {}, void 0, _jsx(_reactstrap.Col, {
	                sm: '6'
	            }, void 0, _ref3, _jsx(_reactstrap.Input, {
	                type: 'text',
	                name: 'email',
	                id: 'emailField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.userEmail,
	                value: this.state.email
	            })), _jsx(_reactstrap.Col, {
	                sm: '6'
	            }, void 0, _ref4, _jsx(_reactstrap.Input, {
	                type: 'password',
	                name: 'password',
	                id: 'passwordField',
	                onChange: this.handleChange,
	                placeholder: this.props.intl.messages.userPassword,
	                value: this.state.password
	            })))), _ref5), this.state.error ? _ref6 : '')));
	        }
	    }]);
	
	    return UserRegisterForm;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(UserRegisterForm);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(41);
	
	var _AppReducer = __webpack_require__(64);
	
	var _AppReducer2 = _interopRequireDefault(_AppReducer);
	
	var _UserReducer = __webpack_require__(78);
	
	var _UserReducer2 = _interopRequireDefault(_UserReducer);
	
	var _RoomReducer = __webpack_require__(12);
	
	var _RoomReducer2 = _interopRequireDefault(_RoomReducer);
	
	var _MessageReducer = __webpack_require__(69);
	
	var _MessageReducer2 = _interopRequireDefault(_MessageReducer);
	
	var _IntlReducer = __webpack_require__(68);
	
	var _IntlReducer2 = _interopRequireDefault(_IntlReducer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Combine all reducers into one root reducer
	/**
	 * Root Reducer
	 */
	exports.default = (0, _redux.combineReducers)({
	  app: _AppReducer2.default,
	  users: _UserReducer2.default,
	  rooms: _RoomReducer2.default,
	  messages: _MessageReducer2.default,
	  intl: _IntlReducer2.default
	});
	
	// Import Reducers

/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.dateFormat = dateFormat;
	function dateFormat(date) {
	    return new Date(date).toDateString();
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.login = login;
	exports.register = register;
	exports.isLoggedIn = isLoggedIn;
	exports.roleAuthorization = roleAuthorization;
	
	var _user = __webpack_require__(14);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _cuid = __webpack_require__(19);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _jsonwebtoken = __webpack_require__(97);
	
	var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
	
	var _crypto = __webpack_require__(91);
	
	var _crypto2 = _interopRequireDefault(_crypto);
	
	var _config = __webpack_require__(13);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function login(req, res) {
	    if (!(req.body.email && req.body.password)) {
	        res.status(403).end();
	    }
	
	    _user2.default.findOne({ email: req.body.email /*, password: req.body.password*/ }).exec(function (err, user) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        // res.json({user: user});
	        var token = generateToken(user);
	        if (token) {
	            res.status(200).json({
	                token: 'JWT ' + token,
	                user: user
	            });
	        } else {
	            res.status(500).send(err);
	        }
	    });
	}
	
	function register(req, res) {
	    if (!(req.body.email && req.body.password && req.body.name)) {
	        res.status(403).end();
	    }
	
	    _user2.default.findOne({ email: req.body.email }).exec(function (err, user) {
	        if (err) {
	            res.status(500).send(err);
	        } else if (!user) {
	            var newUser = new _user2.default({
	                email: req.body.email,
	                password: req.body.password,
	                name: req.body.name
	            });
	
	            newUser.cuid = (0, _cuid2.default)();
	
	            newUser.save(function (error, user) {
	                if (error) {
	                    res.status(500).send(error);
	                }
	                // res.json({user: user});
	                var token = generateToken(user);
	                if (token) {
	                    res.status(200).json({
	                        token: 'JWT ' + token,
	                        user: user
	                    });
	                } else {
	                    res.status(500).send(err);
	                }
	            });
	        }
	    });
	}
	
	function isLoggedIn(req, res) {
	    if (!req.user) {
	        return res.status(500).json({ error: 'Unauthorized' });
	    }
	    res.status(200).json({ user: req.user, token: generateToken(req.user) });
	}
	
	// Role authorization check
	function roleAuthorization(requiredRole) {
	    return function (req, res, next) {
	        var user = req.user;
	
	        _user2.default.findOne({ cuid: user.cuid }).exec(function (err, foundUser) {
	            if (err) {
	                res.status(422).json({ error: 'No user was found.' });
	                return next(err);
	            }
	
	            // If user is found, check role.
	            // if(getRole(foundUser.role) >= getRole(requiredRole)) {
	            //     return next();
	            // }
	            return next();
	            return res.status(401).json({ error: 'You are not authorized to view this content.' });
	        });
	    };
	};
	
	function generateToken(user) {
	    if (user) {
	        var userData = {
	            cuid: user.cuid,
	            email: user.email,
	            role: user.role
	        };
	        return _jsonwebtoken2.default.sign(userData, _config2.default.secret, {
	            expiresIn: 10080 // in seconds
	        });
	    }
	    return null;
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSomething = getSomething;
	
	var _message = __webpack_require__(36);
	
	var _message2 = _interopRequireDefault(_message);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getSomething(req, res) {
	  return res.status(200).end();
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getPosts = getPosts;
	exports.addPost = addPost;
	exports.getPost = getPost;
	exports.deletePost = deletePost;
	
	var _post = __webpack_require__(37);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _cuid = __webpack_require__(19);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(40);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(42);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Get all posts
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPosts(req, res) {
	  _post2.default.find().sort('-dateAdded').exec(function (err, posts) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ posts: posts });
	  });
	}
	
	/**
	 * Save a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function addPost(req, res) {
	  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
	    res.status(403).end();
	  }
	
	  var newPost = new _post2.default(req.body.post);
	
	  // Let's sanitize inputs
	  newPost.title = (0, _sanitizeHtml2.default)(newPost.title);
	  newPost.name = (0, _sanitizeHtml2.default)(newPost.name);
	  newPost.content = (0, _sanitizeHtml2.default)(newPost.content);
	
	  newPost.slug = (0, _limax2.default)(newPost.title.toLowerCase(), { lowercase: true });
	  newPost.cuid = (0, _cuid2.default)();
	  newPost.save(function (err, saved) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ post: saved });
	  });
	}
	
	/**
	 * Get a single post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function getPost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      res.status(500).send(err);
	    }
	    res.json({ post: post });
	  });
	}
	
	/**
	 * Delete a post
	 * @param req
	 * @param res
	 * @returns void
	 */
	function deletePost(req, res) {
	  _post2.default.findOne({ cuid: req.params.cuid }).exec(function (err, post) {
	    if (err) {
	      res.status(500).send(err);
	    }
	
	    post.remove(function () {
	      res.status(200).end();
	    });
	  });
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getRooms = getRooms;
	exports.getRoom = getRoom;
	exports.addRoom = addRoom;
	exports.joinRoom = joinRoom;
	exports.unJoinRoom = unJoinRoom;
	exports.getParticipants = getParticipants;
	exports.getMessages = getMessages;
	exports.addMessage = addMessage;
	
	var _room = __webpack_require__(38);
	
	var _room2 = _interopRequireDefault(_room);
	
	var _user = __webpack_require__(14);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _message = __webpack_require__(36);
	
	var _message2 = _interopRequireDefault(_message);
	
	var _cuid = __webpack_require__(19);
	
	var _cuid2 = _interopRequireDefault(_cuid);
	
	var _limax = __webpack_require__(40);
	
	var _limax2 = _interopRequireDefault(_limax);
	
	var _sanitizeHtml = __webpack_require__(42);
	
	var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);
	
	var _lodash = __webpack_require__(20);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getRooms(req, res) {
	    _room2.default.find().exec(function (err, rooms) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        res.json({ rooms: rooms });
	    });
	    // return res.status(200).end();
	}
	
	function getRoom(req, res) {
	    _room2.default.findOne({ cuid: req.params.cuid }).exec(function (err, room) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        res.json({ room: room });
	    });
	}
	
	function addRoom(req, res) {
	    if (!req.body.room.title) {
	        res.status(403).end();
	    }
	
	    var newRoom = new _room2.default(req.body.room);
	
	    // Let's sanitize inputs
	    newRoom.title = (0, _sanitizeHtml2.default)(newRoom.title);
	    newRoom.slug = (0, _limax2.default)(newRoom.title.toLowerCase(), { lowercase: true });
	    newRoom.cuid = (0, _cuid2.default)();
	
	    newRoom.save(function (error, saved) {
	        if (error) {
	            res.status(500).send(error);
	        }
	        res.json({ room: saved });
	    });
	}
	
	function joinRoom(req, res) {
	    if (!req.body.room) {
	        res.status(403).end();
	    }
	    _room2.default.findOne({ cuid: req.body.room }).exec(function (error, room) {
	        if (error) {
	            return res.status(500).send(error);
	        }
	
	        if (!room.isUserParticipating(req.user.cuid)) {
	            room.participants.addToSet(req.user.cuid);
	
	            room.save(function (error, saved) {
	                if (error) {
	                    res.status(500).send(error);
	                }
	                res.json({ room: saved });
	            });
	        } else {
	            return res.status(403).send({ room: room, errors: [{ type: 'error', message: 'Already in room' }] });
	        }
	    });
	}
	
	function unJoinRoom(req, res) {
	    if (!req.body.room) {
	        res.status(403).end();
	    }
	    _room2.default.findOne({ cuid: req.body.room }).exec(function (error, room) {
	        if (error) {
	            return res.status(500).send(error);
	        }
	
	        if (room.isUserParticipating(req.user.cuid)) {
	            room.participants.pull(req.user.cuid);
	
	            room.save(function (error, saved) {
	                if (error) {
	                    res.status(500).send(error);
	                }
	                res.json({ room: saved });
	            });
	        } else {
	            return res.status(403).send({ room: room, errors: [{ type: 'error', message: 'Not in the room' }] });
	        }
	    });
	}
	
	function getParticipants(req, res) {
	    if (!req.params.cuid) {
	        res.status(403).end();
	    }
	    _room2.default.findOne({ cuid: req.params.cuid }).exec(function (error, room) {
	        if (error) {
	            return res.status(500).send(error);
	        }
	        _user2.default.find({ cuid: { $in: room.participants } }).select('cuid name email').exec(function (error, participants) {
	            if (error) {
	                return res.status(500).send(error);
	            }
	            res.json({ users: participants });
	        });
	    });
	}
	
	function getMessages(req, res) {
	    if (!req.params.cuid) {
	        return res.status(403).end();
	    }
	    _room2.default.findOne({ cuid: req.params.cuid }).exec(function (error, room) {
	        if (error) {
	            return res.status(500).send(error);
	        }
	        _message2.default.find({ 'room.cuid': room.cuid }).exec(function (error, messages) {
	            if (error) {
	                return res.status(500).send(error);
	            }
	            res.json({ messages: messages });
	        });
	    });
	}
	
	function addMessage(req, res) {
	    if (!req.params.cuid || !req.body.user || !req.body.content) {
	        return res.status(403).end();
	    }
	    _room2.default.findOne({ cuid: req.params.cuid }).exec(function (error, room) {
	        if (error) {
	            return res.status(500).send(error);
	        }
	        var newMessage = new _message2.default({
	            user: {
	                cuid: req.body.user.cuid,
	                name: req.body.user.name
	            },
	            room: {
	                cuid: room.cuid,
	                title: room.title
	            },
	            content: req.body.content
	        });
	
	        newMessage.cuid = (0, _cuid2.default)();
	
	        newMessage.save(function (error, message) {
	            if (error) {
	                return res.status(500).send(error);
	            }
	            return res.json({ message: message });
	        });
	    });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getUsers = getUsers;
	exports.getJoinedRooms = getJoinedRooms;
	
	var _user = __webpack_require__(14);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _room = __webpack_require__(38);
	
	var _room2 = _interopRequireDefault(_room);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getUsers(req, res) {
	    _user2.default.find().sort('name').exec(function (err, users) {
	        if (err) {
	            res.status(500).send(err);
	        }
	        res.json({ users: users });
	    });
	    // return res.status(200).end();
	}
	
	function getJoinedRooms(req, res) {
	    if (req.user) {
	        _room2.default.find({ participants: req.user.cuid }).exec(function (error, rooms) {
	            if (error) {
	                return res.status(500).send(error);
	            }
	            res.json({ rooms: rooms });
	        });
	    }
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Webpack Requirements
	
	
	var _express = __webpack_require__(10);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(55);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _mongoose = __webpack_require__(11);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _bodyParser = __webpack_require__(54);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _path = __webpack_require__(56);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _IntlWrapper = __webpack_require__(43);
	
	var _IntlWrapper2 = _interopRequireDefault(_IntlWrapper);
	
	var _webpack = __webpack_require__(23);
	
	var _webpack2 = _interopRequireDefault(_webpack);
	
	var _webpackConfig = __webpack_require__(53);
	
	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);
	
	var _webpackDevMiddleware = __webpack_require__(59);
	
	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);
	
	var _webpackHotMiddleware = __webpack_require__(60);
	
	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);
	
	var _store = __webpack_require__(45);
	
	var _reactRedux = __webpack_require__(2);
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(57);
	
	var _reactRouter = __webpack_require__(4);
	
	var _reactHelmet = __webpack_require__(22);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _routes = __webpack_require__(44);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _fetchData = __webpack_require__(52);
	
	var _post = __webpack_require__(48);
	
	var _post2 = _interopRequireDefault(_post);
	
	var _user = __webpack_require__(50);
	
	var _user2 = _interopRequireDefault(_user);
	
	var _room = __webpack_require__(49);
	
	var _room2 = _interopRequireDefault(_room);
	
	var _message = __webpack_require__(47);
	
	var _message2 = _interopRequireDefault(_message);
	
	var _dummyData = __webpack_require__(46);
	
	var _dummyData2 = _interopRequireDefault(_dummyData);
	
	var _config = __webpack_require__(13);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _socket = __webpack_require__(58);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Initialize the Express App
	var app = new _express2.default();
	
	// Run Webpack dev server in development mode
	if (process.env.NODE_ENV === 'development') {
	  var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	  app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: _webpackConfig2.default.output.publicPath }));
	  app.use((0, _webpackHotMiddleware2.default)(compiler));
	}
	
	// React And Redux Setup
	
	
	// Import required modules
	
	
	// Socket.io
	
	
	// Set native promises as mongoose promise
	_mongoose2.default.Promise = global.Promise;
	
	// MongoDB Connection
	_mongoose2.default.connect(_config2.default.mongoURL, function (error) {
	  if (error) {
	    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
	    throw error;
	  }
	
	  // feed some dummy data in DB.
	  // dummyData();
	});
	
	// Apply body Parser and server public assets and routes
	app.use((0, _compression2.default)());
	app.use(_bodyParser2.default.json({ limit: '20mb' }));
	app.use(_bodyParser2.default.urlencoded({ limit: '20mb', extended: false }));
	app.use(_express2.default.static(_path2.default.resolve(__dirname, '../dist/client')));
	
	// Enable CORS from client-side
	// app.use((req, res, next) => {
	//     res.header('Access-Control-Allow-Origin', 'http://localhost:'+serverConfig.port);
	//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
	//     res.header('Access-Control-Allow-Credentials', 'true');
	//     next();
	// });
	
	// app.use('/api', posts);
	app.use('/api', _user2.default);
	app.use('/api', _room2.default);
	app.use('/api', _message2.default);
	
	// Render Initial HTML
	var renderFullPage = function renderFullPage(html, initialState) {
	  var head = _reactHelmet2.default.rewind();
	
	  // Import Manifests
	  var assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
	  var chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
	
	  return '\n    <!doctype html>\n    <html>\n      <head>\n        ' + head.base.toString() + '\n        ' + head.title.toString() + '\n        ' + head.meta.toString() + '\n        ' + head.link.toString() + '\n        ' + head.script.toString() + '\n\n        ' + (process.env.NODE_ENV === 'production' ? '<link rel=\'stylesheet\' href=\'' + assetsManifest['/app.css'] + '\' />' : '') + '\n        <link href=\'https://fonts.googleapis.com/css?family=Lato:400,300,700\' rel=\'stylesheet\' type=\'text/css\'/>\n        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />\n      </head>\n      <body>\n        <div id="root"><div>' + html + '</div></div>\n        <script>\n          window.__INITIAL_STATE__ = ' + JSON.stringify(initialState) + ';\n          ' + (process.env.NODE_ENV === 'production' ? '//<![CDATA[\n          window.webpackManifest = ' + JSON.stringify(chunkManifest) + ';\n          //]]>' : '') + '\n        </script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js') + '\'></script>\n        <script src=\'' + (process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js') + '\'></script>\n      </body>\n    </html>\n  ';
	};
	
	var renderError = function renderError(err) {
	  var softTab = '&#32;&#32;&#32;&#32;';
	  var errTrace = process.env.NODE_ENV !== 'production' ? ':<br><br><pre style="color:red">' + softTab + err.stack.replace(/\n/g, '<br>' + softTab) + '</pre>' : '';
	  return renderFullPage('Server Error' + errTrace, {});
	};
	
	// Server Side Rendering based on routes matched by React-router.
	app.use(function (req, res, next) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirectLocation, renderProps) {
	    if (err) {
	      return res.status(500).end(renderError(err));
	    }
	
	    if (redirectLocation) {
	      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    }
	
	    if (!renderProps) {
	      return next();
	    }
	
	    var store = (0, _store.configureStore)();
	
	    return (0, _fetchData.fetchComponentData)(store, renderProps.components, renderProps.params).then(function () {
	      var initialView = (0, _server.renderToString)(_jsx(_reactRedux.Provider, {
	        store: store
	      }, void 0, _jsx(_IntlWrapper2.default, {}, void 0, _react2.default.createElement(_reactRouter.RouterContext, renderProps))));
	      var finalState = store.getState();
	
	      res.set('Content-Type', 'text/html').status(200).end(renderFullPage(initialView, finalState));
	    }).catch(function (error) {
	      return next(error);
	    });
	  });
	});
	
	// start app
	var server = app.listen(_config2.default.port, function (error) {
	  if (!error) {
	    console.log('MERN is running on port: ' + _config2.default.port + '! Build something amazing!'); // eslint-disable-line
	  }
	});
	
	var io = new _socket2.default(server);
	var socketEvents = __webpack_require__(51)(io);
	
	exports.default = app;
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sequence = sequence;
	/**
	 * Throw an array to it and a function which can generate promises
	 * and it will call them sequentially, one after another
	 */
	function sequence(items, consumer) {
	  var results = [];
	  var runner = function runner() {
	    var item = items.shift();
	    if (item) {
	      return consumer(item).then(function (result) {
	        results.push(result);
	      }).then(runner);
	    }
	
	    return Promise.resolve(results);
	  };
	
	  return runner();
	}

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = require("bcrypt-nodejs");

/***/ },
/* 91 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = require("intl");

/***/ },
/* 93 */
/***/ function(module, exports) {

	module.exports = require("intl-locales-supported");

/***/ },
/* 94 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/en");

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = require("intl/locale-data/jsonp/fr");

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = require("passport-jwt");

/***/ },
/* 99 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 101 */
/***/ function(module, exports) {

	module.exports = require("postcss-focus");

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = require("postcss-reporter");

/***/ },
/* 103 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/en");

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = require("react-intl/locale-data/fr");

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools");

/***/ },
/* 106 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-dock-monitor");

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = require("redux-devtools-log-monitor");

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = require("redux-thunk");

/***/ },
/* 109 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ }
/******/ ]);