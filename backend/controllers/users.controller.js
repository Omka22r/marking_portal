const db = require("../models");
const Users = db.users;
const assignments = require("../controllers/assignments.controller.js");
const notify = require("../functions/Email.js");

let defaultUsers = [
    {
        name: 'Michael Scott',
        username: 'ms1',
        email: 'SamTestJo@gmail.com'

    },
    {
        name: 'Jim Halpert',
        username: 'jm1',
        usertype: 'Student',
        email: 'omka22rsidhu@gmail.com'

    },
    {
        name: 'Ryan Howard',
        username: 'rh1',
        usertype: 'Student',
        email: 'omka22rsidhu@gmail.com'

    },
    {
        name: 'Andy Bernard',
        username: 'ab1',
        usertype: 'Student',
        email: 'omka22rsidhu@gmail.com'

    }
]

let deaultAssignments = [
    {
        title: 'On Board Assignment 1'

    },
    {
        title: 'On Board Assignment 2'

    },
    {
        title: 'On Board Assignment 3'

    },
];


exports.setupDefaultUsers = () => {

    console.log('Setting up default users 1 Instructor and 3 Students.');

    Users.find()
        .then(data => {
            if (data.length < 4) {

                defaultUsers.forEach((i) => {

                    const user = new Users(i);

                    // Save User in the database
                    user
                        .save(user)
                        .then(data => {
                            console.log('User Created');
                            console.log(data);
                            data.usertype === 'Student' ?

                                deaultAssignments.forEach((i) =>
                                    assignments.createAssignment({
                                        user_id: data._id,
                                        title: i.title
                                    }))

                                : null;

                        })
                        .catch(err => {
                            console.log(
                                err.message || "Some error occurred while creating the Users."
                            );
                        });

                }
                )

            }

        })

}


// Retrieve all Users from the database.
exports.userList = (req, res) => {
    Users.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


// Clear user table
exports.clearUsers = (req, res) => {

    Users.remove({}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Users."
        });
    });
}

// Authenticate Users
exports.authenticate = (req, res) => {

    console.log(req.query);
    Users.find({ username: req.query.user })
        .then(data => {

            if (data.length === 0) {
                res.send({ 'error': 'User does not exist.' });
            } else {

                data[0].password == req.query.pass ?
                    res.send({ 'message': 'User Authenticated', 'user': data[0] }) :
                    res.send({ 'error': 'Incorrect Password' });
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};


// Send Email
exports.sendEmail = (req, res) => {
    notify.sendemail(
        (r) => {
           
            r.success ?
                res.status(200).send({
                    message: 'Email was sent successfully.'
                }) :

                res.status(200).send({
                    message: 'Failed to send the email.'
                });
        });
}