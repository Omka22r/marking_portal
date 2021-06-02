import React, { Component } from 'react';
import { Row, CardColumns, Button, Card, Container } from 'react-bootstrap';
import AssignmentTab from '../components/AssignmentTab';

class StudentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assignment: [],
            error: null,
        }
    }

    componentDidMount() {
        this.checkAuthentication();
        this.fetchAssignments(JSON.parse(localStorage.getItem('local_auth')).userId);

    }

    checkAuthentication() {
        let local = JSON.parse(localStorage.getItem('local_auth'));

        if (!local.loggedIn || local.usertype !== 'Student') {
            this.props.history.push("/");
        }

    }

    fetchAssignments(userid) {
        console.log('Getting the users assignments');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign?user=${userid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.error ?
                    this.setState({ error: data.error })
                    :
                    this.setState({ assignment: data.message })

            }).catch(err => console.log('Error: ' + err));
    }

    render() {


        return (
            <Container
                fluid
                style={{ minHeight: '100vh', minWidth: '100vw', overflowY: 'auto' }}
                className="col-12 d-flex flex-column justify-content-start h-100">
                <h3 className="text-info border-bottom p-2 border-dark" style={{ letterSpacing: 2 }}> Assignments </h3>

                {this.state.assignment.length !== 0
                    ?
                    <AssignmentTab
        
                        assignment={this.state.assignment} /> :

                    <h4>No assignments Found</h4>
                }


            </Container>
        )
    }
}

export default StudentPage;