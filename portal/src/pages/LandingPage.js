
import React, { Component } from 'react';
import { Button, Container, Form, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

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

    
    render() {


        return (
            <Container style={{ minHeight: '30vh' }} className="bg-light mt-5 p-5 d-flex text-dark flex-column justify-content-around col-lg-4 col-md-8">
                <h2 className="text-info" style={{ letterSpacing: 2 }}>Marking Portal </h2>

                {this.state.error !== null ?
                    <h6 className="text-danger mt-3">{this.state.error}</h6> : null
                }
                <Form className="mt-2 text-dark">
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
                            <Button type="submit" disabled={this.state.username.length === 0 || this.state.password.length === 0}
                            variant="primary">
                                Log In
                        </Button> :
                            <Spinner className="mx-auto" animation="grow" />
                    }

                </Form>
        
            </Container>
        )
    }
}

export default LandingPage;