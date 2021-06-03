import React, { Component } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
           
            return <Container style={{ height: '50vh' }} className="d-flex col-12  flex-column align-items-center justify-content-center">
                <Alert variant="danger">
                    <Alert.Heading>Something Went Wrong</Alert.Heading>
                    
                    <hr />


                    <a href="/"> HOME</a>


                </Alert>

            </Container>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;