import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addRoomRequest } from '../../RoomActions';

// Import Components
import RoomAddForm from '../../components/RoomAddForm'


class RoomAddPage extends Component {

    constructor(props) {
        super(props);
        this.handleAddRoom = this.handleAddRoom.bind(this);
    }

    handleAddRoom(title) {
        this.props.dispatch(addRoomRequest(title));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <RoomAddForm addRoom={this.handleAddRoom} />
            </div>
        );
    }
}

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

export default connect(mapStateToProps)(RoomAddPage);
