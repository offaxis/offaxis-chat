import React, { PropTypes, Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Row, Col, Card, CardHeader, CardBlock, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import { displayErrors } from '../../Error/ErrorActions';

export class UserLoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorFields: []
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
            let errorFields = [];
            if(!this.state.email) {
                errorFields.push('email');
            }
            if(!this.state.password) {
                errorFields.push('password');
            }
            this.setState({
                errorFields: errorFields
            });
            displayErrors('error', 'Veuillez remplir tous les champs !');
        }
    }

    hasErrorField(name) {
        return this.state.errorFields.indexOf(name) !== -1;
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
                                    <Col sm="6" className={this.hasErrorField('email') ? 'has-danger' : ''}>
                                        <Label for="emailField">Email</Label>
                                        <Input type="text" name="email" id="emailField" className={this.hasErrorField('email') ? 'form-control-danger' : ''} onChange={this.handleChange} placeholder={this.props.intl.messages.userEmail} value={this.state.email} />
                                    </Col>
                                    <Col sm="6" className={this.hasErrorField('password') ? 'has-danger' : ''}>
                                        <Label for="passwordField"><FormattedMessage id="userPassword" /></Label>
                                        <Input type="password" name="password" id="passwordField" className={this.hasErrorField('password') ? 'form-control-danger' : ''} onChange={this.handleChange} placeholder={this.props.intl.messages.userPassword} value={this.state.password} />
                                    </Col>
                                </Row>
                            </FormGroup>
                            {
                                this.state.error
                                ? <Alert color="danger">{this.state.message}</Alert>
                                : ''
                            }
                            <FormGroup>
                                <Button  color="success" block><FormattedMessage id="submit" /></Button>
                            </FormGroup>
                        </Form>
                    </CardBlock>
                </Card>
            </div>
        );
    }
}


export default injectIntl(UserLoginForm);
