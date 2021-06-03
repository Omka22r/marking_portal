import React, { Component } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import AssignmentTab from './AssignmentTab';

class GradeTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedStudent: null,
            assignments: [],
            selectStudent: true

        }
    }


    fetchAssignments(userid) {


        this.setState({ selectedStudent: userid });

        console.log('Getting the users assignments');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign?user=${userid}`)
            .then(response => response.json())
            .then(data => {

                this.setState({ assignments: data.message.filter((e) => e.submitted) });

            }).catch(err => console.log('Error: ' + err));
    }

    send_email() {


        let submitted_length = this.state.assignment_list.length;

        let graded_length = this.state.assignment_list.filter(i => i.status == 'Graded');

        console.log('Grade: ' + graded_length + 'Submitted: ' + submitted_length);
        if (submitted_length === graded_length) {
            let local = JSON.parse(localStorage.getItem('local_auth'));


            let student = this.props.list.filter(i => i._id == this.state.selectedStudent);

            let sender = local.name;
            let receiver = student[0].name;
            let assignment_list = this.state.assignments;


            let msg = this.formatEmail(sender, receiver, assignment_list);


            // Api call to Signup Users

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            };

            console.log(requestOptions);

            fetch(`http://${process.env.REACT_APP_BACK_END}/api/users/email`, requestOptions)
                .then(response => response.json())
                .then(data => {

                    console.log(data)

                })
                .catch(err => console.log('Error: ' + err));
        }
    }


    formatEmail(sender, receiver, assignment_list) {

        let msg_1 = `<p>Hello ${receiver},</p> <p>All Your Assignments has been graded.</p><p><table style="width:80%;"><tr><th>Assignment</th><th>Score</th></tr>`;

        let i = `${assignment_list.map((i) => `<tr style="text-align:center"><td>${i.title}</td><td>${i.score}</td>`)}`;


        let msg_2 = `</table></p></p><p>Kind Regards,</p><p>${sender}</p><style>table, td, th {border: 1px solid black;width: 300px;}</style>`;

        return msg_1 + i + msg_2;
    }


    render() {


        return (
            <Col className="mx-auto d-flex flex-column col-11">
                {this.state.selectStudent ?
                    <Form>
                        <Form.Row>
                            <Col xs="auto" className="mt-1 ">
                                <Form.Label className="m-2">
                                    <h5>Select Student:</h5>
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
                                    selectStudent={(i) => {
                                        this.setState({ selectStudent: !this.state.selectStudent });
                                        // if (i === 'gradeUpdate') {
                                        //     this.send_email();
                                        // }
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