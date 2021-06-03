const db = require("../models");
const Users = db.users;
const assignments = require("../controllers/assignments.controller.js");
const notify = require("../functions/Email.js");

let defaultUsers = [
    {
        name: 'Michael Scott',
        username: 'admin',
        email: 'SamTestJo@gmail.com',
        usertype: 'Instructor'

    },
    {
        name: 'Jim Halpert',
        username: 'student1',
        email: 'omka22rsidhu@gmail.com'

    },
    {
        name: 'Ryan Howard',
        username: 'student2',
        email: 'omka22rsidhu@gmail.com'

    },
    {
        name: 'Andy Bernard',
        username: 'student3',
        email: 'omka22rsidhu@gmail.com'

    }
]

let deaultAssignments = [
    {
        title: 'On Board Assignment'

    },
    {
        title: 'Knowledge Test'

    },
    {
        title: 'Learning Docker'

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

// Signup New Users
exports.signUp = (req, res) => {

    // Find if User already exist
    Users.find({ username: req.body.username })
        .then(data => {
            console.log('Signup User');
            console.log(req.body);
            if (data.length === 0) {
                const user = new Users({
                    name: req.body.name,
                    password: req.body.password,
                    username: req.body.username,
                    email: req.body.email

                });

                // Save User in the database
                user
                    .save(user)
                    .then(data => {
                        res.send({ 'message': 'User Signup Successful.' });
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Users."
                        });
                    });
            }
            else {
                res.json({ 'error': 'Username is not available' })
            };

        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
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
        }, {
        'body': 'Hello from Marking Portal',
        'result': '<p>Hello Tim Carter,<p><p>Assignment 1 has been graded.<p><table style="width:80%;"><tr><th>Assignment</th><th>Score</th></tr><tr style="text-align:center"><td>Assignment 2 OnBoard</td><td>2 / 3</td></tr></table></p></p><p>Kind Regards,</p><p>Jim Halpert</p><style>table, td, th {border: 1px solid black;width: 300px;}</style>'
    }

    );
}