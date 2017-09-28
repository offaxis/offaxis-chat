import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Jumbotron, ButtonGroup, Button, Alert } from 'reactstrap';

import UserLoginForm from '../../../User/components/UserLoginForm';


export class HomePage extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        return (
            <div>

                {
                    this.props.user
                    ?
                        <Jumbotron className="text-center">
                            <h1 className="display-3">Let's Rock !</h1>
                            <Alert color="info" className="text-center">
                                Join a room and start the experience !
                            </Alert>
                        </Jumbotron>
                    :
                        <div>
                            <Jumbotron className="text-center">
                                <h1 className="display-3">Hello, world!</h1>
                                <p className="lead">This is a live chat example made with React, Redux, ExpressJs & MongoDb with real time interactions !</p>
                                <hr className="my-2" />
                                <p>
                                Let's start by creating your account simply !
                                </p>
                                <div className="lead">
                                    <ButtonGroup>
                                        <Button color="primary" outline tag={Link} to="/login">Login</Button>
                                        <Button color="success" outline tag={Link} to="/user/register">Register</Button>
                                    </ButtonGroup>
                                </div>
                            </Jumbotron>
                        </div>
                }
            </div>
        );
    }
}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        intl: store.intl,
        user: store.users.user
    };
}

export default connect(mapStateToProps)(HomePage);
