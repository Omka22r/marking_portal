
import React, { Component } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { BoxArrowRight, Easel } from 'react-bootstrap-icons';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: null,
            loading: false
        }
    }




    componentDidMount() {


    }

    logIn(e) {

        e.preventDefault();
        this.setState({ loading: true });

        fetch(`http://localhost:8000/api/users/auth?user=${this.state.username}&pass=${this.state.password}`)
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
                    <Form.Group>
                        <Form.Label><h5>Password</h5></Form.Label>
                        <Form.Control value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>

                    {
                        !this.state.loading ?
                            <Button className="d-flex align-items-center" size="sm" type="submit" disabled={this.state.username.length === 0 || this.state.password.length === 0}
                                variant="primary">
                                LOG IN <BoxArrowRight className="ml-2" size="18" />
                            </Button> :
                            <Spinner className="mx-auto" animation="grow" />
                    }

                </Form>

            </Container>
        )
    }
}

export default LandingPage;