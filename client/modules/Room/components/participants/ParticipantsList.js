import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';

import UserProfileImage from '../../../User/components/profile/UserProfileImage';

import { getRoom } from '../../RoomReducer';
import { fetchParticipants } from '../../RoomActions';

class ParticipantsList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps, prevState) {
        this.init();
    }

    init() {
        if(this.props.room && !this.props.room.participantsData) {
            this.props.dispatch(fetchParticipants(this.props.room));
        }
    }

    render() {

        return (
            <div>
                {
                    this.props.room.participantsData
                    ?

                            this.props.room.participantsData.length
                            ?
                                <div>
                                    {this.props.room.participantsData.map(user => <UserProfileImage key={user.cuid} id={user.cuid} user={user} />)}
                                </div>
                            :
                                <Alert color="warning">
                                    <FormattedMessage id="roomNoParticipants" />
                                </Alert>

                    : null
                }
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        room: getRoom(state, props.room.cuid)
    }
}

export default connect(mapStateToProps)(ParticipantsList);
