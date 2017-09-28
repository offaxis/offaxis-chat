import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Card, CardHeader, CardBlock, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class RoomAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(
            {[name] : value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.title) {
            this.props.addRoom(this.state.title);
        }
    }

    render() {
        return (
            <Card>
                <CardHeader><FormattedMessage id="roomCreate" /></CardHeader>
                <CardBlock>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="titleField">Title</Label>
                            <Input type="text" name="title" id="titleField" onChange={this.handleChange} placeholder={this.props.intl.messages.roomTitle} value={this.state.title} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="success"><FormattedMessage id="submit" /></Button>
                        </FormGroup>
                    </Form>
                </CardBlock>
            </Card>
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

export default injectIntl(RoomAddForm);
