import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';

import MessageView from '../../../Message/components/view/MessageView';

import { getRoom } from '../../RoomReducer';
import { fetchMessages } from '../../RoomActions';

class MessagesList extends Component {

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
        if(this.props.room && !this.props.room.messagesData) {
            this.props.dispatch(fetchMessages(this.props.room));
        }
    }

    render() {
        let previousWriter = null;
        return (
            <div>
                {
                    this.props.room.messagesData
                    ?
                        this.props.room.messagesData.length
                            ?
                                <div>
                                    {this.props.room.messagesData.map(message => {
                                        let isSameWriter = false;
                                        if(previousWriter == message.user.cuid) {
                                            isSameWriter = true;
                                        }
                                        previousWriter = message.user.cuid;
                                        return <MessageView key={message.cuid} message={message} isSameWriter={isSameWriter} />
                                    })}
                                </div>
                            :
                                <Alert color="warning">
                                    <FormattedMessage id="roomNoMessages" />
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

export default connect(mapStateToProps)(MessagesList);
