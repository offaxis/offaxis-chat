import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Card, CardHeader, CardBlock, ButtonGroup, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

// Import Components
import ParticipantsList from '../../components/participants/ParticipantsList';
import MessagesList from '../../components/messages/MessagesList';
import MessageAddForm from '../../../Message/components/MessageAddForm';

// Import Selectors

// Import Actions
import { fetchRoom, unJoinRoomRequest, setActiveRoom } from '../../RoomActions';
import { getRoom } from '../../RoomReducer';
import { setReadMessages } from '../../../User/UserActions';

import { isUserParticipating } from '../../RoomHelpers';

class RoomViewPage extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(setReadMessages(this.props.room));
        this.props.dispatch(setActiveRoom(this.props.room));
    }

    componentWillUnmount() {
        this.props.dispatch(setActiveRoom(null));
    }

    handleUnJoinRoom(room) {
        this.props.dispatch(unJoinRoomRequest(room));
    }


    render() {
        const messageWrapperStyle = {
            // height: '300px',
            overflowX: 'scroll',
        }

        const writtingUsers = this.props.room.participantsData ? this.props.room.participantsData.filter(user => user.isWritting) : [];

        return (
            <div>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col xs="6">
                                <h1>{this.props.room.title}</h1>
                            </Col>
                            <Col xs="6" className="text-right">
                                <ButtonGroup>
                                    <Button color="secondary" tag={Link} to="/"><FontAwesome name="chevron-left" /></Button>
                                    {
                                        isUserParticipating(this.props.room, this.props.user)
                                        ? <Button outline color="danger" onClick={() => {this.handleUnJoinRoom(this.props.room)}}><FontAwesome name="times-circle" /> <FormattedMessage id="roomUnJoin" /></Button>
                                        : null
                                    }
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <ParticipantsList room={this.props.room} />
                    </CardHeader>
                    <CardBlock style={messageWrapperStyle}>
                        <MessagesList room={this.props.room} />
                        {writtingUsers.map((user, i) => <div key={i}><em>{user.name} is writting...</em></div>)}
                        <MessageAddForm room={this.props.room} />
                    </CardBlock>
                </Card>
            </div>
        );
    }
}

// Actions required to provide data for this component to render in sever side.
RoomViewPage.need = [(params) => { return fetchRoom(params.cuid); }];

// Retrieve data from store as props
function mapStateToProps(state, props) {
    const room = getRoom(state, props.params.cuid);
    return {
        room: room,
        user: state.users.user
    };
}

export default connect(mapStateToProps)(RoomViewPage);
