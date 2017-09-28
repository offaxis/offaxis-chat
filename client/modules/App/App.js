import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Container, Row, Col } from 'reactstrap';

// Import Style
import 'bootstrap/dist/css/bootstrap.css';
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


import RoomListPage from '../Room/pages/RoomListPage/RoomListPage';

// Import Actions
import { initSocket, sendSocket } from './AppActions';
import { switchLanguage } from '../Intl/IntlActions';
import { logoutUser, isLoggedIn, usersConnected, userDisconnected, setUserIsWritting } from '../User/UserActions';
import { addRoom } from '../Room/RoomActions';
import { receiveMessage } from '../Message/MessageActions';


const socket = io('');

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            // isUserInit: false
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
        this.props.dispatch(isLoggedIn());
        this.props.dispatch(initSocket(socket));

        // this.props.dispatch(subscribeUser(this.props.user));

        socket.on('receiveMessage', message => {
            this.props.dispatch(receiveMessage(message));
        });

        socket.on('connectedUsers', users => {
            this.props.dispatch(usersConnected(users));
        });

        socket.on('userDisconnected', user => {
            this.props.dispatch(userDisconnected(user));
        });

        socket.on('roomAdded', room => {
            this.props.dispatch(addRoom(room));
        });

        socket.on('userIsWritting', user => {
            this.props.dispatch(setUserIsWritting(user, 1));
        });

        socket.on('userStopWritting', user => {
            this.props.dispatch(setUserIsWritting(user, 0));
        });
    }

    handleLogout() {
        socket.emit('userDisconnection');
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
                {
                    this.state.isMounted ?
                        <div>
                            <Header
                                switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
                                intl={this.props.intl}
                                user={this.props.user}
                                logout={() => this.handleLogout() }
                            />
                            <Container fluid className="mb-3 mt-3">
                                {
                                    this.props.user
                                    ?
                                        <Row>
                                            <Col sm="4">
                                                <RoomListPage />
                                            </Col>
                                            <Col sm="8">
                                                {this.props.children}
                                            </Col>
                                        </Row>
                                    : this.props.children
                                }
                            </Container>
                            <Footer />
                        </div>
                    : null
                }
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        intl: store.intl,
        user: store.users.user,
        connectedUsers: store.users.data
    };
}

export default connect(mapStateToProps)(App);
