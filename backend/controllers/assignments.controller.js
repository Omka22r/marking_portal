
const db = require("../models");
const Assignment = db.assignments;



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
                        message: data
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
