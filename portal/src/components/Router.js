import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter, Redirect } from "react-router-dom";
import NavBar from './NavBar';
import InstructorPage from '../pages/InstructorPage';
import StudentPage from '../pages/StudentPage';
import LandingPage from '../pages/LandingPage';


class Routing extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.callBackend();
    }

    callBackend() {
        fetch('http://localhost:8000/api')
            .then(response => response.json())
            .then(data => {
                console.log(data);
            }).catch(err => console.log('Error: ' + err));
    }


    render() {
        return (

            <HashRouter basename="/">

                <Switch>
                    <Route
                        path="/welcome"
                        render={({ history }) => (
                            <LandingPage history={history} />
                        )}
                    />

                    <Route exact path="/">
                        <Redirect to="/welcome" />
                    </Route>


                    <Route>
                        <NavBar />
                        <Route path="/Instructor"
                            render={({ history }) => (
                                <InstructorPage history={history} />
                            )} />


                        <Route
                            path="/Student"
                            render={({ history }) => (
                                <StudentPage history={history} />
                            )} />


                    </Route>
                </Switch>
            </HashRouter >

        );
    }
}
export default Routing;