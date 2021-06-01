import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { BoxArrowLeft, Easel } from 'react-bootstrap-icons';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {



        }
    }



    componentDidMount() {


    }


    render() {


        return (

            <Navbar bg="dark" variant="dark">

                <Nav className="d-flex flex-column">
                    <Navbar.Brand className="text-info" href="#home">
                        <Easel className="m-2" size="42" />
                    Marking Portal
                    </Navbar.Brand>




                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-around d-flex align-items-center">

                    <Nav className="ml-auto d-flex align-items-center">
                        <Navbar.Text className="mr-3 text-white">
                            <h5>Omkar Sidhu</h5>
                            <p>Instructor</p>
                            <Link className="text-dark" to={'/'}>
                                <Button size="sm" >Logout <BoxArrowLeft className="ml-2" size="18" /></Button>
                            </Link>
                        </Navbar.Text>

                    </Nav>


                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(NavBar);