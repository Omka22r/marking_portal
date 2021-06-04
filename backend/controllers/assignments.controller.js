
const db = require("../models");
const Assignment = db.assignments;
const notify = require("../functions/Email.js");

const Users = db.users;


exports.createAssignment = (detail) => {



    const new_assingment = new Assignment(detail);

    new_assingment.save(new_assingment)
        .then(data => {
            console.log('Assignment Created');
            console.log(data);

        })
        .catch(err => {
            console.log(
                err.message || "Some error occurred while creating the Users."
            );
        });

}


// Retrieve all Assignments
exports.getAssignmentList = (req, res) => {


    req.query.user ?
        Assignment.find({ user_id: req.query.user })
            .then(data => {

                if (data.length > 0) {

                    res.send({
                        message: data,
                        gradedCount: data.filter(i => i.status === 'Graded').length
                    });


                } else {
                    res.send({
                        error: "No Assignments Found"
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Assignments."
                });
            })
        :
        Assignment.find()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Assignments."
                });
            });
};


// Update Assignment

exports.updateAssignment = async (req, res) => {

    console.log('Assignment Update');
    console.log(req.body);
    let user_id = req.body.user_id;
    let test = await Assignment.updateOne({ _id: req.body.id },
        req.body.request, function (err, docs) {
            if (err) {
                console.log(err);
                res.send({
                    error: err
                });
            }
            else {

                res.status(200).send({
                    message: docs
                });


            }
        });
    sendEmail(user_id);
};

// Clear Assignment Table
exports.clearAssignment = (req, res) => {

    Assignment.remove({}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleteing Assignments."
        });
    });
}


var sendEmail =  async (userId) => {

    let currentUser = await Users.findOne({ _id: userId });
    console.log(currentUser.name);

    console.log('Send Email for :' + userId);
    Assignment.find({ user_id: userId })
        .then(data => {
            console.log(data);
            if (data.length > 0) {



                let count = 0;

                data.map((i) => {

                    if (i.status == 'Graded') {
                        count = count + 1;
                    }
                })
                // let graded = data.filter((i) => i.status == 'Graded');

                console.log('all: ' + data.length + 'graded:' + count);


                if (count === data.length) {
                    console.log('Send Email');
                    notify.sendemail(
                        (r) => {

                            r.success ?
                                console.log('Email was sent successfully.')
                                :
                                console.log('Failed to send the email.')
                        }, {
                        'body': 'Hello from Marking Portal',
                        'result': formatEmail('Michael Scott', currentUser.name, data)
                    }

                    );
                }


            }
        }).catch(err => {
            console.log("Some error occurred while retrieving Assignments.");

        })


}


let formatEmail = (sender, receiver, assignment_list) => {

    let msg_1 = `<p>Hello ${receiver},</p> <p>All Your Assignments has been graded.</p><p><table style="width:80%;"><tr><th>Assignment</th><th>Score</th></tr>`;

    let i = `${assignment_list.map((i) => `<tr style="text-align:center"><td>${i.title}</td><td>${i.score}</td>`)}`;


    let msg_2 = `</table></p></p><p>Kind Regards,</p><p>${sender}</p><style>table, td, th {border: 1px solid black;width: 300px;}</style>`;

    return msg_1 + i + msg_2;
}
