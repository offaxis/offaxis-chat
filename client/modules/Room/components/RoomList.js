import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { ListGroup, ListGroupItem, InputGroup, InputGroupButton, Pagination, PaginationItem, PaginationLink, Button, Alert, Input } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

// Import Components
import RoomListItem from './RoomListItem/RoomListItem';


class RoomList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            pagesSize: 5,
            pagesCount: 0,
            activePage: 1,
            roomsCount: props.rooms ? props.rooms.length : 0,
            roomsSearch: props.rooms ? props.rooms.length : []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.getRoomsSearch = this.getRoomsSearch.bind(this);
        this.setActivePage = this.setActivePage.bind(this);
    }

    // componentWillUpdate(nextProps, nextState) {
    //     if(nextProps != this.props) {
    //         this.setRoomsSearch();
    //     }
    // }

    handleSearch(event) {
        this.setState({
            searchText: event.target.value,
            activePage: 1
        });
    }

    handleClearSearch() {
        this.setState({
            searchText: ''
        });
    }

    getRoomsSearch() {
        let roomsSearch = [];
        if(this.props.rooms && this.props.rooms.length) {

            roomsSearch = this.state.searchText != ''
                ? this.props.rooms.filter(room => room.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1)
                : this.props.rooms;

            // this.setState({
            //     roomsSearch: roomsSearch,
            //     roomsCount: roomsSearch.length
            // });
        }
        return roomsSearch;
    }

    getUnReadMessagesCount(room) {
        if(this.props.user && this.props.user.unreadMessages) {
            const unReadMessagesOfRoom = this.props.user.unreadMessages.filter(message => message.room.cuid == room.cuid);
            return unReadMessagesOfRoom.length;
        }
        return 0;
    }

    setActivePage(nextPage) {
        this.setState({
            activePage: nextPage
        });
        return false;
    }


    render() {
        const roomsSearch = this.getRoomsSearch();
        const pagesCount = Math.ceil(roomsSearch.length/this.state.pagesSize);

        let pages = [];
        for(var i = 1; i<=pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>
                <ListGroup>
                    <ListGroupItem>
                        <InputGroup>
                        <Input type="text" name="search" value={this.state.searchText} onChange={this.handleSearch} placeholder="Search a room" />
                        {
                            this.state.searchText !== ''
                            ?
                            <InputGroupButton><Button color="danger" onClick={this.handleClearSearch}><FontAwesome name="times-circle" /></Button></InputGroupButton>
                            : null
                        }
                        </InputGroup>
                    </ListGroupItem>
                    {
                        roomsSearch.length && this.state.searchText
                        ? <ListGroupItem>{roomsSearch.length} rooms</ListGroupItem>
                        : null
                    }
                    {
                        roomsSearch.length
                        ? roomsSearch.map((room, i) => {
                            if((this.state.pagesSize*(this.state.activePage-1)) <= i && i <= this.state.pagesSize*this.state.activePage) {
                                return (<RoomListItem
                                    room={room}
                                    key={room.cuid}
                                    joinRoom={(room) => {this.props.joinRoom(room)}}
                                    unJoinRoom={(room) => {this.props.unJoinRoom(room)}}
                                    unReadMessagesCount={this.getUnReadMessagesCount(room)}
                                    {...this.props}
                                />);
                            }
                        })
                        : null
                    }
                </ListGroup>
                { pages.length
                    ?
                        <Pagination className="justify-content-center">
                            {pages.map(pageNumber => <PaginationItem key={pageNumber} active={this.state.activePage == pageNumber}><PaginationLink href="#" onClick={() => this.setActivePage(pageNumber)}>{pageNumber}</PaginationLink></PaginationItem>)}
                        </Pagination>
                    : null
                }
            </div>
        );
    }
}



//
// RoomList.propTypes = {
//   rooms: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//     participants: PropTypes.array,
//   })).isRequired,
//   handleJoinRoom: PropTypes.func.isRequired,
// };

export default RoomList;
