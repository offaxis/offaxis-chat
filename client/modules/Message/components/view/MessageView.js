import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapse, Button } from 'reactstrap';

import UserProfileImage from '../../../User/components/profile/UserProfileImage';

import { dateFormat } from '../../../../util/date';

class MessageView extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.getFormattedDate = this.getFormattedDate.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    isWriter() {
        return this.props.message.user.cuid == this.props.user.cuid;
    }

    getFormattedDate() {
        return dateFormat(this.props.message.dateAdded);
    }


    render() {
        return (
            <div>
                { this.isWriter()
                    ?
                        <div className="text-right">
                            <a onClick={this.toggle} style={{ marginBottom: '1rem' }}>
                                {this.props.message.content} <UserProfileImage key={this.props.message.cuid} user={this.props.message.user} isHidden={this.props.isSameWriter} />
                            </a>
                            <Collapse isOpen={this.state.collapse}>
                                <small>{this.getFormattedDate()}</small>
                            </Collapse>
                        </div>
                    :
                        <div>

                            <a onClick={this.toggle} style={{ marginBottom: '1rem' }}>
                                <UserProfileImage key={this.props.message.cuid} id={this.props.message.cuid} user={this.props.message.user} isHidden={this.props.isSameWriter} /> {this.props.message.content}
                            </a>
                            <Collapse isOpen={this.state.collapse}>
                                <small>{this.getFormattedDate()}</small>
                            </Collapse>
                        </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps)(MessageView);
