import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { BoxArrowLeft, Easel } from 'react-bootstrap-icons';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {

            current_user: {
                loggedIn: false,
                userId: null,
                name: null,
                usertype: null

            }

        }
    }



    componentDidMount() {

        this.setState({ current_user: JSON.parse(localStorage.getItem('local_auth')) });
    }

    logout() {

        let local = JSON.parse(localStorage.getItem('local_auth'));
        console.log('Log out')

        let auth = {
            "loggedIn": false,
            "userId": null,
            "name": null,
            "usertype": null

        };

        localStorage.setItem('local_auth', JSON.stringify(auth));
        console.log(localStorage.getItem('local_auth'));

        this.props.history.push("/");




    }


    render() {


        return (
            !this.state.current_user.loggedIn ?

                null
                :
                <Navbar bg="dark" variant="dark">

                    <Nav className="d-flex flex-column">
                        <Navbar.Brand className="text-info" href="#/">
                            <Easel className="m-2" size="42" />
                    Marking Portal
                    </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end d-flex align-items-center">

                        <Nav className="d-flex p-2 align-items-center">
                            <Navbar.Text className="mr-3 text-white">
                                <h5>{this.state.current_user.name}</h5>
                                <p> {this.state.current_user.usertype}</p>

                                <Button
                                    className="d-flex align-items-center"
                                    onClick={() => this.logout()} size="sm" >Logout
                                <BoxArrowLeft className="m-1" size="18" /></Button>

                            </Navbar.Text>

                        </Nav>


                    </Navbar.Collapse>
                </Navbar>

        )
    }
}

export default withRouter(NavBar);