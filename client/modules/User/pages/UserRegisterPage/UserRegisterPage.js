import React, { Component } from 'react';
import { connect } from 'react-redux';

import { registerRequest } from '../../UserActions';

// Import Components
import UserRegisterForm from '../../components/UserRegisterForm'


class UserRegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(email, password, name) {
        this.props.dispatch(registerRequest(email, password, name));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <UserRegisterForm register={this.handleRegister} />
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return { user: state.users.user };
}

export default connect(mapStateToProps)(UserRegisterPage);
