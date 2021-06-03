import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import { Container, Alert, Button } from 'react-bootstrap';


function ErrorPage(props) {
    return <Container style={{ height: '50vh' }} className="d-flex col-12  flex-column align-items-center justify-content-center">
        <Alert variant="danger">
            <Alert.Heading>Page Not Found</Alert.Heading>
            <p>
                A 404 error is an HTTP status code that means that the page you were trying to reach on a website couldn't be found on their server. To be clear, the error indicates that while the server itself is reachable, the specific page showing the error is not.
  </p>
            <hr />


            <a href="/"> HOME</a>


        </Alert>

    </Container>;
}

export default ErrorPage;