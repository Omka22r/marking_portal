import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {

          

        }
    }



    componentDidMount(){

        
    }


    render() {

      
        return (
            
            <Navbar bg="dark" variant="dark">
               
                <Nav className="d-flex flex-column">
                <Navbar.Brand href="#home">Sam Tucker</Navbar.Brand>
                    <Navbar.Text>
                       Instructor
                    </Navbar.Text>
                  

                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-around d-flex align-items-center">

                    <Nav className="ml-auto">
                        <Link className="text-dark" to={'/'}>
                            <Button size="sm" className="m-1">Logout</Button>
                        </Link>
                    </Nav>


                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(NavBar);