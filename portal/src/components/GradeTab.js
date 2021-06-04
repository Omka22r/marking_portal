import React, { Component } from 'react';
import { Col, Button, Form, Spinner } from 'react-bootstrap';
import AssignmentTab from './AssignmentTab';

class GradeTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: null,
            assignments: [],
            showSelectStudent: true,
            sendEmail: false

        }
    }



    fetchAssignments(userid) {

 
        this.setState({ selectedStudent: userid });

        console.log('Getting the users assignments');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign?user=${userid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ assignments: data.message.filter((e) => e.submitted) });
                // console.log('email 0r not' + (data.gradedCount === data.message.length && type == 'gradeUpdate'))
                // if (data.gradedCount === data.message.length && type == 'gradeUpdate') {
                //     this.send_email();
                // }

            }).catch(err => console.log('Error: ' + err));
    }


    render() {


        return (
            <Col className="mx-auto d-flex flex-column col-11">
                {this.state.showSelectStudent ?
                    <Form>
                        <Form.Row>
                            <Col xs="auto" className="mt-1 ">
                                <Form.Label className="m-2 d-flex align-items-center col-12 justify-content-between ">
                                    <h5>Select Student:</h5>
                                    {this.state.assignments.length === this.state.assignments.filter((i) => i.status == 'Graded').length && this.state.assignments.length > 0 ?
                                        this.state.sendEmail ?
                                            <Spinner animation="border" />
                                            :
                                            <Button
                                                onClick={() => {

                                                    this.send_email()

                                                }}
                                                variant="outline-success">Send Email</Button>
                                        : null}

                                </Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={this.state.selectedStudent}
                                    onChange={(e) => this.fetchAssignments(e.target.value)}
                                    className="col-2">
                                    {this.state.selectedStudent === null ? <option value={null} >Choose...</option> : null}
                                    {this.props.list.map((e) => <option key={e._id} value={e._id}>{e.name}</option>)}
                                </Form.Control>
                            </Col>

                        </Form.Row>
                    </Form> : null}

                <Col className="col-12 mt-2 flex-column align-items-center">
                    {
                        this.state.selectedStudent === null ?


                            <h5 className="mt-5 text-center">No Students Selected</h5>

                            :
                            this.state.assignments.length === 0 ?
                                <h5 className="mt-5 text-center">No Assignments Submitted</h5>
                                :
                                <AssignmentTab
                                    showSelectStudent={() => {
                                        this.setState({ showSelectStudent: !this.state.showSelectStudent });
                                    }}
                                    instructor={true}
                                    onUpdate={() => this.fetchAssignments(this.state.selectedStudent)}
                                    assignment={this.state.assignments} />

                    }
                </Col>


            </Col >
        )
    }
}

export default GradeTab;