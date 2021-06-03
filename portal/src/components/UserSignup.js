import React, { Component } from 'react';
import { Button, InputGroup, Toast, Form } from 'react-bootstrap';

class UserSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            show: false,
            email: '',
            error: null,


        }
    }

    componentDidMount() {



    }

    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }


    onSubmit(e) {

        e.preventDefault();

        if (!this.emailIsValid(this.state.email)) {
            this.setState({ error: 'Invalid Email' });
        } else {
            this.signup_users();

        }


    }

    signup_users() {

        let new_user = {
            name: this.state.first_name + ' ' + this.state.last_name,
            password: this.state.password,
            username: this.state.username,
            email: this.state.email
        }

        // Api call to Signup Users

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        };

        console.log(requestOptions);

        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users/signup`, requestOptions)
            .then(response => response.json())
            .then(data => {

                console.log(data)

                if (data.error) {
                    this.setState({ error: data.error })
                } else {
                    this.setState({
                        first_name: '',
                        last_name: '',
                        username: '',
                        password: '',
                        email: '',
                        error: null,
                        show: true
                    })
                }
            })
            .catch(err => console.log('Error: ' + err));
    }

    render() {


        return (
            <span>


                <Form className="col-sm-11 col-md-6 m-3" onSubmit={(e) => this.onSubmit(e)}
                >
                    <Toast
                        className=""
                        onClose={() => this.setState({ show: false })}
                        show={this.state.show} delay={3000}
                        autohide
                        position="top-end">
                        <Toast.Header>

                            <strong className="me-auto text-dark">Making Portal</strong>
                           
                        </Toast.Header>
                        <Toast.Body>User Signup Successful</Toast.Body>
                    </Toast>

                    <Form.Row className="d-flex justify-content-around">
                        <Form.Group className="col-5" >
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="First Name"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={(e) => this.setState({ first_name: e.target.value })}

                            />

                        </Form.Group>
                        <Form.Group className="col-5" >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={this.state.last_name}
                                onChange={(e) => this.setState({ last_name: e.target.value })}

                            />

                        </Form.Group>

                    </Form.Row>
                    <Form.Row className="d-flex mt-2 justify-content-around">
                        <Form.Group className="col-5">
                            <Form.Label>Username</Form.Label>


                            <Form.Control
                                type="text"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                name="username"
                                value={this.state.username}
                                onChange={(e) => this.setState({ username: e.target.value })}

                            />


                        </Form.Group>
                        <Form.Group className="col-5" controlId="validationFormik03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Password"
                                name="Password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}

                            />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row className="mt-2 d-flex justify-content-around">
                        <Form.Group className="col-11" controlId="validationFormik04">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    name="Email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </InputGroup>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="mt-2 d-flex">
                        {this.state.error === null ? null : <p className="text-danger">{this.state.error}</p>}
                        <Button
                            disabled={this.state.first_name.length == 0 || this.state.last_name.length == 0 || this.state.password.length == 0 || this.state.username.length == 0 || this.state.password.length == 0 || this.state.email.length == 0}
                            className="m-5" type="submit">Submit</Button>
                    </Form.Row>

                </Form>
            </span>
        )
    }
}

export default UserSignup;