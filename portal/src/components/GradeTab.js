import React, { Component } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import AssignmentTab from './AssignmentTab';

class GradeTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: null,
            assignments: []

        }
    }


    fetchAssignments(userid) {

        
        this.setState({ selectedStudent: userid });

        console.log('Getting the users assignments');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign?user=${userid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.message);

                this.setState({ assignments: data.message.filter((e) => e.submitted) });



            }).catch(err => console.log('Error: ' + err));
    }



    render() {


        return (
            <Col className="mx-auto d-flex flex-column col-11">
                <Form>
                    <Form.Row>
                        <Col xs="auto" className="mt-1 ">
                            <Form.Label className="m-2">
                                <h5>Select Student:</h5>
                            </Form.Label>
                            <Form.Control
                                as="select"
                                // defaultValue={null}
                                onChange={(e) => this.fetchAssignments(e.target.value)}
                                className="col-2">
                                {this.state.selectedStudent === null ? <option value={null} >Choose...</option> : null}
                                {this.props.list.map((e) => <option key={e._id} value={e._id}>{e.name}</option>)}
                            </Form.Control>
                        </Col>

                    </Form.Row>
                </Form>
                <Col className="col-12 mt-2 flex-column bg-dark text-center">
                    {
                        this.state.selectedStudent === null ?


                            <h5 className="mt-5">No Students Selected</h5>

                            :
                            this.state.assignments.length === 0 ?
                                <h5 className="mt-5">No Assignments Submitted</h5>
                                :
                                <AssignmentTab

                                    assignment={this.state.assignments} />

                    }
                </Col>


            </Col >
        )
    }
}

export default GradeTab;