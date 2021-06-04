
import React, { Component } from 'react';
import { Button, Container, Form, Spinner, Table } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { BoxArrowRight, Easel } from 'react-bootstrap-icons';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            loading: false,
            users: []
        }
    }




    componentDidMount() {
        this.checkAuthentication();
        this.fetchUser();
    }

    checkAuthentication() {
        let local = JSON.parse(localStorage.getItem('local_auth'));
        if (local.loggedIn) {
            local.usertype === 'Student' ?
                this.props.history.push(`/${local.usertype}?id=${local.userId}`)
                :
                this.props.history.push(`/${local.usertype}`)


        }
    }

    logIn(e) {

        e.preventDefault();
        this.setState({ loading: true });

        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users/auth?user=${this.state.username}&pass=${this.state.password}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                }
                else {
                    console.log('Authenticated');
                    this.setState({ loading: false });

                    // Set LocalLogIn

                    let auth = {
                        "loggedIn": true,
                        "userId": data.user._id,
                        "name": data.user.name,
                        "usertype": data.user.usertype

                    };

                    localStorage.setItem('local_auth', JSON.stringify(auth));

                    if (data.user.usertype === 'Student') {
                        this.props.history.push(`/${data.user.usertype}?id=${data.user._id}`);
                    } else {
                        this.props.history.push(`/${data.user.usertype}`);
                    }

                }
            }).catch(err => {
                this.setState({ error: JSON.stringify(err), loading: false })
            });

    }

    fetchUser() {

        // Get users
        console.log('Getting the users list');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ users: data });
            }).catch(err => console.log('Error: ' + err));
    }

    render() {

        return (
            <Container style={{ minHeight: '30vh' }} className="bg-light mt-5 p-5 d-flex text-dark flex-column justify-content-center col-lg-4 col-md-8">
                <h2 className="text-info" style={{ letterSpacing: 2 }}>Marking Portal <Easel className="ml-2" size="45" /></h2>

                {this.state.error !== null ?
                    <h6 className="text-danger mt-3">{this.state.error}</h6> : null
                }
                <Form onSubmit={(e) => this.logIn(e)} className="mt-2 text-dark">
                    <Form.Group>
                        <Form.Label><h5>Username</h5></Form.Label>
                        <Form.Control value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>

                    {
                        !this.state.loading ?
                            <Button className="d-flex align-items-center mt-3" size="sm" type="submit" disabled={this.state.username.length === 0 || this.state.password.length === 0}
                                variant="primary">
                                LOG IN <BoxArrowRight className="m-1" size="18" />
                            </Button> :
                            <Spinner className="mx-auto" animation="grow" />
                    }

                </Form>
                {this.state.users.length === 0 ? null :
                    <Table className="mt-4" striped bordered hover variant="light">
                        <thead>
                            <tr>

                                <th>User Name</th>
                                <th>Password</th>
                                <th>User Type</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((i) =>
                                <tr>

                                    <td>{i.username}</td>
                                    <td>{i.password}</td>
                                    <td>{i.usertype}</td>

                                </tr> )
                            }
                        </tbody>
                    </Table>}

            </Container>
        )
    }
}

export default LandingPage;