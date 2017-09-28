import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, InputGroup, InputGroupButton, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

// Impor Actions
import { addMessageRequest, sendMessage } from '../MessageActions';
import { sendSocket } from '../../App/AppActions';

class MessageAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.state.content == '' && nextState.content != '') {
            this.props.dispatch(sendSocket({type: 'userIsWritting', data: this.props.user}));
        } else if(this.state.content != '' && nextState.content == '') {
            this.props.dispatch(sendSocket({type: 'userStopWritting', data: this.props.user}));
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(sendMessage());
        this.props.dispatch(addMessageRequest(this.props.user, this.props.room, this.state.content));
        this.setState({content: ''});
        return false;
    }

    isSending() {
        return this.props.isSending;
    }

    render() {
        return (
            <div className="mt-3">
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup>
                        <Input
                            type="text"
                            name="content"
                            value={this.state.content}
                            placeholder="Type your message here..."
                            onChange={this.handleChange}
                            disabled={this.isSending()}
                            autoFocus
                        />
                        <InputGroupButton>
                            <Button color="success" disabled={this.isSending()}>
                                { this.isSending() ? <FontAwesome name="spinner" spin /> : <FontAwesome name="paper-plane-o" /> }
                            </Button>
                        </InputGroupButton>
                    </InputGroup>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        user: state.users.user,
        isSending: state.messages.isSending
    }
}

export default connect(mapStateToProps)(MessageAddForm);
