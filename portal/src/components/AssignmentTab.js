import React, { Component } from 'react';
import { CardGroup, Col, CardDeck, Button, Card, Badge, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CardList } from 'react-bootstrap-icons';
import Questions from './Questions';

class AssignmentTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_assignment: null,
            questions: null,
            answered_questions: 0,
            score: 0,
            readOnly: false

        }
    }

    componentDidMount() {
        
    }

    update_assignment(id, request, user_id) {

        // Api call to update assignments collection

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                user_id: user_id,
                request: request

            })
        };


        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assignUpdate`, requestOptions)
            .then(response => response.json())
            .then(data => {

                this.props.onUpdate();

                if (request.status === 'Submitted' || request.status == 'Graded') {
                    this.setState({ current_assignment: null, questions: null })
                }
            })
            .catch(err => console.log('Error: ' + err));
    }

    update_answers(user_input, index) {
       

        let input = Array.isArray(user_input) ? user_input : [user_input];


        let questions = [...this.state.questions];
        questions[index] = { ...questions[index], answer: input };

        this.setState({ questions: questions });

        if (this.state.answered_questions <= this.state.questions.length) {
            this.setState({ answered_questions: this.state.answered_questions + 1 });
        }

    }

    submitGrades(e) {

        e.preventDefault();

        this.update_assignment(this.state.current_assignment._id,
            { submitted: true, status: 'Graded', score: this.state.score },
            this.state.current_assignment.user_id
        );
        this.props.onUpdate();
        this.props.showSelectStudent();


    }



    render() {


        return (
            this.state.current_assignment ?


                <Col className="mb-5">
                    <Button
                        onClick={() => {
                            this.setState({ current_assignment: null, score: 0,  readOnly: false });
                            
                            if (this.props.instructor) { this.props.showSelectStudent() }
                        }}
                        className="mt-2 d-flex align-items-center" size="lg" variant="link">
                        <CardList className="m-2" size="24" /> List Assignments
                    </Button>

                    <Card className="mt-3" >
                        <Card.Header className="bg-dark text-white d-flex align-items-center justify-content-between col-12">{this.state.current_assignment.title}
                        {this.state.current_assignment.status === 'Graded' ?



                                    <footer className="text-info">
                                        Score:  {this.state.current_assignment.score + ' / ' + this.state.current_assignment.questions.length}
                                    </footer>
                                    : null}
                        </Card.Header>
                        <Card.Body>
                            <p>{this.state.current_assignment.description}</p>

                            {<ol>
                                {this.state.current_assignment.questions.map((ques, index) =>

                                    <Questions
                                        instructor_view={this.props.instructor}
                                        readOnly={this.state.readOnly}
                                        updates={(i) => this.update_answers(i, index)}
                                        question={ques} />

                                )}

                            </ol>}
                        </Card.Body>
                        {this.state.readOnly ? null :
                            <ListGroup className="list-group-flush">

                                <ListGroupItem>
                                    {this.props.instructor ?
                                        <Form onSubmit={(e) => this.submitGrades(e)}>
                                            <Form.Group className="col-md-3 col-sm-10 ">
                                                <Form.Label>Score</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    placeholder="select"
                                                    onChange={(e) => this.setState({ score: e.target.value })}
                                                    defaultValue="Select Score">
                                                    <option>0</option>
                                                    {this.state.current_assignment.questions.map((i, index) => <option>{index + 1}</option>)}

                                                </Form.Control>

                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                className="mt-4" size="sm" variant="info">Submit Score</Button>

                                        </Form>

                                        :
                                        <Button
                                            onClick={() =>
                                                this.update_assignment(
                                                    this.state.current_assignment._id,
                                                    { submitted: true, status: 'Submitted', questions: this.state.questions },
                                                    this.state.current_assignment.user_id


                                                )}

                                            // disabled={this.state.answered_questions <= this.state.questions.length}
                                            className="m-1" size="sm" variant="outline-info">Submit</Button>

                                    }
                                </ListGroupItem>
                            </ListGroup>
                        }

                    </Card>

                </Col> :
                <CardGroup>
                    {this.props.assignment.map((a) =>
                        <Card key={a._id} className="m-2 border">

                            <Card.Body className="d-flex flex-column align-items-start justify-content-around">
                                <Card.Title className="d-flex ">
                                    {a.title}


                                </Card.Title>

                                <Card.Text className=" border-top pt-2 border-dark">
                                    {a.description}
                                </Card.Text>

                                {this.props.instructor ?
                                    a.status === 'Graded' ?
                                        <Button size="sm"
                                            onClick={() => {

                                                this.setState({ current_assignment: a, readOnly: true });
                                                this.props.showSelectStudent();

                                            }}
                                            size="sm" variant="outline-success">VIEW</Button> :
                                        <Button size="sm"
                                            onClick={() => {

                                                this.setState({ current_assignment: a, });
                                                this.props.showSelectStudent();

                                            }}
                                            size="sm" variant="outline-success">GRADE</Button>


                                    :
                                    a.status === 'In Progress' ?

                                        <Button size="sm"
                                            onClick={() => {
                                                console.log(a);
                                                this.setState({ current_assignment: a, questions: a.questions });

                                            }}
                                            size="sm" variant="outline-success">CONTINUE</Button>

                                        :
                                        a.status === 'Submitted' || a.status === 'Graded' ?
                                            <Button size="sm"
                                                onClick={() => {
                                                    this.setState({ readOnly: true, current_assignment: a, questions: a.questions });
                                                }}
                                                size="sm" variant="outline-success">VIEW</Button> :
                                            <Button size="sm"
                                                onClick={() => {
                                                    console.log(a);
                                                    this.setState({ current_assignment: a, questions: a.questions });
                                                    this.update_assignment(a._id, { status: 'In Progress' });

                                                }}
                                                size="sm" variant="outline-success">START</Button>

                                }


                            </Card.Body>


                            <Card.Footer className="d-flex bg-dark align-items-start justify-content-between">

                                <Badge bg="dark" variant="white text-warning" className="p-2">{a.status}</Badge>

                                {a.status === 'Graded' ?



                                    <footer className="text-info">
                                        Score:  {a.score + ' / ' + a.questions.length}
                                    </footer>
                                    : null}
                            </Card.Footer>
                        </Card>)
                    }


                </CardGroup >

        )
    }
}

export default AssignmentTab;