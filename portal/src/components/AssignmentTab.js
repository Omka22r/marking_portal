import React, { Component } from 'react';
import { CardGroup, Col, CardDeck, Button, Card, Badge, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { CardList } from 'react-bootstrap-icons';
import Questions from './Questions';

class AssignmentTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_assignment: null


        }
    }

    componentDidMount() {
        console.log('Current Assign');
        console.log(this.state.current_assignment)
    }






    render() {

        console.log(this.props.assignment);

        return (
            this.state.current_assignment ?


                <Col>
                    <Button
                        onClick={() => this.setState({ current_assignment: null })}
                        className="mt-2 d-flex align-items-center" size="lg" variant="link">
                        <CardList className="m-2" size="24" /> List Assignments
                    </Button>

                    <Card className="mt-3" >
                        <Card.Header className="bg-dark text-white">{this.state.current_assignment.title}</Card.Header>
                        <Card.Body>
                            <p>{this.state.current_assignment.description}</p>

                            {<ol>
                                {this.state.current_assignment.questions.map((ques, index) =>

                                    <Questions
                                        // instructor_view={this.props.instructor}
                                         // updates={(i) => this.update_answers(i, index)}
                                        question={ques} />

                                )}

                            </ol>}
                        </Card.Body>
                        <ListGroup className="list-group-flush">

                            <ListGroupItem>
                                {this.props.instructor ?
                                    <Form onSubmit={(e) => this.submitGrades(e)}>
                                        <Form.Group>
                                            <Form.Label>Score</Form.Label>
                                            <Form.Control
                                                as="select"
                                                onChange={(e) => this.setState({ score: e.target.value })}
                                                defaultValue="Select Score">
                                                <option>0</option>
                                                {this.state.current_assignment.questions.map((i, index) => <option>{index + 1}</option>)}

                                            </Form.Control>

                                        </Form.Group>
                                        <Button

                                            type="submit"
                                            disabled={this.state.score == null}
                                            className="" size="sm" variant="info">Submit Score</Button>

                                    </Form>

                                    :
                                    <Button

                                        disabled={this.state.answered_questions <= this.state.questions.length}
                                        className="m-1" size="sm" variant="outline-info">Submit</Button>

                                }
                            </ListGroupItem>
                        </ListGroup>
                    </Card>

                </Col> :
                <CardGroup>
                    {this.props.assignment.map((a) =>
                        <Card key={a._id} className="m-2 border">

                            <Card.Body>
                                <Card.Title className="d-flex ">
                                    {a.title}


                                </Card.Title>
                                <hr />
                                <Card.Text>
                                    {a.description}
                                </Card.Text>

                                {this.props.instructor ?
                                    a.status === 'Graded' ? null :
                                        <Button size="sm"
                                            onClick={() => {

                                                this.setState({ current_assignment: a });

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
                                        a.status === 'Submitted' || a.status === 'Graded' ? null :
                                            <Button size="sm"
                                                onClick={() => {
                                                    console.log(a);
                                                    this.setState({ current_assignment: a, questions: a.questions });

                                                }}
                                                size="sm" variant="outline-success">START</Button>

                                }


                            </Card.Body>


                            <Card.Footer className="d-flex bg-dark align-items-start justify-content-between">

                                <Badge bg="dark" variant="warning text-warning" className="p-2">{a.status}</Badge>

                                {a.status === 'Graded' ? <blockquote className="blockquote text-info d-flex mb-0">

                                    <h5>Score</h5>

                                    <footer className="blockquote-footer ml-2">
                                        {a.score + ' / ' + a.questions.length}
                                    </footer>
                                </blockquote> : null}
                            </Card.Footer>
                        </Card>)
                    }


                </CardGroup >

        )
    }
}

export default AssignmentTab;