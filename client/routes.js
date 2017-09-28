/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
import storage from './util/storage';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
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
  require('./modules/App/pages/HomePage/HomePage');

  require('./modules/Room/pages/RoomListPage/RoomListPage');
  require('./modules/Room/pages/RoomAddPage/RoomAddPage');
  require('./modules/Room/pages/RoomViewPage/RoomViewPage');

  require('./modules/User/pages/UserRegisterPage/UserRegisterPage');
  require('./modules/User/pages/UserLoginPage/UserLoginPage');
  require('./modules/User/pages/UserProfilePage/UserProfilePage');
}


function requireAuth(nextState, replace, callback) {
    if(!storage || !storage.getItem('jwtToken')) {
        replace('/');
    }
    return callback();
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
    <Route path="/" component={App}>
        <IndexRoute
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/App/pages/HomePage/HomePage').default);
                });
            }}
        />

        <Route
            path="rooms/add"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Room/pages/RoomAddPage/RoomAddPage').default);
                });
            }}
            onEnter={requireAuth}
        />
        <Route
            path="rooms/:cuid"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                cb(null, require('./modules/Room/pages/RoomViewPage/RoomViewPage').default);
            });
            }}
            onEnter={requireAuth}
        />

        <Route
            path="/profile"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/UserProfilePage/UserProfilePage').default);
                });
            }}
            onEnter={requireAuth}
        />
        <Route
            path="user/register"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/UserRegisterPage/UserRegisterPage').default);
                });
            }}
        />
        <Route
            path="login"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/User/pages/UserLoginPage/UserLoginPage').default);
                });
            }}
        />
    </Route>
);
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
