
const { sendemail } = require("../functions/Email");
const db = require("../models");
const Assignment = db.assignments;
const notify = require("../functions/Email.js");


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
                        gradedCount:data.filter(i => i.status ==='Graded').length
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

exports.updateAssignment = (req, res) => {

    console.log('Assignment Update');
    console.log(req.body);

    Assignment.updateOne({ _id: req.body.id },
        req.body.request, function (err, docs) {
            if (err) {
                console.log(err);
                res.send({
                    error: err
                });

            }
            else {
                res.status(500).send({
                    message: docs
                });


                // if (req.body.request.status === 'Graded') {
                //     console.log('test email 1' + req.body);
                //     console.log('Initiate Email for: ' + req.body.user_id);
                //     initiate_email(req.body.user_id);
                // }

            }
        });

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




initiate_email = (userId) => {
    Assignment.count({ user_id: userId, status: 'Graded' })
        .then(graded => {

            console.log('Graded:' + graded);
            Assignment.count({ user_id: userId })
                .then(submitted => {

                    console.log('Submitted:' + submitted);
                    console.log(graded === submitted)
                    if (graded === submitted) {
                        sendEmail(userId)
                    }

                })

        }).catch(err => {
            console.log("Some error occurred while retrieving Assignments.");
        })

}

sendEmail = (userId) => {

    console.log('Send Email');
    notify.sendemail(
        (r) => {

            r.success ?
                console.log('Email was sent successfully.')
                :
                console.log('Failed to send the email.')
        }, {
        'body': 'Hello from Marking Portal',
        'result': formatEmail(userId)
    }

    );

}

formatEmail = (user_id) => {


    Assignment.find({ user_id: user_id })
        .then(data => {

            if (data.length > 0) {

                console.log('Format Email for:' + user);

                let sender = 'Omkar Sidhu';
                let receiver = 'Jim Halpert';

                let ass = data;

                let msg_1 = `<p>Hello ${receiver},<p><p>All Your Assignments has been graded.
                <p><table style="width:80%;">
                <tr><th>Assignment</th><th>Score</th></tr>`;

                let i = `${ass.map((i) => `<tr style="text-align:center"><td>${i.name}</td><td>${i.score}</td>`)
                    }`;

                console.log(i);

                let msg_2 = `<tr style="text-align:center"><td>Assignment 2 OnBoard</td><td>2 / 3</td>
                </tr></table></p></p>
                <p>Kind Regards,</p>
                <p>${sender}</p>
                <style>table, td, th {border: 1px solid black;width: 300px;}</style>`;
                return msg_1 + i + msg_2;
                
            } else {
                console.log("No Assignments Found");

            }
        }).catch(err => {
            console.log(
                err.message || "Some error occurred while retrieving Assignments."
            );
        })




}