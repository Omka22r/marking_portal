import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';


class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            answer_mcs: [],



        }
    }


    update_answer_mcs(e) {

        let answer = null;

        if (this.state.answer_mcs.includes(e)) {

            answer = this.state.answer_mcs.filter(a => a !== e);
            this.setState({ answer_mcs: this.state.answer_mcs.filter(a => a !== e) })
        }
        else {
            answer = [...this.state.answer_mcs, e];
            this.setState({ answer_mcs: [...this.state.answer_mcs, e] });
        }

        this.props.updates(answer);




    }

    renderQuestion() {
        switch (this.props.question.type) {
            case "mc":
                console.log(this.props.question);
                return (
                    <li className="p-2">
                        <Card.Subtitle >{this.props.question.title}</Card.Subtitle >

                        {this.props.instructor_view ?

                            <Card.Subtitle className="mt-2 text-success border-top p-2">
                                <h5>
                                    {this.props.question.answer.length === 0 ? 'Not Answered' : this.props.question.answer[0]}
                                </h5>
                            </Card.Subtitle>
                            :
                            <Card.Text className="mt-2">


                                <div onChange={(e) => {
                                    this.props.updates(e.target.value);
                                    this.setState({ answer: e.target.value })
                                }}>
                                    {this.props.question.options.map((i) =>
                                        <span>
                                            <input className="m-3" type="radio" value={i} name="answer" /> {i}</span>)}

                                </div>

                            </Card.Text>
                        }
                    </li>)

                break;

            case "mcs":
                return (
                    <li className="p-2">
                        <Card.Subtitle >{this.props.question.title}</Card.Subtitle >
                        {this.props.instructor_view ?
                            <Card.Subtitle className="mb-2 mt-2 text-success border-top p-2">

                                <h5>{this.props.question.answer.length === 0 ? 'Not Answered' :
                                    this.props.question.answer.map(
                                        (i, index) => index !== 0 ? ', ' + i : i)}
                                </h5>

                            </Card.Subtitle>
                            :
                            <Card.Text>
                                <Form.Group >
                                    <Col onChange={(e) => this.update_answer_mcs(e.target.value)}>
                                        {
                                            this.props.question.options.map((i, index) => <Form.Check
                                                key={index}
                                                type="checkbox"
                                                className="m-2"
                                                value={i}
                                                label={i}

                                            />)
                                        }
                                    </Col>
                                </Form.Group>
                            </Card.Text>}
                    </li>
                )
                break;

            default:
                return (
                    <li>
                        <Card.Subtitle>{this.props.question.title}</Card.Subtitle>
                        {this.props.instructor_view ?
                            <Card.Subtitle className="mb-2 mt-2 text-success border-top p-2">
                                <h5>{
                                    this.props.question.answer.length === 0 ? 'Not Answered' :
                                        this.props.question.answer[0]}
                                </h5>
                            </Card.Subtitle>
                            :
                            <Card.Text>
                                <Form.Group className=" col-sm-11 col-md-6">
                                    <Form.Control
                                        type="text"
                                        value={this.state.answer}
                                        className="m-3"
                                        onChange={
                                            (e) => {
                                                this.props.updates(e.target.value);
                                                this.setState({ answer: e.target.value });
                                            }

                                        }

                                    />
                                </Form.Group>

                            </Card.Text>}

                    </li>
                )
        }
    }


    render() {

        return (
            this.renderQuestion()

        )

    }
}

export default Question;