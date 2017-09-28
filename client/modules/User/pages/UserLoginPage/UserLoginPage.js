import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { loginRequest } from '../../UserActions';

// Import Components
import UserLoginForm from '../../components/UserLoginForm'


class UserLoginPage extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(email, password) {
        this.props.dispatch(loginRequest(email, password));
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <UserLoginForm login={this.handleLogin} />
            </div>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(UserLoginPage);
