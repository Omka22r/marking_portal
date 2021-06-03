module.exports = app => {

    const assignments = require("../controllers/assignments.controller.js");

    var router = require("express").Router();

    // Retrieve Assignments
    router.get("/assign", assignments.getAssignmentList);

    // Update Assignments
    router.post("/assignUpdate", assignments.updateAssignment);


    // Delete all Assignments
    router.delete("/assign", assignments.clearAssignment);

    app.use('/api', router);
};