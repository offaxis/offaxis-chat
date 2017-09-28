import React, { PropTypes, Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card, CardHeader, CardBlock, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

export class UserLoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false,
            message : ''
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
        if(this.state.email && this.state.password ) {
            this.props.login(this.state.email, this.state.password);
        } else {
            this.setState({
                error: true,
                message: 'Please fill all fields !'
            })
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader><FormattedMessage id="userLogin" /></CardHeader>
                    <CardBlock>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Row>
                                    <Col sm="6">
                                        <Label for="emailField">Email</Label>
                                        <Input type="text" name="email" id="emailField" onChange={this.handleChange} placeholder={this.props.intl.messages.userEmail} value={this.state.email} />
                                    </Col>
                                    <Col sm="6">
                                        <Label for="passwordField"><FormattedMessage id="userPassword" /></Label>
                                        <Input type="password" name="password" id="passwordField" onChange={this.handleChange} placeholder={this.props.intl.messages.userPassword} value={this.state.password} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Button  color="success" block><FormattedMessage id="submit" /></Button>
                            </FormGroup>
                        </Form>
                        {
                            this.state.error
                            ?
                                <Alert color="danger">
                                    this.state.message
                                </Alert>
                            : ''
                        }
                    </CardBlock>
                </Card>
            </div>
        );
    }
}


export default injectIntl(UserLoginForm);
