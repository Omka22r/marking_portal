import React, { Component } from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';


class InstructorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           

        }
    }

    componentDidMount() {
        if (!this.checkAuthentication().loggedIn || this.checkAuthentication().usertype !== 'Instructor') {
            this.props.history.push("/");
        } 


    }

    checkAuthentication() {
        console.log(JSON.parse(localStorage.getItem('local_auth')));
        let local = JSON.parse(localStorage.getItem('local_auth'));
        return local;

    }

    render() {


        return (
            <Container
                fluid
                style={{ minHeight: '100vh', minWidth: '100vw', overflowY: 'auto' }}
                className="col-12 d-flex flex-column justify-content-start h-100">

                <Tabs className="mt-2" defaultActiveKey="grade" >
                    <Tab className="" eventKey="grade" title="Grade">
                    <h3>Grade Students</h3>
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                         <h3>Add Students</h3>
                         
            </Tab>
                </Tabs>

            </Container>
        )
    }
}

export default InstructorPage;