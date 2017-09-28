import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Card, CardHeader, CardBlock, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

// Import Components
import RoomList from '../../components/RoomList'
import UserConnected from '../../../User/components/UserConnected';

// Import Actions
import { fetchRooms, joinRoomRequest, unJoinRoomRequest, setActiveRoom } from '../../RoomActions';
import { setReadMessages } from '../../../User/UserActions';

import { isUserParticipating } from '../../RoomHelpers';

// Import Selectors
// import { getShowAddPost } from '../../../App/AppReducer';
import { getRooms } from '../../RoomReducer';

class RoomListPage extends Component {

    componentDidMount() {
        if(!this.props.rooms.length) {
            this.props.dispatch(fetchRooms());
        }
    }

    handleJoinRoom(room) {
        if(isUserParticipating(room, this.props.user)) {
            this.props.dispatch(setActiveRoom(room));
            this.props.dispatch(setReadMessages(room));
        } else {
            this.props.dispatch(joinRoomRequest(room));
        }
    }

    handleUnJoinRoom(room) {
        if(isUserParticipating(room, this.props.user)) {
            this.props.dispatch(unJoinRoomRequest(room));
        } else {
            this.props.dispatch(setActiveRoom(null));
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        {
                            this.props.user ?
                                <Button tag={Link} to="/rooms/add" color="success" size="sm" outline action className="pull-right">
                                  <FontAwesome name="plus"/> <FormattedMessage id="createroom" />
                                </Button>
                            : null
                        }
                        <FormattedMessage id="Rooms" />
                    </CardHeader>
                    <CardBlock>
                        <RoomList
                            rooms={this.props.rooms}
                            joinRoom={(room) => this.handleJoinRoom(room)}
                            unJoinRoom={(room) => this.handleUnJoinRoom(room)}
                            user={this.props.user}
                        />
                    </CardBlock>
                </Card>

                <Card className="mt-2">
                    <CardHeader>
                        <FormattedMessage id="userConnected" />
                    </CardHeader>
                    <CardBlock>
                        <UserConnected />
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
RoomListPage.need = [() => { return fetchRooms(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        rooms: getRooms(state),
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

export default connect(mapStateToProps)(RoomListPage);
