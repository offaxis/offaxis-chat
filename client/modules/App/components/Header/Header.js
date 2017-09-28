import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';


// Import Style
import styles from './Header.css';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleDropdownLanguage = this.toggleDropdownLanguage.bind(this);
        this.toggleDropdownNotifications = this.toggleDropdownNotifications.bind(this);

        this.state = {
            isOpen: false,
            dropdownLanguageOpen: false,
            dropdownNotificationsOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleDropdownLanguage() {
        this.setState({
            dropdownLanguageOpen: !this.state.dropdownLanguageOpen
        });
    }

    toggleDropdownNotifications() {
        this.setState({
            dropdownNotificationsOpen: !this.state.dropdownNotificationsOpen
        });
    }


    getLanguageNodes() {
        const languageNodes = this.props.intl.enabledLanguages.map(
            lang => <DropdownItem key={lang}><NavLink onClick={() => this.props.switchLanguage(lang)} className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</NavLink></DropdownItem>
        );
        return languageNodes;
    }


    renderNotifications() {
        var distinctRooms = [];
        var notificationsList = '';
        if(this.props.user.unreadMessages) {
            notificationsList = this.props.user.unreadMessages.map(message => {
                if(distinctRooms.indexOf(message.room) == -1) {
                    distinctRooms.push(message.room);
                    return (
                        <DropdownItem key={message.room.cuid}><NavLink tag={Link} to={`/rooms/${message.room.cuid}`}>{message.room.title}</NavLink></DropdownItem>
                    );
                }
            });
        } else {
            notificationsList = <DropdownItem><FormattedMessage id="notificationNo" /></DropdownItem>
        }
        return (
            <NavDropdown isOpen={this.state.dropdownNotificationsOpen} toggle={this.toggleDropdownNotifications}>
                <DropdownToggle caret>
                    <Badge color="primary" pill>{this.props.user.unreadMessages ? this.props.user.unreadMessages.length : 0 }</Badge>
                </DropdownToggle>
                <DropdownMenu>
                    {notificationsList}
                </DropdownMenu>
            </NavDropdown>
        );
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light toggleable>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand tag={Link} to="/">OffAxis/Chat</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <NavDropdown isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleDropdownLanguage}>
                                <DropdownToggle caret>
                                    <FormattedMessage id="switchLanguage" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.getLanguageNodes()}
                                </DropdownMenu>
                            </NavDropdown>
                            {this.props.user
                                ? this.renderNotifications()
                                : null
                            }
                            {this.props.user
                                ? <NavItem><NavLink tag={Link} to="/profile" >{this.props.user.name}</NavLink></NavItem>
                                : ''
                            }
                            {this.props.user ? <NavItem><NavLink href="#" onClick={() => this.props.logout()}><FormattedMessage id="userLogout" /></NavLink></NavItem>: ''}

                            {!this.props.user ? <NavItem><NavLink tag={Link} to="/user/register"><FormattedMessage id="userRegister" /></NavLink></NavItem> : ''}
                            {!this.props.user ? <NavItem><NavLink tag={Link} to="/login"><FormattedMessage id="userLogin" /></NavLink></NavItem>: ''}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}

Header.contextTypes = {
    router: React.PropTypes.object,
};

Header.propTypes = {
    switchLanguage: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
};
