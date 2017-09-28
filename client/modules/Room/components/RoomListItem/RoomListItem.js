import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { ListGroupItem, Badge, Button } from 'reactstrap';



// Import Style
// import styles from './RoomListItem.css';

function RoomListItem(props) {
    return (
        <ListGroupItem className="justify-content-between">
            <Link to={`/rooms/${props.room.cuid}`} onClick={() => {props.joinRoom(props.room)}}>{props.room.title}</Link>
            { props.unReadMessagesCount ? <Badge pill>{props.unReadMessagesCount}</Badge> : null }
        </ListGroupItem>
    );
}
// {
//     props.user && props.user.cuid
//     ? (
//          <p>
//             {
//                 isUserParticipating(props.room, props.user)
//                 ? <Button outline color="warning" block onClick={() => {props.unJoinRoom(props.room)}}><FormattedMessage id="roomUnJoin" /></Button>
//                 : <Button outline color="primary" block ><FormattedMessage id="roomJoin" /></Button>
//             }
//         </p>
//     )
//     : null
// }
//
// RoomListItem.propTypes = {
//   post: PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       slug: PropTypes.string.isRequired,
//       cuid: PropTypes.string.isRequired,
//       participants: PropTypes.array,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

export default RoomListItem;
