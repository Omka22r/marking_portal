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


        console.log(this.test());

        this.localStorageSetup();
        // this.clearAssignments();
        // this.clearUsers();
        this.fetchUser();
        this.fetchAssignments();

    }

    test() {
        console.log('test');

        let regex = /^([a-zA-Z]+\s)[0-9]+$/;


        let i = 'sddsds gg 1996';

        let test = 'xzczxc  89';

        return regex.test(i);

    }

    localStorageSetup() {

        console.log(localStorage.getItem('local_auth'));

        if (localStorage.getItem('local_auth') === null) {

            let auth = {
                "loggedIn": false,
                "userId": null,
                "name": null,
                "usertype": null

            };

            localStorage.setItem('local_auth', JSON.stringify(auth));

        }
    }


    fetchUser() {

        // Get users
        console.log('Getting the users list');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(err => console.log('Error: ' + err));
    }

    clearUsers() {
        //Delete all the users from database
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/users`, { method: 'DELETE' })
            .then(response => response.json())
            .then(i => console.log("Clearing Users:" + i))
            .catch(err => console.log('Error: ' + err));
    }

    clearAssignments() {
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign`, { method: 'DELETE' })
            .then(response => response.json())
            .then(i => console.log("Clearing Assignments:" + i))
            .catch(err => console.log('Error: ' + err));
    }

    fetchAssignments() {
        console.log('Getting all the Assignments');
        fetch(`http://${process.env.REACT_APP_BACK_END}/api/assign`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
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