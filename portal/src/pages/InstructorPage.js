import React, { Component } from 'react';
import { Tab, Tabs, Container, Toast, Row } from 'react-bootstrap';
import GradeTab from '../components/GradeTab';
import UserSignup from '../components/UserSignup';

class InstructorPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            student_list: null
        }
    }

    componentDidMount() {
        if (!this.checkAuthentication().loggedIn || this.checkAuthentication().usertype !== 'Instructor') {
            this.props.history.push("/");
        } else {
            this.fetchStudentUsers();
        }


    }

    fetchStudentUsers() {

        // Get users
        console.log('Getting the users list');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users`)
            .then(response => response.json())
            .then(data => {
                this.setState({ student_list: data.filter((e) => e.usertype !== 'Instructor') });
            }).catch(err => console.log('Error: ' + err));

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
                        {this.state.student_list === null ?
                            null :
                            <GradeTab list={this.state.student_list} />}
                    </Tab>
                    <Tab eventKey="admin" title="Admin">
                        <h3 className="mt-3">Signup Students</h3>
                        <hr />
                        <UserSignup />
                    </Tab>
                </Tabs>

            </Container>
        )
    }
}

export default InstructorPage;