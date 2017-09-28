import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

import { stringToColour } from '../../UserHelpers';

import styles from './UserProfileImage.css';

class UserProfileImage extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
      }

      toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
      }


    render() {
        const userStyle = {
            background: stringToColour(this.props.user.name),
            visibility: this.props.isHidden ? 'hidden' : 'visible'
        };
        return (
            <span id={`tooltip-${this.props.id}`} className={styles.userProfileImage} style={userStyle}>
                {this.props.user.name.charAt(0)}
                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={`tooltip-${this.props.id}`} toggle={this.toggle}>
                    {this.props.user.name}
                </Tooltip>
            </span>
        );
    }
}

export default UserProfileImage;
