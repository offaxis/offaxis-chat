import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Alert } from 'reactstrap';

import UserProfileImage from './profile/UserProfileImage';

export class UserConnected extends Component {

    constructor(props) {
        super(props);
    }

    getConnectedUsers() {
        return this.props.users.filter(user => user.connected);
    }


    render() {
        return (
            <div>
                { this.getConnectedUsers().length
                    ? this.getConnectedUsers().map((user, index) => {
                            return <UserProfileImage key={index} id={`connected-user-${user.cuid}`} user={user} />
                        })
                    :
                        <Alert color="warning">
                            <FormattedMessage id="userNoConnected" />
                        </Alert>
                }
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        users: state.users.data
    }
}


export default connect(mapStateToProps)(UserConnected);
